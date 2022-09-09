const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isBundleAnalyser = process.env.BUNDLE_ANALYSER;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../build'),
    sourceMapFilename: '[name].[hash:8].map',
    chunkFilename: '[id].[hash:8].js',
  },
  plugins: [isBundleAnalyser && new BundleAnalyzerPlugin()].filter(Boolean),
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512_000,
    maxAssetSize: 512_000,
  },
};

module.exports = merge(commonConfig, prodConfig);
