<template>
  <div class="workflow-end">
    <van-dialog
      :value="show"
      title="提示"
      message="是否确认办结？"
      show-cancel-button
      @input="handleInput"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script>
import { postWorkflowKill } from '@/api/system'

export default {
  name: 'workflow-end',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    workitemId: {
      type: String,
      default: ''
    },
    idea: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput (val) {
      this.$emit('show', val)
    },
    async handleConfirm () {
      const { workitemId, idea } = this
      const data = await postWorkflowKill({ workitemId, idea })
      if (data.message === 'ok') {
        this.$toast.success('办结成功')
      } else {
        this.$toast.fail('办结失败')
      }
      this.$emit('finish', {
        flag: data.flag,
        message: data.message
      })
    }
  }
}
</script>

<style lang="less">

</style>