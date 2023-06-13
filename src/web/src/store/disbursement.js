import axios from "axios";
import _ from "lodash";
import { DISBURSEMENT } from "@/urls";

const state = {
    disbursements: [],
};
const getters = {
    disbursements: (state) => state.disbursements,
};
const mutations = {
    SET_DISBURSEMENTS(state, value) {
        state.disbursements = value;
    },
};

const actions = {
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
        }
    },
    async postDisbursement(state, vals) {
        
        const emiter = vals?.emiter || {};
        try {
            
            if (!(vals?.data)) {
                return;
            }

            const res = await axios.post(DISBURSEMENT, { data: vals.data });

            if (res?.data?.success) {
                emiter?.$emit("showSuccess", "Added!");
                emiter?.setShow();
            } else {
                emiter?.$emit("showError", res.data?.message || "Fail to added");
            }

        } catch (error) {
            console.log("Error to insert disbursement", error);
        } finally {
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
