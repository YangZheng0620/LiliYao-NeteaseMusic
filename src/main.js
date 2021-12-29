import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from "vue-router" // 引入 vue-router
import store from './store'
import iviews from './iviews/index'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(iviews)
Vue.use(VueRouter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
