import Vue from 'vue'
import Router from 'vue-router'

import homeView from '@/views/homeView.vue'

Vue.use(Router)

const vueRouter = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: "首页", component: homeView }
  ]
})

export default vueRouter