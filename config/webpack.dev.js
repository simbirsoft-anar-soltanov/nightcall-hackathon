const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3001,
    allowedHosts: 'all',
    historyApiFallback: true,
    open: true,
  },
};

module.exports = merge(commonConfig, devConfig);
