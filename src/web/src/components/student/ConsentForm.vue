<template>
  <div>
    <h2 class="mb-0">Consent</h2>
    <p>
      People that the student is giving consent to view their funding
      information.
    </p>

    <div v-for="(item, i) of student.consents" :key="i">
      <v-card class="default mb-5">
        <v-card-title
          >Consent {{ 1 + i }}
          <v-spacer></v-spacer>
          <v-btn
            color="warning"
            x-small
            fab
            class="my-0"
            @click="removeConsent(i)"
            ><v-icon>mdi-close</v-icon></v-btn
          ></v-card-title
        >
        <v-card-text>
          <div class="row">
            <div class="col-md-8">
              <v-text-field
                outlined
                dense
                background-color="white"
                hide-details
                label="Consent person"
                v-model="item.CONSENT_PERSON"
                @change="doSaveConsent(item)"
              ></v-text-field>
            </div>
            <div class="col-md-2">
              <v-select
                outlined
                dense
                hide-details
                label="SFA"
                background-color="white"
                v-model="item.CONSENT_SFA_FLG"
                :items="['Yes', 'No']"
                @change="doSaveConsent(item)"
              ></v-select>
            </div>
            <div class="col-md-2">
              <v-select
                outlined
                dense
                hide-details
                label="CSL"
                background-color="white"
                v-model="item.CONSENT_CSL_FLG"
                :items="['Yes', 'No']"
                @change="doSaveConsent(item)"
              ></v-select>
            </div>

            <div class="col-md-4">
              <v-text-field
                outlined
                dense
                background-color="white"
                hide-details
                label="Academic year start"
                v-model="item.ACADEMIC_YEAR_START"
                type="number"
                @change="doSaveConsent(item)"
              ></v-text-field>
            </div>
            <div class="col-md-4">
              <v-text-field
                outlined
                dense
                background-color="white"
                hide-details
                label="Academic year end"
                v-model="item.ACADEMIC_YEAR_END"
                type="number"
                @change="doSaveConsent(item)"
              ></v-text-field> {{item.STUDENT_CONSENT_ID}}
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <v-btn color="info" @click="addConsent">Add Consent Person</v-btn>
    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
import store from "../../store";
import moment from "moment";
import _ from "lodash";

export default {
  data: () => ({}),
  computed: {
    student: function () {
      return store.getters.selectedStudent;
    },
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  async created() {},
  methods: {
    addConsent() {
      let newConsent = {
        STUDENT_ID: this.student.STUDENT_ID,
        CONSENT_SFA_FLG: "Yes",
        CONSENT_CSL_FLG: "Yes",
        ACADEMIC_YEAR_START: moment().year(),
        CONSENT_PERSON: "New Person",
      };

      this.doSaveConsent(newConsent);

      this.student.consents.push(newConsent);
    },
    removeConsent(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this consent.",
        () => {
          let item = this.student.consents.splice(index, 1);
          store.dispatch("deleteConsent", [item[0], this]);
        },
        () => {}
      );
    },
    doSaveConsent(value) {
      let body = _.clone(value);
      store.dispatch("updateConsent", [body, this]);
    },
  },
};
</script>
