import Vue from 'vue';
import Router from 'vue-router';

import homeView from '@/views/homeView.vue';
import videoView from '@/views/videoView.vue';
import userView from '@/views/userView.vue';

Vue.use(Router);

const vueRouter = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: "首页", component: homeView },
    { path: '/video/:vdid', name: "视频", component: videoView },
    { path: '/user/:usid', name: "用户", component: userView },
  ]
})

export default vueRouter