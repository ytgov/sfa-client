import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import profile from "./profile";
import axios from "axios";
import { APPLICATION_URL, STUDENT_URL } from "../urls"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showAppSidebar: false,
    selectedStudentFullName: "",
    selectedStudentLocator: "",
    selectedStudent: { history_details: [] },
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
    SET_SIDEBAR(state, value) {
      state.showAppSidebar = value;
    },
    SET_APPLICATION(state, value) {
      state.selectedApplication = value;
      state.selectedApplicationId = value.HISTORY_DETAIL_ID;
    },
    CLEAR_APPLICATION(state) {
      console.log("CLEARING APPLICATION");
      state.selectedApplication = {};
      state.selectedApplicationId = 0;
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
      state.commit("SET_SIDEBAR", value);
    },
    setStudent(state, value) {
      state.commit("SET_STUDENT", value);
    },
    clearStudent(state) {
      state.commit("CLEAR_STUDENT");
    },
    async loadApplication(state, id) {
      let resp = await axios.get(`${APPLICATION_URL}/${id}`);

      if (!state.state.selectedStudent.STUDENT_ID)
        state.commit("SET_STUDENT", resp.data.data.student);

      state.commit("SET_APPLICATION", resp.data.data);
    },
    async loadStudent(state, id) {
      if (state.state.selectedStudentId != id)
        state.commit("CLEAR_APPLICATION");

      let resp = await axios.get(`${STUDENT_URL}/${id}`);
      state.commit("SET_STUDENT", resp.data.data);
    },
    updateStudent(state, vals) {
      let body = JSON.parse(`{"${vals[0]}": "${vals[1]}"}`);
      let emitter = vals[2];

      axios.put(`${STUDENT_URL}/${state.state.selectedStudentId}`, body)
        .then(resp => {
          let message = resp.data.messages[0];
          if (message.variant == "success")
            emitter.$emit("showSuccess", message.text);
          else
            emitter.$emit("showError", message.text);
        })
        .catch(err => {
          console.log("ERROR HAPPENED", err);
          emitter.$emit("showError", err.data.messages[0].text);
        })
    },
    updateApplication(state, vals) {
      let body = JSON.parse(`{"${vals[0]}": "${vals[1]}"}`);

      if (vals[1] == null) {
        body = JSON.parse(`{"${vals[0]}": ${vals[1]}}`);
      }

      console.log(body);

      let emitter = vals[2];

      axios.put(`${APPLICATION_URL}/${state.state.selectedApplicationId}`, body)
        .then(resp => {
          let message = resp.data.messages[0];
          if (message.variant == "success")
            emitter.$emit("showSuccess", message.text);
          else
            emitter.$emit("showError", message.text);
        })
        .catch(err => {
          console.log("ERROR HAPPENED", err);
          emitter.$emit("showError", err.data.messages[0].text);
        })
    }
  },
  modules: { auth, profile }
});
