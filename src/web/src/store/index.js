import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import profile from "./profile";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showAppSidebar: false
  },
  getters: {
    showAppSidebar: state => state.showAppSidebar,
  },
  mutations: {
  },
  actions: {
    setAppSidebar(state, value) {
      state.state.showAppSidebar = value;
    }
  },
  modules: { auth, profile }
});
