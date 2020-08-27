import Vue from 'vue'
import App from './App.vue'
import './plugins/axios'
import store from './store/store.js'
import router from './router'
import dayjs from 'dayjs'

//导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.filter('Dayjs', function(value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  return dayjs(value).format(formatString)
})

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
})
