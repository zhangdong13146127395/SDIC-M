export default {
  mounted () {
    this.settingNavBar()
  },
  methods: {
    // 设置顶部导航栏
    settingNavBar () {
      this.$parent.rightIcon = 'wap-nav'
      this.$parent.rightColor = '#fff'
      this.$parent.childClickRight = true
    },
    // 点击按钮
    onClickRight () {
      this.$router.push({ path: '/oversee/opinion' })
    },
  }
}