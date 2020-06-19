<template>
  <div class="sino-button-group">
    <van-goods-action class="sino-goods-action">
      <template v-for="(btn, index) in btns">
        <van-goods-action-button
          class="sino-goods-action-button"
          :class="btn.type || 'default'"
          v-show="btn.show !== false"
          hairline
          square
          :key="index"
          @click="onClick(btn)"
        >
          <van-icon class="sino-goods-action-button__icon" :name="btn.icon" size="16px" />
          <span class="sino-goods-action-button__text">{{ btn.text }}</span>
        </van-goods-action-button>
      </template>
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: 'sino-button-group',
  props: {
    // 按钮信息
    btns: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    onClick (cell) {
      if (typeof cell.handler === 'function') {
        cell.handler(cell.params)
      }
    },
  }
}
</script>

<style lang="less">
.sino-button-group {
  .sino-goods-action {
    z-index: 1000;
    &-button {
      margin: 0;
      height: 1.33333rem;
      font-size: @font-size-base;
      line-height: 1.28rem;
      border-radius: 0;
      &.default {
        color: @text-color;
        background-color: @gray-light;
        border: 1px solid @border-color;
      }
      &.primary {
        color: @white;
        background-color: @green;
        border: 1px solid @green;
      }
      &.info {
        color: @white;
        background-color: @blue;
        border: 1px solid @blue;
      }
      &.warning {
        color: @white;
        background-color: @orange;
        border: 1px solid @orange;
      }
      &.danger {
        color: @white;
        background-color: @red;
        border: 1px solid @red;
      }
      &__icon, &__text {
        vertical-align: middle;
      }
    }
  }
}
</style>
