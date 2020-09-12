import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    userToken: state.usertoken,
    USID: state.USID,
    user_name: state.name,
    user_poster: state.poster,
    register_date: state.date,
    user_descripe: state.descripe,
    login: state.isLogin
  })
})

const store = new Vuex.Store({
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
    setUSID(state, USID){
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