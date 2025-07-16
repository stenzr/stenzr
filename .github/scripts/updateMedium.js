const Parser = require("rss-parser");
const fs = require("fs");

const parser = new Parser();
const mediumFeedUrl = "https://medium.com/feed/@stenzr";

(async () => {
  const feed = await parser.parseURL(mediumFeedUrl);

  const htmlList = feed.items
    .slice(0, 5)
    .map(item => {
      const cleanLink = item.link.split('?')[0];
      return `<li><a href="${cleanLink}" target="_blank">${item.title}</a></li>`;
    })
    .join("\n");

  const markdownToInject = `<ul>\n${htmlList}\n</ul>`;

  const readmePath = "README.md";
  const readme = fs.readFileSync(readmePath, "utf8");

  const updated = readme.replace(
    /<!-- MEDIUM:START -->(.*?)<!-- MEDIUM:END -->/s,
    `<!-- MEDIUM:START -->\n${markdownToInject}\n<!-- MEDIUM:END -->`
  );

  fs.writeFileSync(readmePath, updated);
})();
