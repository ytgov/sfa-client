import axios from "axios";
import _ from "lodash";
import { APPLICATION_URL } from "@/urls";

const state = {
    assessments: [],
    selectedAssessment: {},
    customAssessment: {},
    readOnlyData: {},
    lastInsertedAssessmentId: null,
};
const getters = {
    assessments: (state) => state.assessments,
    selectedAssessment: (state) => state.selectedAssessment,
    readOnlyData: (state) => state.readOnlyData,
    customAssessment: (state) => state.customAssessment,
    lastInsertedAssessmentId: (state) => state.lastInsertedAssessmentId,
    selectedFundingId: (state) => state.funding_request_id,
};
const mutations = {
    SET_LAST_INSERTED_ASSESSMENT_ID(state, value) {
        state.lastInsertedAssessmentId = value;
    },
    SET_SELECTED_FUNDING_ID(state, value) {
        state.funding_request_id = value;
    },
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
            state.commit("SET_SELECTED_FUNDING_ID", vals.funding_request_id);
            const res = await axios.get(
                APPLICATION_URL + `/${vals.application_id}/${vals.funding_request_id}/assessments`,
            );

            const message = res?.data?.messages[0];
            
            if (message?.variant === "success") {
                const data = res?.data?.data || [];
                
                if (!data.length) {
                    this.dispatch('previewAssessment', vals);
                    return;
                }
                const over_award_flag = !!(data[0]?.over_award_applied_flg === "Yes");

                state.commit("SET_SELECTED_ASSESSMENT", { ...data[0], over_award_applied_flg: over_award_flag });
                state.commit("SET_CUSTOM_ASSESSMENT", { ...data[0], over_award_applied_flg: over_award_flag });
                state.commit("SET_READ_ONLY_DATA", { ...data[0]?.read_only_data });
                state.commit("SET_ASSESSMENTS", data);
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
            const thisVal = vals?.thisVal || {};

            if (!(vals?.application_id && vals?.funding_request_id)) {
                return;
            }

            const res = await axios.post(
                APPLICATION_URL + `/${vals.application_id}/${vals.funding_request_id}/assessments`,
                { dataAssessment: { ...vals.dataAssessment } }
            );

            const message = res?.data?.messages[0];
            
            if (message?.variant === "success") {
                thisVal?.$emit("showSuccess", "Added!");
            } else {
                thisVal?.$emit("showSuccess", "Error to add");
            }

        } catch (error) {
            const thisVal = vals?.thisVal || {};
            console.log("Error to insert assessments", error);
            thisVal?.$emit("showSuccess", "Error to insert");
        } finally {
            if (!(vals?.application_id && vals?.funding_request_id)) {
                return;
            }
            this.dispatch('getAssessments', vals);
        }
    },
    async postAssessmentWithDisbursements(state, vals) {
        try {
            const thisVal = vals?.thisVal || {};

            if (!(vals?.application_id && vals?.funding_request_id)) {
                return;
            }
            
            const res = await axios.post(
                APPLICATION_URL + `/${vals.application_id}/${vals.funding_request_id}/assessments-with-disburse`,
                { 
                    dataDisburse: vals.dataDisburse,
                    dataAssessment: vals.dataAssessment
                }
            );

            const message = res?.data?.messages[0];
            
            if (message?.variant === "success") {
                thisVal?.$emit("showSuccess", "Both added!");
            } else {
                thisVal?.$emit("showSuccess", "Error to add");
            }

        } catch (error) {
            const thisVal = vals?.thisVal || {};
            console.log("Error to insert assessments", error);
            thisVal?.$emit("showSuccess", "Error to insert");
        } finally {
            if (!(vals?.application_id && vals?.funding_request_id)) {
                return;
            }
            this.dispatch('getAssessments', vals);
            this.dispatch('setIsPreviewCharged', false);
            this.dispatch('getDisbursements', { funding_request_id: vals?.funding_request_id });
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
            if (!vals?.disburseList?.length) {
                return;
            }

            const dataFormated = _.omit(vals.data, ['name_assessment', 'program_division', 'read_only_data']);

            const res = await axios.patch(
                APPLICATION_URL + `/${vals.application_id}/${vals.funding_request_id}/assessments/${vals.assessment_id}`,
                { data: { ...dataFormated }, disburseList: vals.disburseList }
            );

            const message = res?.data?.messages[0];
            
            if (message?.variant === "success") {
                console.log("success updateAssessment");
                thisVal?.$emit("showSuccess", message.text);
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
            
            this.dispatch('getDisbursements', {application_id: vals.application_id, funding_request_id:vals.funding_request_id });
            this.dispatch('setIsPreviewCharged', false);
            vals?.thisVal.$refs.disburseComponent.saveEdition();
        }
    },
    async recalcAssessment(state, vals) {
        try {

            if (!(vals?.application_id && vals?.funding_request_id && !isNaN(vals?.assessment_id))) {
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
                const over_award_flag = !!(data[0]?.over_award_applied_flg === "Yes");

                state.commit("SET_CUSTOM_ASSESSMENT", { ...this.getters.customAssessment, ...data[0], over_award_applied_flg: over_award_flag } );
            } else {
                console.log("Error to get assessments");
            }

        } catch (error) {
            console.log("Error to get assessments", error);
        } finally {
        }
    },

    async previewAssessment(state, vals) {
        try {

            if (!(vals?.application_id && vals?.funding_request_id)) {
                return;
            }

            const res = await axios.get(
                APPLICATION_URL + `/${vals.application_id}/${vals.funding_request_id}/preview-assessment`,
            );

            const message = res?.data?.messages[0];
            
            if (message?.variant === "success") {
                const data = res?.data?.data || [];

                const over_award_flag = !!(data[0]?.over_award_applied_flg === "Yes");

                state.commit("SET_SELECTED_ASSESSMENT", { ...data[0], over_award_applied_flg: over_award_flag,  id: 0 });
                state.commit("SET_CUSTOM_ASSESSMENT", { ...data[0], over_award_applied_flg: over_award_flag });
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

    async refreshAssessment(state, vals) {
        try {

            if (!(vals?.application_id)) {
                return;
            }

            const res = await axios.post(
                APPLICATION_URL + `/${vals.application_id}/update-preview`,
                { data: vals.data, disburseAmountList: vals.disburseAmountList }
            );
            
            const message = res?.data?.messages[0];
            
            if (message?.variant === "success") {
                const data = res?.data?.data || [];

                const over_award_flag = !!(data[0]?.over_award_applied_flg === "Yes");

                state.commit("SET_CUSTOM_ASSESSMENT", { ...data[0], over_award_applied_flg: over_award_flag });
                state.commit("SET_READ_ONLY_DATA", { ...data[0]?.read_only_data });
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
