<template>
  <div class="home yukon-excellence-awards-assessment">
    <h1>Funding Status</h1>
    <div class="col-lg-12">
      <v-card class="default mb-5 bg-color-blue" v-for="item, index in application.funding_requests" :key="index">
        <div class="col-lg-12 nopadding d-flex flex-wrap low-margin">
          <v-card-title class="col-xs-12 col-lg-8">Assessment - Yukon Excellence Awards</v-card-title>
          <div class="col-xs-12 col-lg-4 nopadding d-flex">
            <div class="col-xs-4 col-sm-4">
              <v-btn 
                :disabled="showAdd"
                dense
                color="green" 
                class="my-0"
                block
              >
              SAVE
              </v-btn>
            </div>
            <div class="col-xs-4 col-sm-4">
              <v-btn 
                :disabled="showAdd"
                dense
                color="orange" 
                class="my-0"
                block
              >
              CANCEL
              </v-btn>
            </div>
            <div class="col-xs-4 col-sm-4">
              <v-btn 
                :disabled="showAdd"
                dense
                color="red" 
                class="my-0"
                block
              >
              EXIT
              </v-btn>
            </div>
          </div>
        </div>
        <v-card-text class="nopadding d-flex flex-wrap low-margin">
          <div class="col-xs-12 col-lg-8 nopadding left-block-container">
            <div class="col-lg-12 nopadding d-flex low-margin">
              <div class="col-sm-4 col-lg-4">
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
            <div class="col-lg-12 nopadding d-flex">
              <div class="col-sm-4 col-lg-4">
                <v-menu
                  :disabled="showAdd"
                  v-model="classes_start_date_menu"
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
                      v-model="classes_start_date"
                      label="Classes Start Date"
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
                    v-model="classes_start_date"
                    @input="classes_start_date_menu = false"
                  ></v-date-picker>
                </v-menu>
              </div>
            </div>
            <div class="col-lg-12 nopadding d-flex mobile-column-flex">
              <div class="col-lg-4">
                <v-menu
                  :disabled="showAdd"
                  v-model="classes_end_date_menu"
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
                      v-model="classes_end_date"
                      label="Classes End Date"
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
                    v-model="classes_end_date"
                    @input="classes_end_date_menu = false"
                  ></v-date-picker>
                </v-menu>
              </div>
              <div class="col-lg-4">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="YEA Earned"
                  @keypress="validate.isNumber($event)"
                  v-model="yea_earned"
                ></v-text-field>
              </div>
              <div class="col-lg-4">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="YEA Used"
                  @keypress="validate.isNumber($event)"
                  v-model="yea_used"
                ></v-text-field>
              </div>
            </div>
            <div class="col-lg-12 nopadding d-flex mobile-column-flex">
              <div class="col-lg-4 mobile-low-margin">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="YEA Expiry Date"
                  @keypress="validate.isNumber($event)"
                  v-model="yea_expiry_date"
                ></v-text-field>
              </div>
              <div class="col-lg-4 not-displayed-sx"></div>
              <div class="col-lg-4">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Receipts Received"
                  @keypress="validate.isNumber($event)"
                  v-model="yea_used"
                ></v-text-field>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-lg-4 nopadding right-block-container">
            <div class="col-lg-12 nopadding line-jump-height not-displayed-sx-md"></div>
            <div class="col-lg-12 nopadding line-jump-height not-displayed-sx-md"></div>
            <div class="not-displayed-lg"></div>
            <div class="col-lg-12 nopadding d-flex">
              <div class="col-sm-4 col-lg-7">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="YEA Balance"
                  @keypress="validate.isNumber($event)"
                  v-model="yea_balance"
                ></v-text-field>
              </div>
            </div>
            <div class="col-lg-12 nopadding d-flex mobile-column-flex">
              <div class="col-sm-4 col-lg-7">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Total Requested"
                  @keypress="validate.isNumber($event)"
                  v-model="total_requested"
                ></v-text-field>
              </div>
              <div class="col-sm-4 col-lg-5">
                <v-btn 
                  :disabled="showAdd"
                  dense
                  color="blue" 
                  class="my-0"
                  block
                >
                RE-CALC
                </v-btn>
              </div>
            </div>
            <div class="col-lg-12 nopadding d-flex">
              <div class="col-sm-4 col-lg-7">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Assessed Amount"
                  @keypress="validate.isNumber($event)"
                  v-model="assessed_amount"
                  >
                </v-text-field>
              </div>
            </div>
            <div class="col-lg-12 nopadding d-flex">
              <div class="col-sm-4 col-lg-7">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Previous Disbursements"
                  @keypress="validate.isNumber($event)"
                  v-model="previous_disbursements"
                ></v-text-field>
              </div>
            </div>
            <div class="col-lg-12 nopadding d-flex mobile-column-flex">
              <div class="col-sm-4 col-lg-7 noppading-bottom">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Net Amount"
                  @keypress="validate.isNumber($event)"
                  v-model="net_amount"
                ></v-text-field>
              </div>
              <div class="col-sm-4 col-lg-5 noppading-bottom">
                <v-btn 
                  :disabled="showAdd"
                  dense
                  color="blue" 
                  class="my-0"
                  block
                >
                DISBURSE
                </v-btn>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div class="col-lg-12">
      <v-card class="default mb-5 bg-color-blue">
        <v-card-title>Disbursement (s)</v-card-title>
        <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom">
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
            <p class="nomargin">Disbursed Amt</p>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
            <p class="nomargin">Reference #</p>
          </div>
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
            <p class="nomargin">Disbursement Type</p>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
            <p class="nomargin">Issue Date</p>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
            <p class="nomargin">Tax Year</p>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
            <p class="nomargin">Due Date</p>
          </div>
          <div class="col-xs-3 col-sm-3 col-lg-3 nopadding d-flex align-center justify-center">
            <p class="nomargin">Change Reason</p>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
            <p class="nomargin">Batch ID</p>
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-12 d-flex low-margin noppading-top">
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              @keypress="validate.isNumber($event)"
              v-model="disbursed_amt"
            ></v-text-field>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              @keypress="validate.isNumber($event)"
              v-model="reference_number"
            ></v-text-field>
          </div>
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding">
            <v-select
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              v-model="disbursement_type"
              item-text="DESCRIPTION"
              item-value="REQUEST_TYPE_ID"
            ></v-select>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              @keypress="validate.isNumber($event)"
              v-model="issue_date"
            ></v-text-field>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              @keypress="validate.isNumber($event)"
              v-model="tax_year"
            ></v-text-field>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              @keypress="validate.isNumber($event)"
              v-model="due_date"
            ></v-text-field>
          </div>
          <div class="col-xs-3 col-sm-3 col-lg-3 nopadding">
            <v-select
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              v-model="disbursement_type"
              item-text="DESCRIPTION"
              item-value="REQUEST_TYPE_ID"
            ></v-select>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              @keypress="validate.isNumber($event)"
              v-model="family_size"
            ></v-text-field>
          </div>
        </div>
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
  .noppading-bottom {
    padding-bottom: 0 !important;
  }
  .noppading-top {
    padding-top: 0 !important;
  }
  .equalize-heights {
    height: 40px;
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
  .low-margin{
    margin-bottom: 20px !important;
  }
  .txtarea-width{
    width: 97.6% !important;
  }
  .line-jump-height{
    height: 64px;
  }
  .v-btn:not(.v-btn--round).v-size--default{
    padding: 0 8px !important;
  }
  .right-block-container > div{
    border-left: 1px solid #ccc;
  }
  .right-block-container .line-jump-height:first-child:first-child{
    height: 72px;
    margin-top: 12px; 
  }
  .not-displayed-lg{
    display: none;
  }
  .v-card__title{
    font-weight: bold !important;
    font-size: 1.65rem !important;
  }
  @media (max-width: 1263px) {
    .v-card__title{
      font-size: 1.25rem !important;
    }
    .not-displayed-lg{
      display: block;
      height: 0px;
      margin: 20px 15px;
    }
    .yukon-excellence-awards-assessment .right-block-container .not-displayed-lg{
      border-top: 1px solid #ccc;
    }
    .not-displayed-sx-md{
      display: none;
    }
    .right-block-container > div{
      border-left: 0px;
    }
  }
  @media (max-width: 599px){
    .not-displayed-sx{
      display: none;
    }
    .mobile-column-flex{
      flex-direction: column;
    }
    .mobile-low-margin{
      margin-bottom: 20px !important;
    }
    .mobile-top-margin{
      margin-top: 20px !important;
    }
    .right-block-container > div:nth-child(5) > div:first-child{
      padding-bottom: 0px;
    }
  }
</style>