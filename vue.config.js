/* eslint-disable */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WorkerPlugin = require('worker-plugin')

// prettier-ignore
module.exports = {
	productionSourceMap: false,
	configureWebpack: {
		plugins: [
      // new BundleAnalyzerPlugin(),
      new WorkerPlugin()
    ],
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
/* eslint-enable */
