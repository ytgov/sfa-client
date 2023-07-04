<template>
  <div class="home yukon-excellence-awards-assessment">
    <div class="col-lg-12">
      <v-card class="default mb-5 bg-color-blue">
        <div class="col-lg-12 nopadding d-flex flex-wrap low-margin">
          <v-card-title class="col-xs-12 col-lg-8">Assessment - Yukon Excellence Awards</v-card-title>
          <div class="col-xs-12 col-lg-4 nopadding d-flex">
            <div class="col-xs-4 col-sm-4 ">
              <v-btn 
                :disabled="!isPreviewCharged && !isChanging && !editingDisburse"
                dense
                color="green" 
                class="my-0"
                block
                @click="e => {
                  if (!customAssessment?.id) {
                    if (isPreviewCharged) {
                      insertAssessmentWithDisbursement();
                    } else {
                      addAssessment();
                    }
                  } else {
                    updateAssessment();
                  }
                }"
              >
                SAVE
              </v-btn>
            </div>
            <div class="col-xs-4 col-sm-4 ">
              <v-btn 
                :disabled="!isPreviewCharged && !isChanging && !editingDisburse"
                dense
                color="orange" 
                class="my-0"
                block
                @click=" e => {
                  if (!customAssessment?.id) {
                    $emit('close');
                    $store.dispatch('setIsPreviewCharged', false);
                  } else {
                      $store.dispatch('setIsPreviewCharged', false);
                      cancelEdition();
                  }
                }"
              >
                CANCEL
              </v-btn>
            </div>
            <div class="col-xs-4 col-sm-4 ">
              <v-btn 
                @click="$emit('close')"
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
                  :disabled="false"
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
                      :disabled="false"
                      :value="customAssessment.assessed_date?.slice(0, 10)"
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
                      @change="refreshData"
                      :value="customAssessment.assessed_date?.slice(0, 10)"
                      @input="e => {
                        customAssessment.assessed_date = e;
                        assessed_date_menu = false;
                      }"
                  ></v-date-picker>
                </v-menu>
              </div>
            </div>
            <div class="col-lg-12 nopadding d-flex">
              <div class="col-sm-4 col-lg-4">
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
                      :value="customAssessment.classes_start_date?.slice(0, 10)"
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
                    @change="refreshData"
                    :value="customAssessment.classes_start_date?.slice(0, 10)"
                    @input="e => {
                      customAssessment.classes_start_date = e;
                      classes_start_date_menu = false;
                    }"
                  ></v-date-picker>
                </v-menu>
              </div>
            </div>
            <div class="col-lg-12 nopadding d-flex mobile-column-flex">
              <div class="col-lg-4">
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
                    :value="customAssessment.classes_end_date?.slice(0, 10)"
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
                    @change="refreshData"
                    :value="customAssessment.classes_end_date?.slice(0, 10)"
                    @input="e => {
                      customAssessment.classes_end_date = e;
                      classes_end_date_menu = false;
                    }"
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
                  readonly
                  :value="application.calculated_data.yea_earned"
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
                  readonly
                  :value="application.calculated_data.yea_used"
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
                  readonly
                  @keypress="validate.isNumber($event)"
                  :value="selectedStudent.yea_expiry_date?.slice(0, 10)"
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
                  :value="application.yea_tot_receipt_amount ?? 0"
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
                  readonly
                  @keypress="validate.isNumber($event)"
                  :value="(application.calculated_data.yea_earned - application.calculated_data.yea_used)"
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
                  :value="selectedFunding.yea_request_amount"
                ></v-text-field>
              </div>
              <div class="col-sm-4 col-lg-5">
                <v-btn 
                  @click="recalcAssessment"
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
                    disabled
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Assessed Amount"
                    v-model="customAssessment.assessed_amount"
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
                  :value="customAssessment?.read_only_data?.previous_disbursement ?? 0"
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
                  :value="customAssessment?.read_only_data?.net_amount ?? 0"
                ></v-text-field>
              </div>
              <div class="col-sm-4 col-lg-5 noppading-bottom">
                <v-btn 
                    :disabled="isDisburseBlocked"
                    @click="e => {
                      
                        if (!isDisburseBlocked) {
                          disburse();
                        }
                      
                    }"
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
    <Disbursement
      :assessmentId="customAssessment?.id"
      :fundingRequestId="customAssessment?.funding_request_id"
      v-on:showError="showError"
      v-on:showSuccess="showSuccess"
      v-on:blockDisburse="blockDisburse"
      v-on:currentEditing="currentEditing"
      ref="disburseComponent"
      ></Disbursement>
      <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>
<script>
import store from "../../../store";
import { mapGetters } from "vuex";
import validator from "@/validator";
import Disbursement from "./Disbursement.vue";
export default {
  name: "Home",
  components: {
    Disbursement,
  },
  data() {
    return {
      assessmentSelected: null,
      assessed_date_menu: false,
      classes_start_date_menu: false,
      classes_end_date_menu: false,
      effective_rate_date_menu: false,
      mensaje: "",
      isChanging: false,
      isDisburseChange: false,
      programDivisionBack: null,
      isDisburseBlocked: false,
      editingDisburse: false,
    };
  },
  computed: {
    ...mapGetters(["selectedStudent", "assessments", "cities", "programDivisions", "customAssessment", "selectedAssessment", "disbursements", "setIsPreviewCharged", "isPreviewCharged", "previewDisbursementList", "selectedFundingId"]),
    application: function () {
      return store.getters.selectedApplication;
    },
    programDivision() {
      return this.application?.program_division;
    },
    selectedFunding: function () {
      return this.application.funding_requests.find(item => item.id === this.selectedFundingId)
    }
  },
  methods: {
    refreshData() {
      const previewDisburseAmountsList = this.previewDisbursementList?.map(d => {
        return Number(d.disbursed_amount);
      }) || [];

      const disburseFilter = this.disbursements?.filter(d => d.assessment_id === this.customAssessment?.id )
      let disburseAmountsList = [];
      
      if (disburseFilter?.length) {
        disburseAmountsList = disburseFilter.map(d => {
          return Number(d.disbursed_amount);
        }) || [];
      }
      
      

      store.dispatch("refreshAssessment", { 
        application_id: this.application.id, 
        data: { ...this.customAssessment },
        disburseAmountList: [ ...previewDisburseAmountsList, ...disburseAmountsList ],
      });
    },
    recalcAssessment() {
      const custom = JSON.parse(JSON.stringify(this.customAssessment));
      console.log("🚀 ~ file: YukonExcellenceAwards.vue:391 ~ recalcAssessment ~ custom.funding_request_id:", custom.funding_request_id)
      store.dispatch(
          "recalcAssessment",
          {
            application_id: this.application.id,
            funding_request_id: this.selectedFundingId,
            assessment_id: custom.id,
          }
        );
    },
    disburse() {
      store.dispatch(
        "previewDisbursements",
        {
          application_id: this.application.id,
          assessment_id: this.customAssessment?.id || 0,
          data: { ...this.customAssessment },
          thisVal: this
        }
      );
    },
    blockDisburse(value) {
      if (!value) {
        this.refreshData();
      }
      this.editingDisburse = value;
    },
    currentEditing(value) {
      this.isDisburseBlocked = value;
    },
    insertDisburse() {
      if(this.isPreviewCharged && this.previewDisbursementList.length) {
        store.dispatch("postDisbursement", {
        data: [ ...this.previewDisbursementList ],
        funding_request_id: this.customAssessment.funding_request_id,
        application_id: this.application.id, 
        isList: "disburseList",
        emiter: this
      });
      } else {
        !this.previewDisbursementList.length
        ? this.showError("No disburse in list")
        : this.showError("Something went wrong ")
      }
    },
    insertAssessmentWithDisbursement() {
      if(this.isPreviewCharged && this.previewDisbursementList.length) {
        store.dispatch(
          "postAssessmentWithDisbursements",
          {
            application_id: this.application.id,
            funding_request_id: this.fundingRequestId,
            dataDisburse: [ ...this.previewDisbursementList ],
            dataAssessment: { ...this.customAssessment },
            thisVal: this
          }
        );
      } else {
        !this.previewDisbursementList.length
        ? this.showError("No disburse in list")
        : this.showError("Something went wrong ")
      }
    },
    showSuccess(mgs) {
      this.$emit("showSuccess", mgs);
    },
    showError(mgs) {
      this.$emit("showError", mgs);
    },
    showAlert() {
      this.$refs.confirm.show(
        "Need to save assessment",
        "You have to save the assessment to add the disbursement",
        () => {
          
        },
        () => {},
        false,
        "Accept"
      );
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
    console.log("🚀 ~ file: YukonExcellenceAwards.vue:318 ~ application:", storeApp);
    // console.log("🚀 ~ file: YukonExcellenceAwards.vue:374 ~ created ~ this.funding:", selectedFunding)
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