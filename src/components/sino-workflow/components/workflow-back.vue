<template>
  <van-popup
    class="workflow-back"
    v-model="show"
    :overlay="false"
  >
    <template v-if="!finish">
      <div class="content">
        <!-- 退回意见 -->
        <template v-if="!isLoading && !status">
          <workflow-idea
            v-model="idea"
            :error="error"
            :title="statusText[status]"
            :rows="6"
            backgroundColor="#f8f8f8"
          />
        </template>

        <!-- 标题 -->
        <sino-title v-if="status" :title="isLoading ? '加载中...' : statusText[status]" />

        <!-- 选择节点 -->
        <template v-if="!isLoading && status">
          <workflow-radio
            v-model="selectedRadio"
            :options="info"
            border
          />
        </template>
      </div>

      <!-- 底部操作按钮 -->
      <!-- <van-goods-action class="sino-goods-action">
        <van-goods-action-button class="sino-goods-action-button" hairline square text="取消" @click="onCancel" />
        <van-goods-action-button class="sino-goods-action-button" hairline square text="确定" @click="onConfirm" />
      </van-goods-action> -->
      <sino-button-group :btns="btns1" />
    </template>
    
    <!-- 提交结果 -->
    <template v-else>
      <div class="result">
        <van-icon name="checked" size="2rem" color="#009944" />
        <div class="success">退回节点成功</div>
      </div>
      <!-- 底部操作按钮 -->
      <!-- <van-goods-action class="sino-goods-action">
        <van-goods-action-button class="sino-goods-action-button" hairline square text="关闭" @click="onClose" />
      </van-goods-action> -->
      <sino-button-group :btns="btns2" />
    </template>
  </van-popup>
</template>

<script>
import { listWorkflowNode, listWorkflowNodeUser, postWorkflowBack } from '@/api/system'

const statusText = [
  '请输入退回意见',
  '请选择退回节点',
  '请选择办理人员'
]

export default {
  components: {
    'sino-title': () => import('@/components/sino-title'),
    'workflow-radio': () => import('./workflow-radio'),
    'workflow-idea': () => import('./workflow-idea'),
    'sino-button-group': () => import('@/components/sino-button-group')
  },
  props: {
    // 是否显示
    show: {
      type: Boolean,
      default: false,
    },
    /**
     * 流程退回参数
     * 
     * workitemId - 待办 id
     * workflowId - 流程 id
     * fileTypeId - 流程类型 id
     * recordId - 业务主键 id
     * sysId - 系统 id
     */
    data: Object
  },
  data () {
    return {
      finish: false,
      isLoading: false, // 加载中
      status: 0, // 退回选择状态 0: 输入意见 1: 选择节点 2: 选择人员
      statusText,
      info: [], // 退回节点人员等信息
      selectedRadio: '', // 已选信息
      wfleveid: '', // 流程节点 id
      idea: '', // 退回意见
      error: false, // 意见是否错误
      // 按钮组
      btns1: [
        {
          text: '取消',
          handler: this.onCancel
        },
        {
          text: '确定',
          type: 'info',
          handler: this.onConfirm
        }
      ],
      btns2: [
        {
          text: '关闭',
          handler: this.onClose
        }
      ]
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.status = 0
      }
    }
  },
  methods: {
    async getNodes () {
      this.isLoading = true
      const data = await listWorkflowNode(this.data)
      if (data && data.length) {
        const info = []
        for (let i = 0; i < data.length; i++) {
          // status 1: 已办理	2: 办理中	3: 未办理  wfleveType 1: 起草
          if (data[i].status === '1' || data[i].wfleveType === '1') {
            info.push(data[i])
          }
        }
        this.info = info
      }
      this.isLoading = false
    },
    // 获取节点用户信息
    async getUsers () {
      const { workitemId, recordId } = this.data
      this.isLoading = true
      const data = await listWorkflowNodeUser({
        workitemId,
        recordId,
        wfleveId: this.selectedRadio
      })
      if (data && data.length) {
        this.info = data
        this.selectedRadio = ''
      }
      this.isLoading = false
    },
    // 退回流程节点
    async getWorkflowBack () {
      const { wfleveid, selectedRadio, info, idea } = this
      const { workitemId, recordId, } = this.data
      const data = await postWorkflowBack({
        workitemid: workitemId,
        recordid: recordId,
        wfleveid,
        userid: info[selectedRadio].userid,
        userName: info[selectedRadio].userNm,
        deptid: info[selectedRadio].deptId,
        deptName: info[selectedRadio].deptname,
        idea
      })
      if (data) {
        this.finish = true
      }
    },
    // 取消
    onCancel () {
      this.selectedRadio = ''
      this.$emit('show', false)
    },
    // 关闭
    onClose () {
      this.$emit('finish')
      this.$emit('show', false)
    },
    // 确定
    onConfirm () {
      const { status, selectedRadio, idea } = this
      switch (status) {
        // 输入退回意见
        case 0:
          if (idea === '') {
            this.error = true
            this.$toast.fail('请填写意见')
          } else {
            this.error = false
            this.status = status + 1
            this.getNodes()
          }
          break
        // 选择节点
        case 1:
          if (selectedRadio === '') {
            this.$toast.fail('请选择节点')
          } else {
            this.info = []
            this.wfleveid = selectedRadio
            this.status = status + 1
            this.getUsers()
          }
          break
        // 执行退回
        case 2:
          if (selectedRadio === '') {
            this.$toast.fail('请选择人员')
          } else {
            this.getWorkflowBack()
          }
          break
      }
    }
  }
}
</script>

<style lang="less">
.workflow-back {
  width: 100%;
  height: 100vh;
  transition: 0s;
  .content {
    height: calc(100vh - 50px);
    overflow: auto;
  }
  .result {
    padding-top: 20vh;
    height: calc(80vh - 50px);
    overflow: auto;
    text-align: center;
    .success {
      padding: 0 @spacing-4;
      color: @text-color;
      font-size: @font-size-xl;
      font-weight: 700;
    }
    .remark {
      padding: @spacing-2 @spacing-4;
      color: @gray-darker;
      font-size: @font-size-sm;
      line-height: @line-height-zh;
    }
  }
}
</style>