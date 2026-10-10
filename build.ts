import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { marked } from 'marked';

const SITE = 'https://probst.io';
const OUT = '_site';
const BLOG_DIR = 'content/blog';

type Comment = { author: string; url: string; kind: string; text: string; created: string };
type Post = {
  title: string; date: string; updated: string; url: string;
  slug: string; body: string; comments: Comment[];
};

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const dayOf = (iso: string) => iso.slice(0, 10);

function writeOutput(path: string, content: string) {
  const file = join(OUT, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

// Parses the simple `key: value` front matter and returns the fields plus the body.
function parseFrontMatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error('missing front matter');
  }
  const fields: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon > 0) {
      fields[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
    }
  }
  return { fields, body: match[2] };
}

// Removes active content from archived comments, recording what was removed.
const unsafePatterns: [string, RegExp][] = [
  ['<script>', /<script\b[\s\S]*?(<\/script\s*>|$)/gi],
  ['<iframe>', /<iframe\b[\s\S]*?(<\/iframe\s*>|$)/gi],
  ['javascript:', /javascript:/gi],
  ['on...= attribute', /\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi],
];
const sanitizeFindings: string[] = [];
function stripActiveContent(text: string, where: string) {
  for (const [name, pattern] of unsafePatterns) {
    text = text.replace(pattern, (found) => {
      sanitizeFindings.push(`${where}: ${name}: ${found.slice(0, 80).replace(/\s+/g, ' ')}`);
      return '';
    });
  }
  return text;
}

const droppedDrafts: string[] = [];
function loadPosts() {
  const posts: Post[] = [];
  for (const name of readdirSync(BLOG_DIR).filter((n) => n.endsWith('.md')).sort()) {
    const { fields, body } = parseFrontMatter(readFileSync(join(BLOG_DIR, name), 'utf8'));
    if (fields.draft === 'true') {
      droppedDrafts.push(name);
      continue;
    }
    const sidecar = join(BLOG_DIR, name.replace(/\.md$/, '.comments.json'));
    const comments: Comment[] = existsSync(sidecar) ? JSON.parse(readFileSync(sidecar, 'utf8')) : [];
    for (const comment of comments) {
      comment.text = stripActiveContent(comment.text, `${name} (${comment.author})`);
    }
    posts.push({
      title: JSON.parse(fields.title), date: fields.date, updated: fields.updated, url: fields.url,
      slug: name.replace(/\.md$/, ''), comments,
      body,
    });
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

function page(title: string, content: string, canonicalPath: string) {
  // The home page starts with the name itself, so it doesn't need the link home.
  const homeLink = canonicalPath === '/' ? '' : '<nav><a href="/">Martin Probst</a></nav>\n';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<link rel="stylesheet" href="/style.css">
<link rel="alternate" type="application/atom+xml" title="Martin Probst" href="/blog/feed.xml">
<link rel="canonical" href="${escapeHtml(SITE + canonicalPath)}">
</head>
<body>
${homeLink}<main>
${content}
</main>
</body>
</html>
`;
}

function redirectStub(target: string) {
  const href = escapeHtml(target);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting</title>
<meta http-equiv="refresh" content="0; url=${href}">
<link rel="canonical" href="${escapeHtml(SITE + target)}">
<script>location.replace(${JSON.stringify(target).replace(/</g, '\\u003c')});</script>
</head>
<body>
<p>This page moved to <a href="${href}">${href}</a>.</p>
</body>
</html>
`;
}

function renderComments(post: Post) {
  const render = (text: string) => marked.parse(text, { async: false }) as string;
  const comments = post.comments.filter((c) => c.kind === 'COMMENT');
  const links = post.comments.filter((c) => c.kind !== 'COMMENT');
  const authorLink = (c: Comment) =>
    c.url ? `<a href="${escapeHtml(c.url)}" rel="nofollow ugc">${escapeHtml(c.author)}</a>` : escapeHtml(c.author);
  let html = '<section class="comments">\n';
  if (comments.length > 0) {
    html += '<h2>Archived comments</h2>\n';
  }
  for (const c of comments) {
    html += `<article class="comment">\n<p class="byline">${authorLink(c)}, ${dayOf(c.created)}</p>\n${render(c.text)}</article>\n`;
  }
  if (links.length > 0) {
    html += '<h2>Linked from</h2>\n<ul class="linked-from">\n';
    for (const c of links) {
      html += `<li>${authorLink(c)} (${dayOf(c.created)})</li>\n`;
    }
    html += '</ul>\n';
  }
  return html + '</section>';
}

function renderPost(post: Post) {
  const comments = post.comments.length > 0 ? renderComments(post) : '';
  const content = `<article>
<h1>${escapeHtml(post.title)}</h1>
<p class="byline"><time datetime="${escapeHtml(post.date)}">${dayOf(post.date)}</time></p>
${marked.parse(post.body, { async: false })}
</article>
${comments}`;
  return page(`${post.title} - Martin Probst`, content, post.url);
}

function renderHome(posts: Post[]) {
  const years = [...new Set(posts.map((p) => p.date.slice(0, 4)))];
  const writing = years.map((year) => {
    const items = posts.filter((p) => p.date.startsWith(year))
      .map((p) => `<li><time datetime="${dayOf(p.date)}">${dayOf(p.date)}</time> <a href="${escapeHtml(p.url)}">${escapeHtml(p.title)}</a></li>`)
      .join('\n');
    return `<h3>${year}</h3>\n<ul class="posts">\n${items}\n</ul>`;
  }).join('\n');
  const about = marked.parse(readFileSync('content/home.md', 'utf8'), { async: false });
  const content = `${about}
<h2>Writing</h2>
${writing}`;
  return page('Martin Probst', content, '/');
}

function renderFeed(posts: Post[]) {
  const entries = posts.slice(0, 20).map((p) => `<entry>
<title>${escapeHtml(p.title)}</title>
<link href="${escapeHtml(SITE + p.url)}"/>
<id>${escapeHtml(SITE + p.url)}</id>
<published>${p.date}</published>
<updated>${p.updated}</updated>
<content type="html">${escapeHtml(marked.parse(p.body, { async: false }) as string)}</content>
</entry>`).join('\n');
  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
<title>Martin Probst</title>
<link href="${SITE}/blog/feed.xml" rel="self"/>
<link href="${SITE}/"/>
<id>${SITE}/</id>
<updated>${posts[0].updated}</updated>
<author><name>Martin Probst</name></author>
${entries}
</feed>
`;
}

// Lists root-relative href/src values in generated HTML that don't resolve to a file.
function findBrokenLinks() {
  const broken: string[] = [];
  const visit = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) {
        visit(path);
      } else if (name.endsWith('.html')) {
        const html = readFileSync(path, 'utf8');
        for (const m of html.matchAll(/\b(?:href|src)="(\/(?!\/)[^"#?]*)/g)) {
          const target = decodeURI(m[1].replace(/&amp;/g, '&'));
          const candidates = [join(OUT, target), join(OUT, target, 'index.html')];
          if (!candidates.some((c) => existsSync(c) && statSync(c).isFile())) {
            broken.push(`${path.slice(OUT.length)} -> ${target}`);
          }
        }
      }
    }
  };
  visit(OUT);
  return broken;
}

rmSync(OUT, { recursive: true, force: true });
const posts = loadPosts();
let stubs = 0;
for (const post of posts) {
  writeOutput(`${post.url}index.html`, renderPost(post));
  const [, year, month, day, slug] = post.url.match(/^\/blog\/(\d+)\/(\d+)\/(\d+)\/([^/]+)\/$/)!;
  writeOutput(`/${year}/${month}/${day}/${slug}/index.html`, redirectStub(post.url));
  writeOutput(`/blog/${year}-${month}-${day}-${slug}/index.html`, redirectStub(post.url));
  stubs += 2;
}
writeOutput('index.html', renderHome(posts));
writeOutput('blog/index.html', redirectStub('/'));
writeOutput('blog/feed.xml', renderFeed(posts));
writeOutput('404.html', page('Not found - Martin Probst', '<h1>Not found</h1>\n<p>There is nothing at this address. Go <a href="/">home</a>.</p>', '/404.html'));
cpSync('style.css', join(OUT, 'style.css'));
if (existsSync('static')) {
  cpSync('static', OUT, { recursive: true });
}

console.log(`${posts.length} posts, ${stubs + 1} redirect stubs`);
console.log(`Excluded drafts: ${droppedDrafts.join(', ') || 'none'}`);
console.log(`Stripped from comments: ${sanitizeFindings.length === 0 ? 'nothing' : '\n  ' + sanitizeFindings.join('\n  ')}`);
const brokenLinks = findBrokenLinks();
console.log(`Broken root-relative links: ${brokenLinks.length === 0 ? 'none' : '\n  ' + brokenLinks.join('\n  ')}`);
