<template>

  <div class="oversee-index">

    <!-- 顶部图片tab -->
    <oversee-pic-tab :data="tabData" @callFather="changeData"/>

    <!-- 数据列表 -->
    <sino-list
      class="sino-list"
      ref="sinoList"
      v-model="listData"
      :page-size="page.pageSize"
      :head-height="40"
      min-height="calc(100vh - 5.49333rem)"
      placeholder-height="1.33333rem"
      :load="onLoad"
    >
      <!-- 内容列表 -->
      <div class="oversee-list">
        <oversee-list-item v-for="(item, index) in listData" :key="index" :id="index" :rate="item.progress === null ? 0 : Number(item.progress)" :tag="item.hostCompanyName" :title="item.superviseContent" :people="item.prevGrantUserName + '/' + item.prevGrantDeptName" :time="item.createDate"/>
      </div>
    </sino-list>

    <!-- 底部切换tab -->
    <oversee-bottom-tab :active="active"/>

  </div>

</template>

<script>
import { listOverseeDb } from '@/api/oversee'
import MixinsList from './components/mixins/list'

export default {
  //督办管理-待办页面
  name: 'oversee-index',
  mixins: [ MixinsList ],
  data() {
    return {
      active: 'oversee-todo',
      baseUrl: process.env.BASE_URL,
      tabData:'',
      flag: 'db',
      listData:[],
      page: {
        pageNum: 1,
        pageSize: 10,
      }
    }
  },
  components: {
    'sino-list': () => import('@/components/sino-list'),
    'oversee-pic-tab': () => import('./components/oversee-pic-tab/index'),
    'oversee-bottom-tab': () => import('./components/oversee-bottom-tab/index'),
    'oversee-list-item': () => import('./components/oversee-list-item/index'),
  },
  mounted(){
    this.getPicTab()
    // this.getList('db')
  },
  methods: {
    async onLoad (page) {
      return await listOverseeDb({ type: this.flag, ...page })
    },
    //获取顶部图片tab数据
    getPicTab() {

      let data = [
        {
          tid: 'db',
          name: '待办',
          icon: 'images/oversee/oversee-tab-01.png',
          tip: 0
        },
        {
          tid: 'dy',
          name: '待阅',
          icon: 'images/oversee/oversee-tab-02.png',
          tip: 0
        },
        {
          tid: 'slow',
          name: '推进缓慢',
          icon: 'images/oversee/oversee-tab-03.png',
          tip: 5
        },
        {
          tid: 'warn',
          name: '反馈预警',
          icon: 'images/oversee/oversee-tab-04.png',
          tip: 200
        }
      ]
      this.tabData = data
    },

    //获取内容列表
    // async getList(flag) {
      // let data;
      // if(flag == 0){
      //   data = [
      //     {
      //       tag:'国投交通',
      //       title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
      //       people:'奚望/信息技术中心',
      //       time:'2019-08-22 15:31:29',
      //       rate:20
      //     },
      //     {
      //       tag:'国投交通',
      //       title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
      //       people:'奚望/信息技术中心',
      //       time:'2019-08-22 15:31:29',
      //       rate:50
      //     },
      //     {
      //       tag:'国投交通',
      //       title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
      //       people:'奚望/信息技术中心',
      //       time:'2019-08-22 15:31:29',
      //       rate:10
      //     },
      //     {
      //       tag:'国投交通',
      //       title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
      //       people:'奚望/信息技术中心',
      //       time:'2019-08-22 15:31:29',
      //       rate:90
      //     },
      //   ]
      // }else if(flag == 1){
      //   data = [
      //     {
      //       tag:'国投交通',
      //       title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
      //       people:'奚望/信息技术中心2',
      //       time:'2019-08-22 15:31:29',
      //       rate:20
      //     },
      //     {
      //       tag:'国投交通',
      //       title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
      //       people:'奚望/信息技术中心',
      //       time:'2019-08-22 15:31:29',
      //       rate:50
      //     },
      //     {
      //       tag:'国投交通',
      //       title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
      //       people:'奚望/信息技术中心',
      //       time:'2019-08-22 15:31:29',
      //       rate:10
      //     },
      //     {
      //       tag:'国投交通',
      //       title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
      //       people:'奚望/信息技术中心',
      //       time:'2019-08-22 15:31:29',
      //       rate:90
      //     },
      //   ]
      // }else if(flag == 2){
      //   data = [
      //     {
      //       tag:'国投交通',
      //       title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
      //       people:'奚望/信息技术中心3',
      //       time:'2019-08-22 15:31:29',
      //       rate:20
      //     },
      //     {
      //       tag:'国投交通',
      //       title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
      //       people:'奚望/信息技术中心',
      //       time:'2019-08-22 15:31:29',
      //       rate:50
      //     },
      //     {
      //       tag:'国投交通',
      //       title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
      //       people:'奚望/信息技术中心',
      //       time:'2019-08-22 15:31:29',
      //       rate:10
      //     },
      //     {
      //       tag:'国投交通',
      //       title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
      //       people:'奚望/信息技术中心',
      //       time:'2019-08-22 15:31:29',
      //       rate:90
      //     },
      //   ]
      // }else{
      //   data = [
      //     {
      //       tag:'国投交通',
      //       title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
      //       people:'奚望/信息技术中心4',
      //       time:'2019-08-22 15:31:29',
      //       rate:20
      //     },
      //     {
      //       tag:'国投交通',
      //       title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
      //       people:'奚望/信息技术中心',
      //       time:'2019-08-22 15:31:29',
      //       rate:50
      //     },
      //     {
      //       tag:'国投交通',
      //       title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
      //       people:'奚望/信息技术中心',
      //       time:'2019-08-22 15:31:29',
      //       rate:10
      //     },
      //     {
      //       tag:'国投交通',
      //       title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
      //       people:'奚望/信息技术中心',
      //       time:'2019-08-22 15:31:29',
      //       rate:90
      //     },
      //   ]
      // }
      // this.listData = data
    // },

    changeData(id) {
      // this.getList(id)
      this.flag = id
      this.$refs['sinoList'].onRefresh()
    }
  }

}
</script>

<style lang="less">
.oversee-index{
  .oversee-list{
    margin-top: @spacing-4;
    padding: 0 @spacing-4;
  }
}
</style>