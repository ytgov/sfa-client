import axios from "axios";
import { INSTITUTION_URL } from "../urls";

const state = {
};
const getters = {
};
const actions = {
    updateInstitution(state, vals) {
        let body = JSON.parse(`{"${vals[0]}": "${vals[1]}"}`);

        if (vals[1] == null) {
            body = JSON.parse(`{"${vals[0]}": ${vals[1]}}`);
        }

        let emitter = vals[2];
        let id = vals[3];

        axios.put(`${INSTITUTION_URL}/${id}`, body)
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
    async deleteInstitution(state, vals) {
        let emitter = vals[1];
        let institution = vals[0];

        return axios.delete(`${INSTITUTION_URL}/${institution.id}`)
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

    updateCampus(state, vals) {
        let body = JSON.parse(`{"${vals[0]}": "${vals[1]}"}`);

        if (vals[1] == null) {
            body = JSON.parse(`{"${vals[0]}": ${vals[1]}}`);
        }

        let emitter = vals[2];
        let id = vals[3];
        let campusId = vals[4];

        axios.put(`${INSTITUTION_URL}/${id}/campus/${campusId}`, body) 
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

    createCampus(state, vals) {
        let institutionId = vals[0];
        let emitter = vals[1];
        let callback = vals[2];

        axios.post(`${INSTITUTION_URL}/${institutionId}/campus`)
            .then(resp => {
                let newCampusId = resp.data.data.id;
                callback(newCampusId);
            })
            .catch(err => {
                console.log("ERROR HAPPENED", err);
                emitter.$emit("showError", err.data.messages[0].text);
            })
    }
};
const mutations = {
};

export default {
    state,
    getters,
    actions,
    mutations
};