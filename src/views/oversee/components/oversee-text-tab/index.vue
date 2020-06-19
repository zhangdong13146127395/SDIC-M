<template>
  <van-sticky :offset-top="otop">
    <div class="oversee-text-tab">
      <van-tabs >
        <van-tab v-for="(item, index) in data" :key="index">
          <div slot="title" @click="onClick(item.tid)" >
            <div class="t">
              <van-info :info="checkTip(item.tip)"/>
              <span >{{item.name}}</span>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </van-sticky>
</template>

<script>
export default {

  name: 'oversee-text-tab',
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      otop: 40
    }
  },
  props:['data'],
  computed: {

  },
  mounted(){
    //this.$nextTick(() => {
      this.resetTop();
    //})
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

      this.otop = document.getElementById('navbar').offsetHeight

    }

  }

}


</script>


<style lang="less">

  .oversee-text-tab{
    .t{
      position: relative;
      line-height: 1;
      display: inline-block;
      padding: 0 10px;
    }
    .van-tabs__line{
      display: none;
    }
    .van-tab{
      padding: 0;
    }
    .van-tab--active{
      font-size: @font-size-base;
    }
  }

</style>