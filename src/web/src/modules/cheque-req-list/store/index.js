
import axios from "axios";
import { CHEQUE_REQ_LIST, STUDENT_URL } from "@/urls";
import jsPDF from 'jspdf';

const state = {
    chequeReqFileName: '',
    showOverlay: false,
    chequeReqRecordsForDAT: [],
    chequeReqRecordsForPDF: [],
    chequeReqBatchTotal: '',
};
const getters = {
    chequeReqFileName: (state) => state.chequeReqFileName,
    showOverlay: (state) => state.showOverlay,
    chequeReqRecordsForDAT: (state) => state.chequeReqRecordsForDAT,
    chequeReqRecordsForPDF: (state) => state.chequeReqRecordsForPDF,
    chequeReqBatchTotal: (state) => state.chequeReqBatchTotal,
};
const mutations = {
    SET_CHEQUE_REQ_FILE_NAME(state, value) {
        state.chequeReqFileName = value;
    },
    SET_CHEQUE_REQ_RECORDS_DAT(state, value) {
        state.chequeReqRecordsForDAT = value;
    },
    SET_CHEQUE_REQ_RECORDS_PDF(state, value) {
        state.chequeReqRecordsForPDF = value;
    },
    SET_CHEQUE_REQ_BATCH_TOTAL(state, value) {
        state.chequeReqBatchTotal = value;
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
        commit("SET_CHEQUE_REQ_RECORDS_PDF", []);
        commit("SET_CHEQUE_REQ_BATCH_TOTAL", '');
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
                const recordsPdf = res?.data?.data.pdfData ?? [];
                const batchTotal = res?.data?.data?.batchTotal ?? '';
                const filename = res?.data?.data.filename ?? 'ChequeReqList';

                commit("SET_CHEQUE_REQ_FILE_NAME", filename);
                commit("SET_CHEQUE_REQ_RECORDS_PDF", [...recordsPdf]);
                commit("SET_CHEQUE_REQ_RECORDS_DAT", [...recordsDat]);
                commit("SET_CHEQUE_REQ_BATCH_TOTAL", batchTotal);

                await dispatch("generateCSLReqListPDF");
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
            saveAs(blob, filename + ".dat");
        } catch (error) {
            console.log(error);
            dispatch("messageStatus", { message: "Error to generate DAT file", status: "error" });
        }
    },
    getVendorAddress: async ({ getters, dispatch }, vals) => {
        try {
            const pdfData = getters.chequeReqRecordsForPDF || [];
            for (const data of pdfData) {
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
            const pdfData = getters.chequeReqRecordsForPDF || [];
            const pdfName = getters.chequeReqFileName || "chequeReqList";
            const batchTotal = getters.chequeReqBatchTotal || "";
            const sharedData = getters.chequeReqRecordsForPDF?.[0] || {};

            await dispatch("getVendorAddress");

            const doc = new jsPDF('landscape', 'pt', 'a4', true);

            let info = '';
            for (const data of pdfData) {
                info += `
                    <tr style="font-size: 9px;">
                        <td>${data.vendor_id}</td>
                        <td>${data.name}</td>
                        <td>${data.vendor_address}</td>
                        <td>${data.disbursed_amount}</td>
                        <td>${data.invoice_date}</td>
                        <td>${data.invoice_id}</td>
                        <td>${data.due_date}</td>
                        <td>${data.SPEC_HAND}</td>
                        <td>${data.tax_year}</td>
                    </tr>
                `+ '\n';
            }

            const html = `
                <div style="width: 842px">
                    <header style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    ">
                        <div style="
                        width: 600px;
                        font-family: Montserrat, Helvetica, Arial, sans-serif;
                        font-weight: 700;
                        text-align: center;
                        font-size: 14px;
                        ">
                            <p>GOVERMENT OF YUKON, DEPT. OF EDUCATION, STUDENT FINANCIAL ASSISTANCE</p>
                            <p>Cheque Requisition List</p>
                        </div>
                    </header>

                    <div style="display: flex; justify-content: center;">
                        <table style="font-size: 10px; width: 700px; text-align: left;">
                            <tr>
                                <th>${sharedData.request_type}</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>BATCH ID 23-330069</td>
                                <td>ORG ID: 03</td>
                                <td>CODING: ${sharedData.financial_coding}</td>
                                <td>ACTION: No</td>
                            </tr>
                            <tr>
                                <th>Vendor ID</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Cdn Amount</th>
                                <th>Invoice Date</th>
                                <th>Invoice ID</th>
                                <th>Due Date</th>
                                <th>S/H</th>
                                <th>Ref4</th>
                            </tr>
                            ${info}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>BATCH TOTAL</td>
                                <td></td>
                                <td></td>
                                <td>${batchTotal}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>1</td>
                            </tr>
                        </table>

                    </div>
                </div>
                `;

            doc.html(html, {
                callback: function (doc) {
                    doc.save(pdfName);
                },
                x: 10,
                y: 10
            });

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