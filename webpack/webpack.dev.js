const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const variable = require('./utils/variable');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { DIST_PATH } = variable;
//引入ic
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const config = {
  mode: 'development',
  cache: { type: 'memory' },
  devtool: 'eval-cheap-module-source-map', // 开发环境开启SourceMap
  stats: 'errors-only',
  plugins: [new ReactRefreshWebpackPlugin(), new BundleAnalyzerPlugin()].filter(Boolean),
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000,
    ignored: /node_modules/,
  },
  devServer: {
    open: {
      target: ['index.html'],
      app: {
        name: 'chrome',
      },
    },
    compress: true, //是否启用gzip压缩
    host: 'localhost',
    port: 9093,
    hot: true,
    client: {
      logging: 'error',
      progress: true, // 浏览器打印进度
    },
    static: {
      directory: DIST_PATH,
    },
    proxy: {
      // "/service": {
      //     target: "http://localhost:3000"
      // }
    },
  },
};
const mergedConfig = webpackMerge.merge(baseConfig, config);
// module.exports = new SpeedMeasurePlugin().wrap(mergedConfig) // 报错 ：https://github.com/stephencookdev/speed-measure-webpack-plugin/issues/167
module.exports = mergedConfig;
