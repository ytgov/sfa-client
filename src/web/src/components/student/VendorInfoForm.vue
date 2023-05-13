<template>
    <div>
      <v-card class="default mb-5">
        <v-card-text>
            <div class="row">
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-3">
                            <v-card-title
                            class="my-n4 ml-n4"
                            >Vendor</v-card-title>
                        </div>
                        <div class="col-md-4">
                            <v-btn
                              class="my-0"
                              color="success"
                              block
                              @click="e => {
                                getVendorList();
                                showModal();
                              }"
                            >
                              Search
                            </v-btn>
                        </div>
                        <div class="col-md-4">
                            <v-btn
                              class="my-0"
                              color="error"
                              block
                              @click="removeVendor"
                            >
                              Remove
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-3">
                            <p
                                class="text-left text-subtitle-1" 
                            >
                                Vendor ID
                            </p>
                        </div>
                        <div class="col-md-6">
                            <v-text-field 
                                disabled
                                outlined dense 
                                background-color="white" 
                                hide-details label=""
                                v-model="student.vendor_id"
                            >
                            </v-text-field>
                        </div>
                    </div>
                    <div class="row" v-if="false">
                        <div class="col-md-3">
                            <p
                                class="text-left text-subtitle-1" 
                            >
                                Payment Type
                            </p>
                        </div>
                        <div class="col-md-2">
                            <v-text-field
                                disabled
                                outlined dense 
                                background-color="white" 
                                hide-details label=""
                            >
                            </v-text-field>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-3">
                            <p
                                class="text-left text-subtitle-1" 
                            >
                                Vendor Info
                            </p>
                        </div>
                        <div class="col-md-9">
                            <v-textarea 
                                disabled
                                outlined dense 
                                background-color="white" 
                                hide-details label=""
                                :value="vendorInfo"
                            >
                            </v-textarea>
                        </div>
                    </div>
                </div>
            </div>
        </v-card-text>
      </v-card>
      <v-card class="default mb-5">
        <v-card-title>SFA Address Data</v-card-title>
        <v-card-text>
            <div class="row">
                <div class="col-md-3 mb-n2">
                  <v-text-subtitle class="text-subtitle-1">Permanent Address</v-text-subtitle>
                </div>
            </div> 
            <div class="row">
                <div class="col-md-4">
                    <v-text-field 
                        disabled
                        outlined dense 
                        background-color="white" 
                        hide-details label="Main Address"
                        v-model="student.permanentAddress.address1"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        disabled
                        append-icon=""
                        outlined dense 
                        background-color="white" 
                        hide-details label="City"
                        v-model="student.permanentAddress.city_id"
                        :items="cities"
                        item-text="description"
                        item-value="id"
                    >
                    </v-autocomplete>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        append-icon=""
                        disabled
                        outlined dense 
                        background-color="white" 
                        hide-details label="Province"
                        v-model="student.permanentAddress.province_id"
                        :items="provinces"
                        item-text="description"
                        item-value="id"
                    >
                    </v-autocomplete>
                </div>
                <div class="col-md-2">
                    <v-text-field
                        disabled
                        outlined dense 
                        background-color="white" 
                        hide-details label="Postal code"
                        v-model="student.permanentAddress.postal_code"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        append-icon=""
                        disabled
                        outlined dense 
                        background-color="white" 
                        hide-details label="Country"
                        v-model="student.permanentAddress.country_id"
                        :items="countries"
                        item-text="description"
                        item-value="id"
                    >
                    </v-autocomplete>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <v-text-field 
                        disabled
                        outlined dense 
                        background-color="white" 
                        hide-details label="Phone"
                        v-model="student.permanentAddress.telephone"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-5">
                    <v-text-field 
                        disabled
                        outlined dense 
                        background-color="white" 
                        hide-details label="Email"
                        v-model="student.permanentAddress.email"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-4 d-flex justify-end">
                    <v-btn 
                        dense
                        color="blue" 
                        class="my-0"
                        @click="copyAddress(student.permanentAddress)"
                    >
                        Copy
                    </v-btn>
                </div>
            </div>  
        </v-card-text>
        <v-card-text>
            <div class="row">
                <div class="col-md-3 mb-n2">
                  <v-text-subtitle class="text-subtitle-1">Address While in School</v-text-subtitle>
                </div>
            </div> 
            <div class="row">
                <div class="col-md-4">
                    <v-text-field 
                        disabled
                        outlined dense 
                        background-color="white" 
                        hide-details label="Main Address"
                        v-model="student.temporalAddress.address1"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        disabled
                        outlined dense 
                        background-color="white" 
                        hide-details label="City"
                        :items="cities"
                        item-text="description"
                        item-value="id"
                        append-icon=""
                        v-model="student.temporalAddress.city_id"
                    >
                    </v-autocomplete>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        disabled
                        outlined dense 
                        background-color="white" 
                        hide-details label="Province"
                        :items="provinces"
                        item-text="description"
                        item-value="id"
                        append-icon=""
                        v-model="student.temporalAddress.province_id"
                    >
                    </v-autocomplete>
                </div>
                <div class="col-md-2">
                    <v-text-field 
                        disabled
                        outlined dense 
                        background-color="white" 
                        hide-details label="Postal code"
                        v-model="student.temporalAddress.postal_code"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        disabled
                        outlined dense 
                        background-color="white" 
                        hide-details label="Country"
                        :items="countries"
                        item-text="description"
                        item-value="id"
                        append-icon=""
                        v-model="student.temporalAddress.country_id"
                    >
                    </v-autocomplete>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <v-text-field 
                        disabled
                        outlined dense 
                        background-color="white" 
                        hide-details label="Phone"
                        v-model="student.temporalAddress.telephone"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-5">
                    <v-text-field 
                        disabled
                        outlined dense 
                        background-color="white" 
                        hide-details label="Email"
                        v-model="student.temporalAddress.email"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-4 d-flex justify-end">
                    <v-btn 
                        dense
                        color="blue" 
                        class="my-0"
                        @click="copyAddress(student.temporalAddress)"
                    >
                        Copy
                    </v-btn>
                </div>
            </div>  
        </v-card-text>
      </v-card>

      <v-btn
        class="primary mt-0"
      >
      Add Vendor Request
      </v-btn>

      <v-card class="default mb-5">
        <v-card-text>
            <div class="row">
                <div class="col-md-4">
                    <v-text-field 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Main Address"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        outlined dense 
                        background-color="white" 
                        hide-details label="City"
                        :items="cities"
                        item-text="description"
                        item-value="id"
                    >
                    </v-autocomplete>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Province"
                        :items="provinces"
                        item-text="description"
                        item-value="id"
                    >
                    </v-autocomplete>
                </div>
                <div class="col-md-2">
                    <v-text-field 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Postal code"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Country"
                        :items="countries"
                        item-text="description"
                        item-value="id"
                    >
                    </v-autocomplete>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <v-text-field 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Phone"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-5">
                    <v-text-field 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Email"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-4 d-flex justify-end">
                    <v-btn 
                        dense
                        color="success" 
                        class="my-0"
                    >
                        Print
                    </v-btn>
                </div>
            </div>  
        </v-card-text>
    </v-card>
    <SearchVendor
        :showModal="showModal" 
        :dialogModel="dialogModel" 
        :vendorList="vendorList"
        v-on:showSuccess="showSuccess"
        v-on:showError="showError"
    />
    <confirm-dialog ref="confirm"></confirm-dialog>
    </div>
</template>
<script>
import axios from "axios";
import store from "../../store";
import { STUDENT_URL } from "../../urls";
import { mapState, mapGetters } from "vuex";
import validator from "@/validator";
import SearchVendor from "./SearchVendor.vue";

export default {
    data: () => ({
        vendorData: {},
        dialogModel: false,
        vendorList: []
    }),
    computed: {
        ...mapGetters(["cities", "provinces", "countries"]),
        student: function () {
            return store.getters.selectedStudent;
        },
        vendorInfo() {
            if (this.student.vendor_id) {
                this.getVendorData();
                const addresses = [
                    this.vendorData.VendAddrL1?.trim(),
                    this.vendorData.VendAddrL2?.trim(),
                    this.vendorData.VendAddrCity?.trim(),
                    this.vendorData.VendAddrPost?.trim(),
                    this.vendorData.VendAddrProv?.trim(),
                ];
                const address_line = addresses?.filter(d => Boolean(d)).join(", ");

                return address_line;
            } else { 
                return '';
            }

        },
    },
    watch: {
    },
    created() {
        store.dispatch("setCities");
        store.dispatch("setProvinces");
        store.dispatch("setCountries");
        this.getVendorData();
    },
    methods: {
        async copyAddress(address) {
            try {
                const addresses = [
                    address?.address1?.trim(),
                    this.cities?.find( 
                            p => p.id === address.city_id 
                        )
                        ?.description,
                    this.provinces?.find( 
                        p => p.id === address.province_id 
                    )
                    ?.description,
                    address.postal_code?.trim(),
                    this.countries?.find( 
                            p => p.id === address.country_id 
                        )
                        ?.description,
                    address.telephone?.trim(),
                    address.email?.trim(),
                ];
                const address_line = addresses?.filter(d => Boolean(d)).join(", ");
                await navigator.clipboard.writeText(address_line);
                this.$emit("showSuccess", "Copied!");
            } catch($e) {
                this.$emit("showSuccess", "Failed to copy!");
            }
        },
        showModal(show = true) {
            this.dialogModel = show;
        },
        doSaveStudent(field, value, type, extraId = null, addressType = "") {
            store.dispatch("updateStudent", [field, value, type, extraId, this, addressType]);
        },
        async getVendorData() {
            try {
                const res = await axios.get(STUDENT_URL+`/${this.student.id}/vendor`);
                if (res?.data?.success) {
                    this.vendorData = res.data.data.data[0];
                }
            } catch (error) {
                console.log("Error to get Vendor Data", error);
            }
        },
        async getVendorList() {
            try {
                const res = await axios.get(STUDENT_URL+`/${this.student.id}/vendor-list`);
                if (res?.data?.success) {
                    this.vendorList = [ ...res.data.data.data ];
                }
            } catch (error) {
                console.log("Error to get Vendor List", error);
            }
        },
        removeVendor() {
            this.$refs.confirm.show(
                "Are you sure?",
                "Click 'Confirm' below to permanently remove this vendor.",
                () => {
                    this.doSaveStudent('vendor_id', '', 'studentInfo', this.student.id);
                },
                () => { }
            );
        },
        showSuccess(mgs) {
            this.$emit("showSuccess", mgs);
        },
        showError(mgs) {
            this.$emit("showError", mgs);
        },
    },
    components: {
        SearchVendor,
    }
};
</script>