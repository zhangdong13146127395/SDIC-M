// 引入布局组件
import layoutBase from '@/layout/layout-base'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

// 暂无用处
const meta = { auth: false }

export default {
    path: '/demo', // 模块路径地址
    name: 'demo', // 模块名称
    meta, // 暂无用处
    redirect: { name: 'demo-index' }, // 默认跳转的模块首页名称
    component: layoutBase, // 该模块使用布局组件
    children: (pre => [
      {
        path: 'index', // 该页面地址
        name: `${pre}index`, // 该页面名称 demo-index，对应上方的 redirect 的 name
        component: _import('demo/index'), // 该页面对应的组件，第一步中在 views 中创建的 index.vue 页面
        meta: {
          ...meta, // 暂无用处
          title: 'Demo' // 页面标题
        },
      },
    ])('demo-') // 此值为上方的 pre
  }