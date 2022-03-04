module.exports = function (api) {
  api.cache(false);
  const presets = [
    ['@babel/preset-typescript'],
    ['@babel/preset-react'],
    [
      '@babel/preset-env',
      {
        corejs: { version: 3 },
        useBuiltIns: 'usage'
      },
    ],
  ];
  const plugins = [
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-transform-object-assign'],
    ['@babel/transform-runtime', { useESModules: true, regenerator: true }],
    ['effector/babel-plugin', { addLoc: true }],
  ];
  return {
    presets,
    plugins,
    ignore: [/\/node_modules\//],
    sourceType: 'unambiguous',
  };
};
