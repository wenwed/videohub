import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store'

import homeView from '@/views/homeView.vue';
import videoView from '@/views/videoView.vue';
import userView from '@/views/userView.vue';
import userManage from '@/views/userManage.vue';
import NOTFOUND from '@/views/404.vue';

Vue.use(Router);

const vueRouter = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: "home", component: homeView, meta: { requiresAuth: false } },
    { path: '/video/:vdid', name: "video", component: videoView, meta: { requiresAuth: false } },
    { path: '/user/:usid', name: "user", component: userView, meta: { requiresAuth: false } },
    { 
      path: '/account',
      name: "account",
      component: userManage,
      meta: { 
        requiresAuth: true
      }
      // children: [
      //   path: ''
      // ]
    },
    { path: '*', name: "404NotFound", component: NOTFOUND, meta: { requiresAuth: false } },
  ]
});

// 页面刷新时，重新赋值有没登录
if (window.localStorage.getItem('login')) {
  store.commit("setToken", window.localStorage.getItem('userToken'));
  store.commit("setUSID", window.localStorage.getItem('USID'));
  store.commit("setName", window.localStorage.getItem('user_name'));
  store.commit("setPoster", window.localStorage.getItem('user_poster'));
  store.commit("setDate", window.localStorage.getItem('register_date'));
  store.commit("setDescripe", window.localStorage.getItem('user_descripe'));
  store.commit("setLogin", window.localStorage.getItem('login'));
}

vueRouter.beforeEach((to, from, next) => {
  console.log(from.name);
  if(to.matched.some(r => r.meta.requiresAuth)){
    if(store.state.isLogin !== "true"){
      next({ name: "404NotFound" });
    }else{
      next();
    }
  }else{
    next();
  }
});

export default vueRouter