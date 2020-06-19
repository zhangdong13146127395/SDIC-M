import layoutBase from '@/layout/layout-base'

const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: false }

export default {
    path: '/oversee',
    name: 'oversee',
    meta,
    redirect: { name: 'oversee-index' },
    component: layoutBase,
    children: (pre => [
        {
            path: 'index',
            name: `${pre}index`,
            component: _import('oversee/index'),
            meta: {
                ...meta,
                title: '督办管理'
            },
        },
        {
            path: 'done',
            name: `${pre}done`,
            component: _import('oversee/done'),
            meta: {
                ...meta,
                title: '督办管理'
            },
        },
        {
            path: 'mine',
            name: `${pre}mine`,
            component: _import('oversee/mine'),
            meta: {
                ...meta,
                title: '督办管理'
            },
        },
        {
            path: 'stats',
            name: `${pre}stats`,
            component: _import('oversee/stats'),
            meta: {
                ...meta,
                title: '督办管理'
            },
        },
        {
            path: 'stats2',
            name: `${pre}stats2`,
            component: _import('oversee/stats2'),
            meta: {
                ...meta,
                title: '督办管理'
            },
        },
        {
            path: 'search',
            name: `${pre}search`,
            component: _import('oversee/search'),
            meta: {
                ...meta,
                title: '督办搜索'
            },
        },
        {
            path: 'establish',
            name: `${pre}establish`,
            component: _import('oversee/establish'),
            meta: {
                ...meta,
                title: '督办管理'
            },
        },
        {
            path: 'build-project',
            name: `${pre}build-project`,
            component: _import('oversee/build-project'),
            meta: {
                ...meta,
                title: '督办审批'
            },
        },
        {
            path: 'formulate-plan',
            name: `${pre}formulate-plan`,
            component: _import('oversee/formulate-plan'),
            meta: {
                ...meta,
                title: '督办审批'
            },
        },
        {
            path: 'event-feedback',
            name: `${pre}event-feedback`,
            component: _import('oversee/event-feedback'),
            meta: {
                ...meta,
                title: '督办审批'
            },
        },
        {
            path: 'event-feedback2',
            name: `${pre}event-feedback2`,
            component: _import('oversee/event-feedback2'),
            meta: {
                ...meta,
                title: '督办审批'
            },
        },
        {
            path: 'opinion',
            name: `${pre}opinion`,
            component: _import('oversee/opinion'),
            meta: {
                ...meta,
                title: '流转意见'
            },
        }
    ])('oversee-')
}