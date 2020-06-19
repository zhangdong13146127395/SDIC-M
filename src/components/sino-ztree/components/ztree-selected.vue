<template>
  <!-- 已选列表 -->
  <van-popup
    class="popup ztree-selected-popup"
    :value="show"
    position="top"
    transition="van-fade"
    :overlay="false"
  >
    <van-cell-group v-show="newValue.length">
      <van-cell
        v-for="(item, index) in newValue"
        :key="index"
        :title="item.name"
        center
      >
        <van-icon slot="right-icon" name="cross" @click="onDelete(item.id)" />
      </van-cell>
    </van-cell-group>
  </van-popup>
</template>

<script>
export default {
  name: 'ztree-selected',

  props: {
    // 已选
    value: {
      type: Array,
      default () {
        return []
      }
    },
    // 选中值的数组
    newValue: {
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
    // 显示隐藏
    show: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onInput (val) {
      this.$emit('input', val)
    },

    // 删除
    onDelete (id) {
      this.value.splice(this.value.findIndex(val => val === id), 1)
      delete this.objValue[id]
      this.$emit('change')
    }
  }
}
</script>

<style lang="less">
.ztree-selected-popup {
  height: calc(100vh - 96px) !important;
  overflow-y: auto;
}
</style>
