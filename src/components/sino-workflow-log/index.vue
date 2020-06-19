<template>
  <div class="sino-workflow-log" ref="workflowLog">
    <van-steps class="steps" direction="vertical" :active="-1">
      <van-step v-for="(item, index) in steps" :key="index">
        <p class="info state">{{ index + 1 }}.{{ item.wflevename || '起草' }}</p>
        <p class="info node">{{ item.receivename.split('/')[1] + '/' + item.receivename.split('/')[2] }}</p>
        <div class="content">
          <p class="info time">接收时间：{{ item.sendtime }}</p>
          <p class="info time">发送时间：{{ item.signtime }}</p>
          <p class="info user">经办人：{{ item.receivename.split('/')[0] }}</p>
          <p class="info idea" v-if="item.idea">意见：{{ item.idea }}</p>
        </div>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
import { listWorkflowLog } from '@/api/system'

export default {
  name: 'sino-workflow-log',
  props: {
    // 业务表主键 id
    recordId: {
      type: String,
      required: true
    },
    // 流程类型 id
    fileTypeId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      steps: [], // 流转信息
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      const { recordId, fileTypeId } = this
      const data = await listWorkflowLog({ recordId, fileTypeId })
      if (data && data.length) {
        this.steps = data
      }
      this.scrollToBottom()
    },
    // 滚动到底部
    scrollToBottom () {
      this.$nextTick(() => {
        const scrollHeight = this.$refs.workflowLog.scrollHeight
        document.documentElement.scrollTop = scrollHeight
      })
    }
  }
}
</script>

<style lang="less">
.sino-workflow-log {
  padding: 0 @spacing-4 @spacing-4;
  .steps {
    border-radius: 4px;
  }
  .van-step__circle {
    width: 10px;
    height: 10px;
  }
  .van-step__circle, .van-step__line {
    background-color: @blue;
  }
  .content {
    margin: @spacing-1 0;
    padding: @spacing-1 @spacing-2;
    border: 1px solid @border-color;
    border-radius: 4px;
  }
  .info {
    margin: 0;
    font-size: @font-size-sm;
    line-height: @line-height-zh;
  }
  .node, .user, .idea, .time {
    color: @text-color;
  }
  .node {
    font-weight: 700;
  }
  .state {
    font-weight: 700;
    color: @blue;
  }
}
</style>