<template>
  <div class="oversee-mine">

    <oversee-text-tab :data="tabTextData"/>

    <!-- 顶部图片tab -->
    <oversee-pic-tab :data="tabData" @callFather="changeData"/>

    <!-- 内容列表 -->
    <div class="oversee-list">
      <oversee-list-item v-for="(item, index) in listData" :key="index" :id="index" :rate="item.rate" :tag="item.tag" :title="item.title" :people="item.people" :time="item.time"/>
    </div>

    <!-- 底部切换tab -->
    <oversee-bottom-tab :active="active"/>

  </div>
</template>

<script>
import MixinsList from './components/mixins/list'
export default {
  //督办管理-我的页面
  name: 'oversee-mine',
  mixins: [ MixinsList ],
  data() {
    return {
      active: 'oversee-mine',
      tabData:'',
      listData:'',
      tabTextData:''
    }
  },
  components: {
    'oversee-text-tab': () => import('./components/oversee-text-tab/index'),
    'oversee-pic-tab': () => import('./components/oversee-pic-tab/index'),
    'oversee-list-item': () => import('./components/oversee-list-item/index'),
    'oversee-bottom-tab': () => import('./components/oversee-bottom-tab/index')

  },
  mounted(){
    this.getTextTab()
    this.getPicTab()
    this.getList(0)
  },
  methods:{
    //获取顶部文字Tab数据
    getTextTab(){
      let data = [
        {
          tid:0,
          name: '全部督办',
          tip: 0
        },
        {
          tid:1,
          name: '我的主办',
          tip: 25
        },
        {
          tid:2,
          name: '我的协办',
          tip: 2
        }
      ]
      this.tabTextData = data
    },
    //获取顶部图片tab数据
    getPicTab() {

      let data = [
        {
          tid:0,
          name: '全部',
          icon: 'images/oversee/oversee-tab-09.png',
          tip: 0
        },
        {
          tid:1,
          name: '已完成',
          icon: 'images/oversee/oversee-tab-10.png',
          tip: 0
        },
        {
          tid:2,
          name: '滞后',
          icon: 'images/oversee/oversee-tab-11.png',
          tip: 0
        },
        {
          tid:3,
          name: '未完成',
          icon: 'images/oversee/oversee-tab-12.png',
          tip: 0
        }
      ]
      this.tabData = data
    },
    //获取内容列表
    getList(flag) {
      let data;
      if(flag == 0){
        data = [
          {
            tag:'国投交通',
            title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
            people:'奚望/信息技术中心',
            time:'2019-08-22 15:31:29',
            rate:20
          },
          {
            tag:'国投交通',
            title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
            people:'奚望/信息技术中心',
            time:'2019-08-22 15:31:29',
            rate:50
          },
          {
            tag:'国投交通',
            title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
            people:'奚望/信息技术中心',
            time:'2019-08-22 15:31:29',
            rate:10
          },
          {
            tag:'国投交通',
            title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
            people:'奚望/信息技术中心',
            time:'2019-08-22 15:31:29',
            rate:90
          },
        ]
      }else if(flag == 1){
        data = [
          {
            tag:'国投交通',
            title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
            people:'奚望/信息技术中心2',
            time:'2019-08-22 15:31:29',
            rate:20
          },
          {
            tag:'国投交通',
            title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
            people:'奚望/信息技术中心',
            time:'2019-08-22 15:31:29',
            rate:50
          },
          {
            tag:'国投交通',
            title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
            people:'奚望/信息技术中心',
            time:'2019-08-22 15:31:29',
            rate:10
          },
          {
            tag:'国投交通',
            title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
            people:'奚望/信息技术中心',
            time:'2019-08-22 15:31:29',
            rate:90
          },
        ]
      }else if(flag == 2){
        data = [
          {
            tag:'国投交通',
            title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
            people:'奚望/信息技术中心3',
            time:'2019-08-22 15:31:29',
            rate:20
          },
          {
            tag:'国投交通',
            title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
            people:'奚望/信息技术中心',
            time:'2019-08-22 15:31:29',
            rate:50
          },
          {
            tag:'国投交通',
            title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
            people:'奚望/信息技术中心',
            time:'2019-08-22 15:31:29',
            rate:10
          },
          {
            tag:'国投交通',
            title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
            people:'奚望/信息技术中心',
            time:'2019-08-22 15:31:29',
            rate:90
          },
        ]
      }else{
        data = [
          {
            tag:'国投交通',
            title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
            people:'奚望/信息技术中心4',
            time:'2019-08-22 15:31:29',
            rate:20
          },
          {
            tag:'国投交通',
            title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
            people:'奚望/信息技术中心',
            time:'2019-08-22 15:31:29',
            rate:50
          },
          {
            tag:'国投交通',
            title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
            people:'奚望/信息技术中心',
            time:'2019-08-22 15:31:29',
            rate:10
          },
          {
            tag:'国投交通',
            title:'努力推进曹妃甸港区煤炭码头项目整合；努力推进和曹妃甸',
            people:'奚望/信息技术中心',
            time:'2019-08-22 15:31:29',
            rate:90
          },
        ]
      }
      this.listData = data
    },
    changeData(id){
      this.getList(id)
    }
  }
}
</script>

<style lang="less">
  .oversee-mine {
    .oversee-list{
      padding: @spacing-4;
      margin-bottom: 40px;
    }
  }
</style>