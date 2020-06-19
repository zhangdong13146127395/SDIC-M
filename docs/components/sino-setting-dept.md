# SinoSettingDept 标题栏

## 使用指南

```js
export default {
  components: { 
    'sino-setting-dept': () => import('@/components/sino-setting-dept')
  }
}
```

## 代码演示

### 基础用法

```html
<sino-setting-dept v-model="user" :actions="actions" @select="onSelect" />
```

```js
export default {
  data () {
    return {
      user: {
        ...
      },
      actions: [] // 请查看 vant ActionSheet 上拉菜单组件中的 actions 属性说明
    }
  },

  methods: {
    onSelect () {
      // 选择成功回调操作
    }
  }
}
```
## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| v-model | 用户信息 | `Object` | - | - |
| actions | 菜单选项 | `Action[]` | [] | - |

## Events

| 事件 | 说明 | 回调参数 |
|------|------|------|
| select | 选择成功回调方法 | - |

## 方法

通过 ref 可以获取到 sino-setting-dept 实例并调用实例方法

| 方法名 | 参数 | 返回值 | 介绍 |
|------|------|------|------|
| show | - | - | 显示隐藏 |
