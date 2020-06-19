import layoutBase from '@/layout/layout-base'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { cache: false, auth: false }

export default {
  path: '/questionnaire',
  name: 'questionnaire',
  meta,
  redirect: { name: 'questionnaire-index' },
  component: layoutBase,
  children: (pre => [
    { path: 'index', name: `${pre}index`, component: _import('questionnaire/index'), meta: { ...meta, title: '问卷调查' } },
    { path: 'question/index', name: `${pre}question-index`, component: _import('questionnaire/question/index'), meta: { ...meta, title: '问卷列表' } },
    { path: 'question/setting', name: `${pre}question-setting`, component: _import('questionnaire/question/setting'), meta: { ...meta, title: '回收设置' } },
    { path: 'question/release', name: `${pre}question-release`, component: _import('questionnaire/question/release'), meta: { ...meta, title: '发布问卷' } },
    { path: 'question/preview', name: `${pre}question-preview`, component: _import('questionnaire/question/preview'), meta: { ...meta, title: '预览问卷' } },
    { path: 'question/answer', name: `${pre}question-answer`, component: _import('questionnaire/question/answer'), meta: { ...meta,  title: '回答问卷' } },
    { path: 'question/readonly', name: `${pre}question-readonly`, component: _import('questionnaire/question/readonly'), meta: { ...meta,  title: '查看答题结果' } },
    { path: 'question/check', name: `${pre}question-check`, component: _import('questionnaire/question/check'), meta: { ...meta, title: '查看数据' } },
    { path: 'question/count', name: `${pre}question-count`, component: _import('questionnaire/question/count'), meta: { ...meta, title: '统计结果' } },
    { path: 'answer/index', name: `${pre}answer-index`, component: _import('questionnaire/answer/index'), meta: { ...meta, title: '问卷列表' } },
    { path: 'work/index', name: `${pre}work-index`, component: _import('questionnaire/work/index'), meta: { ...meta, title: '考核工作列表' } },
    // { path: 'work/task', name: `${pre}work-task`, component: _import('questionnaire/work/task'), meta: { ...meta, title: '考核任务列表' } },
    { path: 'work/info', name: `${pre}work-info`, component: _import('questionnaire/work/info'), meta: { ...meta, title: '考核任务详情' } },
    { path: 'work/add', name: `${pre}work-add`, component: _import('questionnaire/work/add'), meta: { ...meta, title: '添加问卷' } },
  ])('questionnaire-')
}
