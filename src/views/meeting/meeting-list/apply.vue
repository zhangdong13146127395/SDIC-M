<template>

  <div class="meeting-list-index">

    <van-sticky :offset-top="46">
      <van-tabs v-model="active" @click="tabsClick">
        <van-tab name="db" title="待办"></van-tab>
        <van-tab name="blz" title="办理中"></van-tab>
        <van-tab name="bj" title="已办结"></van-tab>
        <van-tab name="all" title="全部"></van-tab>
      </van-tabs>
    </van-sticky>

    <sino-list
      class="sino-list"
      ref="sinoList"
      v-model="listData"
      :page-size="page.pageSize"
      :head-height="50"
      min-height="calc(100vh - 2.39rem)"
      :load="onLoad"
    >

      <van-cell-group>
        <van-cell :title="`${item.meetingName}`" :label="jointTime(item.meetingTimeList)" v-for="(item, index) in listData" :key="index" @click="view(index)">
          <img :src="checkType(item.isLocal)" alt="" slot="icon" class="icon">
          <slot name="value"><van-tag type="warning">{{checkSubflag(item.subflag)}}</van-tag></slot>
        </van-cell>
      </van-cell-group>

    </sino-list>

  </div>

</template>

<script>
import { istMeetingApply } from '@/api/meeting'
import FormatterDate from '@/components/mixins/formatter/formatter-date'
export default {
  //会议-我申请的会议
  name: 'meeting-list-apply',
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      //tab 默认选中项目
      active:'db',
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      //data:[],
      //列表数据
      listData:[]
    }
  },
  mixins: [ FormatterDate ],
  components: {
    'sino-list': () => import('@/components/sino-list'),
  },
  mounted(){
    this.settingNavBar()
    if( typeof(this.$route.query.active) != 'undefined'){
      this.active = this.$route.query.active
    }
  },
  methods: {

    //获取数据
    async onLoad(page) {
      return await istMeetingApply({ status:this.active, ...page })
    },

    tabsClick(){
      this.$refs['sinoList'].onRefresh()
    },

    checkSubflag(subflag){
      let text;
      switch(subflag) {
        case '00':
          text = '草稿'
          break;
        case '01':
          text = '审核中'
          break;
        default:
          text = '已发布'
      }
      return text;
    },

    //根据不同类型，选择不同icon图片
    checkType(type){
      let url
      if(type == 'local'){
        url = this.baseUrl + 'images/meeting/in.png'
      }else{
        url = this.baseUrl + 'images/meeting/out.png'
      }
      return url
    },

    //查看详情
    view(index){
      let listData = this.listData[index],
          type = listData.isLocal,
          path,
          name

      //判断是内部会议还是外部会议
      if(type == 'local'){
        path = 'meeting/internal/index',
        name = 'meeting-internal-index'
      }else{
        path = 'meeting/external/index',
        name = 'meeting-external-index'
      }

      this.$router.push({
        path: path,
        name: name,
        query: {
          meetingId:listData.id,
          backPag:'apply',
          backAct:this.active,
          permission:1
        }
      })


    },

    //重写顶部左侧按钮
    settingNavBar(){
      this.$parent.childClickLeft = true
    },

    //顶部左侧点击事件
    onClickLeft(){
      this.$router.push({
        path: 'meeting/index',
        name: 'meeting-index',
      })
    },

  }

}
</script>

<style lang="less">

  .meeting-list-index{
    .icon{
      width: 42px;
      height: 42px;
      margin-right: 10px;
    }
    .van-cell__title{
      flex: 2;
    }
    .van-cell__value{
      flex: 1;
    }
  }

</style>