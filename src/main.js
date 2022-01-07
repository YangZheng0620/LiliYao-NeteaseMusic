import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from "vue-router" // 引入 vue-router
import store from './store'
import iviews from '../plugins/iviews/index'
import 'view-design/dist/styles/iview.css'
import elements from '../plugins/elements/index'
import utils from '../utils/utils'

// import VueCookies from 'vue-cookies'
// Vue.use(VueCookies)

Vue.config.productionTip = false

Vue.use(iviews)
Vue.use(VueRouter)

Vue.use(elements)
// Vue.component('el-carousel', Carousel);
// Vue.component('el-carousel-item', CarouselItem);

Vue.prototype.$utils = utils

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
