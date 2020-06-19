<template>

  <van-cell-group>
    <van-field
      v-show="permission"
      label="公司外参会人员"
      placeholder="请选择"
      input-align="right"
      @click="showAddContent"
      readonly
      isLink
    />
    <van-cell v-show="!permission" title="公司外参会人员" />
    <div class="meeting-people-item">
      <van-cell v-for="(item, index) in formData.externalData" :key="index" :title="`${item.outUserName}`" >
        <div slots="default">
          <p>{{item.outUserTel}}</p>
          <p>{{item.outUserCompany}}</p>
        </div>
      </van-cell>
    </div>
  </van-cell-group>


</template>

<script>

export default {
  //会议-首页
  name: 'meeting-people-item',
  data() {
    return {

    }
  },
  components: {

  },
  props: {
    formData: {
      type: Object,
    },
    backPath:{
      type:String
    },
    //是否可以编辑
    permission:{
      type:Boolean,
      default:true
    }
  },
  mounted(){

  },
  methods: {
    //跳转公司外参会人员
    showAddContent(){
      this.$router.push({
        path: 'meeting/people/index',
        name: 'meeting-people-index',
        params: {
          formData:this.formData,
          backPath:this.backPath
        }
      })
    },

  }

}
</script>

<style lang="less">

  .meeting-people-item{

    .van-cell__title{
      width: 110px;
      flex: none;
      display: flex;
      align-items: center;
      font-weight: 700;
      padding-left: 20px;
      box-sizing:border-box;
    }
    .van-cell__value{
      text-align: left;
    }

  }

</style>