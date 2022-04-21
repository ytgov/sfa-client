<template>
  <div>
    <h1>Scholarship Applications</h1>

    <v-card class="default mb-5">
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="High school/official transcript percentage"
              v-model="transcript_percentage"
              type="number"
              step="0.01"
              min="0.00"
              max="4.00"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="default mb-5">
      <v-card-text>
        <h3>Applications</h3>
        <div class="row" v-for="(item, i) of applications" :key="i">
          <div class="col-md-10">
            <v-select
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Scholarship"
              v-model="item.scholarship"
              :items="scholarshipOptions"
            ></v-select>
          </div>

          <div class="col-md-2">
            <v-btn
              color="warning"
              x-small
              fab
              title="Remove"
              class="my-0 float-right"
              @click="removeApplication(i)"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </div>
        </div>
        <v-btn class="mt-5" color="info" @click="addApplication()"
          >Add scholarship application</v-btn
        >
      </v-card-text>
    </v-card>

    <div class="row">
      <div class="col-md-6">
        <v-card class="default mb-5">
          <v-card-text>
            <h3>Canadian Army Scholarship</h3>
            <v-switch
              dense
              hide-details
              label="Apply for Canadian Army Scholarship"
              v-model="canadian_army.apply"
            ></v-switch>
          </v-card-text>
        </v-card>

        <v-card class="default mb-5">
          <v-card-text>
            <h3>Yukon Art Society Scholarship</h3>
            <v-switch
              dense
              hide-details
              label="Apply for Yukon Art Society Scholarship"
              v-model="art_society.apply"
            ></v-switch>

            <div v-if="art_society.apply" class="mt-5">
              <v-file-input
                multiple
                truncate-length="15"
                outlined
                dense
                background-color="#ffaaaa"
                hide-details
                label="Upload personal essay"
              ></v-file-input>
              <v-btn class="mt-5 mb-5 float-right" color="primary"
                >View personal essay</v-btn
              >

              <v-file-input
                style="clear: both"
                multiple
                truncate-length="15"
                outlined
                dense
                background-color="#ffaaaa"
                hide-details
                label="Upload recommendation letter"
              ></v-file-input>

              <v-btn class="mt-5 float-right" color="primary"
                >View recommendation letter</v-btn
              >
              <div style="clear: both"></div>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div class="col-md-6">
        <v-card class="default mb-5">
          <v-card-text>
            <h3>Nicholas John Harach Scholarship</h3>

            <v-switch
              dense
              hide-details
              label="Apply for Canadian Army Scholarship"
              v-model="harach.apply"
            ></v-switch>
            <div v-if="harach.apply">
              <v-switch
                dense
                hide-details
                label="Entering first year"
                v-model="harach.first_year"
              ></v-switch>

              <div v-if="!harach.first_year" class="mt-5">
                <v-file-input
                  multiple
                  truncate-length="15"
                  outlined
                  dense
                  background-color="#ffaaaa"
                  hide-details
                  label="Upload post-secondary transcript"
                ></v-file-input>

                <v-btn class="mt-5 mb-5 float-right" color="primary"
                  >View post-secondary transcript</v-btn
                >

                <v-text-field
                  style="clear: both"
                  class="mt-1"
                  outlined
                  dense
                  background-color="#ffaaaa"
                  hide-details
                  label="Post-secondary average"
                  v-model="harach.post_secondary_average"
                  type="number"
                  step="0.01"
                  min="0.00"
                  max="4.00"
                ></v-text-field>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <v-card class="default mb-5">
          <v-card-text>
            <h3>Yukon Huskys C.B. Radio Club Scholarship</h3>
            <v-switch
              dense
              hide-details
              label="Apply for Yukon Huskys C.B. Radio Club Scholarship"
              v-model="radio_club.apply"
            ></v-switch>

            <div v-if="radio_club.apply">
              <v-switch
                dense
                hide-details
                label="Entering first year"
                v-model="radio_club.first_year"
              ></v-switch>

              <div v-if="!radio_club.first_year" class="mt-5">
                <v-file-input
                  multiple
                  truncate-length="15"
                  outlined
                  dense
                  background-color="#ffaaaa"
                  hide-details
                  label="Upload post-secondary transcript"
                ></v-file-input>

                <v-btn class="mt-5 mb-5 float-right" color="primary"
                  >View post-secondary transcript</v-btn
                >

                <v-text-field
                  style="clear: both"
                  class="mt-1"
                  outlined
                  dense
                  background-color="#ffaaaa"
                  hide-details
                  label="Post-secondary average"
                  v-model="radio_club.post_secondary_average"
                  type="number"
                  step="0.01"
                  min="0.00"
                  max="4.00"
                ></v-text-field>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
import moment from "moment";
import store from "../../store";

export default {
  data: () => ({
    applicationId: -1,
    scholarshipOptions: ["Scholarship AAA", "Scholarship BBB"],

    transcript_percentage: "4.0",
    applications: [],
    maxDate: moment().format("YYYY-MM-DD"),

    canadian_army: {
      apply: false,
    },
    apply_cdn_army: false,
    harach: {
      apply: false,
      first_year: true,
      post_secondary_average: 0,
    },
    art_society: {
      apply: false,
    },
    radio_club: {
      apply: false,
      first_year: true,
      post_secondary_average: 0,
    },
  }),
  async created() {
    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;

    if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {
      await store.dispatch("loadApplication", this.applicationId);
    }

    store.dispatch("setAppSidebar", true);
  },
  methods: {
    addApplication() {
      this.applications.push({ birth_date: "" });
    },
    removeApplication(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this scholarship application.",
        () => {
          this.applications.splice(index, 1);
        },
        () => {}
      );
    },
  },
};
</script>