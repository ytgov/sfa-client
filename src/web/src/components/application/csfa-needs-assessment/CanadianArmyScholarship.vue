<template>
  <div class="home">
    <h1>Funding Status</h1>
    <div class="col-md-12">
      <v-card class="default mb-5 bg-color-blue card-padding-bottom" v-for="item, index in application.funding_requests" :key="index">
        <v-card-title>Assessment - Canadian Army Scholarship</v-card-title>
        <v-card-text>
          <h3><strong>Disbursment - Miscellaneous</strong></h3>
          <div class="row">
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-9">
                  <v-menu
                    :disabled="showAdd"
                    v-model="item.assessed_date_menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    left
                    nudge-top="26"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :disabled="showAdd"
                        v-model="item.assessed_date"
                        label="Assessed Date"
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
                      :disabled="showAdd"
                      v-model="item.assessed_date"
                      @input="item.assessed_date_menu = false"
                    ></v-date-picker>
                  </v-menu>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-9">
                  <v-menu
                    :disabled="showAdd"
                    v-model="item.issue_date_menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    left
                    nudge-top="26"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :disabled="showAdd"
                        v-model="item.issue_date"
                        label="Issue Date"
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
                      :disabled="showAdd"
                      v-model="item.issue_date"
                      @input="item.issue_date_menu = false"
                    ></v-date-picker>
                  </v-menu>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-9">
                  <v-menu
                    :disabled="showAdd"
                    v-model="item.due_date_menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    left
                    nudge-top="26"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :disabled="showAdd"
                        v-model="item.due_date"
                        label="Due Date"
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
                      :disabled="showAdd"
                      v-model="item.due_date"
                      @input="item.due_date_menu = false"
                    ></v-date-picker>
                  </v-menu>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-9">
                  <v-select
                    :disabled="showAdd"
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Disbursment Type"
                    @change="updateFundingRequest({ request_type_id: item.request_type_id }, item.id)"
                    v-model="item.request_type_id"
                    :items="fundingTypeOptions"
                    item-text="DESCRIPTION"
                    item-value="REQUEST_TYPE_ID"
                  ></v-select>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-9">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Reference #"
                    v-model="ReferenceNumbver"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-9">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Tax Year"
                    @keypress="validate.isNumber($event)"
                    v-model="taxyear"
                  ></v-text-field>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-9">
                  <v-select
                    :disabled="showAdd"
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Change Reason"
                    v-model="change_reason"
                    item-text="DESCRIPTION"
                    item-value="REQUEST_TYPE_ID"
                  ></v-select>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-9">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Batch ID"
                    v-model="batch_id"
                  ></v-text-field>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import store from "../../../store";
import validator from "@/validator";
export default {
  name: "Home",
  computed: {
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  async created() {
    this.validate = validator;
    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;
    if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {
      await store.dispatch("loadApplication", this.applicationId);
    }
    store.dispatch("setAppSidebar", true);
  }
};
</script>
<style>
  .nopadding {
    padding: 0 !important;
  }
  .nopadding-lr {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .equalize-heights {
    height: 40px∫;
  }
  .border-container{
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  .w-auto{
    min-width: unset !important;
    width: 100%;
  }
  .bg-color-blue{
    background-color: #E2F1FD !important;
  }
  .card-padding-bottom {
    padding-bottom: 32px !important;
  }
</style>
