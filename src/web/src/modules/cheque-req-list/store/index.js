
import axios from "axios";
import { CHEQUE_REQ_LIST, STUDENT_URL } from "@/urls";
import { unsignedTemplete, signedTemplete } from "../pdfTempletes/pdfTempletes";
import { saveAs } from 'file-saver';

const state = {
    chequeReqFileName: '',
    showOverlay: false,
    chequeReqRecordsForDAT: [],
    chequeReqRecordsForPDFSigned: [],
    chequeReqRecordsForPDFUnsigned: [],
    chequeReqBatchTotalUnsigned: '',
    chequeReqBatchTotalSigned: '',
};
const getters = {
    chequeReqFileName: (state) => state.chequeReqFileName,
    showOverlay: (state) => state.showOverlay,
    chequeReqRecordsForDAT: (state) => state.chequeReqRecordsForDAT,
    chequeReqRecordsForPDFSigned: (state) => state.chequeReqRecordsForPDFSigned,
    chequeReqRecordsForPDFUnsigned: (state) => state.chequeReqRecordsForPDFUnsigned,
    chequeReqBatchTotalUnsigned: (state) => state.chequeReqBatchTotalUnsigned,
    chequeReqBatchTotalSigned: (state) => state.chequeReqBatchTotalSigned,
};
const mutations = {
    SET_CHEQUE_REQ_FILE_NAME(state, value) {
        state.chequeReqFileName = value;
    },
    SET_CHEQUE_REQ_RECORDS_DAT(state, value) {
        state.chequeReqRecordsForDAT = value;
    },
    SET_CHEQUE_REQ_RECORDS_PDF_SIGNED(state, value) {
        state.chequeReqRecordsForPDFSigned = value;
    },
    SET_CHEQUE_REQ_RECORDS_PDF_UNSIGNED(state, value) {
        state.chequeReqRecordsForPDFUnsigned = value;
    },
    SET_CHEQUE_REQ_BATCH_TOTAL_SIGNED(state, value) {
        state.chequeReqBatchTotalSigned = value;
    },
    SET_CHEQUE_REQ_BATCH_TOTAL_UNSIGNED(state, value) {
        state.chequeReqBatchTotalUnsigned = value;
    },
    SET_CHEQUE_REQ_SHOW_OVERLAY(state, value) {
        state.showOverlay = value;
    }
};
const actions = {
    setOverlay({ commit }, value) {
        commit("SET_CHEQUE_REQ_SHOW_OVERLAY", value);
    },
    resetChequeReqData: ({ commit, }) => {
        commit("SET_CHEQUE_REQ_FILE_NAME", '');
        commit("SET_CHEQUE_REQ_RECORDS_DAT", []);
        commit("SET_CHEQUE_REQ_RECORDS_PDF_UNSIGNED", []);
        commit("SET_CHEQUE_REQ_RECORDS_PDF_ SIGNED", []);
        commit("SET_CHEQUE_REQ_BATCH_TOTAL_UNSIGNED", '');
        commit("SET_CHEQUE_REQ_BATCH_TOTAL_SIGNED", '');
        commit("SET_CHEQUE_REQ_SHOW_OVERLAY", false);
    },
    async genereteFiles({ dispatch }, vals) {
        try {
            if (!vals?.issueDate) {
                dispatch("messageStatus", { message: "Issue Date is missing", status: "error" });
            }

            await dispatch("setOverlay", true);

            await dispatch("getChequeReqData", vals);
            await dispatch("resetChequeReqData");

            await dispatch("setOverlay", false);
        } catch (error) {
            console.log(error);
            await dispatch("resetChequeReqData");
            dispatch("messageStatus", { message: "An error occurred", status: "error" });
        }

    },
    async getChequeReqData({ commit, dispatch }, vals) {
        try {
            const res = await axios.get(CHEQUE_REQ_LIST + "?issueDate=" + vals.issueDate + "&reRunBatch=" + vals.reRunBatch);

            if (res?.data?.success) {
                const recordsDat = res?.data?.data.records ?? [];
                const recordsPdfUnsigned = res?.data?.data.pdfData ?? [];
                const recordsPdfSigned = res?.data?.data.pdfDataSigned ?? [];
                const batchTotalUnsigned = res?.data?.data?.batchTotal ?? '';
                const batchTotalSigned = res?.data?.data?.batchTotalSigned ?? '';
                const filename = res?.data?.data.filename ?? 'ChequeReqList';

                commit("SET_CHEQUE_REQ_FILE_NAME", filename);
                commit("SET_CHEQUE_REQ_RECORDS_PDF_UNSIGNED", [...recordsPdfUnsigned]);
                commit("SET_CHEQUE_REQ_RECORDS_PDF_SIGNED", [...recordsPdfSigned]);
                commit("SET_CHEQUE_REQ_RECORDS_DAT", [...recordsDat]);
                commit("SET_CHEQUE_REQ_BATCH_TOTAL_UNSIGNED", batchTotalUnsigned);
                commit("SET_CHEQUE_REQ_BATCH_TOTAL_SIGNED", batchTotalSigned);

                await dispatch("generateCSLReqListDAT");

            } else {
                dispatch("messageStatus", { message: res?.data?.text, status: "error" });
            }
        } catch (error) {
            console.log(error);
            dispatch("messageStatus", { message: "Error to get data", status: "error" });
        }
    },
    generateCSLReqListDAT: async ({ getters, dispatch }, vals) => {
        try {
            const records = getters.chequeReqRecordsForDAT;
            const filename = getters.chequeReqFileName;

            let text = '';
            let v_switch = null;

            if (records?.length > 0) {
                for (const recordset of records) {

                    if (recordset.record1 !== v_switch || v_switch === null) {
                        text += recordset.record1 + '\n';
                        v_switch = recordset.record1;
                    }

                    text += recordset.record2 + '\n';
                    text += recordset.record3 + '\n';
                    text += recordset.record4 + '\n';
                }
            }

            let blob = new Blob([text], { type: "text/plain;charset=utf-8" });
            
            await dispatch("generateCSLReqListPDF");

            saveAs(blob, filename + ".dat");

        } catch (error) {
            console.log(error);
            dispatch("messageStatus", { message: "Error to generate DAT file", status: "error" });
        }
    },
    getVendorAddress: async ({ getters, dispatch }, vals) => {
        try {
            const pdfDataSigned = getters.chequeReqRecordsForPDFSigned || [];
            const pdfDataUnsigned = getters.chequeReqRecordsForPDFUnsigned || [];

            for (const data of pdfDataSigned) {
                const res = await axios.get(STUDENT_URL + `/${data.student_id}/vendor`);
                let vendorAddress = '';
                if (res?.data?.success) {

                    if (res.data.data.data.length) {
                        const vendorData = res.data.data.data[0];

                        const addresses = [
                            vendorData.VendAddrL1?.trim(),
                            vendorData.VendAddrL2?.trim(),
                            vendorData.VendAddrCity?.trim(),
                            vendorData.VendAddrPost?.trim(),
                            vendorData.VendAddrProv?.trim(),
                        ];

                        vendorAddress = addresses?.filter(d => Boolean(d)).join(", ");
                    }
                }

                data.vendor_address = vendorAddress;
            }

            for (const data of pdfDataUnsigned) {
                const res = await axios.get(STUDENT_URL + `/${data.student_id}/vendor`);
                let vendorAddress = '';
                if (res?.data?.success) {

                    if (res.data.data.data.length) {
                        const vendorData = res.data.data.data[0];

                        const addresses = [
                            vendorData.VendAddrL1?.trim(),
                            vendorData.VendAddrL2?.trim(),
                            vendorData.VendAddrCity?.trim(),
                            vendorData.VendAddrPost?.trim(),
                            vendorData.VendAddrProv?.trim(),
                        ];

                        vendorAddress = addresses?.filter(d => Boolean(d)).join(", ");
                    }
                }

                data.vendor_address = vendorAddress;
            }

        } catch (error) {
            console.log(error);
        }
    },
    async generateCSLReqListPDF({ getters, dispatch }) {
        try {
            const pdfDataSigned = getters.chequeReqRecordsForPDFSigned || [];
            const pdfDataUnsigned = getters.chequeReqRecordsForPDFUnsigned || [];
            const pdfName = getters.chequeReqFileName || "chequeReqList";
            const batchTotalSigned = getters.chequeReqBatchTotalSigned || "";
            const batchTotalUnsigned = getters.chequeReqBatchTotalUnsigned || "";
            const sharedData = getters.chequeReqRecordsForPDFSigned?.[0] || {};

            await dispatch("getVendorAddress");

            unsignedTemplete(pdfDataUnsigned, sharedData, batchTotalUnsigned, pdfName);
            signedTemplete(pdfDataSigned, sharedData, batchTotalSigned, pdfName);

        } catch (error) {
            console.log(error);
            dispatch("messageStatus", { message: "Error to generate PDF file", status: "error" });
        }
    },
};
export default {
    state,
    getters,
    mutations,
    actions,
};