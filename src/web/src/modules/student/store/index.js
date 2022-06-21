
import axios from "axios";
import { STUDENT_URL } from "@/urls";

const state = {
};
const getters = {
};
const mutations = {
};
const actions = {
    loadStudent(store, id) {
        return axios.get(`${STUDENT_URL}/${id}`)
        .then(resp => resp.data.data)
        .catch(resp => {
            console.log(resp)
        })
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
