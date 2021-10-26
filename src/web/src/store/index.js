import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import profile from "./profile";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showAppSidebar: false,
    selectedStudentFullName: "",
    selectedStudentLocator: "",
    selectedStudentId: 0
  },
  getters: {
    showAppSidebar: state => state.showAppSidebar,
  },
  mutations: {
    SETSTUDENT(state, value) {
      state.selectedStudentFullName = `${value.FIRST_NAME} ${value.LAST_NAME}`;
      state.selectedStudentLocator = value.LOCATOR_NUMBER;
      state.selectedStudentId = value.STUDENT_ID;
    },
    CLEARSTUDENT(state) {
      state.selectedStudentFullName = "";
      state.selectedStudentLocator = "";
      state.selectedStudentId = 0;
    }
  },
  actions: {
    setAppSidebar(state, value) {
      state.state.showAppSidebar = value;
    },
    setStudent(state, value) {
      state.commit("SETSTUDENT", value);
    },
    clearStudent(state) {
      state.commit("CLEARSTUDENT");
    }
  },
  modules: { auth, profile }
});
