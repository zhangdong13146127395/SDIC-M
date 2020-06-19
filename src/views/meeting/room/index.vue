<template>

  <div class="meeting-room-index">

    <!-- 搜索框-->
    <form action="/">
      <van-search placeholder="找会议室名称" v-model="searchName" @search="onSearch"/>
    </form>

    <!-- 时间选择 开始 -->
    <div class="conditions">
      <van-row>
        <van-col span="19">
          <div class="conditions-prev" @click="prevDay">前一天</div>
          <div class="conditions-time" @click="timeData.isShow=true">{{roomTime}}<van-icon name="arrow-down" /></div>
          <div class="conditions-next" @click="nextDay">后一天</div>
        </van-col>
        <van-col span="5">
          <div class="conditions-filtrate" @click="filtrate.isShow=true"><van-icon name="filter-o" />筛选</div>
        </van-col>

      </van-row>
    </div>
    <!-- 时间选择 结束 -->

    <van-tabs v-model="tabActive" @click="tabClick">
      <van-tab title="公共会议室" name="public"></van-tab>
      <van-tab title="本单位会议室" name="local"></van-tab>
    </van-tabs>

    <sino-list
      class="sino-list"
      ref="sinoList"
      v-model="roomListData"
      :page-size="page.pageSize"
      :head-height="40"
      min-height="calc(100vh - 5.49333rem)"
      :load="getList"
    >
      <div class="meeting-room-list">
      <van-collapse v-for="(item, index) in roomListData" :key="index"  v-model="activeNames">
        <van-collapse-item :name="index">
          <!-- 会议室基本信息 -->
          <div slot="title">
            <div class="meeting-room-list--t"><span>{{item.name}}</span><div class="meeting-room-list--c" v-if="item.camera"><img :src="`${baseUrl}images/meeting/camera.png`" alt=""></div></div>
            <div class="meeting-room-list--d">容纳人数：{{item.num}}人</div>
          </div>
          <!-- 会议室占用情况表格 -->
          <room-state :occupy-data = item.occupyData></room-state>
          <!-- 会议室按钮 -->
          <div class="meeting-room-list__btn">
            <van-button  size="small" type="primary" @click="showListSelect(index)">选择时间</van-button>
            <van-button  size="small" @click="showRoomDetails(index)">查看详情</van-button>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    </sino-list>

    <!-- 筛选 -->
    <van-popup v-model="filtrate.isShow" position="right" closeable :style="{ height: '100%',width:'80%' }">
      <div class="filtrate-box ">

        <div class="filtrate--title van-ellipsis van-hairline--top">选择会议时间</div>
        <div class="conditions-time" @click="timeData.isShow=true">{{roomTime}}<van-icon name="arrow-down" /></div>

        <div class="filtrate--title van-ellipsis van-hairline--top">会议室状态</div>
        <div class="filtrate--group">
          <van-radio-group v-model="filtrate.state">
            <sino-radio :isSelected=true :name="`${item.name}`" v-for="(item, index) in filtrate.stateData" :key="index">{{item.value}}</sino-radio>
          </van-radio-group>
        </div>

        <div class="filtrate--title van-ellipsis van-hairline--top">人数</div>
        <div class="filtrate--group">
          <van-radio-group v-model="filtrate.num">
            <sino-radio :name="`${item.name}`" v-for="(item, index) in filtrate.numData" :key="index">{{item.value}}</sino-radio>
          </van-radio-group>
        </div>

        <div class="filtrate--title van-ellipsis van-hairline--top">设备</div>
        <div class="filtrate--group">

          <van-checkbox-group v-model="filtrate.device">
            <sino-checkbox :name="`${item.name}`" v-for="(item, index) in filtrate.deviceData" :key="index">{{item.value}}</sino-checkbox>
          </van-checkbox-group>

        </div>
        <div class="meeting-room--btn" >
          <van-row>
            <van-col span="12"><van-button plain type="" size="large" @click="reSet">重置</van-button></van-col>
            <van-col span="12"><van-button type="info" size="large" @click="filtrateBtn">确定</van-button></van-col>
          </van-row>
        </div>
      </div>

    </van-popup>

    <!-- 日期选择 -->
    <van-popup v-model="timeData.isShow" position="bottom" :style="{ height: 'auto' }" >
      <van-datetime-picker
        v-model="timeData.currentDate"
        type="date"
        :min-date="timeData.minDate"
        @confirm="clickDate"
        @cancel="timeData.show=false"
      />
    </van-popup>

    <!-- 时间选择 -->
    <van-popup v-model="listSelect.isShow" position="bottom" :style="{ height: 'auto' }" >
      <van-cell-group>
        <van-cell :title="`${listSelect.name}`"/>
        <van-cell title="地点" :label="`${listSelect.location}`" />
        <van-field
          :value = "timestamp2time(listSelect.startTime)"
          required
          clearable
          label="开始时间"
          placeholder="请输入开始时间"
          @click="listSelect.startShow = true"
        />
        <van-field
          :value = "timestamp2time(listSelect.endTime)"
          required
          clearable
          label="结束时间"
          placeholder="请输入结束时间"
          @click="listSelect.endShow = true"
        />
      </van-cell-group>
      <van-row>
        <van-col span="12"><van-button type="default" size="large" @click="listSelect.isShow = false">取消</van-button></van-col>
        <van-col span="12"><van-button type="info" size="large" @click="addTime">确定</van-button></van-col>
      </van-row>
    </van-popup>

    <!-- 开始时间选择 -->
    <van-popup v-model="listSelect.startShow" position="bottom" :style="{ height: 'auto' }" >
      <van-datetime-picker
        v-model="listSelect.startTimePicker"
        type="datetime"
        :min-hour="8"
        :max-hour="23"
        :formatter="formatter"
        :filter="filterMinute5"
        @cancel="listSelect.startShow=false"
        @confirm="confirmStartTime"
      />
    </van-popup>

    <!-- 结束时间选择 -->
    <van-popup v-model="listSelect.endShow" position="bottom" :style="{ height: 'auto' }" >
      <van-datetime-picker
        v-model="listSelect.endTimePicker"
        type="datetime"
        :min-hour="8"
        :max-hour="23"
        :formatter="formatter"
        :filter="filterMinute5"
        @cancel="listSelect.endShow=false"
        @confirm="confirmEndTime"
      />
    </van-popup>

    <!-- 会议室详情弹窗 -->
    <van-popup v-model="roomDetailsShow" position="bottom" :style="{ height: '90%' }" >
      <div class="room-details" v-if="roomListData.length > 0">

        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in roomListData[roomDetailsId].pic" :key="index" @click="showImg(index)"><img :src="item" alt=""></van-swipe-item>
        </van-swipe>

        <div class="room-details-item small">
          <div class="room-details__title">会议室基本信息</div>
          <van-cell-group>
            <van-cell title="会议室名称" :value="roomListData[roomDetailsId].name" />
            <van-cell title="状态" :value="roomListData[roomDetailsId].state" />
            <van-cell title="地点" :value="roomListData[roomDetailsId].location"  />
            <van-cell title="是否支持视频" :value="roomListData[roomDetailsId].camera?'是':'否'"  />
            <van-cell title="容纳人数" :value="roomListData[roomDetailsId].num"  />
            <van-cell title="是否本单位会议室" :value="roomListData[roomDetailsId].myroom?'是':'否'"  />
            <van-cell title="设备" :value="roomListData[roomDetailsId].equipment"  />
          </van-cell-group>
        </div>

        <!--
        <div class="room-details-item">
          <div class="room-details__title">会议室详情</div>
          <van-cell-group>
            <van-cell title="会议室说明" :value="roomListData[roomDetailsId].explain" />
            <van-cell title="会议室功能" :value="roomListData[roomDetailsId].function" />
            <van-cell title="会议室详情" :value="roomListData[roomDetailsId].content" />
          </van-cell-group>
        </div>
        -->

      </div>
    </van-popup>

  </div>

</template>

<script>
import dayjs from 'dayjs'
import { ImagePreview } from 'vant';
import FormatterDate from '@/components/mixins/formatter/formatter-date'
import { listMeetingRoom } from '@/api/meeting'
export default {

  name: 'meeting-room-index',
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      //从表单页传来的数据，返回时将数据传回
      formData:{},

      page: {
        pageNum: 1,
        pageSize: 10,
      },

      //会议室详情
      roomDetailsShow:false,
      roomDetailsId:0,

      //顶部搜索
      searchName:'',
      //显示的会议时间
      roomTime:'',
      //会议室时间时间戳
      timeStamp:'',

      //tab切换
      tabActive:'public',

      //会议室列表展开的项目
      activeNames:[],
      //会议室列表数据
      roomListData:[],
      /*
      roomListData:[
        {
          //会议室名称
          name:'',
          //会议室人数
          num:'',
          //地点
          location:'',
          //是否有摄像头
          camera:Boolean,
          //状态
          state:'',
          //是否本单位会议室
          myroom:false,
          //设备
          equipment:'',
          //会议室说明
          explain:'',
          //会议室功能
          function:'',
          //会议室详情
          content:'',
          //占用情况
          occupyData:[
            {
              //当前时间字符串
              timeStamp:'',
              //会议名称
              name:'',
              //参会人数
              num:'',
              //手机号
              mobile:'',
              //办公电话
              tel:'',
              //开始年月日
              //year:'',
              //开始时间
              start:'',
              //结束时间
              end:'',
              //占用状态 0:空闲 1:申请中 2:审批中 3:已占用
              state:Number
            }
          ]
        },
      ],
      */
      //列表时间选择弹窗
      listSelect:{
        isShow:false,
        startShow:false,
        endShow:false,
        id:Number,
        name:'',
        startTime:'',
        endTime:'',
        location:'',
        startTimePicker:new Date(),
        endTimePicker:new Date(),
      },

      //筛选
      filtrate:{
        isShow:false,
        state:[],
        stateData:[{name:2,value:'全部'},{name:0,value:'已预订'},{name:1,value:'空闲'}],
        num:[],
        numData:[{name:'0-10',value:'0-10人'},{name:'10-15',value:'10-15人'},{name:'15-30',value:'15-30人'},{name:'30-40',value:'30-40人'},{name:'40',value:'40人以上'}],
        device:[],
        deviceData:[{name:'projector',value:'投影仪'},{name:'phone',value:'电话'},{name:'video',value:'视频'}]
      },

      //日期选择数据
      timeData:{
        //弹窗是否显示
        isShow:false,
        //选择的时间
        currentDate: new Date(),
        minDate:new Date(),
        week:['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
      },

    }
  },
  mixins: [ FormatterDate ],
  components: {
    'sinoCheckbox': () => import('@/components/sino-checkbox'),
    'sinoRadio': () => import('@/components/sino-radio'),
    'roomState': () => import('../components/meeting-room-state'),
    'sino-list': () => import('@/components/sino-list'),
  },
  watch: {

  },
  mounted(){
    this.getParentData()
    this.settingNavBar()
    this.defaultTime()
    //this.getList()
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

    },

    /** 会议列表 **/
    //获取列表
    async getList(page){

      //关闭所有已经打开的下拉详情
      //this.activeNames = []

      //筛选条件
      let type = this.tabActive,          //会议室类型
          status = this.filtrate.state,   //会议室状态
          number = this.filtrate.num,     //容纳人数
          device = this.filtrate.device,  //设备
          search = this.searchName,       //搜索
          time = dayjs(this.timeStamp).format('YYYY-MM-DD')

      //获取数据
      let data = await listMeetingRoom({roomName:search, date:time, type:type, status:status, number:number, device:device, ...page})

      let tempArr = [],
          _this = this
      if(data.total > 0){

        let listData = data.list

        listData.forEach(function (value) {

          //占用情况
          let timeList = value.timeList,
            tempOccupy = []
          if(timeList.length > 0){
            timeList.forEach(function(time){

              let subFlag

              if(time.meeting.subflag == '00'){
                //申请中
                subFlag = 1
              }else if(time.meeting.subflag == '01'){
                //审批中
                subFlag = 2
              }else if(time.meeting.subflag == '02'){
                //已占用
                subFlag = 3
              }else{
                subFlag = 0
              }

              tempOccupy.push({
                timeStamp:_this.timeStamp,
                name:time.meeting.meetingName,
                num:time.meeting.attendingNum,
                mobile:'',
                tel:'',
                start:time.meeting.beginTime,
                end:time.meeting.endTime,
                state:subFlag
              })
            })
          }else{
            tempOccupy = []
          }

          //会议室信息
          tempArr.push({
            meetId:value.id,
            name:value.roomName,
            num:value.roomNum,
            location:value.roomAddress,
            camera:value.isVideo == "1" ? true : false,
            state:value.roomStatus == "enable" ? '启用' : '停用',
            myroom:value.isLocal == "1" ? true : false,
            equipment:value.roomDevice,
            explain:value.roomExplain,
            function:value.roomFunction,
            content:value.roomDetails,
            pic:'',
            occupyData:tempOccupy
          })
        })

      }

      this.roomListData = tempArr

      let obj = {}
          obj.list = tempArr
          obj.total = tempArr.length

      return obj

    },

    //打开选择时间窗口
    showListSelect(index){
      this.listSelect.id = index
      this.listSelect.meetId = this.roomListData[index].meetId,
      this.listSelect.name=this.roomListData[index].name,
      this.listSelect.location=this.roomListData[index].location,
      this.listSelect.isShow = true
    },
    //开始时间确定
    confirmStartTime(v){
      this.listSelect.startTime = dayjs(v).valueOf()
      this.listSelect.startShow = false
    },
    //结束时间确定
    confirmEndTime(v){
      this.listSelect.endTime = dayjs(v).valueOf()
      this.listSelect.endShow = false
    },
    //时间戳转时间
    timestamp2time(timeStamp){
      if(timeStamp != ''){
        return dayjs(timeStamp).format('YYYY-MM-DD HH:mm')
      }
    },
    //时间选择弹窗确定
    addTime(){
      let name = this.listSelect.name,
          location = this.listSelect.location,
          startTime = this.timestamp2time(this.listSelect.startTime),
          endTime = this.timestamp2time(this.listSelect.endTime),
          meetId = this.listSelect.meetId

      if(startTime !='' && endTime !=''){
        this.formData.meetId = meetId
        this.formData.room = name
        this.formData.location = location
        this.formData.time[0].beginTime = startTime
        this.formData.time[0].endTime = endTime
        //开启倒计时
        this.formData.countDown = true
        this.backIndex()
      }else{
        this.$toast('开始时间或结束时间不能为空');
      }


    },
    //打开会议室详情
    showRoomDetails(id){
      this.roomDetailsId = id
      this.roomDetailsShow = true
    },

    /** 筛选 **/
    //筛选重置
    reSet(){
      this.filtrate.state = []
      this.filtrate.num = []
      this.filtrate.device = []
    },
    //筛选确定
    filtrateBtn(){
      this.filtrate.isShow = false
      this.$refs['sinoList'].onRefresh()
    },

    /** 列表时间选择 **/
    //默认时间
    defaultTime(){
      this.setData(dayjs().startOf('day').valueOf())
    },

    //前一天
    prevDay(){
      this.setData(Date.parse(dayjs(this.timeStamp).subtract(1, 'day')))
      this.$refs['sinoList'].onRefresh()
    },

    //后一天
    nextDay(){
      this.setData(Date.parse(dayjs(this.timeStamp).add(1, 'day')))
      this.$refs['sinoList'].onRefresh()
    },

    //日期控件点击事件
    clickDate(v){
      this.setData(Date.parse(dayjs(v)))
      this.timeData.isShow = false
      this.$refs['sinoList'].onRefresh()
    },

    //设置时间
    setData(timeStamp){
      this.timeStamp = timeStamp;
      this.roomTime = dayjs(timeStamp).format('YYYY-MM-DD')+' '+this.timeData.week[dayjs(timeStamp).day()]
    },

    /** 搜索 **/
    onSearch(){
      this.$refs['sinoList'].onRefresh()
    },

    /** tab点击 **/
    tabClick(){
      this.$refs['sinoList'].onRefresh()
    },

    /** 跳转 **/
    //重写顶部左侧按钮
    settingNavBar(){
      this.$parent.childClickLeft = true
    },

    //顶部左侧点击事件
    onClickLeft(){
      this.backIndex()
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

    },

    /** 查看图片 **/
    showImg(index){
      let arr = this.roomListData[this.roomDetailsId].pic
      ImagePreview({
        images: arr,
        startPosition: index,
      });
    }
  }

}
</script>

<style lang="less">

  .meeting-room-index{
    .conditions{
      font-size: @font-size-sm;
      color: @gray-darker;
      background: #fff;
      padding: @spacing-3;
      .conditions-prev , .conditions-time , .conditions-next{
        float: left;
      }
      .conditions-time{
        width: 170px;
        text-align: center;
        .van-icon{
          margin-left: 5px;
        }
      }
      .conditions-filtrate{
        text-align: center;
        border-left: 1px solid @border-color;
        .van-icon{
          margin-right: 5px;
        }
      }
    }
    .meeting-room-list{
      .meeting-room-list--t{
        font-weight: 700;
        overflow: hidden;
        line-height: 1.3;
        span{
          display: block;
          float: left;
        }
      }
      .meeting-room-list--d{
        color: @gray-darker;
      }
      .meeting-room-list--c{
        width: 14px;
        height: 16.6px;
        float: left;
        padding-left: 10px;
      }
      .meeting-room-list__btn{
        padding-top: 10px;
      }
    }
    .filtrate-box{
      padding-top: 49px;
      .filtrate--title{
        font-size: @font-size-sm;
        padding: @spacing-3 @spacing-4;
      }
      .conditions-time{
        font-size: @font-size-sm;
        color: @gray-darker;
        padding: 0 @spacing-4 @spacing-4 @spacing-4;
        .van-icon{
          margin-left: 5px;
        }
      }
      .filtrate--group{
        padding: 0 @spacing-4 @spacing-4 @spacing-4;
        .van-checkbox-group , .van-radio-group{
          display: flex;
          flex-wrap: wrap;
          .sino-checkbox{
            width: 79px;
            margin: 5px;
          }
        }
      }
      .meeting-room--btn{
        position: fixed;
        bottom: 0;
        width: 100%;
      }
    }
    .room-details{
      background: @background-color;

      .room-details-item{
        margin-bottom: @spacing-5;
        background: #fff;
      }
      .room-details__title{
        font-size: @font-size-base;
        font-weight: 700;
        padding: @spacing-3 @spacing-4;
      }
      .small{
        .van-cell__title{
          flex: 1.5;
        }
      }
      .van-cell__title{
        flex: 1;
      }
      .van-cell__value{
        flex: 2;
        text-align: left;
      }
    }
  }

</style>