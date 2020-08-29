import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import './plugins/axios.js'

Vue.config.productionTip = false

new Vue({
  el: "#app",
  router,
  render: h => h(App)
})
