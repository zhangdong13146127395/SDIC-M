<template>

  <div class="oversee-done">

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
  //督办管理-已办页面
  name: 'oversee-done',
  mixins: [ MixinsList ],
  data() {
    return {
      active: 'oversee-done',
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
          name: '已完成',
          tip: 0
        },
        {
          tid:2,
          name: '滞后',
          tip: 5
        },
        {
          tid:3,
          name: '未完成',
          tip: 200
        }
      ]
      this.tabTextData = data
    },
    //获取顶部图片tab数据
    getPicTab() {

      let data = [
        {
          tid:0,
          name: '全部督办',
          icon: 'images/oversee/oversee-tab-05.png',
          tip: 0
        },
        {
          tid:1,
          name: '年度计划督办',
          icon: 'images/oversee/oversee-tab-06.png',
          tip: 0
        },
        {
          tid:2,
          name: '专项工作督办',
          icon: 'images/oversee/oversee-tab-07.png',
          tip: 5
        },
        {
          tid:3,
          name: '会议决议督办',
          icon: 'images/oversee/oversee-tab-08.png',
          tip: 200
        },
        {
          tid:4,
          name: '重要文件督办',
          icon: 'images/oversee/oversee-tab-13.png',
          tip: 200
        },
        {
          tid:5,
          name: '交办事项督办',
          icon: 'images/oversee/oversee-tab-14.png',
          tip: 200
        },
        {
          tid:6,
          name: '紧急督办',
          icon: 'images/oversee/oversee-tab-15.png',
          tip: 200
        },
        {
          tid:7,
          name: '其他督办',
          icon: 'images/oversee/oversee-tab-16.png',
          tip: 200
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
    changeData(){

    }
  }
}
</script>


<style lang="less">
.oversee-done {
  .oversee-list{
    padding: @spacing-4;
    margin-bottom: 40px;
  }
}
</style>