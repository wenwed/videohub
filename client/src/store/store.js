import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    userToken: state.usertoken
  })
})

const store = new Vuex.store({
  state: Vue.observable({
    userToken: null,
    USID: null,
    name: "",
    poster: "",
    date: null,
    descripe: "",
    isLogin: false
  }),
  mutations: {
    setToken(state, userToken){
      state.userToken = userToken
    },
    setUSIDn(state, USID){
      state.USID = USID
    },
    setName(state, name){
      state.name = name
    },
    setPoster(state, poster){
      state.poster = poster
    },
    setDate(state, date){
      state.date = date
    },
    setDescripe(state, descripe){
      state.descripe = descripe
    },
    setLogin(state, isLogin){
      state.isLogin = isLogin
    }
  },
  actions: {},
  plugins: [ vuexLocal.plugin ]
})

export default store