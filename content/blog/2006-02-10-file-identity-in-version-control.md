---
title: "File identity in version control"
date: 2006-02-10T14:02:58+00:00
updated: 2006-02-10T14:02:58+00:00
url: /blog/2006/02/10/file-identity-in-version-control/
draft: false
comments: 0
---

Something I find pretty annoying about version control systems is the instability of file identities. The problem is that changesets and operations in e.g. Subversion consider files to be identified by their relative file system path. If you merge a changeset from your main development branch back to an older release branch, changes are applied to the files which have the same path. If you now rename or move a file on the development branch, e.g. because of refactoring, patching fails because the target of the change operation cannot be found.

The solution would be to give out identities to files once they are initially added to the version control system. These IDs would need to be stable within the repository and over moves/renames. The file system path would then only be a property of the file. If a changeset is applied to the tree, files are identified by their ID and patched the normal way. If multiple files within the tree have the same ID (e.g. a file has been copied within version control) the change should be applied to both of the copies. The semantics of the merge operation would then be "take the changes that happened in this subtree between these revisions, find the files with the IDs in this target subtree, and apply the changes to them". I'm not sure if it should be an error when a changeset contains changes to files which are not present in the target tree and if the IDs of the roots of the two trees would need to be identical (e.g. you have to apply changes to files rooting at the same directory hierarchy), but this would surely make changes easier to track and backports a lot less painful.
