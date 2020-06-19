# SinoList 列表

下拉刷新，瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项。

## 使用指南

```js
export default {
  components: { 
    'sino-list': () => import('@/components/sino-list')
   }
}
```

## 代码演示

### 基础用法

```html
<sino-list
  ref="sinoList"
  v-model="list.data"
  :page-size="list.pageSize"
  :load="onLoad"
>
  <van-cell
    v-for="item in list.data"
    :key="item"
    :title="item"
  />
</sino-list>
```

```js
export default {
  data () {
    return {
      list: {
        data: [],
        pageSize: 20
      }
    }
  },
  methods: {
    onLoad (page) {
      const data = []

      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          data.push(data.length + 1)
        }
      }, 500)

      return data
    }
  }
}
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| v-model | 列表数据 | `Array` | `[]` | - |
| head-height | 顶部内容高度，请使用 `rem` | `Number` | `50` | - |
| page-size | 每页条数 | `Number` | `20` | - |
| margin-top | 顶部距离，请使用 `rem` | `String` | - | - |
| min-height | 最小高度，请使用 `rem` | `String` | `100vh` | - |
| placeholder-height | 占位栏高度，请使用 `rem` | `String` | - | - |
| load | 返回列表数据方法，参数为 `page` 对象，包含属性 `pageNum`, `pageSize`, `pageTotal` | `Function` | - | - |

## 方法

通过 ref 可以获取到 sino-list 实例并调用实例方法

| 方法名 | 参数 | 返回值 | 介绍 |
|------|------|------|------|
| onRefresh | - | - | 触发下拉刷新 |

## Slot

| 名称 | 说明 |
|------|------|
| - | 自定义内容 |