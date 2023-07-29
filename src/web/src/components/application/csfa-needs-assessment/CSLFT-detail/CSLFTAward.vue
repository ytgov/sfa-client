<template>
  <div class="home cslft-award-assessment">
    <v-card class="default mb-5 bg-color-blue">
      <v-card-text class="nopadding d-flex flex-wrap top-margin low-margin">
        <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
          <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap low-marginx2">
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-7 col-lg-7 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Total Study Cost"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="cslft_study_cost_total"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Total Resources"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="cslft_get_resources_total"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Assessed Need"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="cslft_assess_needed"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="60% of Assessed Need"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="cslft_assess_needed_sixty_pct"
                    ></v-text-field>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-5 col-lg-5 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Total Grant"
                      @keypress="validate.isNumber($event)"
                      v-model="cslft.total_grant_awarded"
                    ></v-text-field>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Max. Allowable"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="cslft_max_allowable"
                    ></v-text-field>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Calculated Award"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="cslft_calculated_award"
                    ></v-text-field>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-7 col-lg-7 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                </div>
                <div class="col-xs-12 col-sm-5 col-lg-5 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-btn 
                        dense
                        color="blue" 
                        class="my-0"
                        block
                        @click="executeRecalc"
                      >
                      RE-CALC
                    </v-btn>
                  </div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-7 col-lg-7 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Requested Amount"
                      @keypress="validate.isNumber($event)"
                      v-model="cslft.csl_request_amount"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Outstanding Overaward"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="cslft.recovered_overaward"
                    ></v-text-field>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-5 col-lg-5 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Returned/Uncashable Cert"
                      @keypress="validate.isNumber($event)"
                      v-model="cslft.returned_uncashable_cert"
                    ></v-text-field>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Actual Award"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="cslft.assessed_amount"
                    ></v-text-field>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-7 col-lg-7 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                </div>
                <div class="col-xs-12 col-sm-5 col-lg-5 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12">
                    <v-btn 
                        dense
                        color="blue" 
                        class="my-0"
                        block
                        @click="executeDisburse"
                      >
                      DISBURSE
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-select
                      :disabled="showAdd"
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Non-Award Reason"
                      v-model="cslft.csl_non_reason_id"
                      :items="cslReasonNonAward"
                      item-text="name"
                      item-value="id"
                    ></v-select>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-select
                      :disabled="showAdd"
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Over-Award Reason"
                      v-model="cslft.csl_over_reason_id"
                      :items="cslReasonOverAward"
                      item-text="name"
                      item-value="id"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Previous Cert"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="cslft.previous_cert"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Previous Disbursements"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="cslft.previous_disbursement"
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
                      :disabled="isTotal"
                      v-model="cslft.net_amount"
                    ></v-text-field>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <div class="col-lg-12">
      <v-card class="default mb-5 bg-color-blue">
        <v-card-title>Disbursement (s)</v-card-title>
        <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom">
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
            <p class="nomargin">Reference #</p>
          </div>
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
            <p class="nomargin">Disbursed Amt</p>
          </div>
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
            <p class="nomargin">Disbursement Type</p>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
            <p class="nomargin">Due Date</p>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
            <p class="nomargin">Issue Date</p>
          </div>
          <div class="col-xs-4 col-sm-4 col-lg-4 nopadding d-flex align-center justify-center">
            <p class="nomargin">Change Reason</p>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
            <p class="nomargin">Batch ID</p>
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-12 d-flex low-margin noppading-top">
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              @keypress="validate.isNumber($event)"
              v-model="cslft_disbursement.transaction_number"
            ></v-text-field>
          </div>
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              @keypress="validate.isNumber($event)"
              v-model="cslft_disbursement.disbursed_amount"
            ></v-text-field>
          </div>
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding">
            <v-select
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              v-model="cslft_disbursement.disbursement_type_id"
              :items="disbursementTypes"
              item-text="description"
              item-value="id"
            ></v-select>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
            <v-menu
              :disabled="showAdd"
              v-model="due_date_menu"
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
                  v-model="due_date"
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
                v-model="cslft_disbursement.due_date"
                @input="due_date_menu = false"
              ></v-date-picker>
            </v-menu>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
            <v-menu
              :disabled="showAdd"
              v-model="issue_date_menu"
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
                  v-model="cslft_disbursement_issue_date_formatted"
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
                v-model="cslft_disbursement.issue_date"
                @input="issue_date_menu = false"
              ></v-date-picker>
            </v-menu>
          </div>
          <div class="col-xs-4 col-sm-4 col-lg-4 nopadding">
            <v-select
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              v-model="cslft_disbursement.change_reason_id"
              :items="changeReasons"
              item-text="description"
              item-value="id"
            ></v-select>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              @keypress="validate.isNumber($event)"
              v-model="cslft_disbursement.financial_batch_id"
            ></v-text-field>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import validator from "@/validator";
import {mapGetters, mapState} from "vuex";
import {ref} from "vue";
export default {
  name: "cslft-award",
  setup() {
    const isTotal = ref(true);
    const showAdd = ref(true);

    return {
      isTotal,
      showAdd,
    }
  },
  computed: {
    ...mapState({
      cslft: state => state.cslft.cslft,
      cslft_disbursement: state => state.cslft.cslft_disbursement
    }),
    ...mapGetters([
        "cslft_study_cost_total",
        "cslft_application_academic_year_id",
        "cslft_get_resources_total",
        "cslft_assess_needed",
        "cslft_assess_needed_sixty_pct",
        "cslft_max_allowable",
        "cslft_calculated_award",
        "cslReasonNonAward",
        "cslReasonOverAward",
        "changeReasons",
        "disbursementTypes",
        "cslft_disbursement_issue_date_formatted"
    ]),
    application: function () {
      return store.getters.selectedApplication;
    }
  },
  methods: {
    executeRecalc() {
      store.dispatch("getCslftRecalc");
    },
    executeDisburse() {
      store.dispatch("getCslftDisburse");
    }
  },
  watch: {
    cslft_calculated_award: {
      immediate: true,
      handler(newValue) {
        console.log(newValue);
        store.dispatch("setCslftCalculatedAward", newValue);
      }
    }
  },
  async created() {
    this.validate = validator;
    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;
    if (this.applicationId !== storeApp.HISTORY_DETAIL_ID) {
      await store.dispatch("loadApplication", this.applicationId);
    }
    store.dispatch("setCslReasonNonAward");
    store.dispatch("setCslReasonOverAward");
    store.dispatch("setDisbursementTypes");
    store.dispatch("setChangeReasons");
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
  .noppading-bottom,
  .nopadding-bottom {
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
  .padding-top{
    padding-top: 17px !important;
  }
  .equalize-heights {
    height: 40px;
  }
  .border-top {
    border-top: 3px solid #ccc;
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
  .low-marginx2{
    margin-bottom: 40px !important;
  }
  .top-margin{
    margin-top: 20px !important;
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
  .cslft-award-assessment .right-block-container > div{
    border-left: 0px;
  }
  .cslft-award-assessment .right-block-container{
    border-left: 1px solid #ccc;
    margin-bottom: 20px;
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
  .cslft-award-assessment .right-block-container img{
    max-height: 80px !important;
    padding-right: 10px;
  }
  @media (max-width: 1263px) {
    .cslft-award-assessment .right-block-container{
      border-left: 0px;
    }
    .v-card__title{
      font-size: 1.25rem !important;
    }
    .not-displayed-lg{
      display: block;
      height: 0px;
      margin: 20px 15px;
    }
    .cslft-award-assessment .right-block-container .not-displayed-lg{
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
