<template>
  <div class="layout-base" :class="theme">
    <!-- 导航栏 -->
    <van-nav-bar
      id="navbar"
      v-if="showNavBar"
      :class="navBarClass"
      :title="title"
      :left-text="leftText"
      right-text=""
      :left-arrow="leftArrow"
      :fixed="fixed"
      :border="border"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon v-if="leftIcon" :name="leftIcon" size="0.42667rem" slot="left" />
      <van-icon v-if="rightIconData" :name="rightIconData" size="0.42667rem" :color="rightColor" slot="right" />
    </van-nav-bar>

    <!-- 内容 -->
    <div :class="content" :style="contentStyle">
      <keep-alive>
        <router-view v-if="$route.meta.cache" />
      </keep-alive>
      <router-view v-if="!$route.meta.cache" />
    </div>

    <!-- 底部标签栏 -->
    <van-tabbar v-if="$route.name === 'index'" v-model="tabbarActive">
      <van-tabbar-item icon="home-o">我的办公</van-tabbar-item>
      <van-tabbar-item icon="chat-o">沟通</van-tabbar-item>
      <van-tabbar-item icon="phone-circle-o">通讯录</van-tabbar-item>
      <van-tabbar-item icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import util from '@/libs/util.js'
import '@/assets/js/apppubs_jssdk.js'

export default {
  name: 'layout-base',

  data () {
    return {
      showNavBar: true,
      childClickLeft: false,
      childClickRight: false,
      tabbarActive: 0,
      rightIcon: '',
      rightColor: '#5ca2f8',
    }
  },

  computed: {
    theme () {
      return this.$route.path.indexOf('oversee') > -1  ? 'dark' : 'light'
    },

    navBarClass () {
      return {
        home: this.$route.name === 'index'
      }
    },

    title () {
      return this.$route.name === 'index' ? '国投 OA 移动端' : this.$route.meta.title
    },

    leftText () {
      return this.$route.name === 'index' ? '' : '返回'
    },

    leftArrow () {
      return this.$route.name === 'index' ? false : true
    },

    leftIcon () {
      return this.$route.name === 'index' ? 'contact' : ''
    },

    rightIconData () {
      return this.$route.name === 'index' ? 'share' : this.rightIcon || ''
    },

    fixed () {
      return this.$route.name === 'index' ? false : true
    },

    border () {
      return this.$route.name === 'index' ? false : true
    },

    content () {
      return {
        'layout-base-content': this.$route.name !== 'index'
      }
    },

    contentStyle () {
      return {
        paddingTop: this.$route.name !== 'index' && this.showNavBar ? '1.22667rem' : 0
      }
    }
  },

  watch: {
    $route () {
      this.showNavBar = true
      this.childClickLeft = false
      this.childClickRight = false
      this.rightIcon = ''
      this.rightColor = '#5ca2f8'
    }
  },

  methods: {
    onClickLeft () {
      if (this.$route.name === 'index') {
        util.cookies.remove('username')
        this.$router.replace({ path: '/login' })
      } else {
        if (this.$route.query.close === 'true') {
          // 说明为国投 APP 打开该模块，直接调用该方法关闭 webview
          // eslint-disable-next-line
          apppubs.closeWindow()
        } else {
          // 返回上一页
          if (this.childClickLeft) {
            this.$children[0].onClickLeft()
          } else {
            this.$router.go(-1)
          }
        }
      }
    },

    onClickRight () {
      if (this.childClickRight) {
        this.$children[0].onClickRight()
      }
    }
  }
}
</script>

<style lang="less">
.layout-base {
  // 亮色主题
  &.light {
    .van-nav-bar {
      background-color: @white;
    }
    .van-nav-bar__title {
      color: @text-color;
    }
    .van-nav-bar .van-icon, .van-nav-bar__text {
      color: @blue;
    }
    .van-nav-bar__text:active {
      background-color: @active-color-dark;
    }
  }
  // 暗色主题
  &.dark {
    .van-nav-bar {
      background-color: @blue;
    }
    .van-nav-bar__title {
      color: @white;
    }
    .van-nav-bar .van-icon, .van-nav-bar__text {
      color: @white;
    }
    .van-nav-bar__text:active {
      background-color: #4690ea;
    }
  }
  .home {
    background-color: @blue !important;
    .van-nav-bar__title, .van-nav-bar__left, .van-nav-bar__right, .van-icon {
      color: @white !important;
    }
  }
}
</style>
