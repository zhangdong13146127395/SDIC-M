<template>
  <div class="oversee-bottom-tab">

    <van-tabbar v-model="selectName">
      <van-tabbar-item name="oversee-todo" to="/oversee/index">
        <span>待办</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? `${imgUrl}oversee-bottom-tab-01-active.png` : `${imgUrl}oversee-bottom-tab-01.png`"
        >
      </van-tabbar-item>
      <van-tabbar-item name="oversee-done" to="/oversee/done">
        <span>已办</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? `${imgUrl}oversee-bottom-tab-02-active.png` : `${imgUrl}oversee-bottom-tab-02.png`"
        >
      </van-tabbar-item>
      <van-tabbar-item name="oversee-mine" to="/oversee/mine">
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? `${imgUrl}oversee-bottom-tab-03-active.png` : `${imgUrl}oversee-bottom-tab-03.png`"
        >
      </van-tabbar-item>
      <van-tabbar-item name="oversee-stats" to="/oversee/stats">
        <span>统计</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? `${imgUrl}oversee-bottom-tab-04-active.png` : `${imgUrl}oversee-bottom-tab-04.png`"
        >
      </van-tabbar-item>

    </van-tabbar>
  </div>
</template>

<script>
export default {

  name: 'oversee-bottom-tab',
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      imgUrl: process.env.BASE_URL + 'images/oversee/',
      selectName:''
    }
  },
  props:['active'],
  mounted () {
    this.selectName = this.active
  },
  methods: {

  }

}


</script>


<style lang="less">
  .oversee-bottom-tab{
    overflow: hidden;
    .van-tabbar-item__icon img{
      width: auto;
    }
  }



</style>