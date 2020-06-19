import 'amfe-flexible'
import Vue from 'vue'
import App from './App'
import router from '@/router/index'
import store from '@/store/index'

// Vant 组件库
import Vant from 'vant'
import 'vant/lib/index.less'
import 'vant/lib/icon/local.css' // 使用本地字体文件
Vue.use(Vant)

// 表单验证
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

// 高德地图
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '1adc934d077883118e0465adfb5d3f38',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

// 日历
// 如需设置样式请参照这块儿：https://github.com/nathanreyes/v-calendar/blob/next/src/utils/defaults/theme.js
import VCalendar from 'v-calendar'
Vue.use(VCalendar)

Vue.config.productionTip = false

// 全局变量
// Vue.prototype.sinoObj = {}
// Vue.prototype.setSinoObj = (key, value ) => {
//   Vue.prototype.sinoObj.key = value
// }
// Vue.prototype.getSinoObj = () => {
// 	const obj = Vue.prototype.sinoObj.key
// 	delete Vue.prototype.sinoObj.key
// 	return obj
// }

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 获取参数信息，跳转到对应页面
// eslint-disable-next-line no-undef
if (globalCons.path) {
  const query = {} // 路由的参数
  // eslint-disable-next-line no-undef
  for (let key in globalCons) {
    if (key !== 'path') {
      // eslint-disable-next-line no-undef
      query[key] = globalCons[key]
    }
  }
  // eslint-disable-next-line no-undef
  app.$router.push({ path: globalCons.path, query });  // 解析跳转到对应页面
}
