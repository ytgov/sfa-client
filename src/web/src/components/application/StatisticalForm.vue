<template>
  <div>
    <v-card class="default">
      <v-card-title>Basic Demographics</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-3">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Language"
            ></v-select>
          </div>
          <div class="col-md-3">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Gender"
            ></v-select>
          </div>
          <div class="col-md-3">
            <v-menu
                :close-on-content-click="false"
                transition="scale-transition"
                left
                nudge-top="26"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Date app received"
                    append-icon="mdi-calendar"
                    hide-details
                    readonly
                    outlined
                    dense
                    background-color="white"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                ></v-date-picker>
              </v-menu>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="default mt-5">
      <v-card-title>Statistical Demographics</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-3">
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
          <div class="col-md-2">
            <v-switch 
              class="my-0"
              label="Disabled"
              v-model="application.is_disabled"
              @change="
                doSaveApp('is_disabled', application.is_disabled)
              "
            >
            </v-switch>
          </div>
          <div class="col-md-2">
            <v-switch 
              class="my-0"
              label="Visible Minority"
              v-model="application.is_minority"
              @change="
                doSaveApp('is_minority', application.is_minority)
              "
            >
            </v-switch>
          </div>
          <div class="col-md-2">
            <v-switch 
              class="my-0"
              label="Crown Ward"
              v-model="student.is_crown_ward" @change="
                doSaveStudent('is_crown_ward', student.is_crown_ward, 'studentInfo', student.id)"
            >
            </v-switch>
          </div>
          <div class="col-md-3">
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

          <div class="col-md-3">
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
              @change="
                doSaveApp('first_nation_id', application.first_nation_id)
              "
            ></v-select>
          </div>

          <div class="col-md-6">
            <v-textarea
              rows="1"
              outlined
              dense
              background-color="white"
              hide-details
              label="Notes"
            >

            </v-textarea>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-switch
      label="STEP and Grad CORP data sharing consent"
    >

    </v-switch>
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
    student: function () {
      return store.getters.selectedStudent;
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
    doSaveStudent(field, value, type, extraId = null, addressType = "") {
      store.dispatch("updateStudent", [field, value, type, extraId, this, addressType]);
    },
    doSaveApp(field, value) {
      store.dispatch("updateApplication", [field, value, this]);
    },
  },
};
</script>
