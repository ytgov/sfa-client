<template>
  <div class="home yukon-grant-assessment">
    <!-- <div class="row col-md-12 justify-space-between">
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
    </div> -->
    <div class="col-md-12">
      <v-card class="default mb-5 bg-color-blue">
        <div class="col-lg-12 nopadding d-flex flex-wrap low-margin">
          <v-card-title class="col-xs-12 col-lg-8">Assessment - Yukon Grant</v-card-title>
          <div class="col-xs-12 col-lg-4 nopadding d-flex">
            <div class="col-xs-4 col-sm-4">
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
            <div class="col-xs-4 col-sm-4">
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
            <div class="col-xs-4 col-sm-4">
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
                        :value="customAssessment.effective_rate_date?.slice(0, 10)"
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
                      @change="refreshData"
                      :value="customAssessment.effective_rate_date?.slice(0, 10)"
                      @input="e => {
                        customAssessment.effective_rate_date = e;
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
                    :value="application.program_division"
                    @input="e => {
                      if (programDivisionBack === null) {
                        programDivisionBack = application.program_division;
                      }
                      application.program_division = e;
                      customAssessment.program_division = e;
                    }"
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
                    @change="refreshData"
                    v-model="customAssessment.home_city_id"
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
                    @change="refreshData"
                    v-model="customAssessment.destination_city_id"
                    :items="cities"
                    item-text="description"
                    item-value="id"
                  ></v-select>
                </div>
                <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center not-displayed-sx"></div>
              </div>
            </div>
            <div v-if="application?.academic_year_id < 2016"  class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex low-margin flex-wrap">
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
                    v-model="customAssessment.allowed_months"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Faction of whole year"
                    v-model="customAssessment.years_funded_equivalent"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Years Funded"
                    :value="customAssessment?.read_only_data?.years_funded ?? 0"
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
                    v-model="customAssessment.living_costs"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Allowed Tuition"
                    v-model="customAssessment.allowed_tuition"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Allowed Books"
                    v-model="customAssessment.allowed_books"
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
                    v-model="customAssessment.pre_leg_amount"
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
                    disabled
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Previous Weeks"
                    :value="customAssessment?.read_only_data?.previous_weeks ?? 0"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center not-displayed-sx not-displayed-sx-md"></div>
              </div>
              <div class="col-xs-12 col-sm-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Assessed Weeks"
                    :value="customAssessment?.read_only_data?.assessed_weeks ?? 0"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center not-displayed-sx not-displayed-sx-md"></div>
              </div>
              <div class="col-xs-12 col-sm-4 col-lg-4 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    disabled
                    dense
                    background-color="white"
                    hide-details
                    label="Allowed Weeks"
                    v-model="customAssessment.weeks_allowed"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    disabled
                    dense
                    background-color="white"
                    hide-details
                    label="Weekly Amount"
                    v-model="customAssessment.weekly_amount"
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
            <div class="col-lg-12 nopadding d-flex align-center flex-wrap">
              <div class="col-sm-6 col-lg-7 nopadding d-flex flex-wrap mobile-custom-border">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Travel Allowance"
                    @keypress="validate.isNumber($event)"
                    v-model="customAssessment.travel_allowance"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    disabled
                    @keypress="validate.isNumber($event)"
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Airfare Amount"
                    v-model="customAssessment.airfare_amount"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-sm-6 col-lg-5 d-flex align-center nopadding-left mobile-custom-border-2">
                <img class="not-displayed-sx" src="../../../../public/img/curly-brackets.png">
                <v-text-field
                  @keypress="validate.isNumber($event)"
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Disbursement Period 1, 2..."
                  v-model="customAssessment.air_travel_disbursement_period"
                ></v-text-field>
              </div>
              <div class="col-sm-6 col-lg-7 low-margin">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="No. of disbursements"
                  v-model="customAssessment.disbursements_required"
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
                    v-model="customAssessment.assessment_adj_amount"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Assessed Amount"
                    v-model="customAssessment.assessed_amount"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12 low-margin mobile-noppading-bottom">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Previous Disbursement"
                    :value="customAssessment?.read_only_data?.previous_disbursement ?? 0"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-sm-4 col-lg-5 d-flex nopadding line-jump-height align-center low-margin">
                <div class="col-xs-12 col-lg-12 height-fit-content mobile-noppading-top">
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
            <div class="col-lg-12 nopadding d-flex align-center flex-wrap low-margin">
              <div class="col-sm-6 col-lg-7 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Over Award"
                    v-model="customAssessment.over_award"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Over Disburse Period"
                    v-model="customAssessment.over_award_disbursement_period"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Net Amount"
                    :value="customAssessment?.read_only_data?.net_amount ?? 0"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-sm-4 col-lg-5 d-flex nopadding line-jump-height align-center justify-center">
                <div class="col-xs-12 col-lg-12 height-fit-content d-flex justify-center">
                  <v-switch 
                  v-model="customAssessment.over_award_applied_flg"
                  label="Applied">
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
      :assessmentId="customAssessment?.id"
      :fundingRequestId="customAssessment?.funding_request_id"
      v-on:showError="showError"
      v-on:showSuccess="showSuccess"
      v-on:blockDisburse="blockDisburse"
      v-on:currentEditing="currentEditing"
      ref="disburseComponent"
      ></Disbursement>
    </div>
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
  components: {
    Disbursement,
  },
  computed: {
    ...mapGetters(["assessments", "cities", "programDivisions", "customAssessment", "selectedAssessment", "disbursements", "setIsPreviewCharged", "isPreviewCharged", "previewDisbursementList"]),
    application: function () {
      return store.getters.selectedApplication;
    },
    programDivision() {
      return this.application?.program_division;
    }
  },
  methods: {
    ObjCompare(obj1, obj2) {
      delete obj1.read_only_data;
      delete obj2.read_only_data;

      const Obj1_keys = Object.keys(obj1);
      const Obj2_keys = Object.keys(obj2);

      if (Obj1_keys.length !== Obj2_keys.length) {
        return true;
      }
      for (let k of Obj1_keys) {
        if (obj1[k] !== obj2[k]) {
          return true;
        }
      }
      return false;
    },
    cancelEdition() {
      if (this.programDivisionBack !== null) {
        delete this.customAssessment.program_division;
        this.application.program_division = this.programDivisionBack;
        this.programDivisionBack = null;
      }
      const selected = JSON.parse(JSON.stringify(this.selectedAssessment))
      store.dispatch("setCustomAssessment", { ...selected });
      const custom = JSON.parse(JSON.stringify(this.customAssessment));
      this.isChanging = this.ObjCompare({ ...custom }, { ...selected });
      this.$refs.disburseComponent.closeEditor();
    },
    addAssessment() {
      store.dispatch(
        "postAssessment",
        {
          application_id: this.application.id,
          funding_request_id: this.fundingRequestId,
          dataAssessment: { ...this.customAssessment },
          thisVal: this
        }
      );
      
    },
    updateAssessment() {
      const custom = JSON.parse(JSON.stringify(this.customAssessment));

      store.dispatch(
          "updateApplication", 
          ['program_division', this.application.program_division, this]
        );

      const filterDisbursements = this.disbursements.filter(d => d.assessment_id === custom?.id) || [];

      store.dispatch(
          "updateAssessment",
          {
            data: custom,
            disburseList: [ ...this.previewDisbursementList, ...filterDisbursements ],
            application_id: this.application.id,
            funding_request_id: custom.funding_request_id,
            assessment_id: custom.id,
            thisVal: this
          }
        );
    },
    recalcAssessment() {
      const custom = JSON.parse(JSON.stringify(this.customAssessment));

      store.dispatch(
          "recalcAssessment",
          {
            application_id: this.application.id,
            funding_request_id: custom.funding_request_id,
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
  },
  watch: {
    customAssessment: {
        deep: true,
        handler(val, oldVal) {
          const custom = JSON.parse(JSON.stringify(val));
          const selected = JSON.parse(JSON.stringify(this.selectedAssessment))

          this.isChanging = this.ObjCompare({ ...custom }, { ...selected });
        },
    },
    programDivision(val, oldVal) {
      const custom = JSON.parse(JSON.stringify(val));
      const selected = JSON.parse(JSON.stringify(this.selectedAssessment))

      if (this.programDivisionBack) {
        this.isChanging = this.ObjCompare({ ...custom }, { ...selected });
      }
    },
    disbursements: {
      deep: true,
        handler(val, oldVal) {
          
        },
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
  },
  props: {
    fundingRequestId: Number,
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
