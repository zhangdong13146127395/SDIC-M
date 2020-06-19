<template>

  <div class="external-add-btn" @click="click">
    <van-icon name="add-o" />
    <span>{{title}}</span>
  </div>

</template>

<script>

export default {
  //会议-首页
  name: 'meeting-add-btn',
  data() {
    return {

    }
  },
  components: {

  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  mounted(){

  },
  methods: {

    click(){
      this.$emit('click');
    }

  }

}
</script>

<style lang="less">

  .external-add-btn{
    font-size: @font-size-base;
    text-align: center;
    line-height: @line-height-base;
    display: flex;
    justify-content: center;
    align-items: center;
    color: @blue;
    height: 40px;
    background: #fff;
    border: 1px solid @gray-light;
    margin: 15px 0;
    .van-icon{
      font-size: @font-size-xxl;
    }
    span{
      padding-left: 10px;
    }
  }

</style>