export default {
  namespaced: true,
  state: {
    // 缓存页面
    isKeepAlive: true
  },
  mutations: {
    /**
     * @class keepAlive
     * @description 修改缓存状态
     * @param {Object} state vuex state
     */
    setKeepAlive (state, flag) {
      state.isKeepAlive = flag
    }
  }
}
