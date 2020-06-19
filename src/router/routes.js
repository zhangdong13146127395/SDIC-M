import layoutBase from '@/layout/layout-base'

import calendar from './modules/calendar'
import demo from './modules/demo'
import questionnaire from './modules/questionnaire'
import meeting from './modules/meeting'
import oversee from './modules/oversee'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutBase,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        // meta: {
        //   auth: true
        // },
        component: _import('system/index')
      },
      // 登录页
      {
        path: 'login',
        name: 'login',
        component: _import('system/login')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  },
  calendar,
  demo,
  questionnaire,
  meeting,
  oversee,
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: _import('system/login')
  // }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]


// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
