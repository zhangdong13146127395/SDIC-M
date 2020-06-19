<template>
  <van-dialog
    class="sino-dialog-cell"
    :value="value"
    :title="title"
    :show-confirm-button="false"
    close-on-click-overlay
    @input="onInput"
  >
    <van-cell-group>
      <template v-for="(btn, index) in cells" >
        <van-cell
          v-if="!btn.isHidden"
          :key="index"
          clickable
          @click="onClick(btn)"
        >
          {{ btn.text }}
        </van-cell>
      </template>
    </van-cell-group>
  </van-dialog>
</template>

<script>
export default {
  name: 'sino-dialog-cell',

  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    cells: {
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
      } else {
        this.$emit('input', false)
      }
    },
    
    onInput (val) {
      if (!val) {
        this.$emit('input', false)
      }
    }
  }
}
</script>

<style lang="less">
.sino-dialog-cell {
  .van-dialog__header {
    padding: @spacing-4 0;
    color: @text-color;
    font-size: @font-size-lg;
  }
  .van-dialog__content {
    .van-cell {
      padding: @spacing-3 0;
      &__value {
        color: @blue;
        font-size: @font-size-base;
        text-align: center;
      }
      &:last-child .van-cell__value {
        color: @gray-darker;
      }
      &:not(:last-child) {
        &:after {
          right: 15px;
        }
      }
    }
  }
}
</style>
