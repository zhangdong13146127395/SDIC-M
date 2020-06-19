import Vue from 'vue'
import Vuex from 'vuex'

import sino from './modules/sino'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sino
  }
})
