<template>
  <div>
    <v-card class="default mb-5">
      <v-card-title>
        Vendor
        <v-spacer />
        <div>
          <v-btn class="my-0 mr-5" color="success" @click="showModal()">Search</v-btn>
          <v-btn class="my-0" color="error" :disabled="!student.vendor_id" @click="removeVendor">Remove</v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-text-field
              disabled
              outlined
              dense
              background-color="white"
              hide-details
              label="Vendor ID"
              v-model="student.vendor_id"
            >
            </v-text-field>
          </div>
          <div class="d-none">
            <div class="col-md-3">
              <p class="text-left text-subtitle-1">
                Payment Type
              </p>
            </div>
            <div class="col-md-2">
              <v-text-field disabled outlined dense background-color="white" hide-details label=""> </v-text-field>
            </div>
          </div>
          <div class="col-md-6">
            <v-textarea
              disabled
              outlined
              dense
              background-color="white"
              hide-details
              label="Vendor Address"
              :value="vendorInfo"
            >
            </v-textarea>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="default mb-5">
      <v-card-title>SFA Address Data</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-12 mb-n2">
            <div class="text-subtitle-1">Permanent Address</div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <v-text-field
              disabled
              outlined
              dense
              background-color="white"
              hide-details
              label="Main Address"
              v-model="student.permanentAddress.address1"
            >
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-autocomplete
              disabled
              append-icon=""
              outlined
              dense
              background-color="white"
              hide-details
              label="City"
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
              outlined
              dense
              background-color="white"
              hide-details
              label="Province"
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
              outlined
              dense
              background-color="white"
              hide-details
              label="Postal code"
              v-model="student.permanentAddress.postal_code"
            >
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-autocomplete
              append-icon=""
              disabled
              outlined
              dense
              background-color="white"
              hide-details
              label="Country"
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
              outlined
              dense
              background-color="white"
              hide-details
              label="Phone"
              v-model="student.permanentAddress.telephone"
            >
            </v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              disabled
              outlined
              dense
              background-color="white"
              hide-details
              label="Email"
              v-model="student.permanentAddress.email"
            >
            </v-text-field>
          </div>
          <div class="col-md-4 d-flex justify-end">
            <v-btn dense color="blue" class="my-0" @click="copyAddress(student.permanentAddress)">
              Copy
            </v-btn>
          </div>
        </div>
      </v-card-text>
      <v-card-text>
        <div class="row">
          <div class="col-12 mb-n2">
            <div class="text-subtitle-1">Address While in School</div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <v-text-field
              disabled
              outlined
              dense
              background-color="white"
              hide-details
              label="Main Address"
              v-model="student.temporalAddress.address1"
            >
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-autocomplete
              disabled
              outlined
              dense
              background-color="white"
              hide-details
              label="City"
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
              outlined
              dense
              background-color="white"
              hide-details
              label="Province"
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
              outlined
              dense
              background-color="white"
              hide-details
              label="Postal code"
              v-model="student.temporalAddress.postal_code"
            >
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-autocomplete
              disabled
              outlined
              dense
              background-color="white"
              hide-details
              label="Country"
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
              outlined
              dense
              background-color="white"
              hide-details
              label="Phone"
              v-model="student.temporalAddress.telephone"
            >
            </v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              disabled
              outlined
              dense
              background-color="white"
              hide-details
              label="Email"
              v-model="student.temporalAddress.email"
            >
            </v-text-field>
          </div>
          <div class="col-md-4 d-flex justify-end">
            <v-btn dense color="blue" class="my-0" @click="copyAddress(student.temporalAddress)">
              Copy
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-btn v-if="!showAdd" @click="showAdd = true" class="primary mt-0" show>
      Add Vendor Request
    </v-btn>
    <v-btn v-if="showAdd" class="primary mt-0" @click="setShowAdd" show>
      Cancel
    </v-btn>

    <v-card class="default mb-5" v-if="student?.vendor_updates?.length > 0">
      <v-card-text class="mb-8" v-for="(item, index) in student?.vendor_updates" :key="index">
        <div class="row">
          <div class="col-md-4">
            <v-text-field
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              label="Main Address"
              v-model="item.address"
              @change="updateVendorRequest(item.id, { address: item.address })"
            >
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-autocomplete
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              label="City"
              :items="cities"
              item-text="description"
              item-value="id"
              v-model="item.city_id"
              @change="updateVendorRequest(item.id, { city_id: item.city_id })"
            >
            </v-autocomplete>
          </div>
          <div class="col-md-2">
            <v-autocomplete
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              label="Province"
              :items="provinces"
              item-text="description"
              item-value="id"
              v-model="item.province_id"
              @change="updateVendorRequest(item.id, { province_id: item.province_id })"
            >
            </v-autocomplete>
          </div>
          <div class="col-md-2">
            <v-text-field
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              label="Postal code"
              v-model="item.postal_code"
              @change="updateVendorRequest(item.id, { postal_code: item.postal_code })"
            >
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-autocomplete
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              label="Country"
              :items="countries"
              item-text="description"
              item-value="id"
              v-model="item.country_id"
              @change="updateVendorRequest(item.id, { country_id: item.country_id })"
            >
            </v-autocomplete>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <v-text-field
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              label="Phone"
              oninput="
                                if (this.value.length > 12) {
                                    this.value = this.value.slice(0, 12);
                                }
                            "
              @keypress="validate.isNumber($event)"
              @input="
                (e) => {
                  if (e?.length === 3 || e?.length === 7) {
                    item.telephone = item.telephone + '-';
                  }
                }
              "
              @change="
                (e) => {
                  if (validate.telephone(item.telephone) || !String(item.telephone).length) {
                    return updateVendorRequest(item.id, { telephone: item.telephone });
                  } else {
                    $store.dispatch('loadStudent', student.id);
                    return $emit('showError', 'Invalid Telephone');
                  }
                }
              "
              v-model="item.telephone"
            >
            </v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              label="Email"
              v-model="item.email"
              @change="
                (e) => {
                  if (validate.email(item.email) || !String(item.email).length) {
                    return updateVendorRequest(item.id, { email: item.email });
                  } else {
                    $store.dispatch('loadStudent', student.id);
                    return $emit('showError', 'Invalid Email');
                  }
                }
              "
            >
            </v-text-field>
          </div>
          <div class="col-md-3">
            <v-select
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              label="Address Type"
              :items="filteredListAddresTypes"
              item-text="description"
              item-value="id"
              v-model="item.address_type_id"
              @change="updateVendorRequest(item.id, { address_type_id: item.address_type_id })"
            >
            </v-select>
          </div>
          <div class="col-md-2 d-flex justify-end">
            <v-btn :disabled="showAdd" dense color="success" class="my-0" @click="generatePDF(index)">
              Print
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="default mb-5" v-if="showAdd">
      <v-card-text>
        <div class="row">
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Main Address"
              v-model="newRecord.address"
            >
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="City"
              :items="cities"
              item-text="description"
              item-value="id"
              v-model="newRecord.city_id"
            >
            </v-autocomplete>
          </div>
          <div class="col-md-2">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="Province"
              :items="provinces"
              item-text="description"
              item-value="id"
              v-model="newRecord.province_id"
            >
            </v-autocomplete>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Postal code"
              v-model="newRecord.postal_code"
            >
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="Country"
              :items="countries"
              item-text="description"
              item-value="id"
              v-model="newRecord.country_id"
            >
            </v-autocomplete>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Phone"
              v-model="newRecord.telephone"
              oninput="
                                if (this.value.length > 12) {
                                    this.value = this.value.slice(0, 12);
                                }
                            "
              @keypress="validate.isNumber($event)"
              @input="
                (e) => {
                  if (e?.length === 3 || e?.length === 7) {
                    newRecord.telephone = newRecord.telephone + '-';
                  }
                }
              "
              @change="
                (e) => {
                  if (validate.telephone(newRecord.telephone) || !String(newRecord.telephone).length) {
                  } else {
                    newRecord.telephone = '';
                    return $emit('showError', 'Invalid Telephone');
                  }
                }
              "
            >
            </v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Email"
              v-model="newRecord.email"
              @change="
                (e) => {
                  if (validate.email(newRecord.email) || !String(newRecord.email).length) {
                  } else {
                    newRecord.email = '';
                    return $emit('showError', 'Invalid Email');
                  }
                }
              "
            >
            </v-text-field>
          </div>
          <div class="col-md-3">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Address Type"
              :items="filteredListAddresTypes"
              item-text="description"
              item-value="id"
              v-model="newRecord.address_type_id"
            >
            </v-select>
          </div>
          <div class="col-md-2">
            <div class="row">
              <div class="col-md-6 d-flex justify-end">
                <v-btn color="success" x-small fab class="my-0" @click="addVendorRequest">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </div>
              <div class="col-md-6 d-flex justify-end">
                <v-btn color="error" x-small fab class="my-0" @click="setShowAdd">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <SearchVendor
      :showModal="showModal"
      :dialogModel="dialogModel"
      :vendorList="vendorList"
      :getVendorData="getVendorData"
      v-on:showSuccess="showSuccess"
      v-on:showError="showError"
      :doSearch="doVendorSearch"
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
import jsPDF from "jspdf";

export default {
  data: () => ({
    showAdd: false,
    vendorData: {},
    dialogModel: false,
    vendorList: [],
    newRecord: {
      address: "",
      city_id: null,
      province_id: null,
      postal_code: "",
      country_id: null,
      telephone: "",
      email: "",
      address_type_id: null,
      vendor_id: null,
    },
    validate: {},
  }),
  computed: {
    ...mapGetters(["cities", "provinces", "countries", "addressTypes"]),
    student: function() {
      return store.getters.selectedStudent;
    },
    username() {
      //return store.getters.fullName;
      return store.getters.fullName;
    },
    filteredListAddresTypes() {
      const list = this.addressTypes?.filter((a) => a.id === 1 || a.id === 3) || [];
      return list;
    },
    vendorInfo() {
      if (this.student.vendor_id) {
        const addresses = [
          this.vendorData.VendAddrL1?.trim(),
          this.vendorData.VendAddrL2?.trim(),
          this.vendorData.VendAddrCity?.trim(),
          this.vendorData.VendAddrPost?.trim(),
          this.vendorData.VendAddrProv?.trim(),
        ];
        const address_line = addresses?.filter((d) => Boolean(d)).join(", ");

        return address_line;
      } else {
        return "";
      }
    },
  },
  watch: {},
  created() {
    this.validate = validator;
    store.dispatch("setCities");
    store.dispatch("setProvinces");
    store.dispatch("setCountries");
    store.dispatch("setAddressTypes");
    this.getVendorData();
  },
  methods: {
    setShowAdd() {
      this.newRecord = {
        address: "",
        city_id: null,
        province_id: null,
        postal_code: "",
        country_id: null,
        telephone: "",
        email: "",
        address_type_id: null,
        vendor_id: null,
      };
      this.showAdd = false;
    },
    generatePDF(index) {
      console.log(this.vendorData);
      const doc = new jsPDF();

      /* CONTAINERS */

      const header = document.createElement("div");
      header.style.display = "flex";
      header.style.padding = "15px";
      header.style.paddingBottom = "0px";
      header.style.marginBottom = "-13px";

      const container = document.createElement("div");
      container.style.width = "190px";

      const subcontainer = document.createElement("div");
      subcontainer.style.width = "104px";

      let boxContainer1 = document.createElement("div");
      let boxContainer2 = document.createElement("div");
      let boxContainer3 = document.createElement("div");
      let boxContainer4 = document.createElement("div");
      let boxContainer5 = document.createElement("div");
      let boxContainer6 = document.createElement("div");

      const boxContainers = [boxContainer1, boxContainer2, boxContainer3, boxContainer4, boxContainer5, boxContainer6];

      for (let element of boxContainers) {
        element.style.display = "flex";
        element.style.alignItems = "center";
      }

      const boxesParagraph1 = document.createElement("p");
      const boxesParagraph2 = document.createElement("p");
      const boxesParagraph3 = document.createElement("p");
      const boxesParagraph4 = document.createElement("p");
      const boxesParagraph5 = document.createElement("p");
      const boxesParagraph6 = document.createElement("p");
      const boxesParagraph7 = document.createElement("p");

      /* PARAGRAPHS */

      let headerParagraph1 = document.createElement("p");
      let headerParagraph2 = document.createElement("p");
      let headerParagraph3 = document.createElement("p");

      const headerParagraphsStyles = [headerParagraph1, headerParagraph2, headerParagraph3];

      for (let element of headerParagraphsStyles) {
        element.style.fontFamily = "Montserrat, Helvetica, Arial, sans-serif";
        element.style.fontWeight = "700";
        element.style.textAlign = "right";
        element.style.fontSize = "3.6px";
      }

      headerParagraph1.innerText = "GOVERNMENT OF YUKON, DEPARTMENT OF EDUCATION";
      headerParagraph2.innerText = "STUDENT FINANCIAL ASSISTANCE";
      headerParagraph2.style.marginBottom = "2px";
      headerParagraph3.innerText = "Accounts Payable Vendor Update Request";
      headerParagraph3.style.fontSize = "5px";

      const boxesParagraphs = [
        boxesParagraph1,
        boxesParagraph2,
        boxesParagraph3,
        boxesParagraph4,
        boxesParagraph5,
        boxesParagraph6,
        boxesParagraph7,
      ];

      for (let element of boxesParagraphs) {
        element.style.fontFamily = "'Nunito', sans-serif;";
        element.style.fontSize = "4px";
        element.style.marginLeft = "2px";
        element.style.marginBottom = "3px";
      }

      boxesParagraph1.innerText = "Request to:";
      boxesParagraph1.style.marginRight = "15px";
      boxesParagraph1.style.marginLeft = "0";
      boxesParagraph2.innerText = " Add a new Vendor ID for the student";
      boxesParagraph3.innerText = "Direct deposit authorization + Bank information attached";
      boxesParagraph4.innerText = "Set up to receive Cheque";
      boxesParagraph5.innerText = "Change";
      boxesParagraph6.innerText = "Update to student's mailing address";
      boxesParagraph7.innerHTML = "Update with attached student's Direct Deposit information";

      /* IMAGES */

      const yukonLogo = document.createElement("img");
      yukonLogo.src =
        "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QMuaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA2LjAtYzAwMiA3OS4xNjQ0NjAsIDIwMjAvMDUvMTItMTY6MDQ6MTcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI2MDc0RDgyRDY4MjExRUE4QzRDODg2MTc1MjgxRkU2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI2MDc0RDgzRDY4MjExRUE4QzRDODg2MTc1MjgxRkU2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDc0MDlDQjVENjgxMTFFQThDNEM4ODYxNzUyODFGRTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDc0MDlDQjZENjgxMTFFQThDNEM4ODYxNzUyODFGRTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAACAgICAgICAgICAwICAgME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";

      yukonLogo.style.width = "52.5px";
      yukonLogo.style.height = "20.7px";
      yukonLogo.style.objectFit = "contain";
      yukonLogo.style.marginLeft = "-3px";

      const lineSrc =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoMAAAAHCAYAAABz0EdpAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABLSURBVHhe7dmxDQAhDAPA5PffGdALUVPjuyZSJrDsHksBABDp2xcAgECnGezu/wEAwBtuBmAzMQBAMDMxAEAwYRAAIJgwCAAQq2oCxpYPAOUrzPUAAAAASUVORK5CYII=";

      const line = document.createElement("img");
      line.src = lineSrc;
      line.style.width = "100%";
      line.style.height = "1px";
      line.style.paddingLeft = "15px";
      line.style.paddingRight = "15px";

      const line2 = document.createElement("img");
      line2.src = lineSrc;
      line2.style.width = "100%";
      line2.style.height = "1px";
      line2.style.paddingLeft = "15px";
      line2.style.paddingRight = "15px";

      const line3 = document.createElement("img");
      line3.src = lineSrc;
      line3.style.width = "57px";
      line3.style.height = "1px";
      line3.style.marginLeft = "39px";

      const line4 = document.createElement("img");
      line4.src = lineSrc;
      line4.style.width = "156px";
      line4.style.height = "1px";
      line4.style.marginLeft = "20px";

      const squareSrc =
        "data:image/png;base64,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";

      const square1 = document.createElement("img");
      const square2 = document.createElement("img");
      const square3 = document.createElement("img");
      const square4 = document.createElement("img");
      const square5 = document.createElement("img");
      const square6 = document.createElement("img");

      const squaresStyles = [square1, square2, square3, square4, square5, square6];

      for (let element of squaresStyles) {
        element.src = squareSrc;
        element.style.width = "5px";
        element.style.height = "5px";
        element.style.marginLeft = "65px";
      }

      square1.style.marginLeft = "0";
      square4.style.marginLeft = "51px";

      /* SPANS */

      const spanPaymentType = document.createElement("span");
      const spanVendorName = document.createElement("span");
      const spanAddress = document.createElement("span");
      const spanCity = document.createElement("span");
      const spanProvince = document.createElement("span");
      const spanPostalCode = document.createElement("span");
      const spanCountry = document.createElement("span");
      const spanTelephone = document.createElement("span");
      const spanEmail = document.createElement("span");
      const spanAddressType = document.createElement("span");
      const spanVendor = document.createElement("span");
      const spanEmployee = document.createElement("span");
      const spanCreatedDate = document.createElement("span");

      const paymentType = document.createElement("p");
      const vendorName = document.createElement("p");
      const address = document.createElement("p");
      const city = document.createElement("p");
      const province = document.createElement("p");
      const postalCode = document.createElement("p");
      const country = document.createElement("p");
      const telephone = document.createElement("p");
      const email = document.createElement("p");
      const addressType = document.createElement("p");
      const vendor = document.createElement("p");
      const employee = document.createElement("p");
      vendor.style.paddingTop = "10px";

      const vendorArray = [
        boxesParagraph1,
        address,
        city,
        province,
        postalCode,
        country,
        telephone,
        email,
        addressType,
        vendor,
        employee,
        vendorName,
        paymentType,
      ];

      const vendorSpans = [
        spanAddress,
        spanCity,
        spanProvince,
        spanPostalCode,
        spanCountry,
        spanTelephone,
        spanEmail,
        spanAddressType,
        spanVendor,
        spanEmployee,
        spanVendorName,
        spanPaymentType,
      ];

      vendorName.innerText = "Vendor Name: ";
      address.innerText = "Address: ";
      city.innerText = "City: ";
      province.innerText = "Province / Territory: ";
      postalCode.innerText = "Postal Code: ";
      country.innerText = "Country: ";
      telephone.innerText = "Telephone: ";
      email.innerText = "Email: ";
      addressType.innerText = "Address Type: ";
      employee.innerText = "Employee: ";
      vendor.innerText = "VENDOR ID - ASSIGNED BY FINANCE: ";
      paymentType.innerText = "Payment Type: ";

      spanPaymentType.innerText = this.vendorData.VendPayTypeCode;
      spanVendorName.innerText = this.vendorData.VendName;
      spanAddress.innerText = this.student.vendor_updates[index].address;
      spanPostalCode.innerText = this.student.vendor_updates[index].postal_code;
      spanTelephone.innerText = this.student.vendor_updates[index].telephone;
      spanEmail.innerText = this.student.vendor_updates[index].email;
      spanVendor.innerText = this.student.vendor_updates[index].vendor_id;
      spanVendor.style.fontWeight = "700";
      spanEmployee.innerText = "No";
      spanCreatedDate.innerText = this.student.vendor_updates[index].created_date;

      for (let info of vendorArray) {
        info.style.fontSize = "4px";
        info.style.marginBottom = "2px";
        info.style.paddingLeft = "15px";
      }

      for (let i = 0; i < vendorSpans.length; i++) {
        switch (i) {
          case 0:
            vendorSpans[i].style.paddingLeft = "19px";
            break;
          case 1:
            vendorSpans[i].style.paddingLeft = "26px";
            break;
          case 2:
            vendorSpans[i].style.paddingLeft = "0px";
            break;
          case 3:
            vendorSpans[i].style.paddingLeft = "11px";
            break;
          case 4:
            vendorSpans[i].style.paddingLeft = "19px";
            break;
          case 5:
            vendorSpans[i].style.paddingLeft = "14px";
            break;
          case 6:
            vendorSpans[i].style.paddingLeft = "23px";
            break;
          case 7:
            vendorSpans[i].style.paddingLeft = "8px";
            break;
          case 8:
            vendorSpans[i].style.paddingLeft = "4px";
            break;
          case 9:
            vendorSpans[i].style.paddingLeft = "15px";
            break;
          case 10:
            vendorSpans[i].style.paddingLeft = "9px";
            break;
          case 11:
            vendorSpans[i].style.paddingLeft = "8px";
            break;
          default:
            break;
        }
      }

      for (let currentCity of this.cities) {
        if (currentCity.id === this.student.vendor_updates[index].city_id) {
          spanCity.innerText = currentCity.description;
        }
      }

      for (let currentProvince of this.provinces) {
        if (currentProvince.id === this.student.vendor_updates[index].province_id) {
          spanProvince.innerText = currentProvince.description;
        }
      }

      for (let currentCountry of this.countries) {
        if (currentCountry.id === this.student.vendor_updates[index].country_id) {
          spanCountry.innerText = currentCountry.description;
        }
      }

      for (let currentAT of this.filteredListAddresTypes) {
        if (currentAT.id === this.student.vendor_updates[index].address_type_id) {
          spanAddressType.innerText = currentAT.description;
        }
      }

      function formattedDate(date, format) {
        if (format === 1) {
          console.log(date);
          const inputDate = date.slice(0, 10);
          const day = inputDate.slice(8, 10);
          const month = inputDate.slice(5, 7);
          const year = inputDate.slice(0, 4);
          let stringMonth = strMonth(month);
          return `${day} ${stringMonth} ${year}`;
        } else {
          return strMonth(date);
        }
      }

      function strMonth(month) {
        let stringMonth = "";
        switch (parseInt(month)) {
          case 1:
            stringMonth = "Jan";
            break;
          case 2:
            stringMonth = "Feb";
            break;
          case 3:
            stringMonth = "Mar";
            break;
          case 4:
            stringMonth = "Apr";
            break;
          case 5:
            stringMonth = "May";
            break;
          case 6:
            stringMonth = "Jun";
            break;
          case 7:
            stringMonth = "Jul";
            break;
          case 8:
            stringMonth = "Aug";
            break;
          case 9:
            stringMonth = "Sep";
            break;
          case 10:
            stringMonth = "Oct";
            break;
          case 11:
            stringMonth = "Nov";
            break;
          case 12:
            stringMonth = "Dec";
            break;
          default:
            stringMonth = "?";
        }
        return stringMonth;
      }

      /* FOOTER */
      const footerP1Container = document.createElement("div");
      footerP1Container.style.marginLeft = "15px";
      footerP1Container.style.marginBottom = "-12px";
      footerP1Container.style.marginTop = "50px";
      footerP1Container.style.display = "flex";

      const footerParagraph0 = document.createElement("p");
      footerParagraph0.innerHTML = "Prepared by: " + this.username;
      footerParagraph0.style.fontSize = "4px";
      footerParagraph0.style.width = "87px";

      const footerParagraph1 = document.createElement("p");
      footerParagraph1.innerHTML =
        "Department: E-13A" +
        "<span style='padding-right: 4px'></span>Date:" +
        formattedDate(spanCreatedDate.innerText, 1);
      footerParagraph1.style.fontSize = "4px";
      // footerParagraph1.style.marginBottom = "-12px";
      footerParagraph1.style.width = "80px";

      const footerParagraph2 = document.createElement("p");
      footerParagraph2.innerText = "Financial Approval: ______________________________ Date: ____________________";
      footerParagraph2.style.fontSize = "4px";
      footerParagraph2.style.paddingLeft = "15px";
      footerParagraph2.style.marginBottom = "5px";

      const footerParagraph3 = document.createElement("p");

      doc.page = 1;

      function footer() {
        doc.setFont("Montserrat");
        doc.setFontSize(11);
        doc.text(
          167,
          284,
          "Page " + doc.internal.getCurrentPageInfo().pageNumber + " of " + doc.internal.getNumberOfPages()
        );

        doc.page++;
      }

      footer();

      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let newDate = `${month} ${day}, ${year}`;
      let currentDate = `${formattedDate(month)} ${day}, ${year}`;

      footerParagraph3.innerText = currentDate;
      footerParagraph3.style.fontSize = "4px";
      footerParagraph3.style.paddingLeft = "15px";
      footerParagraph3.style.paddingRight = "15px";

      /* APPENDS*/

      header.appendChild(yukonLogo);
      header.appendChild(subcontainer);

      subcontainer.appendChild(headerParagraph1);
      subcontainer.appendChild(headerParagraph2);
      subcontainer.appendChild(headerParagraph3);

      container.appendChild(header);
      container.appendChild(line);
      container.appendChild(vendor);
      container.appendChild(paymentType);

      boxContainer1.appendChild(boxesParagraph1);
      boxContainer1.appendChild(square1);
      boxContainer1.appendChild(boxesParagraph2);

      boxContainer2.appendChild(square2);
      boxContainer2.appendChild(boxesParagraph3);

      boxContainer3.appendChild(square3);
      boxContainer3.appendChild(boxesParagraph4);

      boxContainer4.appendChild(square4);
      boxContainer4.appendChild(boxesParagraph5);

      boxContainer5.appendChild(square5);
      boxContainer5.appendChild(boxesParagraph6);

      boxContainer6.appendChild(square6);
      boxContainer6.appendChild(boxesParagraph7);

      container.appendChild(boxContainer1);
      container.appendChild(boxContainer2);
      container.appendChild(boxContainer3);
      container.appendChild(boxContainer4);
      container.appendChild(boxContainer5);
      container.appendChild(boxContainer6);

      container.appendChild(vendorName);
      container.appendChild(address);
      container.appendChild(city);
      container.appendChild(province);
      container.appendChild(postalCode);
      container.appendChild(country);
      container.appendChild(telephone);
      container.appendChild(email);
      container.appendChild(addressType);
      container.appendChild(employee);
      //footerGeneralContainer.appendChild(footerP1Container);
      footerP1Container.appendChild(footerParagraph0);
      footerP1Container.appendChild(footerParagraph1);
      container.appendChild(footerP1Container);
      container.appendChild(line3);
      container.appendChild(footerParagraph2);
      container.appendChild(line2);
      container.appendChild(footerParagraph3);

      vendorName.appendChild(spanVendorName);
      address.appendChild(spanAddress);
      city.appendChild(spanCity);
      province.appendChild(spanProvince);
      postalCode.appendChild(spanPostalCode);
      country.appendChild(spanCountry);
      telephone.appendChild(spanTelephone);
      email.appendChild(spanEmail);
      addressType.appendChild(spanAddressType);
      employee.appendChild(spanEmployee);
      vendor.appendChild(spanVendor);
      paymentType.appendChild(spanPaymentType);

      let fileName = `Vendor ID ${spanVendor.innerText}  - Request ${this.student.vendor_updates[index].id}`;

      doc.html(container, {
        callback: function(doc) {
          doc.save(fileName);
        },
        x: 10,
        y: 10,
      });
    },
    async copyAddress(address) {
      let lastUpdate = this.student.vendor_updates[this.student.vendor_updates.length - 1];

      if (lastUpdate && address) {
        lastUpdate.address = address.address1;
        lastUpdate.city_id = address.city_id;
        lastUpdate.province_id = address.province_id;
        lastUpdate.country_id = address.country_id;
        lastUpdate.postal_code = address.postal_code;
        lastUpdate.phone = address.telephone;
        lastUpdate.email = address.email;
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
        const res = await axios.get(STUDENT_URL + `/${this.student.id}/vendor`);
        if (res?.data?.success) {
          this.vendorData = res.data.data.data[0];
        }
      } catch (error) {
        console.log("Error to get Vendor Data", error);
      }
    },
    async getVendorList(term) {
      try {
        const res = await axios.get(STUDENT_URL + `/${this.student.id}/vendor-list/${term}`);
        if (res?.data?.success) {
          this.vendorList = [...res.data.data.data];
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
          this.doSaveStudent("vendor_id", null, "studentInfo", this.student.id);
        },
        () => {}
      );
    },
    async addVendorRequest() {
      try {
        const resInsert = await axios.post(STUDENT_URL + `/${this.student.id}/vendor-update`, {
          data: { ...this.newRecord, vendor_id: this.student.vendor_id },
        });

        const message = resInsert?.data?.messages[0];

        if (message?.variant === "success") {
          this.$emit("showSuccess", message.text);
          this.setShowAdd();
        } else {
          this.$emit("showError", message.text);
        }
      } catch (error) {
        console.log(error);
        this.$emit("showError", "Error to insert");
      } finally {
        store.dispatch("loadStudent", this.student.id);
      }
    },
    async updateVendorRequest(id, data) {
      try {
        const resUpdate = await axios.patch(STUDENT_URL + `/${this.student.id}/vendor-update/${id}`, { data });

        const message = resUpdate?.data?.messages[0];

        if (message?.variant === "success") {
          this.$emit("showSuccess", message.text);
        } else {
          this.$emit("showError", message.text);
        }
      } catch (error) {
        console.log(error);
        this.$emit("showError", "Error to update");
      } finally {
        store.dispatch("loadStudent", this.student.id);
      }
    },
    showSuccess(mgs) {
      this.$emit("showSuccess", mgs);
    },
    showError(mgs) {
      this.$emit("showError", mgs);
    },
    doVendorSearch(term) {
      this.getVendorList(term);
    },
  },
  components: {
    SearchVendor,
  },
};
</script>
