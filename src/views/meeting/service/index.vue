<template>

  <div class="meeting-service-index">

    <van-notice-bar v-show="charge.noticeShow" mode="link" text="您选择的服务有收费项目" @click="charge.dialogShow = true"/>
    <meeting-title title="已选择的服务"/>
    <div class="service-box">
      <div class="service-tip">
        <p>
          <span v-for="(item, index) in serviceData" :key="`sm+${index}`">{{item.serviceName}}，</span>
        </p>
        <p>
          <span>{{note}}</span>
        </p>
      </div>
    </div>

    <div v-for="(item, type) in serviceAllData" :key="type">
      <meeting-title :title="item.name"/>
      <div class="service-box">
        <div class="service-item-list">
          <service-item v-for="(item, index) in item.list" :key="`sam+${index}`" :id="`${item.id}`" :name="`${item.serviceName}`" :checked=item.checked :charge="item.isCharge == 'yes' ? true : false " :pic=item.serviceIcon :index=index @click="itemClick(type,index)"/>
        </div>
        <service-car v-if="item.type == 'defend_service'" :carData=carData :isLink=true @click="showCar"></service-car>
      </div>
    </div>

    <meeting-title title="备注"/>
    <div class="service-box last">
      <van-field
        v-model="note"
        rows="3"
        autosize
        type="textarea"
        placeholder="备注"
      />
    </div>

    <div class="meeting-service__btn" >
      <van-row>
        <van-col span="12"><van-button plain type="" size="large">重置</van-button></van-col>
        <van-col span="12"><van-button type="info" size="large" @click="saveService">确定</van-button></van-col>
      </van-row>
    </div>

    <!-- 收费 -->
    <van-dialog v-model="charge.dialogShow">
      <div class="van-dialog__message">
        <p>您选择的服务有收费项目,如有疑问请拨打联系电话</p>
        <a href="tel:66579944">010-66579944</a>&nbsp;&nbsp;<a href="tel:66579214">010-66579214</a>
      </div>
    </van-dialog>

  </div>

</template>

<script>
import { listService } from '@/api/meeting'
export default {
  //公司外参会人员
  name: 'meeting-service-index',
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      //从表单页传来的数据，返回时将数据传回
      formData:{},
      //收费项目
      charge:{
        //顶部收费提示
        noticeShow:false,
        //收费详情
        dialogShow:false,
        //已选中的收费项目
        chargeArr:[]
      },

      //备注
      note:'',
      //已选中数据
      serviceData:[],
      //车牌号数据
      carData:{
        //预留车位数量
        carSum:0,
        //车牌号列表
        carNumData:[]
      },
      //所有服务所有项目
      serviceAllData: [],

    }
  },
  components: {
    'meetingTitle': () => import('../components/meeting-title'),
    'serviceItem': () => import('../components/meeting-service-item'),
    'serviceCar': () => import('../components/meeting-service-car'),
  },
  mounted(){
    this.getParentData()
    this.settingNavBar()
    this.getApiData()
    this.checkCharge()
  },
  methods: {

    //获取数据
    async getApiData() {
      let data =  await listService()
      this.serviceAllData = data
      this.filterData(this.serviceAllData,this.serviceData)
    },

    //接收表单页传来的已录入数据
    getParentData(){

      if( typeof(this.$route.params.formData) != 'undefined'){
        //从路由中获取上级页面传来的数据
        //若用户保存修改，则将新数据添加到formData并传回上级
        //若用户取消修改，则将formData原样返回
        this.formData = this.$route.params.formData

        //解除双向绑定
        let tempData = JSON.parse(JSON.stringify(this.$route.params.formData))

        //备注
        this.note = tempData.note
        //服务项目
        if(typeof(tempData.serviceData  ) != 'undefined'){
          this.serviceData = tempData.serviceData
        }else{
          this.serviceData = []
        }

        this.carData = tempData.carData

      }

      //接收car返回的数据
      if( typeof(this.$route.params.serviceData) != 'undefined'){
        this.serviceData = this.$route.params.serviceData
      }
      if( typeof(this.$route.params.note) != 'undefined'){
        this.note = this.$route.params.note
      }
      if( typeof(this.$route.params.carData) != 'undefined'){
        this.carData = this.$route.params.carData
      }


    },

    //保存修改
    saveService(){
      //将本页新修改的数据添加到formData
      this.formData.note = this.note
      this.formData.serviceData = this.serviceData
      this.formData.carData = this.carData

      this.backIndex()
    },

    itemClick(type,index){

      let data = this.serviceAllData[type].list[index],
          checked = data.checked,
          serviceId = data.id,
          selectData  = this.serviceData

      if(checked){
        data.checked = false
        //将取消选中的项目从数组中移除
        selectData.splice(selectData.findIndex( item => item.id === serviceId), 1)
      }else{
        data.checked = true
        //将选中的数据插入到数组，返回时将数组传回
        selectData.push(data)
      }

      this.checkCharge()


    },

    //判断已选中的数据中，有没有收费项目，如果有则显示顶部收费提示
    checkCharge(){

      let chargeIndex,
          selectData = this.serviceData

      chargeIndex = selectData.findIndex(item => {
        return item.isCharge == 'yes';
      });

      if(chargeIndex != -1){
        this.charge.noticeShow = true
      }else{
        this.charge.noticeShow = false
      }
    },

    /**
     * 根据上级页面传来的数据，同步所有服务项目中的选中状态
     * @param allData 所有服务项目
     * @param selectData  已选中的服务项目
     * @returns {*} 更改状态后的所有服务项目
     */
    filterData(allData,selectData){
      if(typeof (selectData) != 'undefined'){
        for(let all of allData) {
          for(let type of all.list){
            for(let select of selectData){
              if(type.id == select.id){
                type.checked = select.checked
              }
            }
          }

        }
      }
      return allData
    },


    meetingClick(index){
      this.changeData('meeting',index)
    },

    foodClick(index){
      this.changeData('food',index)
    },

    projectClick(index){
      this.changeData('project',index)
    },

    defendClick(index){
      this.changeData('defend',index)
    },

    /**
     * 更改点击项目数据
     * @param flag 类型
     * @param index 当前点击项目索引
     */
    changeData(flag,index){
      let data,       //当前点击项目数据
          checked,    //当前点击项目选中状态
          name,       //当前点击项目name
          selectData  = this.serviceData //当前类型已选中的所有项目

      switch(flag) {
        //会议
        case 'meeting':
          data = this.serviceAllData.meetingData[index]
          break;
        //餐饮
        case 'food':
          data = this.serviceAllData.foodData[index]
          break;
        //工程部
        case 'project':
          data = this.serviceAllData.projectData[index]
          break;
        //保卫部
        case 'defend':
          data = this.serviceAllData.defendData[index]
          break;

        default:
      }

      checked= data.checked,
      name = data.name

      if(checked){
        data.checked = false
        //将取消选中的项目从数组中移除
        selectData.splice(selectData.findIndex( item => item.name === name), 1)
      }else{
        data.checked = true
        selectData.push(data)
      }

      //判断已选中的数据中，有没有收费项目，如果有则显示顶部收费提示
      let chargeIndex;
      chargeIndex = selectData.findIndex(item => {
        return item.charge == true;
      });
      if(chargeIndex != -1){
        this.charge.noticeShow = true
      }else{
        this.charge.noticeShow = false
      }

    },


    //打开收费提示
    showChargeDialog(){
      this.$dialog.alert({
        message: '您选择的服务有收费项目，如有疑问请拨打联系电话'
      }).then(() => {
        // on close
      });
    },

    //重写顶部左侧按钮
    settingNavBar(){
      this.$parent.childClickLeft = true
    },

    //顶部左侧点击事件
    onClickLeft(){
      this.backIndex()
    },

    //打开车辆选择页面
    showCar(){
      this.$router.push({
        path: 'meeting/service/car',
        name: 'meeting-service-car',
        params: {
          formData: this.formData,
          serviceData: this.serviceData,
          note: this.note,
          carData: this.carData
        }
      })
    },

    //返回
    backIndex(){
      this.$router.push({
        path: 'meeting/internal/index',
        name: 'meeting-internal-index',
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

  .meeting-service-index{
    .service-box{
      background: #fff;
      overflow: hidden;
      padding: 10px 0;
      &.last{
        margin-bottom: 68px;
      }
      .service-item-list{
        display: flex;
        flex-wrap: wrap;
      }
    }
    .service-tip{
      p{
        padding: 0 16px;
        font-size: 0;
        span{
          font-size: @font-size-sm;
          padding: 5px 0;
          line-height: 1.5;
        }
      }
    }
    .meeting-service__btn{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .service-car{

    }
  }

</style>