const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.(glsl|vs|fs)$/,
    use: 'raw-loader',
  })
);