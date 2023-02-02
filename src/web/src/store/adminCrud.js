import axios from "axios";
import { INSTITUTION_URL } from "../urls";

const state = {
    search: "",
    activeOnlyFilter: false,
    snack: false,
    snackText: '',
    snackColor: '',
};
const getters = {
    search: state => state.search,
    activeOnlyFilter: state => state.activeOnlyFilter,
    snack: state => state.snack,
    snackText: state => state.snackText,
    snackColor: state => state.snackColor,
};
const actions = {
    setSearch(state, value) {
        state.commit("SET_SEARCH", value);
    },
    setActiveOnlyFilter(state, value) {
        state.commit("SET_ACTIVE_ONLY_FILTER", value);
    },
    setSnack(state, value) {
        state.commit("SET_SNACK", value);
    },
    setSnackText(state, value) {
        state.commit("SET_SNACK_TEXT", value);
    },
    setSnackColor(state, value) {
        state.commit("SET_SNACK_COLOR", value);
    },
    save (id, description) {
        this.changeDescription(id, description);
    },
    messageStatus (state, message = "", status = "") {
        state.commit("MESSAGE_STATUS", message, status);
    },
    cancel (state) {
        state.commit("CANCEL");
    },
    open (state) {
        state.commit("OPEN");
    },
};
const mutations = {
    SET_SEARCH(state, value) {
        state.search = value;
    },
    SET_ACTIVE_ONLY_FILTER(state, value) {
        state.activeOnlyFilter = value;
    },
    SET_SNACK(state, value) {
        state.snack = value;
    },
    SET_SNACK_TEXT(state, value) {
        state.snackText = value;
    },
    SET_SNACK_COLOR(state, value) {
        state.snackColor = value;
    },
    CANCEL(state) {
        state.snack = true
        state.snackColor = 'error'
        state.snackText = 'Canceled'
    },
    OPEN(state) {
        state.snack = true
        state.snackColor = 'info'
        state.snackText = 'Dialog opened'
    },
    MESSAGE_STATUS(state, { message = "", status = ""}) {
        console.log(message, status);
        state.snack = true
        state.snackColor = status
        state.snackText = message
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};