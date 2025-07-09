const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

// Load environment variables from unified .env file
require('dotenv').config({ path: './.env' });

module.exports = {
  entry: './src/presentation/browser/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist-browser'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@domain': path.resolve(__dirname, 'src/domain'),
      '@application': path.resolve(__dirname, 'src/application'),
      '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
      '@presentation': path.resolve(__dirname, 'src/presentation'),
    },
    fallback: {
      "fs": false,
      "path": false,
      "os": false,
      "crypto": false,
      "process": require.resolve("process/browser"),
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.TMDB_API_KEY': JSON.stringify(process.env.TMDB_API_KEY),
      'process.env.TMDB_BASE_URL': JSON.stringify(process.env.TMDB_BASE_URL),
      'process.env.TMDB_IMAGE_BASE_URL': JSON.stringify(process.env.TMDB_IMAGE_BASE_URL),
      'process.env.DEFAULT_LANGUAGE': JSON.stringify(process.env.DEFAULT_LANGUAGE),
      'process.env.DEFAULT_REGION': JSON.stringify(process.env.DEFAULT_REGION),
      'process.env.DEFAULT_PAGE_SIZE': JSON.stringify(process.env.DEFAULT_PAGE_SIZE),
      'process.env.API_TIMEOUT': JSON.stringify(process.env.API_TIMEOUT),
      'process.env.RETRY_ATTEMPTS': JSON.stringify(process.env.RETRY_ATTEMPTS),
      'process.env.RETRY_DELAY': JSON.stringify(process.env.RETRY_DELAY),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new Dotenv({
      path: './.env',
      safe: false,
      systemvars: true,
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist-browser'),
    port: 3001,
    hot: true,
    historyApiFallback: true,
  },
  mode: 'development',
};
