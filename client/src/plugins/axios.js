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

    if(status === 401){
      console.log(status)
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