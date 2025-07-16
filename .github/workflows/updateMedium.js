const Parser = require("rss-parser");
const fs = require("fs");

const parser = new Parser();
const mediumFeedUrl = "https://medium.com/feed/@stenzr";

(async () => {
  const feed = await parser.parseURL(mediumFeedUrl);

  const markdown = feed.items
    .slice(0, 5)
    .map((item) => `- [${item.title}](${item.link})`)
    .join("\n");

  const readmePath = "README.md";
  const readme = fs.readFileSync(readmePath, "utf8");

  const updated = readme.replace(
    /<!-- MEDIUM:START -->(.*?)<!-- MEDIUM:END -->/s,
    `<!-- MEDIUM:START -->\n${markdown}\n<!-- MEDIUM:END -->`
  );

  fs.writeFileSync(readmePath, updated);
})();
