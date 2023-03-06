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
              v-model="application.marital_status_id"
              item-text="description"
              item-value="id"
              :items="maritalStatusList"
              @change="
                doSaveApp('marital_status_id', application.marital_status_id)
              "
            ></v-select>
          </div>
          <div class="col-md-3">
            <v-select
              outlined
              dense
              hide-details
              background-color="white"
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
              background-color="white"
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
              background-color="white"
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
            {{application.aborigal_status_id}}
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Aboriginal status"
              v-model="application.aboriginal_status_id"
              item-text="description"
              item-value="id"
              :items="aboriginalStatusList"
              @change="
                doSaveApp(
                  'aboriginal_status_id',
                  application.aboriginal_status_id
                )
              "
            ></v-select>
          </div>

          <div class="col-md-6 offset-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Yukon First Nation"
              v-model="application.first_nation_id"
              item-text="description"
              item-value="id"
              :items="firstNations"
              clearable
              @change="
                doSaveApp('first_nation_id', application.first_nation_id)
              "
            ></v-select>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import store from "../../store";
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(["maritalStatusList", "aboriginalStatusList", "firstNations"]),
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
    store.dispatch("setMaritalStatusList");
    store.dispatch("setAboriginalStatusList");
    store.dispatch("setFirstNations");
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
    doSaveStudent(field, value) {
      store.dispatch("updateStudent", [field, value, this]);
    },
    doSaveApp(field, value) {
      store.dispatch("updateApplication", [field, value, this]);
    },
  },
};
</script>
