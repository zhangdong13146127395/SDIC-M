# SinoWorkflow 流程相关

填写意见，提交流程，或保存、退回、办结

## 使用指南

```js
export default {
  components: {
    'sino-workflow': () => import('@/components/sino-workflow')
  }
}
```

## 代码演示

### 基础用法

```html
<sino-workflow
  :fileTypeId='fileTypeId'
  :workitemId='workitemId'
  :recordId='recordId'
  :title='title'
  :deptId='deptId'
  :userId='userId'
  :subflag='subflag'
  :sysId='sysId'
  :flag='flag'
/>
```

```js
export default {
  data () {
    return {
      fileTypeId: '09b49ae391ee4744b81b1254b114944c',
      workitemId: '405acd9fc992433ea8d3ea9c41d4e75d',
      recordId: '0354dc8f3bbe11317a6afbb2a3173495',
      title: '蒋蕊-住房申请',
      deptId: '164405',
      userId: '165691',
      subflag: '01',
      sysId: '97465',
      flag: 'selectoption'
    }
  },
  methods: {
    handleFinish (data) {
      console.log(data)
    }
  }
}
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| fileTypeId | 流程类型 id | `String` | - | - |
| workitemId | 待办 id | `String` | - | - |
| title | 标题 | `String` | - | - |
| recordId | 主键 id（不能超过32位） | `String` | - | - |
| deptId | 部门 id | `String` | - | - |
| userId | 用户 id | `String` | - | - |
| subflag | 流程状态，办结是另一个方法 | `String` | - | - |
| sysId | 组织体系 id | `String` | - | - |
| flag | 状态标识 | `String` | - | - |

## Events

| 事件 | 说明 | 回调参数 |
|------|------|------|
| submit | 点击流程提交按钮时触发 | data |
| back | 点击退回按钮时触发 | - |
| end | 点击办结按钮时触发 | data |
| save | 点击保存按钮时触发 | - |