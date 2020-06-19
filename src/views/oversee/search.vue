<template>

  <div class="oversee-search">

    <div class="search-form">
      <form action="/">
        <van-search
          v-model="searchValue"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </div>

    <div class="search-history" :class=" !showData ? 'show' : 'hide'">
      <div class="search-history__title">
        <span>最近搜索</span>
        <van-icon name="delete" @click="delHistory"/>
      </div>
      <dl>
        <dd v-for="(item, index) in history" :key="index">
          <van-tag>{{item.title}}</van-tag>
        </dd>
      </dl>

    </div>

    <!-- 内容列表 -->
    <div class="oversee-list van-hairline--top" :class=" showData ? 'show' : 'hide'">
      <oversee-list-item v-for="(item, index) in searchData" :key="index" :rate="item.rate" :tag="item.tag" :title="item.title" :people="item.people" :time="item.time"/>
    </div>

  </div>

</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast)
export default {
  //督办管理-待办页面
  name: 'oversee-search',
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      showData:false,
      history:[],
      searchValue:'',
      searchData:[]
    }
  },
  components: {
    'oversee-list-item': () => import('./components/oversee-list-item/index'),
  },
  watch:{
    searchValue(newData) {
      if( newData == ''){
        this.showData = false
      }
    }
  },
  mounted(){
    this.$parent.showNavBar = false
    this.getHistory()
  },
  methods: {

    getHistory(){
      let data = [
        {
          id:1,
          title:'曹妃甸港区'
        },
        {
          id:1,
          title:'M1920'
        },
        {
          id:1,
          title:'08-22'
        },
        {
          id:1,
          title:'奚望'
        },
        {
          id:1,
          title:'M1920'
        },
        {
          id:1,
          title:'08-22'
        },
        {
          id:1,
          title:'奚望'
        },
      ]
      this.history = data
    },

    getSearchData(){

      this.showData = true

      let data = [
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
      this.searchData = data

    },

    onSearch(){
      let v = this.searchValue

      if(v.length == 0){
        Toast('搜索内容不能为空');
      }else{
        this.getSearchData()
      }
    },
    onCancel(){
      this.$router.go(-1)
    },
    delHistory(){
      this.history = []
    }

  }

}
</script>

<style lang="less">
.oversee-search{
  background: #fff;

  .show{
    display: block;
  }
  .hide{
    display: none;
  }
  .van-search__content{
    background: #eeeeec;
  }
  .search-form{
    padding: 0 @spacing-4;
    .van-search{
      padding: @spacing-4 0;
    }
    .van-search__action{
      padding-right: 0;
    }
  }
  .search-history{
    .search-history__title{
      font-size: @font-size-base;
      padding: 0 @spacing-4;
      .van-icon{
        float: right;
      }
    }
    dl{
      margin: 0;
      display: flex;
      flex-wrap:wrap;
      padding: 0 @spacing-2 @spacing-5 @spacing-2;
      dd{
        margin: 0;
        padding: 0 10px;
        .van-tag{
          font-size: @font-size-sm;
          height: 20px;
          background: #eeeeec;
          color: @text-color;
        }
      }
    }
  }

}
</style>