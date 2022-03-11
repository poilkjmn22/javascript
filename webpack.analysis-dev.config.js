const { merge } = require('webpack-merge');
const WebpackBundleAnalyzer =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(require('./webpack.dev.config.js'), {
  plugins: [
    new WebpackBundleAnalyzer({
      analyzerMode: 'static',
    }),
  ],
});
