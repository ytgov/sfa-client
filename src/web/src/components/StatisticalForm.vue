<template>
  <div>
    <v-card class="default">
      <v-card-title>Statistical Demographics</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Marital status"
              v-model="marital_status"
              item-text="DESCRIPTION"
              item-value="MARITAL_STATUS_ID"
              :items="maritalOptions"
            ></v-select>
          </div>
          <div class="col-md-3 py-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Disabled"
              v-model="disabled"
            ></v-switch>
          </div>
          <div class="col-md-3 py-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Visible Minority"
              v-model="visible_minority"
            ></v-switch>
          </div>

          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Citizenship"
              v-model="citizenship"
              :items="citizenshipOptions"
            ></v-select>
          </div>
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Aboriginal status"
              v-model="aboriginal_status"
              item-text="DESCRIPTION"
              item-value="ABORIGINAL_STATUS_ID"
              :items="aboriginalStatusOptions"
            ></v-select>
          </div>

          <div class="col-md-6 offset-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Yukon First Nation"
              v-model="yukon_first_nation"
              item-text="FIRST_NATION_DESC"
              item-value="FIRST_NATION_ID"
              :items="firstNationOptions"
              clearable
            ></v-select>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import store from "../store";
import axios from "axios";
import { ABORIGINAL_STATUS_URL,FIRST_NATIONS_URL,MARITAL_URL } from "../urls";

export default {
  computed: {
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  data: () => ({
    maritalOptions: [],
    citizenshipOptions: [
      "Not Recorded",
      "Canadian",
      "Permanent Resident",
      "Protected Person",
      "Non-Citizen",
    ],
    aboriginalStatusOptions: [],
    firstNationOptions: [],

    marital_status: "",
    citizenship: "",
    aboriginal_status: "",
    yukon_first_nation: "",
    disabled: false,
    visible_minority: false,
  }),
  async created() {
    this.loadAboriginalStatus();
    this.loadFirstNations();
    this.loadMarital();
    this.updateView(this.application);
  },
  methods: {
    updateView(application) {
      this.marital_status = application.MARITAL_STATUS_ID;
      this.citizenship = application.CITIZENSHIP_STATU;
      this.aboriginal_status = application.ABORIGINAL_STATUS_ID;
      this.yukon_first_nation = application.FIRST_NATION_ID;
      this.disabled = application.DISABLED_FLAG;
      this.visible_minority = application.MINORITY_FLAG;
    },

    loadAboriginalStatus() {
      axios.get(ABORIGINAL_STATUS_URL).then((resp) => {
        this.aboriginalStatusOptions = resp.data;
      });
    },
    loadFirstNations() {      
      axios.get(FIRST_NATIONS_URL).then((resp) => {
        this.firstNationOptions = resp.data;
      });
    },
    loadMarital() {
      axios.get(MARITAL_URL).then((resp) => {
        this.maritalOptions = resp.data;
      });
    }
  },
};
</script>
