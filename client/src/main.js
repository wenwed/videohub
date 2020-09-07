import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import './plugins/axios.js'
import store from './store/store.js'
import dayjs from 'dayjs'

Vue.config.productionTip = false

//导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.filter('Dayjs', function(value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  return dayjs(value).format(formatString)
})

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
})
