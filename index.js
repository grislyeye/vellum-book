import fs from "fs";
import { marked } from "marked";
import markedFootnote from "marked-magickcss-sidenote";
import project from "./package.json" with { type: "json" };
import { Liquid } from "liquidjs";

const engine = new Liquid();

marked.use({
  gfm: true,
});

const markdown = fs.readFileSync("README.md", "utf8");
const html = marked.use(markedFootnote()).parse(markdown);

engine
  .renderFile("index.liquid", { content: html, project: project })
  .then(console.log);
