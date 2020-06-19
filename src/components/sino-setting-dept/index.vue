<template>
  <!-- 部门切换 -->
  <van-action-sheet
    v-model="show"
    :actions="actions"
    cancel-text="取消"
    @select="onSelect"
  />
</template>

<script>
import { settingDefaultDept } from '@/api/system'
export default {
  name: 'sino-setting-dept',

  props: {
    value: Object,
    actions: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      show: false
    }
  },

  methods: {
    // 异步获取数据
    async getData (deptId) {
      const user = await settingDefaultDept(deptId)
      if (user) {
        this.$emit('input', user)
        this.$emit('select')
      }
    },

    // 确定部门
    onSelect (item) {
      this.show = false
      this.getData(item.id)
      this.$toast.success('操作成功')
    }
  }
}
</script>
