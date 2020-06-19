<template>

  <div class="meeting-edit__btn" >
    <van-goods-action class="sino-goods-action">

      <van-goods-action-button class="sino-goods-action-button" hairline square @click="delForm">
        <span class="sino-goods-action-button__text"> 删除</span>
      </van-goods-action-button>

      <van-goods-action-button class="sino-goods-action-button" hairline square @click="saveForm">
        <span class="sino-goods-action-button__text"> 保存</span>
      </van-goods-action-button>

      <van-goods-action-button class="sino-goods-action-button" hairline square @click="submitForm">
        <span class="sino-goods-action-button__text"> 提交</span>
      </van-goods-action-button>

    </van-goods-action>
  </div>


</template>

<script>

export default {
  //会议-首页
  name: 'meeting-edit-btn',
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
    //提交
    submitForm(){
      this.$emit('submit');
    },
    //保存
    saveForm(){
      this.$emit('save');
    },
    //删除
    delForm(){
      this.$emit('del');
    }
  }

}
</script>

<style lang="less">

</style>