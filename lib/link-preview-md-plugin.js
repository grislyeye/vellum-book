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
