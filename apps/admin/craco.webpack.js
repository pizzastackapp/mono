module.exports = {
  overrideWebpackConfig: ({ webpackConfig }) => {
    webpackConfig.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    webpackConfig.module.rules[1].oneOf[
      webpackConfig.module.rules[1].oneOf.length - 1
    ].exclude.push(/\.gql$/);

    return webpackConfig;
  },
};
