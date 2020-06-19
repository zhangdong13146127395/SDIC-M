const path = require("path");
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

// 基础路径 注意发布之前要先修改这里
let baseUrl = process.env.NODE_ENV === 'development' ? '/' : '/oa/mobile/'

module.exports = {
  publicPath: baseUrl, // 根据你的实际情况更改这里
  outputDir: 'mobile',
  lintOnSave: true,
  devServer: {
    publicPath: baseUrl, // 和 baseUrl 保持一致
    port: 8888,
    proxy: {
      '/oa/api': {
        target: 'http://127.0.0.1:8500/oa/api',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/oa/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      },
      less: {
        modifyVars: {
          // 可在此处修改 vant 
          'red': '#d7001d', // 红色
          'blue': '#5ca2f8', // 蓝色
          'green': '#009944', // 绿色
          'tabs-default-color': '#5ca2f8', // tab 标签页默认下划线颜色
        }
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/style/var.less')
      ]
    }
  },

  chainWebpack: config => {
     /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins
      .delete('prefetch')
      .delete('preload')
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve
      .symlinks(true)
    // markdown
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end()
    // node
    config.node
      .set('__dirname', true)
      .set('__filename', true)
    // 判断环境加入模拟数据
    const entry = config.entry('app')
    if (process.env.VUE_APP_BUILD_MODE === 'mock') {
      entry
        .add('@/mock')
        .end()
    }
  }
};
