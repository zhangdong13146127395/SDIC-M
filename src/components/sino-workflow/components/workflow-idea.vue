<template>
  <!-- 意见 -->
  <div class="workflow-idea">
    <!-- 填写意见按钮 68 -->
    <template v-if="buttons.includes('68') || !buttons">
      <!-- 标题 -->
      <sino-title :title="title">
        <slot name="right-icon">
          <van-button type="info" size="small" icon="plus" @click="onCommonIdea">常用意见</van-button>
        </slot>
      </sino-title>

      <!-- 意见输入框  -->
      <div class="workflow-idea-field">
        <van-field
          class="workflow-idea-field--textarea"
          :value="value"
          :error="error"
          type="textarea"
          :rows="rows"
          :required="(fillmode === '2' || fillmode === '') ? true : false"
          clearable
          placeholder="请输入意见"
          :style="{ backgroundColor }"
          @input="handleInput"
        />
      </div>

      <!-- 常用意见弹出框 -->
      <sino-dialog-cell v-model="commonIdea.show" title="常用意见" :cells="commonIdea.cells" />
    </template>
  </div>
</template>

<script>
import { listCommonIdea } from '@/api/system'

export default {
  name: 'workflow-idea',
  components: {
    'sino-title': () => import('@/components/sino-title'),
    'sino-dialog-cell': () => import('@/components/sino-dialog-cell'),
  },
  props: {
    // 意见信息
    value: {
      type: String,
      default: ''
    },
    // 意见填写错误
    error: {
      type: Boolean,
      default: false
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
    },
    // 标题
    title: {
      type: String,
      default: '填写意见'
    },
    // 输入框行数
    rows: {
      type: Number,
      default: 3
    },
    // 输入框背景色
    backgroundColor: {
      type: String,
      deafult: '#fff'
    }
  },
  data () {
    return {
      // 常用意见
      commonIdea: {
        show: false,
        cells: [
          {
            text: '取消'
          }
        ]
      },
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getCommonIdeas()
    },
    // 获取常用意见
    async getCommonIdeas () {
      const idea = await listCommonIdea()
      if (idea && idea.list && idea.list.length) {
        for (let i = 0; i < idea.list.length; i++) {
          const data = idea.list[i]
          this.commonIdea.cells.unshift({
            text: data.content,
            handler: this.handleCommonIdea,
            params: data.content
          })
        }
      }
    },
    // 选择常用意见
    handleCommonIdea (val) {
      this.commonIdea.show = false
      this.handleInput(val)
    },
    // 点击常用意见按钮
    onCommonIdea () {
      if (this.commonIdea.cells.length > 1) {
        this.commonIdea.show = true
      } else {
        this.$toast.fail('暂无常用意见')
      }
    },
    // 改变意见信息
    handleInput (val) {
      this.$emit('input', val)
    },
  }
}
</script>

<style lang="less">
.workflow-idea {
  &-field {
    padding: 0 @spacing-4;
    &--textarea {
      border-radius: 4px;
    }
  }
}
</style>
