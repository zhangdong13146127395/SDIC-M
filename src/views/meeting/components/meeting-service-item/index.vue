<template>

  <div class="meeting-service-item" :class="checked ? 'on' : ''" @click="clickItem(index)">
    <div class="meeting-service-item--circle">
      <div :class="`${pic}`"></div>
      <div class="meeting-service-item--charge" v-if="charge"></div>
    </div>
    <div class="meeting-service-item--name">{{name}}</div>
  </div>

</template>

<script>

export default {
  //会议-首页
  name: 'meeting-service-item',
  data() {
    return {

    }
  },
  components: {

  },
  props: {
    name: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    },
    checked:{
      type: Boolean,
      default: false
    },
    charge:{
      type: Boolean,
      default: false
    },
    pic:{
      type: String,
      default: ''
    }
  },
  mounted(){

  },
  methods: {

    clickItem(id){
      this.$emit('click',id);
    }

  }

}
</script>

<style lang="less">

  .meeting-service-item{
    margin: 12px 0;
    float: left;
    width: 25%;
    .meeting-service-item--circle{
      width: 50px;
      height: 50px;
      border-radius:25px;
      background: #F4F4F4;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      position: relative;
      .icon{
        font-size: 18px;
        color: #999999;
      }
      .meeting-service-item--charge{
        position: absolute;
        right: -5px;
        top: -5px;
        width: 18px;
        height: 18px;
        background: url("/images/meeting/charge.png") no-repeat center;
        background-position: center;
        background-size: 100%;
      }
    }
    .meeting-service-item--name{
      font-size: @font-size-sm;
      text-align: center;
      color: @gray-darker;
      padding-top: 5px;
    }
    &.on{
      .meeting-service-item--circle{
        background: #fff;
        box-shadow: @shadow-bottom;
      }
      .icon{
        color: #FF874B;
      }
    }
  }

</style>