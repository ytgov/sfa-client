import axios from "axios";
import _ from "lodash";
import { ASSESSMENT } from "@/urls";

const state = {
    assessmentSTA: {},
};
const getters = {
    assessmentSTA: (state) => state.assessmentSTA,
};
const mutations = {
    SET_ASSESSMENT_STA(state, value) {
        state.assessmentSTA = value;
    },
};

const actions = {
    async staGetAssessment(state, vals) {
        try {

            if (!vals?.funding_request_id) {
                return;
            }

            const res = await axios.get(
                ASSESSMENT + `/sta/assess-info/${vals.funding_request_id}`,
            );
            console.log("GET ASSSESS", res);
            const success = res?.data?.success;

            if (success) {
                const data = res?.data?.data || {};
                state.commit("SET_ASSESSMENT_STA", data);
            } else {
                console.log("Error to get assessments");
            }

        } catch (error) {
            console.log("Error to get assessments", error);
        } finally {
        }
    },

};

export default {
    state,
    getters,
    mutations,
    actions
};
