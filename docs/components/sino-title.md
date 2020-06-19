# SinoTitle 标题栏

## 使用指南

```js
export default {
  components: {
    'sino-title': () => import('@/components/sino-title')
  }
}
```

## 代码演示

### 基础用法

```html
<sino-title :title="title" />
```

```js
export default {
  data () {
    return {
      title: '基础用法'
    }
  }
}
```

### 带图标标题

```html
<sino-title :title="title" :icon-name="iconName" />
```

```js
export default {
  data () {
    return {
      title: '带图标标题',
      iconName: 'arrow
    }
  }
}
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| title | 标题 | `String | Number` | - | - |
| content | 副标题，内容 | `String | Number` | - | - |
| color | 标题颜色 | `String` | `#1989fa` | - |
| icon-name | 图标名称或图片链接 | `String` | - | - |
| icon-info | 图标右上角文字提示 | `String | Number` | - | - |
| icon-color | 图标颜色 | `String` | `inherit` | - |
| icon-size | 图标大小，如 `20px` `2em` | `String` | `inherit` | - |
| icon-classPrefix | 类名前缀 | `String` | `van-icon` | - |

## Events

| 事件 | 说明 | 回调参数 |
|------|------|------|
| click | 点击标题时触发 | - |
| click-icon | 点击图标时触发 | - |

## Slot

| 名称 | 说明 |
|------|------|
| - | 自定义内容 |
