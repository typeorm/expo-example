module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/transform-react-jsx-source',
      'babel-plugin-transform-typescript-metadata'
    ]
  };
};
