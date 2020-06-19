# SinoWorkflow 流程撤回

流程中是否显示撤回按钮

## 使用指南

```js
export default {
  components: {
    'sino-workflow-cancel': () => import('@/components/sino-workflow-cancel')
  }
}
```

## 代码演示

### 基础用法

```html
<sino-workflow-cancel :recordId="recordId" :alreadyTemId="alreadyTemId" />
```

```js
export default {
  data () {
    return {
      
    }
  },
  methods: {
   
  }
}
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| recordId | 业务表主键 id | `String` | - | - |
| alreadyTemId | 已办 id | `String` | - | - |

## Events

| 事件 | 说明 | 回调参数 |
|------|------|------|
| finish | 点击撤回按钮时触发 | data |