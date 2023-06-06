import axios from "axios";
import { APPLICATION_URL } from "@/urls";

const state = {
    assessments: [],
};
const getters = {
    assessments: (state) => state.assessments,
};
const mutations = {
    SET_ASSESSMENTS(state, value) {
        state.assessments = value;
    },
};

const actions = {
    async getAssessments(state, vals) {
        try {

            if (!(vals?.application_id && vals?.funding_request_id)) {
                return;
            }

            const res = await axios.get(
                APPLICATION_URL + `/${vals.application_id}/${vals.funding_request_id}/assessments`,
            );

            const message = res?.data?.messages[0];
            
            if (message?.variant === "success") {
                const data = res?.data?.data || [];

                if (!data.length) {
                    this.dispatch('postAssessment', vals);
                    return;
                }

                state.commit("SET_ASSESSMENTS", data);
            } else {
                console.log("Error to get assessments");
            }

        } catch (error) {
            console.log("Error to get assessments", error);
        } finally {
        }
    },
    async postAssessment(state, vals) {
        try {

            if (!(vals?.application_id && vals?.funding_request_id)) {
                return;
            }

            const res = await axios.post(
                APPLICATION_URL + `/${vals.application_id}/${vals.funding_request_id}/assessments`,
            );

            const message = res?.data?.messages[0];
            
            if (message?.variant === "success") {
                console.log("ASESSMENT INSERTED!");
            } else {
                console.log("Error to get assessments");
            }

        } catch (error) {
            console.log("Error to insert assessments", error);
        } finally {
            if (!(vals?.application_id && vals?.funding_request_id)) {
                return;
            }
            this.dispatch('getAssessments', vals);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
