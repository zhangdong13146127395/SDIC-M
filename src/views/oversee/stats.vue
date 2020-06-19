<template>

  <div class="oversee-stats">
    <!-- 顶部图片tab -->
    <oversee-pic-tab :data="tabData"/>
    <!-- 中间内容 -->
    <div class="oversee-stats__content">
      <div class="temp-btn">
        <van-button type="default" to="/oversee/stats">权限高</van-button>
        <van-button type="default" to="/oversee/stats2">权限低</van-button>
      </div>
      <!-- 内容标题 -->
      <div class="oversee-stats__title">
        <!-- 右侧下拉菜单 -->
        <van-dropdown-menu>
          <van-dropdown-item v-model="dropdownActive" :options="dropdownOption"/>
          <div class="oversee-stats__text">
            <div :class="bm" @click="changeContent(1)"><span>部门(中心)</span></div>
            <div :class="gs" @click="changeContent(2)"><span>子公司</span></div>
          </div>
        </van-dropdown-menu>
      </div>
      <!-- 图表 -->
      <ve-histogram :data="chartData" :colors="colors" :legend="legend" :data-zoom="dataZoom"></ve-histogram>

      <!-- 提示信息 -->
      <div class="oversee-stats__tip-box">
        <div class="oversee-stats__tip-box--title">法律部</div>
        <ul>
          <li>
            <div class="oversee-stats__tip-box--num">22</div>
            <div class="oversee-stats__tip-box--text i1">所有</div>
          </li>
          <li>
            <div class="oversee-stats__tip-box--num">17</div>
            <div class="oversee-stats__tip-box--text i2">已完成</div>
          </li>
          <li>
            <div class="oversee-stats__tip-box--num">12</div>
            <div class="oversee-stats__tip-box--text i3">未完成</div>
          </li>
          <li>
            <div class="oversee-stats__tip-box--num">4</div>
            <div class="oversee-stats__tip-box--text i4">滞后</div>
          </li>
        </ul>
      </div>

    </div>



    <oversee-bottom-tab :active="active"/>
  </div>
</template>

<script>
import MixinsList from './components/mixins/list'
import 'echarts/lib/component/dataZoom'
export default {
  //督办管理-统计页面
  name: 'oversee-stats',
  mixins: [ MixinsList ],
  data() {
    return {
      active: 'oversee-stats',
      tabData:'',
      chartData: [],
      colors: [],
      legend: {},
      dataZoom:[
        {
          show: true,
          type: 'slider',
          start: 0,
          end: 50
        }
      ],
      dropdownActive: 0,
      dropdownOption: [],
      bm:'oversee-stats__bm',
      gs:'oversee-stats__gs',
    }
  },
  components: {
    've-histogram': () => import('v-charts/lib/histogram.common'),
    'oversee-pic-tab': () => import('./components/oversee-pic-tab/index'),
    'oversee-bottom-tab': () => import('./components/oversee-bottom-tab/index')
  },
  mounted(){
    this.setCharts(1)
    this.getPicTab()
    this.setDropdown()
  },
  methods:{

    changeContent(flag){
      if(flag == 1){
        this.bm = 'oversee-stats__bm'
        this.gs = 'oversee-stats__gs'
        this.setCharts(1)
      }else{
        this.bm = 'oversee-stats__gs'
        this.gs = 'oversee-stats__bm'
        this.setCharts(2)
      }

    },

    //图表
    setCharts(flag){
      let colors = ['#5ca2f8','#c362ec', '#ffc26a', '#c5cfd3'],
          legend = {icon: 'circle'},
          chartData

      if(flag == 1){
        chartData = {
          columns: ['部门', '所有', '已完成', '未完成', '滞后'],
          rows: [
            { '部门': '办公厅', '所有': 80, '已完成': 50, '未完成': 8, '滞后': 2 },
            { '部门': '综合部', '所有': 90, '已完成': 70, '未完成': 10, '滞后': 4 },
            { '部门': '人事部', '所有': 80, '已完成': 60, '未完成': 15, '滞后': 5  },
            { '部门': '法律部', '所有': 70, '已完成': 40, '未完成': 12, '滞后': 1  },
            { '部门': '审计部', '所有': 60, '已完成': 10, '未完成': 11, '滞后': 4  },
            { '部门': '项目部', '所有': 50, '已完成': 40, '未完成': 12, '滞后': 3 },
            { '部门': '信息中心', '所有': 80, '已完成': 70, '未完成': 11, '滞后': 2 }
          ]
        }
      }else{
        chartData = {
          columns: ['部门', '所有', '已完成', '未完成', '滞后'],
          rows: [
            { '部门': '办公厅', '所有': 180, '已完成': 50, '未完成': 8, '滞后': 2 },
            { '部门': '综合部', '所有': 190, '已完成': 70, '未完成': 10, '滞后': 4 },
            { '部门': '人事部', '所有': 180, '已完成': 60, '未完成': 15, '滞后': 5  },
            { '部门': '法律部', '所有': 170, '已完成': 40, '未完成': 12, '滞后': 1  },
            { '部门': '审计部', '所有': 160, '已完成': 10, '未完成': 11, '滞后': 4  },
            { '部门': '项目部', '所有': 150, '已完成': 40, '未完成': 12, '滞后': 3 },
            { '部门': '信息中心', '所有': 180, '已完成': 70, '未完成': 11, '滞后': 2 }
          ]
        }
      }
      this.chartData = chartData
      this.colors = colors
      this.legend = legend
    },

    //设置下拉菜单
    setDropdown(){
      let dropdownOption = [
        { text: '2019年', value: 0 },
        { text: '2018年', value: 1 },
        { text: '2017年', value: 2 },
        { text: '2016年', value: 3 },
        { text: '2015年', value: 4 },
        { text: '2014年', value: 5 },
        { text: '2013年', value: 6 },
        { text: '2012年', value: 7 },
      ]
      this.dropdownActive = 0
      this.dropdownOption = dropdownOption
    },

    //获取顶部图片tab数据
    getPicTab() {

      let data = [
        {
          tid:0,
          name: '全部',
          icon: 'images/oversee/oversee-tab-09.png',
          tip: 50
        },
        {
          tid:1,
          name: '已完成',
          icon: 'images/oversee/oversee-tab-10.png',
          tip: 30
        },
        {
          tid:2,
          name: '滞后',
          icon: 'images/oversee/oversee-tab-11.png',
          tip: 5
        },
        {
          tid:3,
          name: '未完成',
          icon: 'images/oversee/oversee-tab-12.png',
          tip: 15
        }
      ]
      this.tabData = data
    },

  }
}
</script>


<style lang="less">
  .oversee-stats{
    background: @background-color;
    .ve-histogram{
      padding-bottom: 30px;
    }
    .oversee-pic-tab{
      margin-bottom: @spacing-4;
    }
    .oversee-stats__content{
      background: #fff;
      padding-bottom: 30px;
      margin-bottom: 65px;
    }
    .oversee-stats__title{
      padding: @spacing-4;
    }
    .oversee-stats__bm{
      font-size: @font-size-lg;
      font-weight: bolder;
      padding-right: @spacing-3;
    }
    .oversee-stats__gs{
      font-size: @font-size-sm;
      color: @gray-dark;
      padding-right: @spacing-3;
    }
    .oversee-stats__text{
      flex: 4;
      align-items: center;
      display: flex;
    }
    .van-dropdown-menu__item{
      order: 2;
    }
    .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
      border: none;
    }
    .oversee-stats__tip-box{
      margin: 0 @spacing-7;
      box-shadow: @shadow-bottom;
      padding: @spacing-6 0;
      ul{
        padding: @spacing-5 0;
        display: flex;
        justify-content: space-around;
      }
    }
    .oversee-stats__tip-box--title{
      font-size: @font-size-base;
      padding-left: @spacing-4;
    }
    .oversee-stats__tip-box--num{
      font-size: @font-size-xxxl;
      text-align: center;
      line-height: 1;
      padding-bottom: @spacing-1;
    }
    .oversee-stats__tip-box--text{
      font-size: @font-size-xs;
      text-align: center;
      line-height: 1;
      padding-left: 10px;
      position: relative;
      &.i1{
        &::after{
          background: #5ca2f8;
        }
      }
      &.i2{
        &::after{
          background: #c362ec;
        }
      }
      &.i3{
        &::after{
          background: #ffc26a;
        }
      }
      &.i4{
        &::after{
          background: #c5cfd3;
        }
      }
      &::after{
        width: 8px;
        height: 8px;
        position: absolute;
        top: 50%;
        left: 0;
        margin-top: -4px;
        content: '';
        border-radius:25px;
      }
    }
  }
</style>