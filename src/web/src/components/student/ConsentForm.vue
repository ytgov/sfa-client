<template>
  <div>
    <h2 class="mb-0">Consent</h2>
    <p>
      People that the student is giving consent to view their funding
      information.
    </p>
    <div v-for="(item, i) of student.consent_info" :key="i">
      <v-card class="default mb-5">
        <v-card-title>Consent {{ 1 + i }}
          <v-spacer></v-spacer>
          <v-btn color="warning" x-small fab class="my-0"
            @click="deleteRecord(item.id)"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
        <v-card-text>
          <div class="row">
            <div class="col-md-8">
              <v-text-field outlined dense background-color="white" hide-details label="Consent person"
                v-model="item.consent_person" @change="doSaveConsent('consent_person', item.consent_person, 'consentInfo', item.id)"></v-text-field>
            </div>
            <div class="col-md-2">
              <v-select outlined dense hide-details label="SFA" background-color="white" v-model="item.consent_sfa"
                :items="[{ value: true, text: 'Yes' }, { value: false, text: 'No' }]" @change="doSaveConsent('consent_sfa', item.consent_sfa, 'consentInfo', item.id)"></v-select>
            </div>
            <div class="col-md-2">
              <v-select outlined dense hide-details label="CSL" background-color="white" v-model="item.consent_csl"
                :items="[{ value: true, text: 'Yes' }, { value: false, text: 'No' }]" @change="doSaveConsent('consent_csl', item.consent_csl, 'consentInfo', item.id)"></v-select>
            </div>

            <div class="col-md-4">
              
              <v-select outlined dense hide-details label="CSL" background-color="white"  v-model="item.start_academic_year_id"
                @change="doSaveConsent('start_academic_year_id', item.start_academic_year_id, 'consentInfo', item.id)"
                :items="yearOptions"></v-select>

            </div>
            <div class="col-md-4">

              <v-select outlined dense hide-details label="CSL" background-color="white"  v-model="item.end_academic_year_id"
                @change="doSaveConsent('end_academic_year_id', item.end_academic_year_id, 'consentInfo', item.id)"
                :items="yearOptions"></v-select>

            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <v-card class="default mb-5" v-if="showAddContent">
      <v-card-title>Add Consent</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-8">
            <v-text-field outlined dense background-color="white" hide-details label="Consent person"
            v-model="newRegister.consent_person"
            ></v-text-field>
          </div>
          <div class="col-md-2">
            <v-select outlined dense hide-details label="SFA" background-color="white" :items="[{ value: true, text: 'Yes' }, { value: false, text: 'No' }]"
            v-model="newRegister.consent_sfa"
            ></v-select>
          </div>
          <div class="col-md-2">
            <v-select outlined dense hide-details label="CSL" background-color="white" :items="[{ value: true, text: 'Yes' }, { value: false, text: 'No' }]"
            v-model="newRegister.consent_csl"
            ></v-select>
          </div>

          <div class="col-md-4">
            <v-select outlined dense hide-details label="Academic year start" background-color="white" :items="yearOptions"
            v-model="newRegister.start_academic_year_id"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-select outlined dense hide-details label="Academic year end" background-color="white" :items="yearOptions"
            v-model="newRegister.end_academic_year_id"
            ></v-select>
          </div>
        </div>
      </v-card-text>

      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn color="red" class="my-0" @click="showAddConsent">
          <v-icon color="white font-weight-thin" size="21">
            {{ 'mdi-close' }}
          </v-icon>
        </v-btn>
        <v-btn color="success" class="my-0 ml-5" @click="e => {
          doSaveConsent('data', { ...newRegister }, 'consentInfo', null, true);
          showAddConsent();
        }">
          <v-icon color="white font-weight-thin" size="21">
            {{ 'mdi-content-save' }}
          </v-icon>
        </v-btn>
      </v-card-title>
    </v-card>

    <v-btn color="info" @click="showAddConsent" v-if="!showAddContent">Add Consent Person</v-btn>
    <v-btn color="info" @click="showAddConsent" v-else>Cancel</v-btn>
    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
import store from "../../store";
import moment from "moment";
import validator from "@/validator";
import _ from "lodash";

export default {
  data: () => ({
    showAddContent: false,
    newRegister: {
      consent_sfa: null,
      consent_csl: null,
      consent_person: null,
      end_academic_year_id: null,
      start_academic_year_id: null,
    },
  }),
  computed: {
    student: function () {
      return store.getters.selectedStudent;
    },
    yearOptions: function () {
      return store.getters.yearOptions;
    },
  },
  async created() { },
  methods: {
    showAddConsent() {

      if (this.showAddContent) {
        this.newRegister = {
          consent_sfa: null,
          consent_csl: null,
          consent_person: null,
          end_academic_year_id: null,
          start_academic_year_id: null,
        }
      }

      this.showAddContent = !this.showAddContent;

    },
    deleteRecord(idToDelete) {

      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this consent.",
        () => {
          store.dispatch(
            "deleteConsent",
            [this, idToDelete],
          );
        },
        () => { }
      );

    },
    doSaveConsentxxx(value) {
      let body = _.clone(value);
      store.dispatch("updateConsent", [body, this]);
    },
    doSaveConsent(field, value, type, extraId = null, isInsertion = false) {
      if (isInsertion) {

        const validate = { ...value };
        
        for (const property in validate) {
          
          if (!validate[property] && !(property !== "end_academic_year_id" || property !== "consent_csl" || property !== "consent_sfa")) {
              return this.$emit("showError", `${property} is required`);
          }
          if ((property === "consent_csl" || property === "consent_sfa") && validate[property] === null) {
            return this.$emit("showError", `${property} is required`);
          }          
        }


        if (validate['end_academic_year_id'] !== null && !validator.isLess(validate['start_academic_year_id'], validate['end_academic_year_id'])) {
          return this.$emit("showError", `Start Year must be greater`);
        }
      }

      const url = type === "consentInfo" ? "/consent" : "";

      store.dispatch(
        "updateStudent",
        [field, value, type, extraId, this, null, url, isInsertion],
      );

    },
  },
};
</script>
