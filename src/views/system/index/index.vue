<template>
  <div class="system-index" v-if="username && (host === '172.30.13.53:8500' || host === 'localhost:8888')">
    <!-- 头部按钮 -->
    <van-row class="header">
      <van-col
        v-for="(item, index) in headers"
        :key="index"
        span="8"
      >
        <!-- <div class="grid" @click="onClick(item.url)"> -->
        <div class="grid">
          <van-icon :name="item.icon" size="1.06rem" color="#fff" />
          <p class="title">{{ item.title }}</p>
        </div>
      </van-col>
    </van-row>

    <!-- 模块按钮 -->
    <van-row class="content">
      <van-col
        v-for="(item, index) in modules"
        :key="index"
        span="8"
      >
        <div class="grid van-hairline--surround" @click="onClick(item.url)">
          <van-icon :name="item.icon" size="0.85rem" color="#5ca2f8" />
          <p class="title">{{ item.title }}</p>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import util from '@/libs/util.js'
import '@/assets/js/apppubs_jssdk.js'

// 单点登录
const host = window.location.host
const dev = 'localhost:8888'
const test = '172.30.13.53:8500'
const userLogin = `http://${host === dev ? 'localhost:8500' : host}/oa/common/userLogin`
const mobileUrl = process.env.NODE_ENV === 'development' ? `http://${dev}` : '/mobile/index.html'

// 头部菜单
const headers = [
  { title: '扫一扫', icon: 'scan', url: '' },
  { title: '通知', icon: 'bell', url: '' },
  { title: '会议管理', icon: 'friends', url: '' },
]

export default {
  name: 'index',

  data () {
    return {
      host,
      // 头部菜单
      headers: headers,
      // 模块菜单
      modules: [
        { title: '问卷调查', icon: 'orders-o', url: '?path=/questionnaire/index' },
        { title: '会议管理', icon: 'cluster-o', url: '?path=/meeting/index' },
        { title: '领导日程', icon: 'calender-o', url: '?path=/calendar/index' },
        { title: '督办管理', icon: 'bar-chart-o', url: '?path=/oversee/index' },
      ],
      username: '',
      password: ''
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      if (host !== test && host !== dev) {
        // 说明不是测试环境，直接调用该方法关闭 webview
        // eslint-disable-next-line
        apppubs.closeWindow()
      } else {
        // 测试环境获取用户信息，没有则跳转到登录页
        const username = util.cookies.get('username')
        if (username) {
          this.username = username
        } else {
          this.$router.replace({ path: '/login' })
        }
      }
    },
    onClick (path) {
      if (host !== dev) {
        window.location.href = `${userLogin}?loginName=${this.username}&url=${mobileUrl + path}`
      } else {
        this.$router.push({ path: path.replace('?path=', ''), query: { ...this.$route.query } })
      }
    }
  }
}
</script>

<style lang="less">
.system-index {
  .header {
    text-align: center;
    background-color: @blue;
    .grid {
      padding: @spacing-4;
      &:active {
        opacity: 0.9;
      }
      .title {
        margin: 0;
        font-size: @font-size-lg;
        color: @white;
      }
    }
  }
  .content {
    text-align: center;
    background-color: @white;
    .grid {
      padding: @spacing-4;
      &:active {
        background-color: @active-color-dark;
      }
      .title {
        margin: 0;
        font-size: @font-size-base;
      }
    }
  }
}
</style>
