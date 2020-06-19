<template>
  <div class="sino-workflow">
    <!-- 填写意见 -->
    <workflow-idea
      v-if="workitemId && buttons !== ''"
      v-model="idea"
      :error="error"
      :fillmode="workflowInfo.length ? workflowInfo[0].fillmode : ''"
      :buttons="buttons"
    />

    <!-- 按钮 -->
    <workflow-button
      v-model="error"
      :workitemId="workitemId"
      :idea="idea"
      :fillmode="workflowInfo.length ? workflowInfo[0].fillmode : ''"
      :buttons="buttons"
      @submit="handleShowSubmit"
      @save="handleSave"
      @back="handleShowBack"
      @end="handleShowEnd"
    />
    
    <!-- 流程提交页面 -->
    <workflow-submit
      :show="showSubmit"
      :data="dataSubmit"
      :idea="idea"
      @show="handleShowSubmit"
      @finish="handleFinishSubmit"
    />

    <!-- 流程退回页面 -->
    <workflow-back
      :show="showBack"
      :data="dataBack"
      @show="handleShowBack"
      @finish="handleFinishBack"
    />

    <!-- 流程办结页面 -->
    <workflow-end
      :show="showEnd"
      :workitemId="workitemId"
      :idea="idea"
      @show="handleShowEnd"
      @finish="handleFinishEnd"
    />
  </div>
</template>

<script>
import { getWorkflowInfo, getTempIdea, listButton } from '@/api/system'
export default {
  props: {
    // 系统 id
    sysId: {
      type: String,
      default: ''
    },
    // 流程类型 id
    fileTypeId: {
      type: String,
      default: ''
    },
    // 待办 id
    workitemId: {
      type: String,
      default: ''
    },
    // 业务主键 id
    recordId: {
      type: String,
      default: ''
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 部门 id
    deptId: {
      type: String,
      default: ''
    },
    // 用户 id
    userId: {
      type: String,
      default: ''
    },
    // 流程状态
    subflag: {
      type: String,
      default: ''
    },
    // 写死 selectoption
    flag: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      dataSubmit: {}, // 流程提交参数
      dataBack: {}, // 流程退回参数
      workflowInfo: [], // 流程节点意见信息
      buttons: '', // 按钮信息
      showSubmit: false, // 显示提交弹出层
      showBack: false, // 显示退回弹出层
      showEnd: false, // 显示办结弹出层
      idea: '', // 意见信息
      error: false, // 意见填写错误
    }
  },
  components: {
    'sino-title': () => import('@/components/sino-title'),
    'workflow-idea': () => import('./components/workflow-idea'),
    'workflow-button': () => import('./components/workflow-button'),
    'workflow-submit': () => import('./components/workflow-submit'),
    'workflow-back': () => import('./components/workflow-back'),
    'workflow-end': () => import('./components/workflow-end')
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      const { fileTypeId, recordId, sysId, workitemId, title, deptId, userId, subflag, flag } = this
      // 流程提交参数
      this.dataSubmit = {
        filetypeid: fileTypeId,
        workitemid: workitemId,
        title,
        recordid: recordId,
        deptid: deptId,
        userid: userId,
        subflag,
        sysid: sysId,
        flag
      }
      // 流程退回参数
      this.dataBack = {
        fileTypeId,
        recordId,
        sysId,
        workitemId,
      }
      const workflowInfo = await getWorkflowInfo(workitemId)
      if (workflowInfo && workflowInfo.length) {
        // 流程节点意见信息
        this.workflowInfo = workflowInfo
        // 流程退回参数，插入 workflowId
        this.dataBack.workflowId = workflowInfo.length ? workflowInfo[0].workflowid : ''
      }
      const buttons = await listButton(workitemId)
      if (buttons) {
        // 按钮信息
        this.buttons = buttons
      }
      const tempIdea = await getTempIdea({ workitemid: workitemId, type: '' })
      if (tempIdea) {
        // 意见信息
        this.idea = tempIdea.toString()
      }
    },
    // 显示流程提交弹出层
    handleShowSubmit (flag) {
      this.showSubmit = flag
    },
    // 显示流程退回弹出层
    handleShowBack (flag) {
      this.showBack = flag
    },
    // 显示流程办结弹出层
    handleShowEnd (flag) {
      this.showEnd = flag
    },
    // 点击流程提交按钮，回调函数
    handleFinishSubmit (data) {
      this.$emit('submit', data)
    },
    // 点击流程退回按钮，回调函数
    handleFinishBack () {
      this.$emit('back')
    },
    // 点击流程办结按钮，回调函数
    handleFinishEnd (data) {
      this.$emit('end', data)
    },
    // 点击保存按钮
    handleSave () {
      this.$emit('save')
    },
  }
}
</script>

<style lang="less">

</style>
