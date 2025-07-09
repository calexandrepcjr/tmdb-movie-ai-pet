# ADR-008: Use Webpack for Browser Build System

## Status
Accepted

## Context
The browser presentation layer needs a build system that can handle TypeScript compilation, React JSX, CSS processing, environment variable injection, and browser polyfills. The build system must support both development and production modes.

## Decision
We will use Webpack as the build system for the browser presentation layer with the following configuration:

- **TypeScript Compilation**: Using ts-loader for TypeScript processing
- **React JSX**: Supporting JSX syntax for React components
- **Environment Variables**: Injecting environment variables using DefinePlugin
- **Development Server**: Using webpack-dev-server for development
- **Polyfills**: Adding browser polyfills for Node.js APIs (process)

## Consequences

### Positive Consequences
- **Comprehensive Tooling**: Handles all build requirements in one system
- **Hot Module Replacement**: Fast development workflow
- **Code Splitting**: Optimization capabilities for production
- **Environment Management**: Easy environment variable injection
- **Polyfill Support**: Can run Node.js-style code in browser

### Negative Consequences
- **Build Complexity**: Complex configuration file
- **Large Bundle Size**: May produce large bundles without optimization
- **Build Time**: Slower builds compared to simpler tools
- **Learning Curve**: Developers need Webpack knowledge

## Implementation
Webpack configuration (`webpack.config.js`):

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

// Load environment variables
require('dotenv').config({ path: './.env.browser' });

module.exports = {
  entry: './src/presentation/browser/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist-browser'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.BROWSER_APP_TMDB_API_KEY': JSON.stringify(process.env.BROWSER_APP_TMDB_API_KEY),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new Dotenv({
      path: './.env.browser',
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
};
```

Package.json scripts:
```json
{
  "scripts": {
    "start:browser": "webpack serve --mode development",
    "build:browser": "webpack --mode production",
    "dev:browser": "webpack serve --mode development --open"
  }
}
```

## Alternatives Considered
- **Vite**: Faster but less mature ecosystem
- **Parcel**: Simpler but less control over configuration
- **Create React App**: Would handle setup but less customization
- **Rollup**: Better for libraries but more complex for applications

## Related ADRs
- [ADR-003: Use TypeScript as Primary Language](./003-typescript-language.md)
- [ADR-006: Adopt Browser-Centric Naming Convention](./006-browser-environment-naming.md)
- [ADR-009: Implement Environment-Specific Configuration](./009-environment-configuration.md)

---

**Date:** 2025-07-08
**Author:** Development Team
**Reviewers:** Architecture Review
