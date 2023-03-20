module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.ios.tsx', '.android.tsx'],
        alias: {
          '@app': './src',
        },
      },
    ],
    'jest-hoist',
    ['module:react-native-dotenv'],
  ],
};
