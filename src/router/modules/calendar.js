import layoutBase from '@/layout/layout-base'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: false }

export default {
    path: '/calendar',
    name: 'calendar',
    meta,
    redirect: { name: 'calendar-index' },
    component: layoutBase,
    children: (pre => [
      { path: 'index', name: `${pre}index`, component: _import('calendar/index'), meta: { ...meta, title: '领导日程' } },
      { path: 'edit', name: `${pre}edit`, component: _import('calendar/edit'), meta: { ...meta, title: '编辑日程' } },
    ])('calendar-')
  }