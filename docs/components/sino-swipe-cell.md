# SinoSwipeCell 滑动单元格

用于滑动单元格操作，例如编辑或删除某条数据时使用

## 使用指南

```js
export default {
  components: {
    'sino-swipe-cell': () => import('@/components/sino-swipe-cell')
  }
}
```

## 代码演示

### 基础用法

```html
<sino-swipe-cell
  :btns="swipeCellBtns"
  :params="{ id: item.id, index }"
>
  ...
</sino-swipe-cell>
```

```js
export default {
  data () {
    return {
      swipeCellBtns: [
        {
          text: '编辑',
          type: 'info',
          handler: this.onEditSwipe,
        },
        {
          text: '删除',
          type: 'danger',
          handler: this.onDeleteSwipe,
        }
      ]
    }
  },
  methods: {
    onEditSwipe (index) {

    },
    onDeleteSwipe (id) {

    }
  }
}
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| params | 事件参数 | `Any` | - | - |
| btns | 滑动按钮组 | `Array<{text, handler, params}>` | `[]` | - |

## btns 参数

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| text | 滑动按钮标题 | `String` | - | - |
| type | 按钮类型，可选值为 `primary` `info` `warning` `dange` | `String` | `default` | - |
| handler | 点击事件 | `Function` | - | - |

## Slot

| 名称 | 说明 |
|------|------|
| - | 自定义内容 |