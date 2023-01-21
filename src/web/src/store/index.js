import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import profile from "./profile";
import institution from "./institution";
import student from "@/modules/student/store";
import province from "@/modules/province/store";
import countries from "@/modules/countries/store";
import cities from "@/modules/cities/store";
import addressType from "@/modules/address-type/store";
import indigenousLearner from "@/modules/indigenous-learner/store";
import adminCrud from "./adminCrud";
import axios from "axios";
import { APPLICATION_URL, STUDENT_URL } from "../urls"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showAppSidebar: false,
    showSideBarAdmin: false,
    selectedStudentFullName: "",
    selectedStudentLocator: "",
    selectedStudent: { applications: [] },
    selectedStudentId: 0,
    selectedApplication: {},
    selectedApplicationId: 0,
    recentStudents: [],
  },
  getters: {
    showAppSidebar: state => state.showAppSidebar,
    showSideBarAdmin: state => state.showSideBarAdmin,
    selectedStudent: state => state.selectedStudent,
    selectedApplication: state => state.selectedApplication,
    recentStudents: state => state.recentStudents,
  },
  mutations: {
    SET_SIDEBAR(state, value) {
      state.showAppSidebar = value;
    },
    SET_SIDEBAR_ADMIN(state, value) {
      state.showSideBarAdmin = value;
    },
    SET_APPLICATION(state, value) {
      console.log("SET APPLICATION");
      state.selectedApplication = value;
      state.selectedApplicationId = value.id;
    },
    CLEAR_APPLICATION(state) {
      console.log("CLEARING APPLICATION");
      state.selectedApplication = {};
      state.selectedApplicationId = 0;
    },
    SET_STUDENT(state, value) {
      console.log("SET STUDENT");
      state.selectedStudentFullName = `${value.first_name} ${value.last_name}`;
      state.selectedStudentLocator = value.locator_number;
      state.selectedStudentId = value.id;
      state.selectedStudent = value;

      let isRecent = state.recentStudents.filter(r => r.id == value.id);

      if (isRecent.length == 0) {
        state.recentStudents.unshift(value);
      }
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
    setAppSideBarAdmin(state, value) {
      state.commit("SET_SIDEBAR_ADMIN", value);
    },
    setStudent(state, value) {
      state.commit("SET_STUDENT", value);
    },
    clearStudent(state) {
      state.commit("CLEAR_STUDENT");
    },
    async loadApplication(state, id) {
      let resp = await axios.get(`${APPLICATION_URL}/${id}`);

      if (!state.state.selectedStudent.id)
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
    },
    updateConsent(state, vals) {
      let emitter = vals[1];
      let consent = vals[0];

      if (consent.id) {
        //console.log("DOING PUT", consent)
        let id = consent.id;
        delete consent.id;

        axios.put(`${STUDENT_URL}/${state.state.selectedStudentId}/consent/${id}`, consent)
          .then(resp => {
            let message = resp.data.messages[0];
            if (message.variant == "success") {
              let student = state.state.selectedStudent;
              student.consents = resp.data.data;
              state.commit("SET_STUDENT", student);
              emitter.$emit("showSuccess", message.text);
            }
            else
              emitter.$emit("showError", message.text);
          })
          .catch(err => {
            console.log("ERROR HAPPENED", err);
            emitter.$emit("showError", err.data.messages[0].text);
          })
      }
      else {
        //console.log("DOING POST", consent)

        axios.post(`${STUDENT_URL}/${state.state.selectedStudentId}/consent`, consent)
          .then(resp => {
            let message = resp.data.messages[0];
            if (message.variant == "success") {
              let student = state.state.selectedStudent;
              student.consents = resp.data.data;
              state.commit("SET_STUDENT", student);
              emitter.$emit("showSuccess", message.text);
            }
            else
              emitter.$emit("showError", message.text);
          })
          .catch(err => {
            console.log("ERROR HAPPENED", err);
            emitter.$emit("showError", err.data.messages[0].text);
          })
      }
    },
    deleteConsent(state, vals) {
      let emitter = vals[1];
      let consent = vals[0];
      let id = consent.id;

      axios.delete(`${STUDENT_URL}/${state.state.selectedStudentId}/consent/${id}`)
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
  },
  modules: { auth, profile, institution, student, province, countries, cities, addressType, indigenousLearner, adminCrud, }
});
