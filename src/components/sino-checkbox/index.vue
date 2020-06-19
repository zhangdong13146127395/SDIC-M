<template>

  <div class="sino-checkbox">
    <van-checkbox :name="name" :disabled="disabled" @click="click" v-model="vModel">
      <div slot="icon"><slot></slot></div>
    </van-checkbox>
  </div>


</template>

<script>
export default {
  name: 'sino-checkbox',

  props: {
    name:{
      type:String
    },
    disabled:{
      type:Boolean,
      default:false
    },
    vModel:{
      type:Boolean,
      default:false
    }
  },

  mounted(){
  },

  methods: {
    click(event){
      this.$emit('click',event);
    }
  }
}
</script>

<style lang="less">

  .sino-checkbox{
    display: inline-block;
    .van-checkbox{
      border-radius: 5px;
      position: relative;
    }
    .van-checkbox__icon{
      width: 100%;
      height: auto;
      box-sizing:border-box;
      text-align: center;
      padding: 6px 10px;
      background: @active-color-dark;
      font-size: @font-size-sm;
      font-weight: normal;
      color: @gray-darker;
      i{
        display: none;
      }
    }
    .van-checkbox__icon--checked{
      background: #FFE0D0 ;
      color: #E55B17 ;
    }
    .van-checkbox__label{
      display: none;
    }
  }


</style>
