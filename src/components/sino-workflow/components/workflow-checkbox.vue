<template>
  <!-- 选项列表 -->
  <van-checkbox-group
    :value="value"
    @input="onInput"
  >
    <van-cell-group :border="false">
      <van-cell
        v-for="(item, index) in options"
        :key="index"
      >
        <template slot="icon">
          <van-checkbox
            label-disabled
            shape="square"
            :name="item.value"
          >
            {{item.text}}
          </van-checkbox>
        </template>
      </van-cell>
    </van-cell-group>
  </van-checkbox-group>
</template>

<script>
export default {
  name: 'workflow-checkbox',
  props: {
    // 选中值
    value: {
      type: Array,
      default () {
        return []
      }
    },
    // 选项
    options: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      active: 0
    }
  },
  methods: {
    onInput (val) {
      this.$emit('input', val)
    }
  }
}
</script>
