import Vue from "vue"
import axios from "axios"


let config = {
  baseURL: "http://127.0.0.1:8633/api",
  timeout: 60 * 100,
  headers: { "content-Type": "application/json" }
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function(config){
    if(localStorage.adminToken){
      config.headers.admintoken = localStorage.adminToken
    }
    return config;
  },
  function(error) {
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    console.log(error)
    const { status } = error.response

    if(status == 401){
      // localStorage.removeItem("adminToken")
      this.$store.commit("setToken", "")
      this.$store.commit("setADID", null)
      this.$store.commit("setName", "")
      this.$store.commit("setLogin", false)
      alert("密码失效请重新登录")
    }else{
      alert(error.response.data.msg)
    }

    return Promise.reject(error)
  }
)

Plugin.install = function(Vue) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin