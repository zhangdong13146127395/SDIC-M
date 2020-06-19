<template>
  <!-- 单选题 -->
  <div class="question-textarea">
    <sino-title>
      <div slot="title">
        <p :class="titleClass">
          <span v-if="required" class="required">*</span>
          {{ title }}
        </p>
      </div>
    </sino-title>
    <div class="evaluation" v-if="evaluation.userName">姓名：{{ evaluation.userName }}&nbsp;&nbsp;{{ evaluation.deptName ? `部门：${evaluation.deptName}` : '' }}</div>
    <div class="evaluation" v-if="evaluation.companyName">公司：{{ evaluation.companyName }}</div>
    <div class="evaluation" v-if="evaluation.remarks">备注：{{ evaluation.remarks }}</div>
    <div class="textarea van-hairline--surround">
      <van-field
        :value="value"
        type="textarea"
        :disabled="disabled"
        placeholder="请输入内容"
        clearable
        rows="3"
        :autosize="{ maxHeight: 72, minHeight: 72 }"
        @input="onInput"
      />
    </div>
  </div>
</template>

<script>
import SinoTitle from '@/components/sino-title'

export default {
  name: 'question-textarea',

  components: {
    SinoTitle,
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    evaluation: Object
  },

  computed: {
    titleClass () {
      return {
        error: this.error
      }
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
.question-textarea {
  .sino-title {
    p {
      color: @text-color;
    }
    p.error {
      color: @red;
    }
    .required {
      color: @red;
      font-size: @font-size-base;
      font-weight: 500;
    }
  }
  .evaluation {
    margin: 0;
    padding: @spacing-4;
    padding-top: 0;
    font-size: @font-size-sm;
    color: @blue;
  }
  .textarea {
    margin: 0 @spacing-4;
    .van-cell {
      border-radius: 4px;
    }
    &:after {
      border-radius: 4px;
    }
  }
}
</style>
