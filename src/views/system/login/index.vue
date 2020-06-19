<template>
  <div class="system-login">
    <h1 class="title">
      <img :src="`${baseUrl}images/common/logo.png`">
      <br>
      <div>欢迎使用国投集团协同办公平台</div>
    </h1>
    <h2 class="desc">移动端测试环境</h2>
    <van-cell-group class="form">
      <van-field
        v-model="username"
        name="username"
        v-validate="'required'"
        :error="errors.has('username')"
        label="用户名"
        placeholder="请输入用户名"
        clearable
      />
      <van-field
        v-model="password"
        name="password"
        v-validate="'required'"
        :error="errors.has('password')"
        type="password"
        label="密码"
        placeholder="请输入密码"
        clearable
      />
    </van-cell-group>
    <van-button type="info" block @click="handleLogin">登录</van-button>
  </div>
</template>

<script>
import util from '@/libs/util.js'

// 单点登录
const doLogin = 'http://172.30.13.53:8080/sso/ticket/client/doLogin'
const siteUrl = '/oa/mobile/index.html'
const loginURL = process.env.NODE_ENV === 'development' ? `http://localhost:8888${siteUrl}%23/login` : `http://172.30.13.53:8500${siteUrl}%23/login`
const gotoURL = process.env.NODE_ENV === 'development' ? `http://localhost:8888${siteUrl}%23/index` : `http://172.30.13.53:8500${siteUrl}%23/index`

export default {
  name: 'login',

  data () {
    return {
      baseUrl: process.env.BASE_URL,
      username: '',
      password: ''
    }
  },

  mounted () {
    this.$parent.showNavBar = false
  },

  methods: {
    getLoginUrl () {
      this.password = 'c4ca4238a0b923820dcc509a6f75849b'
      return `${doLogin}?loginURL=${loginURL}&username=${this.username}&password=${this.password}&gotoURL=${gotoURL}`
    },
    handleLogin () {
      this.$validator.validate().then(valid => {
        if (valid) {
          util.cookies.set('username', this.username)
          window.location.href = this.getLoginUrl()
        }
      })
    }
  }
}
</script>

<style lang="less">
.system-login {
  padding: @spacing-8 @spacing-4;
  .title {
    margin: @spacing-4 0 @spacing-2;
    font-size: @font-size-xxl;
    color: @text-color;
    img {
      width: 140px;
    }
  }
  .desc {
    margin: 0 0 @spacing-8;
    font-size: @font-size-sm;
    font-weight: 500;
    color: @gray-darker;
  }
  .form {
    margin: 0 0 @spacing-4;
    &:after {
      border-width: 1px;
      border-radius: 4px;
    }
  }
}
</style>
