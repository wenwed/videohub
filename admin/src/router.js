import Vue from "vue"
import Router from "vue-router"

import userView from "@/views/userView.vue"
import videoTypeView from "@/views/videoTypeView.vue"
import videoView from "@/views/videoView.vue"

Vue.use(Router)

const vueRouter = new Router({
  routes: [
    { path: "/", redirect: "/videotype" },
    { path: "/videotype", name: "视频种类管理", component: videoTypeView },
    { path: "/video", name: "视频管理", component: videoView },
    { path: "/user", name: "用户管理", component: userView }
  ]
})

export default vueRouter