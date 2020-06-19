<template>

  <div class="meeting-index">

    <div class="meeting-head" :style="`background-image: url('${baseUrl}images/meeting/m-i-bg.png');`">
      <sino-title title="今日会议活动安排" color="#FFF" />
      <div class="swipe" v-if="toDayMeetList.length > 0">
        <van-swipe indicator-color="white">
          <van-swipe-item v-for="(item,index) in toDayMeetList" :key="index" @click="handleSwipe(item)">
            <div class="swipe-item">
              <div class="swipe-item-head">{{toDateStr(item.beginTime,item.endTime)}}</div>
              <div class="swipe-item-body">
                <div class="meet-title van-ellipsis">{{item.meetingName}}</div>
                <div class="meet-room-no"><van-tag color="rgba(237,128,81,.2)" type="danger">{{item.meetName}}</van-tag></div>
                <div class="meet-address">地址：{{item.meetAddress}}</div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="no-swipe" v-if="toDayMeetList.length === 0">
        <img :src="`${baseUrl}images/meeting/m-i-nomeet.png`" />
        <van-divider class="no-swipe__info">今日无会议</van-divider>
      </div>
    </div>

    <div class="meeting-body">
      <sino-title title="会议活动"/>
      <div class="content">
        <div class="options">
          <!--选项-->
          <div v-for="(item,index) in meetList" :key="index" class="option-box">
            <div class="option" :style="{background: item.color}"  @click="onClickItem(item.url)">
              <van-icon size="40px" color="#fff" :name="item.icon" />
            </div>
            <div class="option-text">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="meeting-body">
      <sino-title title="会务服务"/>
      <div class="content">
        <div class="options">
          <!--选项-->
          <div v-for="(item,index) in serviceList" :key="index" class="option-box">
            <div class="option" :style="{background: item.color}" @click="onClickItem(item.url)">
              <van-icon size="40px" color="#fff" :name="item.icon" />
            </div>
            <div class="option-text">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>

import { listMeetingToday } from '@/api/meeting'
export default {
  //会议-首页
  name: 'meeting-index',
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      toDayMeetList:[],
      meetList:[
        { title:'我的日程',icon:'notes-o',color:'#FFB355', url:'' },
        { title:'我要开会',icon:'notes-o',color:'#4FA0FE', url:'/meeting/select' },
        { title:'会议申请',icon:'notes-o',color:'#34BDE8', url:'/meeting/meeting-list/apply' },
        { title:'会议审批',icon:'notes-o',color:'#F2A5D2', url:'/meeting/meeting-list/approval' },
        { title:'签到',icon:'notes-o',color:'#FF7D7F', url:'' },
      ],
      serviceList:[
        { title:'审批的会务',icon:'notes-o',color:'#8D91E5', url:'/meeting/examine-approve' },
        { title:'发起的会务',icon:'notes-o',color:'#6790EA', url:'/meeting/initiate' },
        { title:'执行的会务',icon:'notes-o',color:'#87CD77', url:'/meeting/execute' },
        { title:'工作联系单',icon:'notes-o',color:'#FD8958', url:'/meeting/job-contact-list' },
      ],
    }
  },
  components: {
    'SinoTitle': () => import('@/components/sino-title'),
  },
  mounted(){
    this.getApiData()
  },
  methods: {

    //获取公司外参会人员历史数据列表
    async getApiData() {
      let toDayMeetList = await listMeetingToday()
      this.toDayMeetList = toDayMeetList.list
    },

    onClickItem:function(url){
      this.$router.push({ path:url })
    },

  }

}
</script>

<style lang="less">

  .meeting-index{

    .meeting-head{
      background-color: #318dd9;
      background-size: 100%;
    }
    .no-swipe {
      padding: 0 @spacing-4 @spacing-4 @spacing-4;
      font-size: 0;
      &__info {
        margin: 0 !important;
        padding: @spacing-2 0;
        background-color: #fff;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
    .swipe-item {
      padding: 0 @spacing-4 @spacing-7 @spacing-4;
    }
    .swipe-item-head{
      padding: @spacing-2;
      font-size: @font-size-sm;
      color: @orange-light;
      background-color: #146ebd;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    .swipe-item-body{
      padding: @spacing-2;
      font-weight: bold;
      font-size: @font-size-sm;
      background-color: @white;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;

      .meet-title{
        font-size: @font-size-sm;
        line-height: @line-height-zh;
      }

      .meet-room-no{
        margin-top: @spacing-1;
        margin-bottom: @spacing-1;
        .van-tag{
          padding: 0 @spacing-1;
          color: #ED8051;
        }
      }

      .meet-address{
        font-size: @font-size-xs;
        color: @gray-dark;
      }
    }

    .meeting-body{
      margin: @spacing-4;
      background-color: @white;

      .content{
        padding: 0px @spacing-4 0px @spacing-4;
        overflow: hidden;
        .options{
          padding-top: @spacing-4;
          overflow: hidden;
          width:100%;
          border-top: .5px solid #ebedf0;
          .option-box{
            position: relative;
            float: left;
            width:33.33%;
            .option{
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 auto;
              width: 60px;
              height: 60px;
              border-radius: 50%;
            }
            .option-text{
              padding-top: @spacing-1;
              padding-bottom: @spacing-3;
              text-align: center;
              font-size: @font-size-sm;
              color:@black;
            }
          }
        }
      }
    }

  }

</style>