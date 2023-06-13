import axios from "axios";
import _ from "lodash";
import { APPLICATION_URL } from "@/urls";

const state = {
    assessments: [],
    selectedAssessment: {},
    customAssessment: {},
    readOnlyData: {},
};
const getters = {
    assessments: (state) => state.assessments,
    selectedAssessment: (state) => state.selectedAssessment,
    readOnlyData: (state) => state.readOnlyData,
    customAssessment: (state) => state.customAssessment,
};
const mutations = {
    SET_ASSESSMENTS(state, value) {
        state.assessments = value;
    },
    SET_SELECTED_ASSESSMENT(state, value) {
        state.selectedAssessment = value;
    },
    SET_CUSTOM_ASSESSMENT(state, value) {
        state.customAssessment = value;
    },
    SET_READ_ONLY_DATA(state, value) {
        state.readOnlyData = value;
    },
};

const actions = {
    setCustomAssessment(state, vals) {
        state.commit("SET_CUSTOM_ASSESSMENT", vals);
    },
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

                state.commit("SET_SELECTED_ASSESSMENT", { ...data[0] });
                state.commit("SET_CUSTOM_ASSESSMENT", { ...data[0] });
                state.commit("SET_READ_ONLY_DATA", { ...data[0]?.read_only_data });

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
    async updateAssessment(state, vals) {
        try {
            const thisVal = vals?.thisVal || {};

            if (!(vals?.application_id && vals?.funding_request_id)) {
                return;
            }

            if (!Object.keys(vals?.data).length) {
                return;
            }

            const dataFormated = _.omit(vals.data, ['id', 'name_assessment', 'program_division', 'read_only_data']);

            const res = await axios.patch(
                APPLICATION_URL + `/${vals.application_id}/${vals.funding_request_id}/assessments/${vals.assessment_id}`,
                { data: { ...dataFormated } }
            );

            const message = res?.data?.messages[0];
            
            if (message?.variant === "success") {
                thisVal?.$emit("showSuccess", message.text);
                console.log("ASESSMENT UPDATED!");
            } else {
                thisVal?.$emit("showError", message?.text || "Error to update");
                console.log("Error to update assessments");
            }
            
        } catch (error) {
            const thisVal = vals?.thisVal || {};
            thisVal?.$emit("showError", "Error to update");
            console.log("Error to update assessments", error);
        } finally {
            if (!(vals?.application_id && vals?.funding_request_id)) {
                return;
            }
            this.dispatch('getAssessments', vals);
        }
    },
    async recalcAssessment(state, vals) {
        try {

            if (!(vals?.application_id && vals?.funding_request_id && vals?.assessment_id)) {
                return;
            }

            const res = await axios.get(
                APPLICATION_URL + `/${vals.application_id}/${vals.funding_request_id}/assessments/${vals.assessment_id}/re-calc`,
            );

            const message = res?.data?.messages[0];
            
            if (message?.variant === "success") {
                const data = res?.data?.data || [];

                if (!data.length) {
                    this.dispatch('postAssessment', vals);
                    return;
                }
                state.commit("SET_CUSTOM_ASSESSMENT", { ...this.getters.customAssessment, ...data[0] } );
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
