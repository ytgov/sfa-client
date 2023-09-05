<template>
  <div class="home csgft-assessment">
    <div class="col-md-12">
      <v-card class="default mb-5 bg-color-blue">
        <div class="col-lg-12 nopadding d-flex flex-wrap low-margin">
          <v-card-title class="col-xs-12 col-lg-8">Assessment - CSGFT</v-card-title>
          <div class="col-xs-12 col-lg-4 nopadding d-flex">
            <div class="col-xs-4 col-sm-4">
              <v-btn 
                :disabled="!showAdd"
                dense
                color="green" 
                class="my-0"
                block
                @click="saveAssessment"
              >
              SAVE
              </v-btn>
            </div>
            <div class="col-xs-4 col-sm-4">
              <v-btn 
                :disabled="!showAdd"
                dense
                color="orange" 
                class="my-0"
                block
                @click="close"
              >
              CANCEL
              </v-btn>
            </div>
            <div class="col-xs-4 col-sm-4">
              <v-btn 
                :disabled="!showAdd"
                dense
                color="red" 
                class="my-0"
                block
                @click="close"
              >
              EXIT
              </v-btn>
            </div>
          </div>
        </div>
        <v-card-text class="nopadding d-flex flex-wrap">
          <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap low-marginx2">
            <div class="col-xs-12 col-lg-7 nopadding">
              <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex low-margin">
                <div class="col-xs-12 col-lg-4 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <DateInput
                      label="Assessed Date"
                      :menu="assessed_date_menu"
                      v-model="csgft.assessed_date"
                    ></DateInput>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <DateInput
                      label="Effective Rate Date"
                      :menu="effective_rate_date_menu"
                      v-model="csgft.effective_rate_date"
                    ></DateInput>
                  </div>
                </div>
                <div class="col-xs-12 col-lg-4 nopadding">
                  <div class="col-xs-12 col-lg-12">
                    <DateInput
                      label="Classes Start Date"
                      :menu="classes_start_date_menu"
                      :disabled="isTotal"
                      v-model="csgft.classes_start_date"
                    ></DateInput>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <DateInput
                      label="Classes End Date"
                      :menu="classes_end_date_menu"
                      :disabled="isTotal"
                      v-model="csgft.classes_end_date"
                    ></DateInput>
                  </div>
                </div>
                <div class="col-xs-12 col-lg-4 nopadding">
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Study Week"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="csgft.study_weeks"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Assessed Weeks"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="csgft.assessed_weeks"
                    ></v-text-field>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-lg-5 nopadding">
              <div class="col-lg-12 nopadding d-flex align-center flex-wrap">
                <div class="col-xs-12 col-sm-6 col-lg-6 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-sm-12 col-lg-10">
                    
                  </div>
                  <div class="col-xs-12 col-sm-12 col-lg-10">
                    
                  </div>
                  <div class="col-xs-12 col-lg-11 line-jump-height"></div>
                </div>
                <div class="col-xs-12 col-sm-6 col-lg-6 nopadding">
                  <div class="col-xs-12 col-sm-12 col-lg-10">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Family Size"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="csgft.family_size"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-lg-10">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="No. of Dependents"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="csgft.dependent_count"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Student Category"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="csgft.category_desc"
                    ></v-text-field>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-7 col-lg-7 nopadding left-block-container">
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex low-margin">
              <div class="col-xs-12 col-lg-4 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Student Income"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="csgft.student_ln150_income"
                    ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Spouse Income"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="csgft.spouse_ln150_income"
                    ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Parent 1 Income"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="csgft.parent1_income"
                    ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Parent 2 Income"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="csgft.parent2_income"
                    ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <div class="nopadding padding-top border-top"></div>
                  <v-text-field
                      outlined
                      dense
                      class="padding-top"
                      background-color="white"
                      hide-details
                      label="Family Income"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="csgft.family_income"
                    ></v-text-field>
                </div>
              </div>
              <div class="col-xs-12 col-lg-4 nopadding">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="8 Month Phase Out Rate"
                    @keypress="validate.isNumber($event)"
                    :disabled="isTotal"
                    v-model="csgft.phase_out_rate"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Weekly Rate"
                    :disabled="isTotal"
                    v-model="csgft.weekly_rate"
                  ></v-text-field>
                </div>
              </div>
            </div>
            
          </div>
          <div class="col-xs-12 col-lg-5 nopadding right-block-container">
            <div class="not-displayed-lg"></div>
            <div class="col-lg-12 nopadding d-flex align-center flex-wrap">
              <div class="col-sm-6 col-lg-7 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Assess Need"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="csgft.csl_assessed_need"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-lg-5">
                <v-btn 
                  :disabled="!showAdd"
                  dense
                  color="blue" 
                  class="my-0"
                  block
                  @click="executeRecalc"
                >
                RE-CALC
                </v-btn>
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
                    label="Assessed Amount"
                    @keypress="validate.isNumber($event)"
                    :disabled="isTotal"
                    v-model="csgft.assessed_amount"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12 low-margin">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Number of Disbursements"
                    @keypress="validate.isNumber($event)"
                    v-model="csgft.disbursements_required"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Previous Disbursement"
                    @keypress="validate.isNumber($event)"
                    :disabled="isTotal"
                    v-model="csgft.previous_disbursement"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12 low-margin mobile-noppading-bottom">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Net Amount"
                    @keypress="validate.isNumber($event)"
                    :disabled="isTotal"
                    v-model="csgft.net_amount"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-sm-4 col-lg-5 d-flex nopadding line-jump-height align-center low-margin">
                <div class="col-xs-12 col-lg-12 height-fit-content mobile-noppading-top">
                  <v-btn 
                    :disabled="!showAdd"
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
        </v-card-text>
      </v-card>
    </div>
    <DisbursementList
      :disbursementList="csgft_disbursement"
      :disbursementRemove="'removeCsgftDisbursement'"
    >
    </DisbursementList>
  </div>
</template>
<script>
import store from "../../../store";
import validator from "@/validator";
import DateInput from "../../DateInput.vue"
import DisbursementList from "./DisbursementList.vue";
import {mapGetters, mapState} from "vuex";
import {ref} from "vue";

export default {
  name: "csgft-assessment",
  props: ["request_type_id", "fundingRequestId"],
  components: {
    DateInput,
    DisbursementList
  },
  setup() {
    const isTotal = ref(true);
    const showAdd = ref(true);
    const blockDisbursement = ref(true);
    const issue_date_menu = ref(false);
    const due_date_menu = ref(false);
    const effective_rate_date_menu = ref(false);
    const assessed_date_menu = ref(false);
    const classes_start_date_menu = ref(false);
    const classes_end_date_menu = ref(false);

    return {
      isTotal,
      showAdd,
      blockDisbursement,
      issue_date_menu,
      due_date_menu,
      effective_rate_date_menu,
      assessed_date_menu,
      classes_start_date_menu,
      classes_end_date_menu,
    }
  },
  computed: {
    ...mapState({
      csgft: state => state.csgft.csgft,
      csgft_disbursement: state => state.csgft.csgft_disbursement
    }),
    ...mapGetters([
        "changeReasons",
        "disbursementTypes",
        "csgft_get_disbursements",
    ]),
    application: function () {
      return store.getters.selectedApplication;
    }
  },
  watch: {
    csgft_disbursement: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (newVal.length === 0) {
          store.dispatch("setDefaultCsgftDisbursement");
        }
      }
    }
  },
  methods: {
    showSuccess(mgs) {
      this.$emit("showSuccess", mgs);
    },
    showError(mgs) {
      this.$emit("showError", mgs);
    },
    close() {
      this.$emit("close");
    },
    saveAssessment() {
      store.dispatch("saveCsgftAssessment", this);
    },
    executeRecalc() {
      store.dispatch("getCsgftRecalc");
    },
    executeDisburse() {
      store.dispatch("getCsgftDisburse");
    },
  },
  async created() {
    const frId = this.$props.fundingRequestId;
    console.log(frId);
    this.validate = validator;
    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;
    if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {
      await store.dispatch("loadApplication", this.applicationId);
    }
    store.dispatch("setAppSidebar", true);
    store.dispatch("getCsgftNewInstance", frId);
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
  .txtarea-width{
    width: 97.6% !important;
  }
  .line-jump-height{
    height: 64px;
  }
  .v-btn:not(.v-btn--round).v-size--default{
    padding: 0 8px !important;
  }
  .csgft-assessment .right-block-container > div{
    border-left: 0px;
  }
  .csgft-assessment .right-block-container{
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
  .csgft-assessment .right-block-container img{
    max-height: 80px !important;
    padding-right: 10px;
  }
  @media (max-width: 1263px) {
    .csgft-assessment .right-block-container{
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
    .csgft-assessment .right-block-container .not-displayed-lg{
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
