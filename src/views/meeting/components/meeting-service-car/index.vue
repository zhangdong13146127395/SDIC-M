<template>
  <div class="meeting-service-car" @click="showCar">
    <van-row>
      <van-col span="5">
        <div class="meeting-service-car--icon">
          <service-item  :checked=true pic='icon iconfont iconfont-iconchewei'/>
        </div>
      </van-col>
      <van-col span="19">
        <van-cell :title="`预留车位数量：${carData.carSum}辆`" size="large" :is-link="isLink?true:false" >
          <template slot="label" v-if="carData.carNumData.length > 0">
            车牌号：
            <span v-for="(item, index) in carData.carNumData" :key="`cnd+${index}`">{{item}},</span>
          </template>
        </van-cell>
      </van-col>
    </van-row>
  </div>

</template>

<script>

export default {
  //会议-首页
  name: 'meeting-service-car',
  data() {
    return {

    }
  },
  components: {
    'serviceItem': () => import('../../components/meeting-service-item'),
  },
  props: {
    carData: {
      type: Object,
    },
    isLink: {
      type: Boolean,
      default:false
    },
  },
  mounted(){

  },
  methods: {

    showCar(){
      this.$emit('click');
    }

  }

}
</script>

<style lang="less">
  .meeting-service-car{
    .meeting-service-car--icon{
      text-align: center;
      padding-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      .meeting-service-item{
        width: auto;
      }
    }
    .van-cell__title{
      font-size: @font-size-sm;
    }
  }



</style>