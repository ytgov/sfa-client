<template>
  <div>
    <v-card class="default">
      <v-card-title>Statistical Demographics</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <!-- {{application}} -->
            <v-select
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Marital status"
              v-model="application.MARITAL_STATUS_ID"
              item-text="DESCRIPTION"
              item-value="MARITAL_STATUS_ID"
              :items="maritalOptions"
              @change="
                doSaveApp('MARITAL_STATUS_ID', application.MARITAL_STATUS_ID)
              "
            ></v-select>
          </div>
          <div class="col-md-3">
            <v-select
              outlined
              dense
              hide-details
              background-color="#ffaaaa"
              label="Disabled"
              v-model="application.DISABLED_FLAG"
              :items="[
                { text: 'Yes', value: 1 },
                { text: 'No', value: 0 },
                { text: 'Unknown', value: null },
              ]"
              @change="doSaveApp('DISABLED_FLAG', application.DISABLED_FLAG)"
            >
            </v-select>
          </div>
          <div class="col-md-3">
            <v-select
              outlined
              dense
              hide-details
              background-color="#ffaaaa"
              label="Visible minority"
              v-model="application.MINORITY_FLAG"
              :items="[
                { text: 'Yes', value: 1 },
                { text: 'No', value: 0 },
                { text: 'Unknown', value: null },
              ]"
              @change="doSaveApp('MINORITY_FLAG', application.MINORITY_FLAG)"
            >
            </v-select>
          </div>

          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Citizenship"
              v-model="application.CITIZENSHIP_STATUS"
              :items="citizenshipOptions"
              @change="
                doSaveApp('CITIZENSHIP_STATUS', application.CITIZENSHIP_STATUS)
              "
            ></v-select>
          </div>
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Aboriginal status"
              v-model="application.ABORIGINAL_STATUS_ID"
              item-text="DESCRIPTION"
              item-value="ABORIGINAL_STATUS_ID"
              :items="aboriginalStatusOptions"
              @change="
                doSaveApp(
                  'ABORIGINAL_STATUS_ID',
                  application.ABORIGINAL_STATUS_ID
                )
              "
            ></v-select>
          </div>

          <div class="col-md-6 offset-md-6">
            <v-select
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Yukon First Nation"
              v-model="application.FIRST_NATION_ID"
              item-text="FIRST_NATION_DESC"
              item-value="FIRST_NATION_ID"
              :items="firstNationOptions"
              clearable
              @change="
                doSaveApp('FIRST_NATION_ID', application.FIRST_NATION_ID)
              "
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
import { ABORIGINAL_STATUS_URL, FIRST_NATIONS_URL, MARITAL_URL } from "../urls";

export default {
  computed: {
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  data: () => ({
    maritalOptions: [],
    aboriginalStatusOptions: [],
    firstNationOptions: [],
    citizenshipOptions: [
      { vale: null, text: "Not Recorded" },
      { value: 1, text: "Canadian" },
      { value: 2, text: "Permanent Resident" },
      { value: 3, text: "Protected Person" },
      { value: 4, text: "Non-Citizen" },
    ],
  }),
  async created() {
    this.loadAboriginalStatus();
    this.loadFirstNations();
    this.loadMarital();
    //this.updateView(this.application);
  },
  methods: {
    /* updateView(application) {
      this.marital_status = application.MARITAL_STATUS_ID;
      this.citizenship = application.CITIZENSHIP_STATU;
      this.aboriginal_status = application.ABORIGINAL_STATUS_ID;
      this.yukon_first_nation = application.FIRST_NATION_ID;
      this.disabled = application.DISABLED_FLAG;
      this.visible_minority = application.MINORITY_FLAG;
    },
 */
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
    },
    doSaveStudent(field, value) {
      store.dispatch("updateStudent", [field, value, this]);
    },
    doSaveApp(field, value) {
      store.dispatch("updateApplication", [field, value, this]);
    },
  },
};
</script>
