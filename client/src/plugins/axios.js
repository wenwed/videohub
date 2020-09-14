import Vue from 'vue'
import axios from 'axios'

let config = {
  baseURL: "http://127.0.0.1:8633/api",
  timeout: 60 * 1000,
  headers: { "content-Type": "application/json" }
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function(config){
    if(localStorage.userToken) {
      config.headers.usertoken = localStorage.userToken
    }
    return config
  },
  function(error){
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  function(response){
    return response
  },
  function(error){
    console.log(error)
    const { status } = error.response
    console.log("错误代码为:"+status);
    if(status === 401){
      localStorage.removeItem("userToken");
      localStorage.removeItem("USID");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_poster");
      localStorage.removeItem("register_date");
      localStorage.removeItem("user_descripe");
      localStorage.removeItem("login");
      this.$store.commit("setToken", null);
      this.$store.commit("setUSID", null);
      this.$store.commit("setName", "");
      this.$store.commit("setPoster", "");
      this.$store.commit("setDate", "");
      this.$store.commit("setDescripe", "");
      this.$store.commit("setLogin", false);
      alert("token错误");
    }else{
      alert(error.response.data.msg)
    }

    return Promise.reject(error)
  }
)

Plugin.install = function( Vue ) {
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