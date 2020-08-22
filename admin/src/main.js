import Vue from 'vue'
import App from './App.vue'
import './plugins/axios'
import store from './store/store.js'

//导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  el: "#app",
  store,
  render: h => h(App)
})
