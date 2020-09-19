import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store'

import homeView from '@/views/homeView.vue';
import videoView from '@/views/videoView.vue';
import userView from '@/views/userView.vue';
import userManage from '@/views/userManage.vue';
import NOTFOUND from '@/views/404.vue';
import updatePassword from '@/views/userManageViews/updatePassword.vue';
import updateUserInfo from '@/views/userManageViews/updateUserInfo.vue';
import updateVideo from '@/views/userManageViews/updateVideo.vue';
import uploadVideo from '@/views/userManageViews/uploadVideo.vue';
import videoList from '@/views/userManageViews/videoList.vue';
import test1 from '@/components/test.vue';
Vue.use(Router);

const vueRouter = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: "home", component: homeView, meta: { requiresAuth: false } },
    { path: '/video/:vdid', name: "video", component: videoView, meta: { requiresAuth: false } },
    { path: '/user/:usid', name: "user", component: userView, meta: { requiresAuth: false } },
    { path: '/test', name: "test", component: test1, meta: { requiresAuth: false } },
    { 
      path: '/account',
      name: "account",
      component: userManage,
      meta: { 
        requiresAuth: true
      },
      children: [
        {
          path: 'updatepassword',
          component: updatePassword,
          meta: { 
            requiresAuth: true
          }
        },
        {
          path: 'updateuserinfo',
          component: updateUserInfo,
          meta: { 
            requiresAuth: true
          }
        },
        {
          path: 'updatevideo/:id',
          component: updateVideo,
          meta: { 
            requiresAuth: true
          }
        },
        {
          path: 'uploadvideo',
          component: uploadVideo,
          meta: { 
            requiresAuth: true
          }
        },
        {
          path: 'videolist',
          component: videoList,
          meta: { 
            requiresAuth: true
          }
        }
      ]
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
  if(to.matched.some(r => r.meta.requiresAuth)){
    if(window.localStorage.getItem('login') !== "true"){
      next({ name: "404NotFound" });
    }else{
      next();
    }
  }else{
    next();
  }
});

export default vueRouter