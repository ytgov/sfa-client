import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import profile from "./profile";
import axios from "axios";
import { APPLICATION_URL } from "../urls"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showAppSidebar: false,
    selectedStudentFullName: "",
    selectedStudentLocator: "",
    selectedStudent: {},
    selectedStudentId: 0,
    selectedApplication: {},
    selectedApplicationId: 0,
  },
  getters: {
    showAppSidebar: state => state.showAppSidebar,
    selectedStudent: state => state.selectedStudent,
    selectedApplication: state => state.selectedApplication,
  },
  mutations: {
    SET_APPLICATION(state, value) {
      state.selectedApplication = value;
      state.selectedApplicationId = value.HISTORY_DETAIL_ID;
    },
    SET_STUDENT(state, value) {
      state.selectedStudentFullName = `${value.FIRST_NAME} ${value.LAST_NAME}`;
      state.selectedStudentLocator = value.LOCATOR_NUMBER;
      state.selectedStudentId = value.STUDENT_ID;
      state.selectedStudent = value;
    },
    CLEAR_STUDENT(state) {
      state.selectedStudentFullName = "";
      state.selectedStudentLocator = "";
      state.selectedStudentId = 0;
      state.selectedStudent = {};
    }
  },
  actions: {
    setAppSidebar(state, value) {
      state.state.showAppSidebar = value;
    },
    setStudent(state, value) {
      state.commit("SET_STUDENT", value);
    },
    clearStudent(state) {
      state.commit("CLEAR_STUDENT");
    },
    async loadApplication(state, id) {
      let resp = await axios.get(`${APPLICATION_URL}/${id}`);
      state.commit("SET_STUDENT", resp.data.data.student);
      state.commit("SET_APPLICATION", resp.data.data);
    },
  },
  modules: { auth, profile }
});
