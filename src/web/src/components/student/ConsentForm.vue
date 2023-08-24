<template>
  <div>
    <h2 class="mb-0">Consent</h2>
    <p>
      People that the student is giving consent to view their funding information.
    </p>
    <div v-for="(item, i) of student.consent_info" :key="i">
      <v-card class="default mb-5">
        <v-card-title
          >Consent {{ 1 + i }}
          <v-spacer></v-spacer>
          <v-btn color="warning" x-small fab class="my-0" @click="deleteRecord(item.id)"
            ><v-icon>mdi-close</v-icon></v-btn
          ></v-card-title
        >
        <v-card-text>
          <div class="row">
            <div class="col-md-12">
              <v-text-field
                outlined
                dense
                background-color="white"
                hide-details
                label="Consent person full legal name"
                v-model="item.consent_person"
                @change="doSaveConsent('consent_person', item.consent_person, 'consentInfo', item.id)"
              ></v-text-field>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <v-card class="default mb-5" v-if="showAdd">
      <v-card-title>Add Consent</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Consent person"
              v-model="newRegister.consent_person"
            ></v-text-field>
          </div>

          <div class="col-md-4">
            <v-select
              outlined
              dense
              hide-details
              label="Academic year start"
              background-color="white"
              :items="yearOptions"
              item-text="year"
              item-value="id"
              v-model="newRegister.start_academic_year_id"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-select
              outlined
              dense
              hide-details
              label="Academic year end"
              background-color="white"
              :items="yearOptions"
              item-text="year"
              item-value="id"
              v-model="newRegister.end_academic_year_id"
            ></v-select>
          </div>
        </div>
      </v-card-text>

      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn color="red" class="my-0" @click="setClose">
          <v-icon color="white font-weight-thin" size="21">
            {{ "mdi-close" }}
          </v-icon>
        </v-btn>
        <v-btn
          color="success"
          class="my-0 ml-5"
          @click="
            (e) => {
              doSaveConsent('data', { ...newRegister }, 'consentInfo', null, true);
            }
          "
        >
          <v-icon color="white font-weight-thin" size="21">
            {{ "mdi-content-save" }}
          </v-icon>
        </v-btn>
      </v-card-title>
    </v-card>

    <v-btn color="info" @click="setClose" v-if="!showAdd">Add Consent Person</v-btn>
    <v-btn color="info" @click="setClose" v-else>Cancel</v-btn>
    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>
<script>
import store from "../../store";
import validator from "@/validator";
import _ from "lodash";

export default {
  data: () => ({
    showAdd: false,
    newRegister: {
      consent_sfa: null,
      consent_csl: null,
      consent_person: null,
      end_academic_year_id: null,
      start_academic_year_id: null,
    },
  }),
  computed: {
    student: function() {
      return store.getters.selectedStudent;
    },
    yearOptions: function() {
      return store.getters.academicYears;
    },
  },
  async created() {
    store.dispatch("setAcademicYears");
  },
  methods: {
    setClose() {
      if (this.showAdd) {
        this.newRegister = {
          consent_sfa: null,
          consent_csl: null,
          consent_person: null,
          end_academic_year_id: null,
          start_academic_year_id: null,
        };
      }

      this.showAdd = !this.showAdd;
    },
    deleteRecord(idToDelete) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this consent.",
        () => {
          store.dispatch("deleteConsent", [this, idToDelete]);
        },
        () => {}
      );
    },
    doSaveConsent(field, value, type, extraId = null, isInsertion = false) {
      if (isInsertion) {
        const validate = { ...value };

        for (const property in validate) {
          if (!validate[property] && !(property !== "end_academic_year_id")) {
            return this.$emit("showError", `${property} is required`);
          }
        }

        if (
          validate["end_academic_year_id"] !== null &&
          !validator.isLess(validate["start_academic_year_id"], validate["end_academic_year_id"])
        ) {
          return this.$emit("showError", `Start Year must be greater`);
        }
      }

      const url = type === "consentInfo" ? "/consent" : "";

      store.dispatch("updateStudent", [field, value, type, extraId, this, null, url, isInsertion]);
    },
  },
};
</script>
