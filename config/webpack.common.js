const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const path = require('path');

const isDevMode = process.env.NODE_ENV === 'development';

const cssLoaders = (extra) => {
  const loaders = [
    isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
  ];

  return extra ? [...loaders, ...extra] : loaders;
};

module.exports = {
  target: ['web', 'es5'],
  mode: isDevMode ? 'development' : 'production',
  entry: ['core-js/stable', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-[name]-[fullhash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.css', '.scss', '.json', '.js', '.jsx', '.ts', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
      }),
    ],
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style-[fullhash].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      manifest: './public/manifest.json',
    }),
    new CleanWebpackPlugin(),
    new SpeedMeasurePlugin({
      outputFormat: 'humanVerbose',
      loaderTopFiles: 10,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: 'file-loader',
            options: {
              name: '[name].[fullhash].[ext]',
            },
          },
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
      },
      {
        test: /\.(jpg|png)/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 50000,
          },
        },
      },
      {
        test: /\.(css)$/,
        use: cssLoaders(),
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(s[ac]ss)$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'resolve-url-loader',
            options: { removeCR: true, sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: { transpileOnly: true },
      },
    ],
  },
  stats: {
    errorDetails: true,
  },
};
