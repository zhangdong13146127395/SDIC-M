export default {
  mounted () {
    this.settingNavBar()
  },
  methods: {
    // 设置顶部导航栏
    settingNavBar () {
      this.$parent.rightIcon = 'search'
      this.$parent.rightColor = '#fff'
      this.$parent.childClickRight = true
    },
    // 点击搜索按钮跳转
    onClickRight () {
      this.$router.push({ path: '/oversee/search' })
    },
  }
}