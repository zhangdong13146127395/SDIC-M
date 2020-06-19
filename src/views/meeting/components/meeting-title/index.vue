<template>

  <div class="meeting-title">
    <div class="external-list__title--title">{{title}}</div>

    <div class="external-list__title--del" @click="delExternal(index)" v-if="rightBtn">
      <van-icon name="delete" />
    </div>

  </div>

</template>

<script>

export default {
  //会议-首页
  name: 'meeting-title',
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
    },
    index: {
      type: Number,
      default: 0
    },
    rightBtn: {
      type: Boolean,
      default: false
    }
  },
  mounted(){

  },
  methods: {

    delExternal(id){
      this.$emit('callFather',id);
    }

  }

}
</script>

<style lang="less">

  .meeting-title{
    font-size: @font-size-base;
    color: @blue;
    padding: 10px 16px;
    overflow: hidden;
    .external-list__title--title{
      float: left;
      padding-left: 7px;
      margin-top: 3px;
      border-left: 3px solid @blue;
      line-height: @line-height-base;
    }
    .external-list__title--del{
      float: right;
      font-size: @font-size-lg;
      line-height: @line-height-base;
    }
  }

</style>