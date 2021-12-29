import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index', // 重定向到 index 页面
    children: [
      {
        path: '/index',
        name: 'Index',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Demo" */ '../views/Index')
      },
      {
        path: '/demo',
        name: 'Demo',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Demo" */ '../views/Demo')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history', // 修改路由模式
  routes
})

export default router
