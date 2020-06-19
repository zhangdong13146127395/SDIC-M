<template>
  <!-- 选项列表 -->
  <van-radio-group
    class="workflow-radio"
    :value="value"
    @input="onInput"
  >
    <van-cell-group :border="border">
      <van-cell
        v-for="(item, index) in options"
        :key="index"
      >
        <template slot="icon">
          <van-radio class="radio" :name="item.value || item.wfleveId || index.toString()">
            {{ item.text || item.wfleveName || item.userNm + '/' + item.deptname }}
          </van-radio>
        </template>
      </van-cell>
    </van-cell-group>
  </van-radio-group>
</template>

<script>
export default {
  name: 'workflow-radio',
  props: {
    // 选中值
    value: {
      type: String
    },
    // 选项
    options: {
      type: Array,
      default () {
        return []
      }
    },
    // 边框
    border: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less">
.workflow-radio {
  .radio {
    width: 100%;
  }
}
</style>