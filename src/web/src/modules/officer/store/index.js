import axios from "axios";
import { USERS_URL } from "@/urls";

const state = {
  users: [],
  roleOptions: ["Admin", "User", "Viewer"],
};
const getters = {};
const mutations = {
  SET_USERS(state, value) {
    state.users = value;
  },
};
const actions = {
  loadUsers(state) {
    axios.get(USERS_URL).then((resp) => {
      state.commit("SET_USERS", resp.data.data);
    });
  },
  create(store, item) {
    axios.post(`${USERS_URL}`, item).then((resp) => {
      store.dispatch("loadUsers");
    });
  },
  update(store, item) {
    axios.put(`${USERS_URL}/${item.id}`, item).then((resp) => {
      store.dispatch("loadUsers");
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
