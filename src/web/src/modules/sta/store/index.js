import axios from "axios";
import _ from "lodash";
import { ASSESSMENT } from "@/urls";

const state = {
    assessmentSTA: {},
    disbursementListSTA: [],
};
const getters = {
    assessmentSTA: (state) => state.assessmentSTA,
    disbursementListSTA: (state) => state.disbursementListSTA,
};
const mutations = {
    SET_ASSESSMENT_STA(state, value) {
        state.assessmentSTA = value;
    },
    SET_DISBURSEMENT_LIST_STA(state, value) {
        state.disbursementListSTA = value;
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
    async recalcSTA(state, vals) {
        try {
            const assessment = getters.assessmentSTA;

            const res = await axios.get(
                ASSESSMENT + `/sta/recalc`,
                {
                    assessment: assessment
                }
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
    addItemDisbursementListSTA({ commit, state }, vals) {
        commit("SET_DISBURSEMENT_LIST_STA",
            [
                ...state.disbursementListSTA,
                {
                    disbursement_type_id: null,
                    disbursed_amount: 0,
                    due_date: null,
                    tax_year: null,
                    issue_date: null,
                    transaction_number: null,
                    change_reason_id: null,
                    financial_batch_id: null,
                },

            ]);
    },
    cancelItemDisbursementListSTA({ commit, state }, vals) {
        const previewList = [...state.disbursementListSTA];

        if (vals?.index > -1) {
            previewList.splice(vals.index, 1);
        }
        commit("SET_DISBURSEMENT_LIST_STA", [...previewList]);
    },
    async saveSTAAssessment({ getters, dispatch }, vm) {
        const assessment = getters.assessmentSTA;
        console.log("VM", vm);
        const body = {
            assessment: assessment
        };

        let resAction = undefined;

        if (assessment?.id) {
            resAction = await axios.put(
                `${ASSESSMENT}/sta/${assessment.id}`,
                body
            );
        }
        else {
            resAction = await axios.post(
                `${ASSESSMENT}/sta`,
                body
            );
        }

        const message = resAction?.data?.messages[0];

        if (message?.variant === "success") {
            vm.$emit("showSuccess", message.text);
            dispatch("staGetAssessment", { funding_request_id: assessment.funding_request_id });
            if (vm?.setClose && vm.showAdd) {
                vm.setClose();
            }
            if (!vm?.filteredList) {
                vm.newRecord = {};
            }
        } else {
            vm.$emit("showError", message.text);
        }
    },

};

export default {
    state,
    getters,
    mutations,
    actions
};
