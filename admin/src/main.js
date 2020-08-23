import Vue from 'vue'
import App from './App.vue'
import './plugins/axios'
import store from './store/store.js'
import router from './router'

//导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
})
