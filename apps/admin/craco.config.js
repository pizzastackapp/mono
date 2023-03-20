const { CracoAliasPlugin } = require('react-app-alias');
const loadWebpackConfig = require('./craco.webpack');

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {},
    },
    {
      plugin: loadWebpackConfig,
    },
  ],
};
