<template>
  <!-- 问卷信息 -->
  <div class="question-header" v-if="title">
    <div class="title">{{ title }}</div>
    <div class="time" v-if="updatetime">最后更新时间：{{ updatetime || '暂无' }}</div>
    <div class="numbers van-hairline--surround" v-if="numbers && numbers.length">
      <div class="numbers-block van-hairline--right text-center">
        <div class="numbers-block--title">发出数量</div>
        <div class="numbers-block--num">{{ numbers[0] || 0 }} 份</div>
      </div>
      <div class="numbers-block text-center">
        <div class="numbers-block--title">回收数量</div>
        <div class="numbers-block--num">{{ numbers[1] || 0 }} 份</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'question-header',

  props: {
    title: {
      type: String,
      default: ''
    },
    updatetime: {
      type: String,
      default: ''
    },
    numbers: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="less">
.question-header {
  padding: @spacing-4;
  background-color: @white;
  .title {
    color: @text-color;
    font-size: @font-size-lg;
    font-weight: 700;
  }
  .time {
    padding-top: @spacing-2;
    color: @gray-darker;
    font-size: @font-size-sm;
  }
  .numbers {
    display: flex;
    margin-top: @spacing-2;
    width: 100%;
    background-color: #f6fbff;
    border-radius: 4px;
    &:after {
      border-radius: 4px;
    }
    &-block {
      flex: 1;
      padding: @spacing-3 @spacing-2;
      &--title {
        padding: @spacing-1;
        color: @text-color;
        font-size: @font-size-base;
      }
      &--num {
        padding: @spacing-1;
        color: @blue;
        font-size: @font-size-lg;
        font-weight: 700;
      }
    }
  }
}
</style>
