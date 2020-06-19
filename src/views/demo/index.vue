<template>
  <!-- 为了该模块的私有样式不影响其他模块，在页面最外层写一个 class -->
  <!-- 格式为：模块名称 + 页面名称，即：demo + index -->
  <div class="demo-index">
    ...
  </div>
</template>

<script>
export default {
  // 为了 vue 页面名称唯一不冲突，名称格式为：模块名称 + 页面名称，即 demo + index
  name: 'demo-index',
  
  // 引用公共组件
  components: {
    'sino-list': () => import('@/components/sino-list'),
  },
}
</script>

<!-- style 使用 less，但不使用 scoped，为了方便覆盖 vant 的默认样式 -->
<style lang="less">
.demo-index {
  /* 为了该模块的私有样式以及修改 vant 默认样式不影响其他模块，要将 css 代码全部写在最外层 class 内 */
}
</style>