<template>
  <div class="meeting-edit__item" :class="last?'last':''">
    <slot></slot>
  </div>
</template>

<script>

export default {
  //会议-首页
  name: 'meeting-edit-item',
  data() {
    return {

    }
  },
  props: {
    last:{
      type:Boolean,
      default:false
    }
  },
  components: {

  },
  mounted(){

  },
  methods: {



  }

}
</script>

<style lang="less">

  .meeting-edit__item{
    margin-bottom: 13px;
    background: #fff;
    &.last{
      margin-bottom: 68px;
    }
    .van-field__label{
      width: 110px;
    }
    .view{
      .van-cell__title{
        flex: none;
        width: 110px;
        span{
          color: #999;
        }
      }
      .van-cell__value{
        span{
          text-align: left;
          float: left;
          color: #323233;
        }
      }
    }
  }

</style>