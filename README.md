# probst.io

Source of [probst.io](https://probst.io), Martin Probst's personal site.

## Content

- `content/home.md`: the home page text.
- `content/blog/*.md`: posts, one file each, with front matter (`title`, `date`,
  `updated`, `url`, `draft`). Most were imported from the old blog, which ran
  on App Engine; `url` keeps their old addresses working.
- `content/blog/*.comments.json`: archived comments of the old blog, rendered as
  Markdown with raw HTML disabled.
- `archive/datastore/`: the raw export of the old blog's datastore, without
  commenter emails. Not used by the build.

## Building

`build.ts` turns `content/` into a static site in `_site/`: the home page with
the list of posts, one page per post, the Atom feed at `/blog/feed.xml`, and
redirect pages for the URL schemes of earlier versions of the blog. It also
copies `style.css` and, if present, `static/`, and reports internal links that
don't resolve.

```sh
npm ci
npm run build   # node build.ts, needs Node 24
npm run serve   # preview at http://localhost:8000
```

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
