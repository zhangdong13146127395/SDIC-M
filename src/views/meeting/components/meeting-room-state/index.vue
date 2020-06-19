<template>

  <div class="meeting-room-state">
    <!-- 图例 开始 -->
    <div class="meeting-room-state__legend">
      <div class="item">
        <i></i>
        <span>空闲</span>
      </div>
      <div class="item apply">
        <i></i>
        <span>申请中</span>
      </div>
      <div class="item examine">
        <i></i>
        <span>审批中</span>
      </div>
      <div class="item none">
        <i></i>
        <span>已占用</span>
      </div>
    </div>
    <!-- 图例 结束 -->

    <!-- 时间段1 开始 -->
    <div class="section">
      <div class="room-state__h">
        <span>8:00</span>
        <span>9:00</span>
        <span>10:00</span>
        <span>11:00</span>
      </div>
      <div class="room-state__select-box">
        <!-- 15分钟刻度 -->
        <div class="room-state__item" :class="checkLine(index)" v-for="(item, index) in timeArr.time1" :key="index">
          <!-- 5分钟刻度 -->
          <div class="room-state--occupy" v-for="(item, index) in item.child" :key="index" :class="checkState(item.state)" @click="showInfo(item.infoId)"></div>
        </div>

      </div>
      <div class="room-state__d">
        <span>8:30</span>
        <span>9:30</span>
        <span>10:30</span>
        <span>11:30</span>
      </div>
    </div>
    <!-- 时间段1 结束 -->

    <!-- 时间段2 开始 -->
    <div class="section">
      <div class="room-state__h">
        <span>12:30</span>
        <span>13:30</span>
        <span>14:30</span>
        <span>15:30</span>
      </div>
      <div class="room-state__select-box">
        <!-- 15分钟刻度 -->
        <div class="room-state__item" :class="checkLine(index)" v-for="(item, index) in timeArr.time2" :key="index">
          <!-- 5分钟刻度 -->
          <div class="room-state--occupy" v-for="(item, index) in item.child" :key="index" :class="checkState(item.state)"></div>
        </div>
      </div>
      <div class="room-state__d">
        <span>12:00</span>
        <span>13:00</span>
        <span>14:00</span>
        <span>15:00</span>
      </div>
    </div>
    <!-- 时间段2 结束 -->

    <!-- 时间段3 开始 -->
    <div class="section">
      <div class="room-state__h">
        <span>16:00</span>
        <span>17:00</span>
        <span>18:00</span>
        <span>19:00</span>
      </div>
      <div class="room-state__select-box">
        <!-- 15分钟刻度 -->
        <div class="room-state__item" :class="checkLine(index)" v-for="(item, index) in timeArr.time3" :key="index">
          <!-- 5分钟刻度 -->
          <div class="room-state--occupy" v-for="(item, index) in item.child" :key="index" :class="checkState(item.state)"></div>
        </div>
      </div>
      <div class="room-state__d">
        <span>16:30</span>
        <span>17:30</span>
        <span>18:30</span>
        <span>19:30</span>
      </div>
    </div>
    <!-- 时间段3 结束 -->

    <!-- 时间段4 开始 -->
    <div class="section">
      <div class="room-state__h">
        <span>20:00</span>
        <span>21:00</span>
        <span>22:00</span>
        <span>23:00</span>
      </div>
      <div class="room-state__select-box">
        <!-- 15分钟刻度 -->
        <div class="room-state__item" :class="checkLine(index)" v-for="(item, index) in timeArr.time4" :key="index">
          <!-- 5分钟刻度 -->
          <div class="room-state--occupy" v-for="(item, index) in item.child" :key="index" :class="checkState(item.state)"></div>
        </div>
      </div>
      <div class="room-state__d">
        <span>20:30</span>
        <span>21:30</span>
        <span>22:30</span>
        <span>23:30</span>
      </div>
    </div>
    <!-- 时间段4 结束 -->

    <!-- 占用信息弹窗 开始 -->
    <van-popup v-model="infoData.isShow" closeable position="bottom" :style="{ width:'100%', height: 'auto' }" >
      <div class="meeting-room__info-box">
        <van-cell-group>
          <van-cell title="会议名称:" :value="`${this.infoData.name}`" />
          <van-cell title="参会人数:" :value="`${this.infoData.num}`" />
          <van-cell title="手机号码:" :value="`${this.infoData.mobile}`" />
          <van-cell title="办公电话:" :value="`${this.infoData.tel}`" />
          <van-cell title="会议时间:" :value="`${this.infoData.start}-${this.infoData.end}`" />
        </van-cell-group>
      </div>
    </van-popup>
    <!-- 占用信息弹窗 结束 -->


  </div>

</template>

<script>
import dayjs from 'dayjs'
export default {
  //会议-首页
  name: 'meeting-room-state',
  data() {
    return {
      occupy:[],
      //会议室预约情况弹窗信息
      infoData:{
        isShow:false,
        //会议室名称
        name:'',
        //会议室人数
        num:'',
        //手机号码
        mobile:'',
        //办公号码
        tel:'',
        //会议开始年月日
        year:'',
        //会议开始时间
        start:'',
        //会议结束时间
        end:'',
      },
      //房间状态显示
      //根据timeArr拆分，在页面中分别循环显示用，只方便显示用
      timeArr:{
        //第一行 8:00--12:00
        time1:[],
        //第二行 12:00--16:00
        time2:[],
        //第三行 16:00--20:00
        time3:[],
        //第四行 20:00--24:00
        time4:[],
      },
      //房间状态
      //根据父组件占用情况，修改该数组中对应的位置，占用逻辑主要操作该数组
      //state 占用状态 0:空闲 1:申请中 2:审批中 3:已占用
      //occupy 占用情况 0:全部占用 1:占用5分钟 2:占用10分钟
      roomState:[
        { startHour:8, minute:'00', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:8, minute:'15', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:8, minute:'30', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:8, minute:'45', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:9, minute:'00', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:9, minute:'15', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:9, minute:'30', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:9, minute:'45', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:10, minute:'00', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:10, minute:'15', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:10, minute:'30', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:10, minute:'45', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:11, minute:'00', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:11, minute:'15', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:11, minute:'30', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:11, minute:'45', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:12, minute:'00', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:12, minute:'15', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:12, minute:'30', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:12, minute:'45', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:13, minute:'00', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:13, minute:'15', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:13, minute:'30', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:13, minute:'45', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:14, minute:'00', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:14, minute:'15', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:14, minute:'30', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:14, minute:'45', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:15, minute:'00', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:15, minute:'15', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:15, minute:'30', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:15, minute:'45', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:16, minute:'00', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:16, minute:'15', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:16, minute:'30', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:16, minute:'45', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:17, minute:'00', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:17, minute:'15', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:17, minute:'30', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:17, minute:'45', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:18, minute:'00', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:18, minute:'15', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:18, minute:'30', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:18, minute:'45', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:19, minute:'00', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:19, minute:'15', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:19, minute:'30', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:19, minute:'45', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:20, minute:'00', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:20, minute:'15', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:20, minute:'30', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:20, minute:'45', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:21, minute:'00', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:21, minute:'15', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:21, minute:'30', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:21, minute:'45', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:22, minute:'00', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:22, minute:'15', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:22, minute:'30', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:22, minute:'45', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:23, minute:'00', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:23, minute:'15', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:23, minute:'30', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
        { startHour:23, minute:'45', child:[ { state:0, infoId:'' }, { state:0, infoId:'' }, { state:0, infoId:'' } ] },
      ],
      tempState:[]
    }
  },
  watch: {
    occupyData: {
      //immediate: true,
      deep: true,
      handler (val) {
        this.occupy = val
        this.setRoom()
      }
    }
  },
  props: {
    occupyData:{
      type:Array
    }
  },
  mounted(){

    this.occupy = this.occupyData
    //备份原始房间状态，清空时将备份的恢复
    this.tempState = JSON.parse(JSON.stringify(this.roomState));

    this.setRoom()
  },
  methods: {

    //根据父组件传来的数组，设置会议室占用情况
    setRoom(){

      //清空已有占用情况
      this.cleanData()

      //根据获取的数据，设置占用情况
      let data = this.occupy
      if(data.length > 0){
        for(let i = 0; i < data.length; i++){
          this.setRoomData(data[i].state,data[i].start,data[i].end,i,data[i].timeStamp)
        }
      }

      //重新将占用情况分割4份，方便循环显示
      this.reSetTimeSelect()
    },

    //打开信息弹窗
    showInfo(infoId){
      if(this.occupy.length > 0){
        let data = this.occupy[infoId]
        this.infoData.name = data.name
        this.infoData.num = data.num
        this.infoData.mobile = data.mobile
        this.infoData.tel = data.tel
        this.infoData.year = data.year
        this.infoData.start = data.start
        this.infoData.end = data.end
        this.infoData.isShow = true
      }
    },

    //清空占用情况
    cleanData(){
      this.roomState = JSON.parse(JSON.stringify(this.tempState));
      this.timeArr.time1 = []
      this.timeArr.time2 = []
      this.timeArr.time3 = []
      this.timeArr.time4 = []
    },
    
    //将时间数组拆分为4份，分别对应页面中4个时间段，分别循环显示
    reSetTimeSelect(){
      this.timeArr.time1 = this.roomState.slice(0,16)
      this.timeArr.time2 = this.roomState.slice(16,32)
      this.timeArr.time3 = this.roomState.slice(32,48)
      this.timeArr.time4 = this.roomState.slice(48,67)
    },

    /**
     * 根据已占用时间段，更改显示颜色
     * @param startTime 时间段开始时间
     * @param endTime 时间段结束时间
     * @param infoId 介绍弹窗ID
     * @param timeStamp 当前时间戳
     */
    setRoomData(state,startTime,endTime,infoId,timeStamp){

      let startHour = dayjs(startTime).hour(),          //开始时间 小时
          startMinute = dayjs(startTime).minute(),      //开始时间 分钟
          endHour = dayjs(endTime).hour(),              //结束时间 小时
          endMinute = dayjs(endTime).minute(),          //结束时间 分钟
          startTimeStamp = dayjs(startTime).valueOf(),  //开始时间时间戳
          endTimeStamp = dayjs(endTime).valueOf()  //开始时间时间戳

      //判断开始时间是否小于当前时间
      //小于当前时间的话，将时间设为当前时间开始
      if(startTimeStamp <= timeStamp){
        startHour = 8
        startMinute = 0
      }
      //判断结束时间是否大于当前时间
      //大于的话，结束时间设为当天结束时间
      if(endTimeStamp >= timeStamp+(60*60*24*1000-1) ){
        endHour = 23
        endMinute = 60
      }

      //当时间在8点到24点之间执行操作
      if(startHour >= 8 && startHour <= 23 && endHour >=8 && endHour <=23){

        /** 开始时间 **/
        //开始时间小时，第一次出现的位置
        let startH = this.roomState.findIndex( item => item.startHour === startHour)
        //一个小格的时间是15分钟，计算出当前分钟一个小时中第几个小格子
        let startM = Math.floor(startMinute/15)
        //根据小时和分钟，得出启始位置在数组中的索引
        let startI = startH+startM
        //计算小于15分钟的部分，占15分钟的部分
        let startOccupy = startMinute-(15*startM)
        startOccupy = this.getOccupy('start',startOccupy)
        //设置状态
        for(let i = startOccupy; i < 3; i++ ){
          this.roomState[startI].child[i].state = state
          this.roomState[startI].child[i].infoId = infoId
        }


        /** 结束时间 **/
        //结束时间小时，第一次出现的位置
        let endH = this.roomState.findIndex( item => item.startHour === endHour)
        //一个小格的时间是15分钟，计算出当前分钟是一个小时中第几个小格子
        let endM = Math.floor(endMinute/15)
        //根据小时和分钟，计算出结束位置在数组中的索引
        let endI = endH+endM
        //计算小于15分钟的部分，占15分钟的百分比
        let endOccupy = endMinute-(15*endM)
        if(endOccupy == 0){
          endOccupy = 2
          endI = endI -1
        }else{
          endOccupy = this.getOccupy('end',endOccupy)
        }
        //设置状态
        for(let i = endOccupy; i >= 0; i-- ){
          this.roomState[endI].child[i].state = state
          this.roomState[endI].child[i].infoId = infoId
        }


        /** 中间区域 **/
        for(let i = startI+1; i < endI; i++){
          let tempArr = this.roomState[i].child
          for(let z = 0; z < tempArr.length; z++){
            tempArr[z].state = state
            tempArr[z].infoId = infoId
          }
        }

      }
    },

    /**
     * 得到小格中，5分钟刻度的占用
     * @param flag  start:开始时间, end:结束时间
     * @param occupy 时间百分比
     * @returns {number}
     */
    getOccupy(flag,occupy){

      switch (occupy) {
        case 0:
          occupy = 0
          break;
        case 5:
          occupy = 1
          break;
        case 10:
          occupy = 2
          break;
        case 15:
          occupy = 3
          break;
        default:
          occupy = 2
      }

      if(flag == 'end'){
        occupy = occupy-1
      }

      return occupy
    },

    checkLine(i){
      let cName;
      if((i+1)%4 === 0){
        //cName = 'l'
      }
      return cName
    },

    //根据不同状态设置不同类名
    checkState(s){
      let cName
      switch (s) {
        case 1:
          //申请中
          cName = 'apply'
          break;
        case 2:
          //审批中
          cName = 'examine'
          break;
        case 3:
          //已占用
          cName = 'none'
          break;
        default:
          cName = ''
      }

      return cName
    },

  }

}
</script>

<style lang="less">

  .meeting-room-state{
    overflow: hidden;
    .meeting-room-state__legend{
      text-align: center;
      .item{
        overflow: hidden;
        display: inline-block;
        padding: 5px 10px;
        //申请中
        &.apply{
          i{
            background: @green;
          }
        }
        //申批中
        &.examine{
          i{
            background: @orange;
          }
        }
        &.none{
          i{
            background: @red;
          }
        }
        i{
          display: block;
          float: left;
          width: 15px;
          height: 15px;
          background: @blue;
        }
        span{
          display: block;
          float: left;
          line-height: 15px;
          padding-left: 5px;
        }
      }
    }
    .section{
      width: 100%;
      overflow: hidden;
      .room-state__text{
        padding: 10px 0 5px 0;
        overflow: hidden;
        font-weight: 700;
      }
      .room-state__h{
        overflow: hidden;
        padding: 6px 0;
        span{
          display: block;
          float: left;
          width: 84px;
          text-align: left;
          position: relative;
          &::before{
            content: '';
            position: absolute;
            bottom: -6px;
            left: 0;
            width: 2px;
            height: 8px;
            background: #969799;
            opacity: 0.5;
          }
        }
      }
      .room-state__d{
        overflow: hidden;
        padding: 6px 0;
        span{
          display: block;
          float: left;
          width: 84px;
          position: relative;
          text-align: center;
          &::before{
            content: '';
            position: absolute;
            top: -6px;
            left: 50%;
            margin-left: -1px;
            width: 2px;
            height: 8px;
            background: #969799;
            opacity: 0.5;
          }
        }
      }
      .room-state__select-box{
        overflow: hidden;
        .room-state__item{
          margin: 0 auto;
          width: 21px;
          height: 21px;
          float: left;
          background: @blue;
          overflow: hidden;
          border-right: 1px solid #ebedf0;
          box-sizing:border-box;
          .room-state--occupy{
            width: 33.33333%;
            height: 100%;
            float: left;
            //申请中
            &.apply{
             background: @green;
            }
            //申批中
            &.examine{
              background: @orange;
            }
            &.none{
              background: @red;
            }
          }
          &.l{
            border-right: 2px solid #ebedf0;
          }

        }

      }

    }
    .meeting-room__info-box{
      padding: 45px 0;
    }
  }

</style>