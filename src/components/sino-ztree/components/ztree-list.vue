<template>
  <!-- 选项列表 -->
  <van-checkbox-group
    :value="value"
    :max="config.max"
    @input="onInput"
    @change="onChange"
  >
    <van-cell-group v-show="checkOptions.length">
      <van-cell
        v-for="(item, index) in checkOptions"
        :key="index"
        :is-link="item.isParent === 'true' ? true : false"
      >
        <template slot="icon">
          <template v-if="config.type === 'dept' || item.isParent !== 'true'">
            <van-checkbox
              label-disabled
              shape="square"
              :name="item.id"
            />
          </template>
        </template>
        <template slot="title">
          <div class="ztree-list-checkobox-title" @click="onClick(item)">
            {{ fullName ? item.fullName : item.name }}
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </van-checkbox-group>
</template>

<script>
export default {
  name: 'ztree-list',

  props: {
    // 选中值
    value: {
      type: Array,
      default () {
        return []
      }
    },
    // 选中值的对象
    objValue: {
      type: Object,
      default () {
        return {}
      }
    },
    // 选项
    options: {
      type: Array,
      default () {
        return []
      }
    },
    // 设置
    config: Object,
    // 名称加部门
    fullName: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      // 选项
      checkOptions: this.options
    }
  },

  watch: {
    options (val) {
      this.checkOptions = val
    }
  },

  methods: {
    onClick (val) {
      // 存在子节点
      if (val && val.isParent === 'true') {
        this.$emit('click', val)
      }
    },

    onInput (val) {
      this.$emit('input', val)
    },

    onChange (val) {
      // 原已选择值
      const objKeys = []
      for (let key in this.objValue) {
        objKeys.push(key)
      }
      if (val.length > Object.keys(this.objValue).length) {
        // 新增选择值
        const addVals = val.filter(key => !objKeys.includes(key))
        // 新增选择对象
        const addObjs = this.options.filter(item => {
          return addVals.filter(item2 => item.id === item2).length > 0
        })
        // 添加新增结果对象
        addObjs.map(obj => {
          this.objValue[obj.id] = { id: obj.id, name: obj.name, parentId: obj.parentId }
        })
      } else {
        // 取消选择值
        const delVals = objKeys.filter(key => !val.includes(key))
        for (let key in this.objValue) {
          delVals.map(del => {
            if (key === del) {
              delete this.objValue[key]
            }
          })
        }
      }
      this.$emit('change')
    }
  }
}
</script>

<style lang="less">
.ztree-list-checkobox-title {
  margin-left: @spacing-2;
}
</style>
