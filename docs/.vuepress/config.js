module.exports = {
  title: '国投 OA 移动端',
  description: '开发说明文档',
  head: [
    ['link', { rel: 'icon', href: `/hero.png` }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/hero.png` }],
    ['meta', { name: 'msapplication-TileImage', content: '/hero.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  serviceWorker: true,
  themeConfig: {
    nav: [
      {
        text: '指南',
        link: '/guide/',
      },
      {
        text: '组件',
        link: '/components/',
      },
      {
        text: '基础知识',
        link: '/knowledge/'
      },
      {
        text: '更新日志',
        link: '/changelog/'
      }
    ],
    sidebar: {
      '/guide/': guideSidebarConfig('指南'),
      '/components/': componentsSidebarConfig('组件'),
      '/knowledge/': knowledgeSidebarConfig('基础知识'),
      '/changelog/': changelogSidebarConfig('更新日志')
    }
  }
}

// 指南
function guideSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'quick-start',
        'style',
        'theme',
        'contribution',
        'style-guide'
      ]
    }
  ]
}

// 组件
function componentsSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'sino-button-group',
        'sino-dialog-cell',
        'sino-list',
        'sino-setting-dept',
        'sino-swipe-cell',
        'sino-title',
        'sino-workflow-cancel',
        'sino-workflow-log',
        'sino-workflow',
        'sino-ztree',
      ]
    }
  ]
}

// 相关知识
function knowledgeSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'javascript'
      ]
    }
  ]
}

// 更新日志
function changelogSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        ''
      ]
    }
  ]
}
