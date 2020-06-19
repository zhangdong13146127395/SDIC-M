<template>
  <div class="sino-title">
    <div
      v-if="title || $slots.title"
      class="sino-title__title"
    >
      <slot name="title">
        <p
          :style="style"
          @click="onClick"
        >
          {{ title }}
        </p>
      </slot>
    </div>
    <div
      v-if="content || $slots.default"
      class="sino-title__content"
    >
      <slot>
      </slot>
    </div>
    <div
      v-if="iconName || $slots.rightIcon"
      class="sino-title__icon"
    >
      <slot name="right-icon">
        <van-icon
          :name="iconName"
          :info="iconInfo"
          :color="iconColor"
          :size="iconSize"
          :class-prefix="iconClassPrefix"
          @click="onClickIcon"
        />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sino-title',
  
  props: {
    title: [ String, Number ],
    content: [ String, Number ],
    color: String,
    iconName: String,
    iconInfo: [ String, Number ],
    iconColor: String,
    iconSize: {
      type: String,
      default: '18px'
    },
    iconClassPrefix: {
      type: String,
      default: 'van-icon'
    }
  },

  computed: {
    style () {
      return {
        color: this.color,
        borderColor: this.color
      }
    }
  },

  methods: {
    onClick () {
      this.$emit('click')
    },

    onClickIcon () {
      this.$emit('click-icon')
    }
  }
}
</script>

<style lang="less">
.sino-title {
  display: flex;
  padding: @spacing-4;
  justify-content: center;
  align-items: center;
  &__title {
    flex: 1;
    vertical-align: middle;
    p {
      margin: 0;
      padding-left: @spacing-2;
      font-size: @font-size-base;
      font-weight: 500;
      color: @blue;
      border-left: 2px solid @blue;
      vertical-align: middle;
    }
  }

  &__content {
    position: relative;
    flex: 1;
    color: @gray-dark;
    overflow: hidden;
    font-size: 0;
    text-align: right;
    vertical-align: middle;
  }
  
  &__icon {
    margin-left: @spacing-1;
    height: 24px;
    line-height: 24px;
    color: @gray-dark;
    vertical-align: middle;
  }
  
}
</style>
