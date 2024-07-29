const project = require('./package.json');
const replaceLink = require('markdown-it-replace-link');
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addCollection("index", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("pages")
      .sort(byIndex);
  });

  eleventyConfig.addPassthroughCopy(
    {
      'node_modules/@lit': 'vendor/@lit',
      'node_modules/vellum-doc': 'vendor/vellum-doc',
      'node_modules/link-preview': 'vendor/link-preview',
      'node_modules/magick.css': 'vendor/magick.css',
      'node_modules/normalize.css': 'vendor/normalize.css'
    }
  );

  eleventyConfig.addGlobalData("project", project);

  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib
      .use(replaceLink, {
        replaceLink: function (link) {
          const isUrl = URL.canParse(link);
          const file = path.parse(link);

          if (!isUrl && file.ext === '.md') {
            const anchor = file.name;
            return `#${anchor}`;
          } else if (!isUrl && file.ext.startsWith('.md#')) {
            const anchor = file.ext.split('#').pop();
            return `#${anchor}`;
          }

          return link;
        }
      })
      .use(linkPreviewPlugin);
  });
};

function byIndex(left, right) {
  const a = left.data.index ? Number.parseInt(left.data.index) : 0;
  const b = right.data.index ? Number.parseInt(right.data.index) : 0;
  return a - b;
}

const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);

function linkPreviewPlugin(md) {
  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    const defaultListItemOpenRenderer = md.renderer.rules.list_item_open || proxy;
    return `<link-preview>${defaultListItemOpenRenderer(tokens, idx, options, env, self)}`;
  };
  md.renderer.rules.link_close = function(tokens, idx, options, env, self) {
    const defaultListItemCloseRenderer = md.renderer.rules.list_item_close || proxy;
    return `${defaultListItemCloseRenderer(tokens, idx, options, env, self)}</link-preview>`;
  };
}

module.exports = linkPreviewPlugin;
