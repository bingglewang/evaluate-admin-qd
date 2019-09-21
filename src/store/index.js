import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    user: {
      uName: window.localStorage.getItem('user' || '[]') == null ? '未登录' : JSON.parse(window.localStorage.getItem('user' || '[]')).uName,
    },
  },
  mutations:{
    logout(state) {
      window.localStorage.removeItem('user');
      state.routes = [];
    },
    setUser(state, user) {
      window.localStorage.setItem('user', JSON.stringify(user));
      state.user.uName = user.uName;
    }
  },
  actions:{

  }
})
