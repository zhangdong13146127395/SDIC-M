<template>
  <van-sticky :offset-top="otop">
    <div class="oversee-pic-tab">
      <van-tabs >
        <van-tab v-for="(item, index) in data" :key="index" >
          <div slot="title" @click="onClick(item.tid)">
            <van-icon :info="checkTip(item.tip)" :name="`${baseUrl}${item.icon}`"/>
            <div class="t">{{item.name}}</div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </van-sticky>
</template>

<script>
export default {

  name: 'oversee-pic-tab',
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      otop: 0
    }
  },
  props:['data'],
  mounted () {
    this.resetTop()
  },
  methods: {

    onClick(id) {
      this.$emit('callFather',id);
    },

    checkTip(tip){
      let n;
      if(tip == 0){
        n = ''
      }else{
        if(tip < 99){
          n = tip
        }else{
          n = '99+'
        }
      }
      return n
    },

    resetTop(){
      let tObj = document.getElementsByClassName('oversee-text-tab')[0], //文字tab
          nObj = document.getElementById('navbar'),                      //顶部nav
          t = 0

      if(tObj){
        t = t +tObj.offsetHeight
      }

      this.otop = t + nObj.offsetHeight

    }

  }

}


</script>


<style lang="less">

.oversee-pic-tab{
  .van-tabs--line .van-tabs__wrap{
    height: 90px;
  }
  .van-icon__image{
    width: 27.5px;
    height: 27.5px;
  }
  .van-tab{
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.1s ease-in-out;
  }

  .van-image {
    opacity: 0.4;
    transition: all 0.1s ease-in-out;
  }
  .t{
    opacity: 0.4;
    transition: all 0.1s ease-in-out;
    font-size: 12px;
  }

  .van-icon{
    padding-bottom: @spacing-2;
  }
  .van-tabs__line{
    bottom: 25px;
    height: 2px;
    background-color: @blue;
  }
  .van-tab--active{
    color: @blue;
    transition: all 0.5s ease-in-out;
  }

  .van-tab--active .van-image {
    opacity: 1;
    transition: all 0.1s ease-in-out;
  }
  .van-tab--active .t {
    opacity: 1;
    transition: all 0.1s ease-in-out;
  }

  .van-ellipsis{
    overflow: visible;
  }
  .t{
    height: 15px;
  }
}

</style>