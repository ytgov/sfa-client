<template>
  <div>
    <h2 class="mb-0">Consent</h2>
    <p>
      People that the student is giving consent to view their funding
      information.
    </p>

    <div v-for="(item, i) of application.consents" :key="i">
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
              ></v-text-field>
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
import store from "../store";
export default {
  data: () => ({}),
  computed: {
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  async created() {},
  methods: {
    addConsent() {
      this.application.consents.push({});
    },
    removeConsent(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this consent.",
        () => {
          this.application.consents.splice(index, 1);
        },
        () => {}
      );
    },
    doSaveStudent(field, value) {
      store.dispatch("updateStudent", [field, value, this]);
    },
  },
};
</script>
