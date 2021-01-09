const { override, addBabelPlugin } = require('customize-cra');

module.exports = override(
  // Babel config
  ...addBabelPlugin('@babel/plugin-syntax/jsx')
);
