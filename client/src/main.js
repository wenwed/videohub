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

Vue.filter('ViewCounts', function(value) {
  let level = value.toString().length;
  console.log(level <= 3);
  switch (true) {
    case level <= 3:
      return value;
    case level > 3 && level <= 7:
      return Math.floor(value/1000) + "万";
    case level > 7:
      return Math.floor(value/10000000) + "亿";
    default:
      return value;
  }
})

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
})
