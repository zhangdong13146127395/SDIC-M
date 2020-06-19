<template>
  <div class="sino-swipe-cell">
    <van-swipe-cell
      class="sino-swipe-cell"
      :right-width="rightWidth"
    >
      <slot />
      <div
        class="cell__right"
        :class="btn.type || 'default'"
        v-for="(btn, index) in btns"
        :key="index"
        slot="right"
        @click="onClick(btn)"
      >
        <span>{{ btn.text }}</span>
      </div>
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  name: 'sino-swipe-cell',
  props: {
    // 按钮信息
    btns: {
      type: Array,
      default () {
        return []
      }
    },
    // 参数信息
    params: {
      type: [ String, Number, Boolean, Array, Object ]
    }
  },
  computed: {
    rightWidth () {
      return 65 * this.btns ? this.btns.length : 0
    }
  },
  methods: {
    onClick (btn) {
      if (typeof btn.handler === 'function') {
        btn.handler(this.params)
      }
    },
  }
}
</script>

<style lang="less">
.sino-swipe-cell {
  .sino-swipe-cell {
    .cell {
      &__icon {
        margin-right: @spacing-2;
        width: 24px;
        height: 22px;
      }
      &__right {
        display: inline-block;
        width: 65px;
        height: inherit;
        color: @text-color;
        font-size: @font-size-sm;
        line-height: 0;
        text-align: center;
        background-color: @background-color;
        &.default {
          color: @text-color;
          background-color: @gray-light;
        }
        &.primary {
          color: @white;
          background-color: @green;
        }
        &.info {
          color: @white;
          background-color: @blue;
        }
        &.warning {
          color: @white;
          background-color: @orange;
        }
        &.danger {
          color: @white;
          background-color: @red;
        }
        span {
          position: absolute;
          top: 50%;
          margin-left: -12px;
        }
      }
    }
    &:last-child {
      .cell {
        &:after {
          border-width: 0;
        }
      }
    }
  }
}
</style>
