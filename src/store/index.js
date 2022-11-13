import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userDni:''
  },
  mutations: {
    setUserDni(state, dni){
      state.userDni = dni
    }
  },
  actions: {
    getUserDni({commit},dni){
      commit('setUserDni',dni)
    }
  },
  modules: {
  }
})
