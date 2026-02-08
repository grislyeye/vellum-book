const fs = require("fs");
const { marked } = require("marked");
const markedFootnote = require("marked-footnote");
const markedAlert = require("marked-alert");
const package = JSON.parse(fs.readFileSync("package.json", "utf8"));
const { Liquid } = require("liquidjs");
const engine = new Liquid();

marked.use({
  gfm: true,
});

const markdown = fs.readFileSync("README.md", "utf8");

const html = marked
  .use(markedFootnote(), markedAlert({ className: "alert" }))
  .parse(markdown);

engine
  .renderFile("index.liquid", { content: html, project: package })
  .then(console.log);
