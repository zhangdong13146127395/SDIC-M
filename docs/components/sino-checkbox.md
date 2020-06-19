# checkbox

重写vant checkbox样式，使用方法与原方法相同

## 使用指南

```js
export default {
  components: { 
    'sinoCheckbox': () => import('@/components/sino-checkbox'),
   }
}
```

## 代码演示

### 基础用法

```html
<van-checkbox-group v-model="filtrate.state">
  <sino-checkbox 
    :name="`${item.value}`" 
    v-for="(item, index) in filtrate.stateData" 
    :key="index">{{item.name}}
  </sino-checkbox>
</van-checkbox-group>
```

```js
export default {
  data () {
    return {
      filtrate:{
          //已选择项目
          state:[],
          //选项
          stateData:[
            {
              value:1,
              name:'全部'
            },
            {
              value:2,
              name:'已预订'
            },
            {
              value:3,
              name:'空闲'
            }     
          ],
        },
    }
  },
  methods: {
    
  }
}
```
| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| name | 标识符 | `any` | `-` | - |
| v-model | 是否为选中状态 | `boolean` | `false` | - |
| disabled | 是否禁用复选框 | `boolean` | `false` | - |

