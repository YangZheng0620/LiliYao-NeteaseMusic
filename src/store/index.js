import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from "./getters"

Vue.use(Vuex)


const actions = {}


const store = new Vuex.Store({
  // 准备 actions，用于相应组件中的动作
  actions: actions,
  // 准备 mutations，用于操作数据（state）
  mutations: mutations,
  // 准备 state，用于存储数据
  state: state,
  // 监听 state 数据
  getters,
})

export default store
