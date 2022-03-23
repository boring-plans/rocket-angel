const context = require.context(`./`, true, /.*\.svg$/);

export default context.keys().reduce((pre, curr) => {
  const parts = curr.split("/");
  if (!pre[parts[1]]) {
    pre[parts[1]] = [];
  }
  pre[parts[1]].push(parts[2]);
  return pre;
}, {});
