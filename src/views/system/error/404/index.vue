<template>
  <div class="page-404">
    <div class="result">
      <van-icon name="close" size="2rem" color="#d7001d" />
      <div class="success">页面不存在</div>
      <div class="remark">404 Page not found</div>
    </div>
    <!-- <el-button class="d2-mt" @click="$router.replace({ path: '/' })">
      返回首页
    </el-button> -->
  </div>
</template>

<style lang="less" scoped>
.page-404 {
  .result {
    margin-top: 40%;
    text-align: center;
    .success {
      color: @text-color;
      font-size: @font-size-xl;
      font-weight: 700;
    }
    .remark {
      padding: @spacing-2;
      color: @gray-darker;
      font-size: @font-size-sm;
    }
  }
}
</style>
