# SinoDialogCell 弹出单元格

`SinoDialogCell` 组件是对 `Dialog` 和 `Cell` 组件的封装

## 使用指南

```js
export default {
  components: {
    'sino-dialog-cell': () => import('@/components/sino-dialog-cell')
  }
}
```

## 代码演示

### 基础用法

```html
  <sino-dialog-cell v-model="show" :title="title" :btns="btns" />
```

```js
export default {
  data () {
    return {
      show: false,
      title: '基础用法',
      btns: [
        {
          text: '第一个选项',
          handler: this.handleOne,
          params: '1'
        },
        {
          text: '第二个选项',
          handler: this.handleTwo,
          params: {}
        },
        {
          text: '取消'
        }
      ]
    }
  },
  methods: {
    handleOne () {

    },
    handleTwo () {
      
    }
  }
}
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| v-model | 是否显示弹窗 | `Boolean` | `false` | - |
| title | 标题 | `String` | - | - |
| cells | 操作单元格组 | `Array<{text, handler, params}>` | `[]` | - |

## cells 参数

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| text | 单元格内容 | `String` | - | - |
| handler | 点击事件 | `Function` | - | - |
| params | 参数 | `Any` | - | - |
