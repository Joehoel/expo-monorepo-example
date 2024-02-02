module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
      [
        '@babel/preset-env',
        {
          loose: true,
          shippedProposals: true,
        },
      ],
    ],
    plugins: ['expo-router/babel', 'react-native-reanimated/plugin'],
  };
};
