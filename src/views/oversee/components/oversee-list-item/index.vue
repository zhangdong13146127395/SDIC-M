<template>
  <div class="oversee-list-item" @click="onClick()">
    <van-row>
      <van-col span="9" ref="oleft" class="oleft">
        <oversee-semicircle-progress :id="`mountNode${id}`" :actual=rate :expect=100></oversee-semicircle-progress>
        <!--
        <van-circle
          v-model="currentRate"
          :rate="rate"
          :speed="100"
          layer-color="#98c6ff"
          :stroke-width="90"
          :size="circleSize"
        >
          <div class="tip-text">
            <div class="tip-text__num">{{tipTextNum}}</div>
            <div class="tip-text__text">已完成</div>
          </div>
        </van-circle>
        -->
      </van-col>
      <van-col span="15">
        <div class="oversee-list-item__tag">
          <van-tag plain type="primary">{{tag}}</van-tag>
        </div>
        <div class="oversee-list-item__title van-multi-ellipsis--l2">{{title}}</div>
        <div class="oversee-list-item__info">上步审批人：{{people}}</div>
        <div class="oversee-list-item__time">{{time}}</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {

  name: 'oversee-list-item',
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      imgUrl: process.env.BASE_URL + 'images/oversee/',
      currentRate: 0,
      circleSize: 100,
      tipTextNum:'',
    }
  },
  props:['id','tag','title','people','time','rate'],
  watch: {
    currentRate: function (newData) {
      this.tipTextNum = newData.toFixed(0) + '%'
    }
  },
  components:{
    'oversee-semicircle-progress': () => import('../oversee-semicircle-progress/index'),
  },
  computed: {

  },
  mounted () {
    this.getSize()
  },
  methods: {
    getSize(){
      let dom = this.$refs.oleft.$el,
          w = dom.offsetWidth
      this.circleSize = w-15
    },
    onClick () {
      this.$router.push({ path: '/oversee/build-project' })
    }
  }
}


</script>


<style lang="less">

  .oversee-list-item{
    background: #fff;
    padding: @spacing-4;
    border-radius: 10px;
    margin-bottom: @spacing-4;;
    .van-circle{
      margin-top: 20px;
    }
    /*
    .tip-text{
      font-size: @font-size-sm;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      align-content:center;
      .tip-text__num , .tip-text__text{
        display: block;
        width: 100%;
        color: @blue;
      }
    }
    */
    .oversee-list-item__tag{
      font-size: @font-size-xs;
      color: @blue;
      line-height: @line-height-base;
    }
    .oversee-list-item__title{
      font-size: @font-size-base;
      font-weight: bold;
      line-height: @line-height-zh;
      margin: @spacing-2 0;
    }
    .oversee-list-item__info{
      font-size: @font-size-sm;
      color: @gray-darker;
      line-height: @line-height-base;
      padding-bottom: @spacing-2;
    }
    .oversee-list-item__time{
      font-size: @font-size-sm;
      color: @gray-dark;
      line-height: @line-height-base;
    }
  }



</style>