# SinoFlowLog 流转信息和意见信息

用于展示展示流转信息和意见信息

## 使用指南

```js
export default {
  components: {
    'sino-workflow-log': () => import('@/components/sino-workflow-log')
  }
}
```

## 代码演示

### 基础用法

```html
<sino-workflow-log :recordId="recordId" :fileTypeId="fileTypeId" />
```

```js
export default {
  data () {
    return {
      recordId: '', // 业务表主键 id
      fileTypeId: '', // 流程类型 id
    }
  }
}
```
## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| recordId | 业务表主键 id | `String` | - | - |
| fileTypeId | 流程类型 id | `String` | - | - |
