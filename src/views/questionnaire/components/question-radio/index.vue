<template>
  <!-- 单选题 -->
  <div class="question-radio">
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
    <van-radio-group :value="value" :disabled="disabled" @input="onInput">
      <van-cell-group class="option van-hairline--surround">
        <van-cell
          v-for="(item, index) in options"
          :key="index"
          @click="onInput(item.id)"
        >
          <van-radio :name="Number(item.id)" @click="onInput(item.id)">{{ item.title }}</van-radio>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script>
import SinoTitle from '@/components/sino-title'

export default {
  name: 'question-radio',

  components: {
    SinoTitle,
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default () {
        return []
      }
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
      !this.disabled && this.$emit('input', val)
    }
  }
}
</script>

<style lang="less">
.question-radio {
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
  .option {
    margin: 0 @spacing-4;
    .van-cell {
      &:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
    &:after {
      border-radius: 4px;
    }
  }
  
  .van-radio__label {
    display: inline;
  }
}
</style>
