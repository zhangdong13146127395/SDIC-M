<template>

  <div class="meeting-service-car">

    <div class="car-num">
      <van-cell-group>
        <van-field
          v-model="carData.carSum"
          label="预留车位数量（辆）"
          placeholder="请输入"
          input-align	="right"
        />
      </van-cell-group>
    </div>

    <meeting-title title="车牌号"/>
    <div class="car-list">
      <template v-for="(item, index) in carData.carNumData">
        <sino-swipe-cell
          :btns="swipeCellBtns"
          :params="index"
          :key="index"
        >
          <van-cell :border="false" :title="`${item}`" />
        </sino-swipe-cell>
      </template>
      <!-- <van-swipe-cell class="sino-swipe-cell van-hairline--bottom" v-for="(item, index) in carData.carNumData" :key="index" >
        <van-cell :border="false" :title="`${item}`" />
        <div class="cell__right cell__right--edit" slot="right" @click="editCarData(index)">
          <span>编辑</span>
        </div>
        <div class="cell__right cell__right--delete" slot="right" @click="delCarData(index)">
          <span>删除</span>
        </div>
      </van-swipe-cell> -->
      <meeting-add-btn title="增加车牌号" @click="newCar"></meeting-add-btn>

    </div>

    <div class="car-bottom__btn">
      <van-row>
        <van-col span="12"><van-button plain type="info" size="large" @click="backService">取消</van-button></van-col>
        <van-col span="12"><van-button type="info" size="large" @click="carDataSave">确定</van-button></van-col>
      </van-row>
    </div>

    <van-popup v-model="carAddShow" closeable position="bottom" :style="{ height: 'auto' }" >
      <div class="car-add">
        <div class="car-add__input">
          <div class="item">
            <span>{{carAddData.carNum[0]}}</span>
          </div>
          <div class="item">
            <span>{{carAddData.carNum[1]}}</span>
          </div>
          <div class="item">
            <span>{{carAddData.carNum[2]}}</span>
          </div>
          <div class="item">
            <span>{{carAddData.carNum[3]}}</span>
          </div>
          <div class="item">
            <span>{{carAddData.carNum[4]}}</span>
          </div>
          <div class="item">
            <span>{{carAddData.carNum[5]}}</span>
          </div>
          <div class="item">
            <span>{{carAddData.carNum[6]}}</span>
          </div>

          <div class="item" v-if="carAddData.newEnergy">
            <span>{{carAddData.carNum[7]}}</span>
          </div>
        </div>
        <van-switch-cell v-model="carAddData.newEnergy" title="是否为新能源" @change="changeEnergy"/>

        <!-- 省份选择 -->
        <div class="car-add__province" v-if="carAddData.cursor == 0">
          <div class="item" v-for="(item, index) in provinceData" :key="index" @click="clickProvince(item)">{{item}}</div>
          <div class="item del" @click="delInputNum"><van-icon name="delete" /></div>
        </div>

        <!-- 数字、英文选择 -->
        <div class="car-add__province" v-if="carAddData.cursor != 0">
          <div class="item" v-for="(item, index) in wordData" :key="index" @click="clickProvince(item)">{{item}}</div>
          <div class="item del" @click="delInputNum"><van-icon name="delete" /></div>
        </div>

        <div class="car-add__btn">
          <van-row>
            <van-col span="12"><van-button plain type="info" size="large" @click="emptyCarAddData">取消</van-button></van-col>
            <van-col span="12"><van-button type="info" size="large" @click="popupSave">保存</van-button></van-col>
          </van-row>
        </div>

      </div>

    </van-popup>



  </div>

</template>

<script>
import { Dialog } from 'vant';
export default {
  //公司外参会人员
  name: 'meeting-service-car',
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      //是否显示添加车辆弹窗
      carAddShow:false,
      //添加车牌号弹窗数据
      carAddData:{
        //是否为编辑
        isEdit:false,
        //编辑的数据id
        editId:0,
        //是否为新能源
        newEnergy:false,
        //添加车牌号时的当前位置
        cursor:0,
        //添加的车牌号
        carNum:[],
      },
      //车牌号数据
      carData:{
        //预留车位数量
        carSum:'',
        //车牌号列表
        carNumData:[]
      },
      //车牌号省份
      provinceData:[
        '京','津','渝','沪','冀','豫','鲁','晋','湘','鄂','粤','桂','贵','赣','云','川','闽','藏','陕',
        '甘','宁','青','蒙','辽','吉','黑','新','浙','苏','皖','琼'
      ],
      //车牌号省份
      wordData:[
        '1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F','G','H','I','G','K','L','M','N','O','P','Q','R','S',
        'T','U','V','W','X','Y','Z'
      ],
      //从表单页传来的数据，返回时将数据传回
      formData:{},
      serviceData:[],
      note:'',
      // 滑动单元格
      swipeCellBtns: [
        {
          text: '编辑',
          type: 'info',
          handler: this.editCarData,
        },
        {
          text: '删除',
          type: 'danger',
          handler: this.delCarData,
        }
      ]
    }
  },
  components: {
    'meetingTitle': () => import('../components/meeting-title'),
    'meetingAddBtn': () => import('../components/meeting-add-btn'),
    'sino-swipe-cell': () => import('@/components/sino-swipe-cell')
  },
  mounted(){
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
      }

      if(typeof(this.$route.params.serviceData) != 'undefined'){
        this.serviceData = this.$route.params.serviceData
      }

      if(typeof(this.$route.params.note) != 'undefined'){
        this.note = this.$route.params.note
      }

      if(typeof(this.$route.params.carData) != 'undefined'){
        this.carData = this.$route.params.carData
      }

    },

    /**
     * 弹窗相关操作
     */
    //打开添加车牌号弹窗
    newCar(){
      this.carAddShow = true;
    },

    //添加车辆弹窗-点击省份事件
    clickProvince(name){
      let cursor = this.carAddData.cursor
      //新能源8位，普通车牌7位
      if(this.carAddData.newEnergy){
        if(cursor < 8){
          this.carAddData.carNum.push(name)
          this.carAddData.cursor = cursor + 1
        }
      }else{
        if(cursor < 7){
          this.carAddData.carNum.push(name)
          this.carAddData.cursor = cursor + 1
        }
      }
    },

    //删除最后一位已经输入的号码
    delInputNum(){
      this.carAddData.carNum.splice(-1,1)
      this.carAddData.cursor--
    },

    //切换新能源
    changeEnergy(){
      let carNum = this.carAddData.carNum
      //从新能源切换到普通车牌 删除新能源车牌最后一位
      if(!this.carAddData.newEnergy && carNum.length >7){
        carNum.splice(7,1)
        this.carAddData.cursor--
      }
    },

    //弹窗保存按钮
    popupSave(){
      let arr = this.carAddData.carNum.join("")
      //判断是否为编辑
      if(this.carAddData.isEdit){
        this.carData.carNumData.splice( this.carAddData.editId, 1 , arr)
      }else{
        this.carData.carNumData.push(arr)
      }
      this.carAddData.editId = 0
      this.carAddData.isEdit = false
      this.carAddShow = false
      this.emptyCarAddData()
    },

    //清空弹窗数据
    emptyCarAddData(){
      this.carAddShow = false
      this.carAddData.carNum = []
      this.carAddData.cursor = 0
    },


    /**
     * 车牌号列表相关操作
     */
    //删除车牌列表数据
    delCarData(id){
      Dialog.confirm({
        message: '确定删除吗'
      }).then(() => {
        this.carData.carNumData.splice(id,1)
      }).catch(() => {
        // on cancel
      });
    },

    //编辑车牌列表数据
    editCarData(id){
      let data = this.carData.carNumData[id].split("");
      this.carAddData.carNum = data;
      this.cursor = data.length - 1
      this.carAddShow = true
      if(data.length > 8){
        this.carAddData.newEnergy = true
      }
      this.carAddData.editId = id
      this.carAddData.isEdit = true
    },

    carDataSave(){
      this.$router.push({
        path: 'meeting/service/index',
        name: 'meeting-service-index',
        params: {
          formData: this.formData,
          serviceData: this.serviceData,
          note: this.note,
          carData: this.carData
        }
      })
    },


    //重写顶部左侧按钮
    settingNavBar(){
      this.$parent.childClickLeft = true
    },

    //顶部左侧点击事件
    onClickLeft(){
      this.backService()
    },

    //返回
    backService(){

      this.$router.push({
        path: 'meeting/service/index',
        name: 'meeting-service-index',
        params: {
          formData: this.formData,
          serviceData: this.serviceData,
          note: this.note,
        }
      })

    }


  }

}
</script>

<style lang="less">

  .meeting-service-car{
    .van-cell__title{
      flex: 1 !important;
      width: auto !important;
    }
    .car-num{
      padding-top: @spacing-3;
      padding-bottom: @spacing-3;
      .van-field__label{
        width: 150px;
      }
    }
    .car-add{
      padding-top: 45px;
      .car-add__input{
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 @spacing-2;
        margin-bottom: 10px;
        .item{
          width: 37px;
          height: 37px;
          border: 1px solid @border-color;
          overflow: hidden;
          span{
            display: block;
            width: 100%;
            height: 100%;
            line-height: 38px;
            text-align: center;
            font-size: @font-size-xl;
          }
          input{
            width: 100%;
            height: 100%;
            line-height: 37px;
            text-align: center;
            font-size: @font-size-xl;
            margin: 0;
            padding: 0;
            display: block;
            outline: none;
            border: 0;
          }
        }
      }
      .car-add__province{
        margin-top: 10px;
        display: flex;
        padding: 0 @spacing-4;
        justify-content: space-between;
        flex-wrap: wrap;
        .item{
          margin: 5px;
          width: 37px;
          height: 37px;
          border: 1px solid @border-color;
          overflow: hidden;
          line-height: 37px;
          text-align: center;
          font-size: @font-size-xl;
          &.del{
            width: 135px;
            .van-icon{
              padding-top: 9px;
            }
          }
        }
      }
      .car-add__btn{
        margin-top: 20px;
      }
    }
    .car-bottom__btn{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .car-list{
      margin-bottom: 68px;
      .van-cell__title{

      }
    }

  }

</style>