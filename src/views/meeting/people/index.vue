<template>

  <div class="meeting-people-index">

    <div class="meeting-people-list" v-for="(item, index) in externalData" :key="index">
      <meeting-title :title="`参会人员 (${index+1})`" :index=index @callFather="delExternal" :rightBtn=true />
      <van-cell-group>
        <van-field v-model="item.outUserName" label="姓名" placeholder="请输入姓名" right-icon="friends-o" @click-right-icon="showRecord(index)"/>
        <van-field v-model="item.outUserTel" label="电话" placeholder="请输入电话" />
        <van-field v-model="item.outUserCompany" label="公司" placeholder="请输入公司" />
      </van-cell-group>
    </div>

    <meeting-add-btn title="增加人员" @click="addExternal"></meeting-add-btn>

    <div class="meeting-people-save" @click="saveExternal">
      <van-button type="info" size="large">保存</van-button>
    </div>

    <van-popup v-model="record" position="right" closeable :style="{ width: '80%',height:'100%' }">
      <div class="meeting-people-record">
        <van-cell-group>
          <van-cell v-for="(item, index) in recordData" :key="index" :title="`${item.outUserName}`" :value="`${item.outUserTel}`" :label="`${item.outUserCompany}`" @click="clickRecord(index)"/>
        </van-cell-group>
      </div>
    </van-popup>

  </div>

</template>

<script>
import { listOutUserHistory } from '@/api/meeting'
export default {
  //公司外参会人员
  name: 'meeting-people-index',
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      backUrl:'',
      record:false,
      recordId:0,
      recordData:[],
      externalData:[],
      formData:{}
    }
  },
  components: {
    'meetingTitle': () => import('../components/meeting-title'),
    'meetingAddBtn': () => import('../components/meeting-add-btn'),
  },
  mounted(){
    this.getApiData()
    this.getParentData()
    this.settingNavBar()

  },
  methods: {

    //接收表单页传来的已录入数据
    getParentData(){
      if( typeof(this.$route.params.formData) != 'undefined'){
        //从路由中获取上级页面传来的数据
        //若用户保存修改，则将新数据添加到formData并传回上级
        //若用户取消修改，则将formData原样返回
        this.formData = this.$route.params.formData

        //解除双向绑定
        let tempData = JSON.parse(JSON.stringify(this.$route.params.formData))
        if(typeof (tempData.externalData) != 'undefined'){
          this.externalData = tempData.externalData
        }else{
          this.externalData = []
        }

        this.backPath = this.$route.params.backPath


      }
    },

    //获取公司外参会人员历史数据列表
    async getApiData() {
      let outUser = await listOutUserHistory({ status:this.active }),
          outUserData = outUser.list,
          tempArr = []

      outUserData.forEach(function (value) {
        tempArr.push({
          outUserName:value.outUserName,
          outUserTel:value.outUserTel,
          outUserCompany:value.outUserCompany
        })
      })
      this.recordData = tempArr
    },

    //重写顶部左侧按钮
    settingNavBar(){
      this.$parent.childClickLeft = true
    },

    //顶部左侧点击事件
    onClickLeft(){
      this.backIndex()
    },

    //打开通讯录
    showRecord(id){
      this.record = true
      this.recordId = id
    },

    //通讯录点击事件
    clickRecord(index){
      let data = this.recordData[index]
      this.externalData[this.recordId] = data
      this.record = false
    },

    //增加一个人员
    addExternal(){
      this.externalData.push(
        {
          outUserName:'',
          outUserTel:'',
          outUserCompany:''
        }
      )
    },

    //保存人员
    saveExternal(){

      if(this.externalData.length > 0){
        if(this.externalData[0].outUserName != ''){
          this.formData.externalData = this.externalData
          this.backIndex()
        }else{
          this.$dialog.alert({
            message: '添加的内容不能为空'
          }).then(() => {
            // on close
          });

        }
      }

    },

    //删除人员
    delExternal(id){

      this.$dialog.confirm({
        title: '',
        message: '确定要删除人员？'
      }).then(() => {
        this.externalData.splice( id , 1)
      }).catch(() => {
        // on cancel
      });

    },

    //返回
    backIndex(){
      let path , name
      if(this.backPath == 'internal'){
        path = 'meeting/internal/index'
        name = 'meeting-internal-index'
      }else{
        path = 'meeting/external/index'
        name = 'meeting-external-index'
      }
      this.$router.push({
        path: path,
        name: name,
        params: {
          formData: this.formData,
        },
        query: {
          meetingId:this.formData.meetingId,
          backPag:this.formData.backPag,
          backAct:this.formData.backAct,
        }
      })
    }


  }

}
</script>

<style lang="less">

  .meeting-people-index{
    padding-bottom: 68px;
    .meeting-people-list{
      .van-icon{
        color: @blue;
        font-size: @font-size-lg;
      }
    }
    .meeting-people-save{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .meeting-people-record{
      padding-top: 45px;
    }
  }

</style>