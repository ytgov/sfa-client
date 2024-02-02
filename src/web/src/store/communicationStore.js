import axios from "axios";
import { COMMUNICATION_TYPES } from "@/urls";

const state = {
  studentId: 0,
  communication: [],
};
const getters = {
  flaggedCount: (state) => state.communication.filter((f) => f.show_alert).length,
  activeOnly: (state) => state.activeOnly,
};
const actions = {
  clearStudentCommunication({ commit }) {
    commit("SET_COMMUNICATION", []);
  },

  async loadStudentCommunication({ state, commit }, { studentId }) {
    state.studentId = studentId;
    axios
      .get(`${COMMUNICATION_TYPES}/${studentId}`)
      .then((resp) => {
        let items = resp.data.data;
        this.communicationsAccordion = items;
        commit("SET_COMMUNICATION", items);
      })
      .catch(() => {
        commit("SET_COMMUNICATION", []);
      });
  },
  addCommunication() {},
  updateCommunication() {},

  deleteCommunication({ state, dispatch }, { id }) {
    return axios.delete(`${COMMUNICATION_TYPES}/${id}`).catch(() => {
      commit("SET_COMMUNICATION", []);
    });
  },
};
const mutations = {
  SET_COMMUNICATION(state, value) {
    state.communication = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
