import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // 当前用户
  currentUser: {},
  // 是否为访客
  isVisitor: false
}

const mutations = {
  setCurrentUser (state, currentUser) {
    state.currentUser = currentUser;
  },

  setIsVisitor (state, isVisitor) {
    state.isVisitor = isVisitor;
  }
}

export default new Vuex.Store({
  state,
  mutations
})
