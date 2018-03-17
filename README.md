# Sweet and Sour Podcast Feed

How to update:

Update feed spreadsheet on Google sheets.

Run `gulp fetch-data` to fetch the new data once updated.

`node feed.js` to create the new RSS, saved in `episodes.rss`.

Now copy `episodes.rss` to the dist folder; this is what actually gets deployed to github pages:
`cp episodes.rss dist`

Now commit, push changes to master.

Deploy `dist/` folder as a subtree to github pages:

`git subtree push --prefix dist origin gh-pages`
