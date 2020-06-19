# SinoButtonGroup 底部按钮组

底部悬浮按钮组

## 使用指南

```js
export default {
  components: {
    'sino-button-group': () => import('@/components/sino-button-group')
  }
}
```

## 代码演示

### 基础用法

```html
  <sino-button-group :btns="btns" />
```

```js
export default {
  data () {
    return {
      btns: [
        {
          icon: 'plus',
          text: '按钮标题',
          type: 'info',
          handler: this.handleOne,
          params: '1'
        },
        {
          text: '第二个选项',
          handler: this.handleTwo,
          params: {}
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
| btns | 操作单元格组 | `Array<{icon, text, type, handler, params}>` | `[]` | - |

## btns 参数

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| icon | 按钮图标 | `String` | - | - |
| text | 按钮标题 | `String` | - | - |
| type | 按钮类型，可选值为 `primary` `info` `warning` `dange` | `String` | `default` | - |
| show | 按钮显示隐藏，不填则显示 | `Boolean` | - | - |
| handler | 点击事件 | `Function` | - | - |
| params | 事件参数 | `Any` | - | - |