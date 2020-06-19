<template>
  <div class="sino-workflow-cancel" v-if="show">
    <div class="workflow-cancel-btns">
      <van-row gutter="16">
        <van-col span="24">
          <van-button type="info" block @click="onCancel()">撤回</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import { getCancelInfo, postWorkflowCancel } from '@/api/system'

export default {
  name: 'sino-workflow-cancel',
  props: {
    // 已办 id
    alreadyTemId: {
      type: String,
      default: ''
    },
    // 业务表主键 id
    recordId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: false, // 显示隐藏
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      // 如果为 true 则显示撤回按钮
      const cancel = await getCancelInfo(this.alreadyTemId)
      if (cancel === true) {
        this.show = true
      }
    },
    // 点击撤回按钮
    async onCancel () {
      const { alreadyTemId, recordId } = this
      const data = await postWorkflowCancel({ alreadytemid: alreadyTemId, recordid: recordId })
      if (data) {
        this.$toast.success('撤回成功')
      } else {
        this.$toast.fail('撤回失败')
      }
      this.$emit('finish', data)
    }
  }
}
</script>

<style lang="less">
.sino-workflow-cancel {
  .workflow-cancel-btns {
    padding: @spacing-4;
  }
}
</style>