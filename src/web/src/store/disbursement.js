import axios from "axios";
import _ from "lodash";
import { DISBURSEMENT, APPLICATION_URL } from "@/urls";

const state = {
    disbursements: [],
    previewDisbursementList: [],
    isPreviewCharged: false
};
const getters = {
    disbursements: (state) => state.disbursements,
    isPreviewCharged: (state) => state.isPreviewCharged,
    previewDisbursementList: (state) => state.previewDisbursementList,
};
const mutations = {
    SET_DISBURSEMENTS(state, value) {
        state.disbursements = value;
    },
    SET_IS_PREVIEW_CHARGED(state, value) {
        state.isPreviewCharged = value;
    },
    SET_PREVIEW_DISBURSEMENT_LIST(state, value) {
        state.previewDisbursementList = value;
    },
};

const actions = {
    setIsPreviewCharged(state, vals) {
        state.commit("SET_IS_PREVIEW_CHARGED", vals);
        state.commit("SET_PREVIEW_DISBURSEMENT_LIST", []);
    },
    async backDisbursement(state, list) {
        try {
            state.commit("SET_DISBURSEMENTS", list);
        } catch (error) {
            console.log("Error to set disbursements", error);
        } finally {
        }
    },
    async getDisbursements(state, vals) {
        try {
            if (!vals?.funding_request_id) {
                return;
            }


            const res = await axios.get(
                DISBURSEMENT + `/funding-request/${vals.funding_request_id}/`,
            );

            if (res?.data?.success) {
                const data = res?.data?.data || [];
                state.commit("SET_DISBURSEMENTS", data);
            } else {
                console.log("Error to get disbursements");
            }

        } catch (error) {
            console.log("Error to get disbursements", error);
        } finally {
            
            this.dispatch('getAssessments', { application_id: vals?.application_id, funding_request_id: vals.funding_request_id });
        }
    },
    async previewDisbursements(state, vals) {
        try {
            const thisVal = vals?.thisVal || {};

            if (!vals?.data && !vals.application_id && !vals?.assessment_id) {
                return;
            }
            const assessmentData = {};
            
            for (const key in vals?.data) {
                if (!vals.data[key] && vals.data[key] !== 0) {
                    assessmentData[key] = null;
                } else {
                    assessmentData[key] = vals.data[key];
                }
            }

            const over_award_flag = 
                (!!assessmentData?.over_award_applied_flg === false || assessmentData?.over_award_applied_flg === "No")
                ? "No"
                : "Yes";

            const res = await axios.post(
                APPLICATION_URL + `/${vals.application_id}/assessment/${vals.assessment_id}/disburse`,
                { data: { ...assessmentData, over_award_applied_flg: over_award_flag } }
            );
            
            const message = res?.data?.messages[0];

            if (message?.variant === "success") {
                const data = res?.data?.data || [];
                state.commit("SET_PREVIEW_DISBURSEMENT_LIST", [ ...data ]);
                state.commit("SET_IS_PREVIEW_CHARGED", true);
                thisVal?.$emit("showSuccess", "Correct Disburse");
            } else {
                thisVal?.$emit("showError", message.text || "Error to get Disburse");
            }

        } catch (error) {
            console.log("Error to get disbursements", error);
        } finally {
        }
    },
    async postDisbursement(state, vals) {
        
        const emiter = vals?.emiter || {};
        try {
            
            if (!(vals?.data)) {
                return;
            }

            if (vals?.isList === "disburseList" && vals.data ) {
                const res = await axios.post(DISBURSEMENT, { 
                    data: [ ...vals.data ],
                    isList:  vals.isList
                });
    
                if (res?.data?.success) {
                    emiter?.$emit("showSuccess", "Added!");
                    emiter?.setShow(false);
                } else {
                    emiter?.$emit("showError", res.data?.message || "Fail to added");
                }
            } else {
                const res = await axios.post(DISBURSEMENT, { data: vals.data, });
    
                if (res?.data?.success) {
                    emiter?.$emit("showSuccess", "Added!");
                    emiter?.setShow(false);
                } else {
                    emiter?.$emit("showError", res.data?.message || "Fail to added");
                }
            }

        } catch (error) {
            console.log("Error to insert disbursement", error);
        } finally {
            if (Array.isArray(vals.data)) {
                this.dispatch('setIsPreviewCharged', false);
                this.dispatch('getDisbursements', { funding_request_id: vals?.funding_request_id });
            }
            if (!(vals?.data?.funding_request_id)) {
                return;
            }
            this.dispatch('getDisbursements', { funding_request_id: vals?.data?.funding_request_id });
        }
    },
    async updateDisbursement(state, vals) {
        try {
            const emiter = vals?.emiter || {};

            if (!(vals?.data)) {
                return;
            }
            if (!(vals?.disbursement_id)) {
                return;
            }

            const res = await axios.patch(
                DISBURSEMENT + "/" + vals.disbursement_id,
                { data: vals.data }
            );

            if (res?.data?.success) {
                emiter.$emit("showSuccess", "Added!");
                emiter.currentEditing = null;
            } else {
                emiter.$emit("showError", res.data?.message || "Fail to added");
            }

        } catch (error) {
            console.log("Error to insert disbursement", error);
        } finally {
            const emiter = vals?.emiter || {};
            if (!(vals?.funding_request_id)) {
                return;
            }
            this.dispatch('getDisbursements', vals);
        }
    },
    async removeDisbursement(state, vals) {
        try {
            const emiter = vals?.emiter || {};

            if (!(vals?.disbursement_id)) {
                return;
            }

            const res = await axios.delete(
                DISBURSEMENT + "/" + vals.disbursement_id,
            );

            if (res?.data?.success) {
                emiter.$emit("showSuccess", "Deleted!");
                emiter.currentEditing = null;
            } else {
                emiter.$emit("showError", res.data?.message || "Fail to delete");
            }

        } catch (error) {
            console.log("Error to delete disbursement", error);
        } finally {
            const emiter = vals?.emiter || {};
            if (!(vals?.funding_request_id)) {
                return;
            }
            this.dispatch('getDisbursements', vals);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
