import axios from "axios";
import { AUTH_CHECK_URL, LOGOUT_URL } from "../urls";

const state = {
    user: null,
    fullName: "",
    email: "",
};
const getters = {
    isAuthenticated: state => !!state.user,
    fullName: state => state.fullName,
    email_officer: state => state.email,
};
const actions = {
    async checkAuthentication({ commit }) {
        await axios.get(AUTH_CHECK_URL)
            .then(resp => {
                commit("setUser", resp.data.data);
            }).catch(() => {
                commit("clearUser");
            });
    },
    async signOut({ commit }) {
        await axios.get(LOGOUT_URL)
            .then(() => {
                commit("clearUser");
            }).catch(err => {
                console.error(err);
            });
    }
};
const mutations = {
    setUser(state, user) {
        state.user = user;
        state.fullName = user.display_name;
        state.email = user.email;
    },
    clearUser(state) {
        state.user = null;
        state.fullName = null;
        state.email = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};