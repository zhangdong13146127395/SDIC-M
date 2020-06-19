# SinoZtree 选人选部门树

选择人员或部门

## 使用指南

```js
export default {
  components: {
    'sino-ztree': () => import('@/components/sino-ztree')
  }
}
```

## 代码演示

### 基础用法

```html
<sino-ztree
  ref="sinoZtree"
  v-model="ztree.value"
  :config="ztree.config"
  @confirm="onConfirm"
  @cancel="onCancel"
/>
```

```js
export default {
  data () {
    return {
      ztree: {
        value: [],
        config: {
          type: 'dept',
          rootId: '162812',
          max: 1
        }
      }
    }
  },
  methods: {
    onConfirm (val) {
      console.log(this.ztree.value, val)
    },
    onCancel () {
      console.log('cancel')
    }
  }
}
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| v-model | 选中项的标识符 | `Array<{id, name}> | Array<String>` | `[]` | - |
| config | 设置参数 | `Object` | - | - |

## config 设置参数

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| type | 类型，可选值 `dept`, `user` | `String` | - | - |
| rootId | 顶级公司/部门 id | `String | Number` | `162812` | - |
| max | 最大可选数量，最大值 `500` | `Number` | `500` | - |

## Events

| 事件 | 说明 | 回调参数 |
|------|------|------|
| confirm | 点击确认按钮时触发 | val |
| cancel | 点击取消按钮时触发 | - |

## 方法

通过 ref 可以获取到 sino-ztree 实例并调用实例方法

| 方法名 | 参数 | 返回值 | 介绍 |
|------|------|------|------|
| show | - | - | 显示隐藏 |