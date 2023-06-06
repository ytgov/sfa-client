<template>
  <div class="home yukon-grant-assessment">
    <div class="row col-md-12 justify-space-between">
      <div class="col-md-4">
        <v-select
          outlined 
          dense 
          background-color="white"
          hide-details 
          label="assessments"
          v-model="assessmentSelected"
          :items="assessments"
          item-text="name_assessment"
          item-value="id"
        >
        </v-select>
      </div>
      <div class="col-md-3 pr-0">
        <v-btn 
          dense
          color="green" 
          class="my-0"
          block
        >
          <v-icon>mdi-plus</v-icon> CREATE ASSESSMENT
        </v-btn>
      </div>
    </div>

    <div class="col-md-12">
      <v-card class="default mb-5 bg-color-blue">
        <div class="col-lg-12 nopadding d-flex flex-wrap low-margin">
          <v-card-title class="col-xs-12 col-lg-8">Assessment - Yukon Grant</v-card-title>
          <div class="col-xs-12 col-lg-4 nopadding d-flex">
            <div class="col-xs-4 col-sm-4">
              <v-btn 
                
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
                    v-model="assessed_date_menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    left
                    nudge-top="26"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="currentAssessment.assessed_date?.slice(0, 10)"
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
                      :value="currentAssessment.assessed_date?.slice(0, 10)"
                      @input="e => {
                        currentAssessment.assessed_date = e;
                        assessed_date_menu = false;
                      }"
                    ></v-date-picker>
                  </v-menu>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-menu
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
                        :value="currentAssessment.effective_rate_date?.slice(0, 10)"
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
                      :value="currentAssessment.effective_rate_date?.slice(0, 10)"
                      @input="e => {
                        currentAssessment.effective_rate_date = e;
                        effective_rate_date_menu = false;
                      }"
                    ></v-date-picker>
                  </v-menu>
                </div>
                <div class="col-xs-12 col-lg-12 mobile-noppading-bottom">
                  <v-select
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Program Division"
                    v-model="currentAssessment.program_division"
                    :items="programDivisions"
                    item-text="description"
                    item-value="id"
                  ></v-select>
                </div>
              </div>
              <div class="col-xs-12 col-lg-4 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12 clss-st-date-re-order">
                  <v-menu
                      
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
                          :value="currentAssessment.classes_start_date?.slice(0, 10)"
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
                        :value="currentAssessment.classes_start_date?.slice(0, 10)"
                        @input="e => {
                          currentAssessment.classes_start_date = e;
                          classes_start_date_menu = false;
                        }"
                      ></v-date-picker>
                  </v-menu>
                </div>
                <div class="col-xs-12 col-lg-12 clss-en-date-re-order mobile-low-margin">
                  <v-menu
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
                      :value="currentAssessment.classes_end_date?.slice(0, 10)"
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
                      :value="currentAssessment.classes_end_date?.slice(0, 10)"
                      @input="e => {
                        currentAssessment.classes_end_date = e;
                        classes_end_date_menu = false;
                      }"
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
                    
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Home Community"
                    v-model="currentAssessment.home_city_id"
                    :items="cities"
                    item-text="description"
                    item-value="id"
                  ></v-select>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-select
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Destination City"
                    v-model="currentAssessment.destination_city_id"
                    :items="cities"
                    item-text="description"
                    item-value="id"
                  ></v-select>
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
                    v-model="currentAssessment.allowed_months"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Faction of whole year"
                    v-model="currentAssessment.years_funded_equivalent"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Years Funded (IS A FUNCTION)"
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
                    v-model="currentAssessment.living_costs"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Allowed Tuition"
                    v-model="currentAssessment.allowed_tuition"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Allowed Books"
                    v-model="currentAssessment.allowed_books"
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
                    v-model="currentAssessment.pre_leg_amount"
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
                    label="Previous Weeks FUNCTION"
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
                    label="Assessed Weeks FUNCTION"
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
                    v-model="currentAssessment.weeks_allowed"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Weekly Amount"
                    v-model="currentAssessment.weekly_amount"
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
                    v-model="currentAssessment.airfare_amount"
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
                  v-model="currentAssessment.air_travel_disbursement_period"
                ></v-text-field>
              </div>
              <div class="col-sm-6 col-lg-7 low-margin">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="No. of disbursements"
                  v-model="currentAssessment.disbursements_required"
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
                    v-model="currentAssessment.assessment_adj_amount"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Assessed Amount"
                    v-model="currentAssessment.assessed_amount"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12 low-margin mobile-noppading-bottom">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Previous Disbursement"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-sm-4 col-lg-5 d-flex nopadding line-jump-height align-center low-margin">
                <div class="col-xs-12 col-lg-12 height-fit-content mobile-noppading-top">
                  <v-btn 
                    
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
                    v-model="currentAssessment.over_award"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Over Disburse Period"
                    v-model="currentAssessment.over_award_disbursement_period"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Net Amount"
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
      <Disbursement
      :disbursements="[]"
      ></Disbursement>
    </div>
  </div>
</template>
<script>
import store from "../../../store";
import { mapGetters } from "vuex";
import validator from "@/validator";
import Disbursement from "./Disbursement.vue";

export default {
  name: "Home",
  data() {
    return {
      assessmentSelected: null,
      assessed_date_menu: false,
      classes_start_date_menu: false,
      classes_end_date_menu: false,
      effective_rate_date_menu: false,
    };
  },
  components: {
    Disbursement,
  },
  computed: {
    ...mapGetters(["assessments", "cities", "programDivisions"]),

    currentAssessment() {
        const assessment = this.assessmentSelected
        ? this.assessments?.find(a => a.id === this.assessmentSelected) || {}
        : this.assessments?.find(a => a.id === this.assessments?.[0].id) || {};

        return assessment;
    },
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
    
    store.dispatch("setCities");
    store.dispatch("setProgramDivisions");
    this.assessmentSelected = this.assessments?.[0].id || null;
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
