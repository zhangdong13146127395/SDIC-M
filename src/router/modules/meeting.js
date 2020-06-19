import layoutBase from '@/layout/layout-base'

const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: false }

export default {
    path: '/meeting',
    name: 'meeting',
    meta,
    redirect: { name: 'meeting-index' },
    component: layoutBase,
    children: (pre => [
        //会议首页
        {
            path: 'index',
            name: `${pre}index`,
            component: _import('meeting/index'),
            meta: {
                ...meta,
                title: '会议活动管理'
            },
        },
        //新建会议选择类型
        {
            path: 'select',
            name: `${pre}select`,
            component: _import('meeting/select/'),
            meta: {
                ...meta,
                title: '新建会议活动'
            },
        },
        //我申请的会议
        {
            path: 'meeting-list/apply',
            name: `${pre}list-apply`,
            component: _import('meeting/meeting-list/apply'),
            meta: {
                ...meta,
                title: '我申请的会议'
            },
        },
        //我审批的会议
        {
            path: 'meeting-list/approval',
            name: `${pre}list-approval`,
            component: _import('meeting/meeting-list/approval'),
            meta: {
                ...meta,
                title: '我审批的会议'
            },
        },
        //内部会议表单页
        {
            path: 'internal/index',
            name: `${pre}internal-index`,
            component: _import('meeting/internal/index'),
            meta: {
                ...meta,
                title: '会议通知单'
            },
        },
        //外部会议标单页
        {
            path: 'external/index',
            name: `${pre}external-index`,
            component: _import('meeting/external/index'),
            meta: {
                ...meta,
                title: '会议通知单'
            },
        },
        //外部人员选择页
        {
            path: 'people/index',
            name: `${pre}people-index`,
            component: _import('meeting/people/index'),
            meta: {
                ...meta,
                title: '公司外参会人员'
            },
        },
        //服务选择页
        {
            path: 'service/index',
            name: `${pre}service-index`,
            component: _import('meeting/service/index'),
            meta: {
                ...meta,
                title: '会议设备与服务'
            },
        },
        //车位预定页面
        {
            path: 'service/car',
            name: `${pre}service-car`,
            component: _import('meeting/service/car'),
            meta: {
                ...meta,
                title: '预定车位'
            },
        },
        //会议室选择页面
        {
            path: 'room/index',
            name: `${pre}room-index`,
            component: _import('meeting/room/index'),
            meta: {
                ...meta,
                title: '内部会议活动管理'
            },
        },
        {
            path: 'examine-approve',
            name: `${pre}examine-approve`,
            component: _import('meeting/examine-approve'),
            meta: {
                ...meta,
                title: '审批的会务'
            },
        },
        {
            path: 'initiate',
            name: `${pre}initiate`,
            component: _import('meeting/initiate'),
            meta: {
                ...meta,
                title: '发起的会务'
            },
        },
        {
            path: 'execute',
            name: `${pre}execute`,
            component: _import('meeting/execute'),
            meta: {
                ...meta,
                title: '执行的会务'
            },
        },
        {
            path: 'job-contact-list',
            name: `${pre}job-contact-list`,
            component: _import('meeting/job-contact-list'),
            meta: {
                ...meta,
                title: '工作联系单'
            },
        },
        {
            path: 'job-contact-list-readonly',
            name: `${pre}job-contact-list-readonly`,
            component: _import('meeting/job-contact-list-readonly'),
            meta: {
                ...meta,
                title: '工作联系单'
            },
        },

    ])('meeting-')
}