<template>
  <div class="home yukon-grant-assessment">
    <h1>Funding Status</h1>
    <div class="col-md-12">
      <v-card class="default mb-5 bg-color-blue" v-for="item, index in application.funding_requests" :key="index">
        <div class="col-lg-12 nopadding d-flex flex-wrap low-margin">
          <v-card-title class="col-xs-12 col-lg-8">Assessment - Yukon Grant</v-card-title>
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
        <v-card-text class="nopadding d-flex flex-wrap">
          <div class="col-xs-12 col-lg-8 nopadding left-block-container">
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex low-margin">
              <div class="col-xs-12 col-lg-4 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12">
                  <v-menu
                    :disabled="showAdd"
                    v-model="assesst_date_menu"
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
                        v-model="assesst_date"
                        label="Assesst Date"
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
                      v-model="assesst_date"
                      @input="assesst_date_menu = false"
                    ></v-date-picker>
                  </v-menu>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-menu
                    :disabled="showAdd"
                    v-model="effective_rate_date_menu"
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
                        v-model="effective_rate_date"
                        label="Effective Rate Date"
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
                      v-model="effective_rate_date"
                      @input="effective_rate_date_menu = false"
                    ></v-date-picker>
                  </v-menu>
                </div>
                <div class="col-xs-12 col-lg-12 mobile-noppading-bottom">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Program Division"
                    @keypress="validate.isNumber($event)"
                    v-model="program_division"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-xs-12 col-lg-4 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12 clss-st-date-re-order">
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
                <div class="col-xs-12 col-lg-12 clss-en-date-re-order mobile-low-margin">
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
                <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center help-txt-re-order mobile-noppading-top">
                  <p class="nomargin-bottom">1 = Quarters, 2 = Semesters</p>
                </div>
              </div>
              <div class="col-xs-12 col-lg-4 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12">
                  <v-select
                    :disabled="showAdd"
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Home Community"
                    v-model="home_community"
                    item-text="DESCRIPTION"
                    item-value="REQUEST_TYPE_ID"
                  ></v-select>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Destination City"
                    v-model="batch_id"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center not-displayed-sx"></div>
              </div>
            </div>
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex low-margin flex-wrap">
              <div class="col-xs-12 col-lg-12 nopadding">
                <v-card-title>Pre Legislation Method</v-card-title>
              </div>
              <div class="col-xs-12 col-sm-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Allowed Months"
                    @keypress="validate.isNumber($event)"
                    v-model="allowed_months"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Faction of whole year"
                    @keypress="validate.isNumber($event)"
                    v-model="faction_of_whole_year"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Years Funded"
                    @keypress="validate.isNumber($event)"
                    v-model="years_funded"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Living Costs"
                    @keypress="validate.isNumber($event)"
                    v-model="living_costs"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Allowed Tuition"
                    @keypress="validate.isNumber($event)"
                    v-model="allowed_tuition"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Allowed Books"
                    @keypress="validate.isNumber($event)"
                    v-model="allowed_books"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-lg-4 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Amount"
                    @keypress="validate.isNumber($event)"
                    v-model="amount"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center not-displayed-sx"></div>
                <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center not-displayed-sx"></div>
              </div>
            </div>
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex low-margin flex-wrap">
              <div class="col-xs-12 col-lg-12 nopadding">
                <v-card-title>Post Legislation Method</v-card-title>
              </div>
              <div class="col-xs-12 col-sm-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Previous Weeks"
                    @keypress="validate.isNumber($event)"
                    v-model="previous_weeks"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center not-displayed-sx not-displayed-sx-md"></div>
              </div>
              <div class="col-xs-12 col-sm-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Assessed Weeks"
                    @keypress="validate.isNumber($event)"
                    v-model="assessed_weeks"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center not-displayed-sx not-displayed-sx-md"></div>
              </div>
              <div class="col-xs-12 col-sm-4 col-lg-4 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Allowed Weeks"
                    @keypress="validate.isNumber($event)"
                    v-model="allowed_weeks"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Weekly Amount"
                    @keypress="validate.isNumber($event)"
                    v-model="weekly_amount"
                  ></v-text-field>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-lg-4 nopadding right-block-container">
            <div class="not-displayed-lg"></div>
            <div class="col-lg-12 nopadding d-flex line-jump-height">
              <div class="col-sm-4 col-lg-7 not-displayed-sx"></div>
              <div class="col-xs-12 col-sm-4 col-lg-5">
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
            <div class="col-lg-12 nopadding d-flex align-center flex-wrap">
              <div class="col-sm-6 col-lg-7 nopadding d-flex flex-wrap mobile-custom-border">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Travel Allowance"
                    @keypress="validate.isNumber($event)"
                    v-model="travel_allowance"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Airfare Amount"
                    @keypress="validate.isNumber($event)"
                    v-model="airfare_amount"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-sm-6 col-lg-5 d-flex align-center nopadding-left mobile-custom-border-2">
                <img class="not-displayed-sx" src="../../../../public/img/curly-brackets.png">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Disbursement Period 1, 2..."
                  @keypress="validate.isNumber($event)"
                  v-model="disbursement_period"
                ></v-text-field>
              </div>
              <div class="col-sm-6 col-lg-7 low-margin">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="No. of disbursements"
                  @keypress="validate.isNumber($event)"
                  v-model="no_of_disbursements"
                ></v-text-field>
              </div>
            </div>
            <div class="col-lg-12 nopadding d-flex align-end flex-wrap">
              <div class="col-sm-6 col-lg-7 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Adjust Amount"
                    @keypress="validate.isNumber($event)"
                    v-model="adjust_amount"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Assessed Amount"
                    @keypress="validate.isNumber($event)"
                    v-model="assessed_amount"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12 low-margin mobile-noppading-bottom">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Previous Disbursement"
                    @keypress="validate.isNumber($event)"
                    v-model="previous_disbursement"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-sm-4 col-lg-5 d-flex nopadding line-jump-height align-center low-margin">
                <div class="col-xs-12 col-lg-12 height-fit-content mobile-noppading-top">
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
            <div class="col-lg-12 nopadding d-flex align-center flex-wrap low-margin">
              <div class="col-sm-6 col-lg-7 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Over Award"
                    @keypress="validate.isNumber($event)"
                    v-model="over_award"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Over Disburse Period"
                    @keypress="validate.isNumber($event)"
                    v-model="over_disburse_period"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
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
              </div>
              <div class="col-sm-4 col-lg-5 d-flex nopadding line-jump-height align-center justify-center">
                <div class="col-xs-12 col-lg-12 height-fit-content d-flex justify-center">
                  <v-switch label="Applied">
                  </v-switch>
                </div>
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
  .nopadding-left {
    padding-left: 0 !important;
  }
  .noppading-right {
    padding-right: 0 !important;
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
  .not-displayed-lg{
    display: none;
  }
  .v-card__title{
    font-weight: bold !important;
    font-size: 1.65rem !important;
  }
  .height-fit-content{
    height: fit-content !important;
  }
  .justify-end{
    justify-content: flex-end !important;
  }
  .justify-start{
    justify-content: flex-start !important;
  }
  .justify-center{
    justify-content: center !important;
  }
  .yukon-grant-assessment .right-block-container img{
    max-height: 80px !important;
    padding-right: 10px;
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
    .yukon-grant-assessment .right-block-container .not-displayed-lg{
      border-top: 1px solid #ccc;
    }
    .not-displayed-sx-md,
    .d-flex.not-displayed-sx-md{
      display: none;
    }
    .not-displayed-sx-md,
    .d-flex.not-displayed-sx-md{
      height: 0px !important;
      padding: 0px !important;
    }
  }
  @media (max-width: 599px){
    .mobile-custom-border{
      padding: 10px !important;
      margin: 10px;
      border: 2px solid #ccc;
      border-radius: 5px;;
    }
    .mobile-custom-border-2{
      padding: 10px !important;
      margin: 10px;
      border: 2px solid #ccc;
      border-radius: 5px;;
    }
    .mobile-custom-border::after{
      content: '';
      position: relative;
      left: 43%;
      top: 16px;
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-top: 15px solid #ccc;
      clear: both;
    }
    .gray-arrow-down{
      width: 0; 
      height: 0; 
      border-left: 20px solid #ccc;
      border-right: 20px solid #ccc;
    }
    .nopadding-left{
      padding-left: 14px !important;
    }
    .mobile-noppading-top{
      padding-top: 0px !important;
    }
    .mobile-noppading-bottom{
      padding-bottom: 0px !important;
    }
    .not-displayed-sx,
    .d-flex.not-displayed-sx{
      display: none;
    }
    .not-displayed-sx,
    .d-flex.not-displayed-sx{
      height: 0px !important;
      padding: 0px !important;
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
    .clss-st-date-re-order{
      order: 2;
    }
    .clss-en-date-re-order{
      order: 3;
    }
    .help-txt-re-order{
      order: 1;
    }
  }
</style>
