<template>
  <!-- 意见 -->
  <div class="workflow-button">
    <!-- 按钮组 --> 
    <div class="workflow-button-btns" v-if="showButtons.length">
      <van-row gutter="16">
        <van-col :span="24/showButtons.length" v-for="(button, index) in showButtons" :key="index">
          <van-button :type="button.type" block @click="handleTransfer(button.handle)">{{ button.title }}</van-button>
        </van-col>
      </van-row>
    </div>

    <div class="workflow-button-btns" v-if="workitemId === ''">
      <van-row>
        <van-col span="24">
          <van-button type="info" block @click="handleTransfer('submit')">提交</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
// 按钮信息
const btns = {
  '08': {
    title: '退回',
    type: 'danger',
    handle: 'back'
  },
  '09': {
    title: '保存',
    type: 'info',
    handle: 'save'
  },
  '66': {
    title: '提交',
    type: 'info',
    handle: 'submit'
  },
  '67': {
    title: '办结',
    type: 'info',
    handle: 'end'
  }
}

export default {
  name: 'workflow-button',
  props: {
    // 意见填写错误
    value: {
      type: Boolean,
      default: false
    },
    // 待办 ID
    workitemId: {
      type: String,
      default: ''
    },
    // 意见信息
    idea: {
      type: String,
      default: ''
    },
    // 意见是否必填
    fillmode: {
      type: String,
      default: ''
    },
    // 按钮信息
    buttons: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // 页面显示的按钮组
      showButtons: []
    }
  },
  watch: {
    // 传入按钮信息值时，遍历按钮信息
    buttons: {
      handler (val) {
        if (val) {
          const vals = val.split(',')
          for (var i = 0; i < vals.length; i++) {
            if (btns[vals[i]]) {
              this.showButtons.push(btns[vals[i]])
            }
          }
        }
      }
    }
  },
  methods: {
    // 按钮中转
    handleTransfer (fn) {
      switch (fn) {
        case 'back':
          this.onBack()
          break
        case 'save':
          this.onSave()
          break
        case 'submit':
          this.onSubmit()
          break
        case 'end':
          this.onEnd()
          break
      }
    },
    // 点击退回按钮
    onBack () {
      this.$emit('back', true)
    },
    // 点击流程中保存按钮
    onSave () {
      this.$emit('save')
    },
    // 点击提交按钮
    onSubmit () {
      this.$emit('submit', this.onCheckIdea())
    },
    // 点击办结按钮
    onEnd () {
      this.$emit('end', this.onCheckIdea())
    },
    // 验证意见是否为空
    onCheckIdea () {
      // 意见是否必填 fillmode = 1 非必填 fillmode = 2 必填 平台组脑残写反了别看文档了
      if (this.idea === '' && (this.fillmode === '2' || this.fillmode === '')) {
        this.$toast.fail('请填写意见')
        this.$emit('input', true)
        return false
      } else {
        this.$emit('input', false)
        return true
      }
    }
  }
}
</script>

<style lang="less">
.workflow-button {
  &-btns {
    padding: @spacing-4;
  }
}
</style>
