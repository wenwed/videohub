import Vue from "vue"
import Vuex from "vuex"
import VuexPersistence from "vuex-persist"

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    adminToken: state.adminToken     //获取localStorage的token
  })
})

const store = new Vuex.Store({
  state: {
    adminToken: "",
    ADID: null,
    name: "",
    isLogin: false
  },
  mutations: {
    setToken(state, adminToken){
      state.adminToken = adminToken
    },
    setLogin(state, flag){
      state.flag = flag
    },
    setADID(state, ADID){
      state.ADID = ADID
    },
    setName(state, name){
      state.name = name
    }
  },
  actions: {},
  plugins: [ vuexLocal.plugin ]
})

export default store