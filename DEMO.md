# Demo

## 创建页面

在 `/src/views` 目录下新建模块，目录名称为：`demo`，然后在目录下新建 `index.vue` 页面

`index.vue` 页面代码如下：

```js
<template>
  <!-- 为了该模块的私有样式不影响其他模块，在页面最外层写一个 class -->
  <!-- 格式为：模块名称 + 页面名称，即：demo + index -->
  <div class="demo-index">
    ...
  </div>
</template>

<script>
export default {
  // 为了 vue 页面名称唯一不冲突，名称格式为：模块名称 + 页面名称，即 demo + index
  name: 'demo-index',
}
</script>

<!-- style 使用 less，但不使用 scoped，为了方便覆盖 vant 的默认样式 -->
<style lang="less">
.demo-index {
  /* 为了该模块的私有样式以及修改 vant 默认样式不影响其他模块，要将 css 代码全部写在最外层 class 内 */
}
</style>
```

## 创建路由

在 `/src/router/modules` 目录下新建文件，文件名称为： `demo.js`

再在 `/src/router/routes.js` 总路由文件中引入 `/src/router/modules/demo.js`

`demo.js` 文件代码如下：

```js
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
```

`routes.js` 文件修改代码如下：

```js
// 顶部引入 demo.js 文件
import demo from './modules/demo'

const frameIn = [
  // ... 其他代码
  
  // 添加 demo 路由
  demo,
]
```

## 创建接口

在 `/src/api` 目录下新建模块，目录名称为：`demo`，然后在目录下新建 `index.js` 文件

`index.js` 文件代码如下：

```js
// 用于处理参数
import { stringify } from 'qs'
// 封装好的 axios，无需修改
import request from '@/plugin/axios'

// 获取列表数据
export function list (params) {
  return request({
    url: `/demo/list?${stringify(params)}`,
    method: 'get'
  })
}
```

## 使用组件、调用接口

```html
<!-- vant 组件 -->
<van-button type="default">vant 按钮</van-button>

<!-- 公共组件：数据列表  -->
<sino-list
  ref="sinoList"
  v-model="list.data"
  :page-size="list.pageSize"
  :load="list"
>
  ...
</sino-list>
```

```js
import { list } from '@/api/demo/index'

export default {
  // 引用公共组件
  components: {
    'sino-list': () => import('@/components/sino-list'),
  },

  data () {
    return {
      list: {
        data: [], // 列表数据
        pageSize: 15, // 每页条数
      }
    }
  }
}
```

## 页面间跳转

```js
export default {
  methods: {
    onClick () {
      // vue-router
      this.$router.push({ path: '...' })
    }
  }
}
```