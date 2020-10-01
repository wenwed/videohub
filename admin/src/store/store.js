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
  state:  Vue.observable({
    //管理员toekn
    adminToken: "",
    //管理员id
    ADID: null,
    //管理员姓名
    name: "",
    //登录标志
    isLogin: false
  }),
  mutations: {
    setToken(state, adminToken){
      state.adminToken = adminToken
    },
    setLogin(state, flag){
      state.isLogin = flag
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