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
              background-color="white"
              hide-details
              label="High school/official transcript percentage"
              v-model="application.academic_percent"
              @change="doSaveApp('academic_percent', application.academic_percent)"
              type="number"
              step="0.10"
              min="1.00"
              max="100.00"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <div class="row">
      <div class="col-md-12">
        <v-card class="default mb-5">
          <v-card-text>
            <h3>Canadian Army Scholarship</h3>
            <v-switch
              dense
              hide-details
              label="Apply for Canadian Army Scholarship"
              :value="!!canadianArmyScholarship?.id"
              v-model="checkCandianArmy"
              @change="toggle($event, 'CAS', canadianArmyScholarship?.id)"
            ></v-switch>
          </v-card-text>
        </v-card>

      </div>

      <div class="col-md-12">
        <v-card class="default mb-5">
          <v-card-text>
            <h3>Nicholas John Harach Scholarship</h3>

            <v-switch
              dense
              hide-details
              label="Apply for Nicholas John Harach Scholarship"
              :value="!!nicholasJohnHarachScholarship?.id"
              v-model="checkNJH"
              @change="toggle($event, 'NJHS', nicholasJohnHarachScholarship?.id)"
            ></v-switch>
            <div v-if="checkNJH">
              <v-switch
                dense
                hide-details
                label="Entering first year"
              ></v-switch>

              <div v-if="!checkNJH" class="mt-5">
                <v-file-input
                  multiple
                  truncate-length="15"
                  outlined
                  dense
                  background-color="white"
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
                  background-color="white"
                  hide-details
                  label="Post-secondary average"
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
              :value="!!yukonHuskysScholarship?.id"
              v-model="checkHuskys"
              @change="toggle($event, 'YHS', yukonHuskysScholarship?.id)"
            ></v-switch>

            <div v-if="checkHuskys">
              <v-switch
                dense
                hide-details
                label="Entering first year"
              ></v-switch>

              <!-- <div v-if="!radio_club.first_year" class="mt-5">
                <v-file-input
                  multiple
                  truncate-length="15"
                  outlined
                  dense
                  background-color="white"
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
                  background-color="white"
                  hide-details
                  label="Post-secondary average"
                  v-model="radio_club.post_secondary_average"
                  type="number"
                  step="0.01"
                  min="0.00"
                  max="4.00"
                ></v-text-field>
              </div> -->
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
import store from '@/store';
import axios from 'axios';
import { APPLICATION_URL } from "@/urls";
import validator from "@/validator";

export default {
  computed: {
    application: function () {
      return store.getters.selectedApplication;
    },
    canadianArmyScholarship: function () {
      const request = this.application
        ?.funding_requests
        ?.find(fr => fr.request_type_id === 7);
      this.checkCandianArmy = !!request;
      return request || {};
    },
    nicholasJohnHarachScholarship: function () {
      const request = this.application
        ?.funding_requests
        ?.find(fr => fr.request_type_id === 9);
      this.checkNJH = !!request;
      return request || {};
    },
    yukonHuskysScholarship: function () {
      const request = this.application
        ?.funding_requests
        ?.find(fr => fr.request_type_id === 11);
      this.checkHuskys = !!request;
      return request || {};
    },

  },
  data: () => ({
    applicationId: -1,
    scholarshipOptions: ["Scholarship AAA", "Scholarship BBB"],

    transcript_percentage: "4.0",
    applications: [],
    maxDate: moment().format("YYYY-MM-DD"),
    checkCandianArmy: false,
    checkNJH: false,
    checkHuskys: false,
    scholarshipsTypes: {
      CAS:7,
      NJHS:9,
      YASS:10,
      YHS:11,
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
    doSaveApp(field, value) {
      store.dispatch("updateApplication", [field, value, this]);
    },
    async deleteRecord(id) {
      try {
        const resDelete = await axios.delete(
        APPLICATION_URL+`/${id}/status`,
        );
        const message = resDelete.data.messages[0];
        if (message.variant == "success") {
            this.$emit("showSuccess", message.text);
            this.checkYEARequest = false;
        } else {
            this.$emit("showError", message.text);
        }
      } catch (error) {
        this.$emit("showError", "Error to delete");
      } finally {
        store.dispatch("loadApplication", this.application.id);
      }
    },
    removeRecord(id, type) {
      this.$refs.confirm.show(
            "Are you sure?",
            "Click 'Confirm' below to permanently remove this funding record.",
          () => {
            this.deleteRecord(id);
          },
          () => {
            switch (this.scholarshipsTypes?.[type]) {
              case 7:
                this.checkCandianArmy = !this.checkCandianArmy;
                break;
              case 9:
                this.checkNJH = !this.checkNJH;
                break;
              case 11:
                this.checkHuskys = !this.checkHuskys;
                break;
            
              default:
                break;
            }
          }
      ); 
    },
    async addFundingRequest(type) {
      try {
        const resInsert = await axios.post(
          APPLICATION_URL+`/${this.application.id}/status`,
          { request_type_id: type, received_date: new Date(),},
        );
        const message = resInsert?.data?.messages[0];
        if (message?.variant === "success") {
          this.$emit("showSuccess", message.text);
          this.checkYEARequest = true;
        } else {
          this.$emit("showError", message.text);
        }
          
      } catch (error) {
        this.$emit("showError", "Error to insert");
      } finally {
        store.dispatch("loadApplication", this.application.id);
      }
    },
    async updateFundingRequest(itemToUpdate, id) {
      try {
        const resInsert = await axios.put(
            APPLICATION_URL+`/${this.application.id}/status/${id}`,
            { data: { ...itemToUpdate } },
          );
        const message = resInsert?.data?.messages[0];
        if (message?.variant === "success") {
          this.$emit("showSuccess", message.text);
        } else {
          this.$emit("showError", message.text);
        }
      } catch (error) {
        this.$emit("showError", "Error to update");
      } finally {
        store.dispatch("loadApplication", this.application.id);
      }
    },
    toggle(event, type, id = null) {
      if (!event && id) {
        this.removeRecord(id, type);
      } else {
        if (!id && this.scholarshipsTypes?.[type]) {
          this.addFundingRequest(this.scholarshipsTypes[type]);
        }
      }
    },
  },
};
</script>