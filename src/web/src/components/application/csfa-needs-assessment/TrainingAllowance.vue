<template>
  <div class="home training-allowance-assessment">
    <div class="col-md-12">
      <v-card class="default bg-color-blue">
        <div class="col-lg-12 nopadding d-flex flex-wrap low-margin">
          <v-card-title class="col-xs-12 col-lg-8">Assessment - Training Allowance</v-card-title>
          <div class="col-xs-12 col-lg-4 nopadding d-flex">
            <div class="col-xs-4 col-sm-4">
              <v-btn
                dense
                color="green" 
                class="my-0"
                block
                @click="save"
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
                @click="e => {
                  $store.dispatch('staGetAssessment', { funding_request_id: this.fundingRequestId });
                }"
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
                @click="e => {
                  exit();
                  $emit('close');
                }"
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
                    v-model=" assessed_date_menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    left
                    nudge-top="26"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="assessment.assessed_date?.slice(0, 10)"
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
                      :value="assessment.assessed_date?.slice(0, 10)"
                      @input="e => {
                        assessment.assessed_date = e;
                        assessed_date_menu = false;
                      }"
                      @change="refresh"
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
                        :value="assessment.effective_rate_date?.slice(0, 10)"
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
                      :value="assessment.effective_rate_date?.slice(0, 10)"
                      @input="e => {
                        assessment.effective_rate_date = e;
                        effective_rate_date_menu = false;
                      }"
                      @change="refresh"
                    ></v-date-picker>
                  </v-menu>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-menu
                      disabled
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
                          disabled
                          :value="assessment.classes_start_date?.slice(0, 10)"
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
                        disabled
                        :value="assessment.classes_start_date?.slice(0, 10)"
                        @input="e => {
                          assessment.classes_start_date = e;
                          classes_start_date_menu = false;
                        }"
                        @change="refresh"
                      ></v-date-picker>
                  </v-menu>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-menu
                      disabled
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
                          disabled
                          :value="assessment.classes_end_date?.slice(0, 10)"
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
                        disabled
                        :value="assessment.classes_end_date?.slice(0, 10)"
                        @input="e => {
                          assessment.classes_start_date = e;
                          classes_end_date_menu = false;
                        }"
                        @change="refresh"
                      ></v-date-picker>
                  </v-menu>
                </div>
              </div>
              <div class="col-xs-12 col-lg-8 nopadding">
                <div class="col-xs-12 col-lg-12">
                  <v-autocomplete
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Home Community"
                    :items="cities"
                    item-text="description"
                    item-value="id"
                    v-model="assessment.home_city_id"
                    @change="refresh"
                  ></v-autocomplete>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-autocomplete
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Institution Community"
                    :items="cities"
                    item-text="description"
                    item-value="id"
                    v-model="assessment.destination_city_id"
                    @change="refresh"
                  ></v-autocomplete>
                </div>
                <div class="col-xs-12 col-lg-6">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Dependent Count"
                    @keypress="validate.isNumber($event)"
                    v-model="assessment.dependent_count"
                    @change="refresh"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-6">
                  <v-text-field
                  v-if="institutionCode === 'LPAH'"
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Entitlement Days"
                    @keypress="validate.isNumber($event)"
                    v-model="assessment.entitlement_days"
                    @change="refresh"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-6">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="2nd Residence Rate"
                    @keypress="validate.isNumber($event)"
                    v-model="assessment.second_residence_rate"
                    @change="refresh"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div v-if="!(application.academic_year_id > 2016)" class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex low-margin flex-wrap">
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
                    label="Fraction of whole year"
                    @keypress="validate.isNumber($event)"
                    v-model="assessment.years_funded_equivalent"
                    @change="refresh"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Year Funded"
                    @keypress="validate.isNumber($event)"
                    v-model="assessment.years_funded"
                  ></v-text-field>
                </div>
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
                    @keypress="validate.isNumber($event)"
                    v-model="assessment.previous_weeks"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Previous Upgrade Weeks"
                    @keypress="validate.isNumber($event)"
                    v-model="assessment.previous_upgrade_weeks"
                  ></v-text-field>
                </div>
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
                    @keypress="validate.isNumber($event)"
                    v-model="assessment.assessed_weeks"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center not-displayed-sx not-displayed-sx-md"></div>
              </div>
              <div class="col-xs-12 col-sm-4 col-lg-4 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Allowed Weeks"
                    @keypress="validate.isNumber($event)"
                    v-model="assessment.weeks_allowed"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Weekly Amount"
                    @keypress="validate.isNumber($event)"
                    v-model="assessment.weekly_amount"
                  ></v-text-field>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-lg-4 nopadding right-block-container">
            <div class="not-displayed-lg"></div>
            <div class="col-lg-12 nopadding d-flex align-center flex-wrap">
              <div class="col-sm-6 col-lg-7 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                      disabled
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Travel Allowance"
                      @keypress="validate.isNumber($event)"
                      v-model="assessment.travel_allowance"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-lg-5">
                <v-btn 
                   
                  dense
                  color="blue" 
                  class="my-0"
                  block
                  @click="e => {
                    $store.dispatch('recalcSTA');
                  }"
                >
                RE-CALC
                </v-btn>
              </div>
            </div>
            <div class="col-lg-12 nopadding d-flex align-end flex-wrap">
              <div class="col-sm-6 col-lg-7 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Assessed Amount"
                    @keypress="validate.isNumber($event)"
                    v-model="assessment.assessed_amount"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Previous Disbursement"
                    @keypress="validate.isNumber($event)"
                    v-model="assessment.previous_disbursement"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12 low-margin mobile-noppading-bottom">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Net Amount"
                    @keypress="validate.isNumber($event)"
                    v-model="assessment.net_amount"
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
                    @click="disburse"
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
    <div class="col-lg-12">
      <v-card class="default mb-5 bg-color-blue">
        <v-card-title>Disbursement (s)</v-card-title>
        <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom">
          <div :class="[institutionCode === 'LPAH' ? 'col-xs-1 col-sm-1 col-lg-1' : 'col-xs-2 col-sm-2 col-lg-2', 'nopadding', 'd-flex', 'align-center', 'justify-center']" style="margin-right: 4px">
            <p class="nomargin">Disbursed Amt</p>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center" style="margin-right: 4px">
            <p class="nomargin">Reference #</p>
          </div>
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center" style="margin-right: 4px">
            <p class="nomargin">Disbursement Type</p>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center" style="margin-right: 4px">
            <p class="nomargin">Issue Date</p>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center" style="margin-right: 4px" v-if="institutionCode === 'LPAH'">
                <p class="nomargin" style="font-size: 14px">Tax Year</p>
            </div>
            <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center" style="margin-right: 4px" v-if="institutionCode === 'LPAH'">
                <p class="nomargin" style="font-size: 14px">Due Date</p>
            </div>
          <div :class="[institutionCode === 'LPAH' ? 'col-xs-3 col-sm-3 col-lg-3' : 'col-xs-4 col-sm-4 col-lg-4', 'nopadding', 'd-flex', 'align-center', 'justify-center']" style="margin-right: 4px">
            <p class="nomargin">Change Reason</p>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center" :style="institutionCode === 'LPAH' ? 'margin-right: 4px' : ''">
            <p class="nomargin">Batch ID</p>
          </div>
        </div>
        <div v-for="item, index in disbursements" :key="index">
          <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-top">
            <div :class="[institutionCode === 'LPAH' ? 'col-xs-1 col-sm-1 col-lg-1' : 'col-xs-2 col-sm-2 col-lg-2', 'nopadding']" style="margin-right: 6px">
              <v-text-field
                outlined
                dense
                background-color="white"
                hide-details
                @keypress="validate.isNumber($event)"
                :value="item.disbursed_amount"
                @input="e => {
                  if(isNaN(parseInt(e))) {
                    item.disbursed_amount = 0;
                  } else {
                    item.disbursed_amount = parseInt(e);
                  }
                }"
                @change="refresh"
              ></v-text-field>
            </div>
            <div class="col-xs-1 col-sm-1 col-lg-1 nopadding" style="margin-right: 6px">
              <v-text-field
                outlined
                dense
                background-color="white"
                hide-details
                @keypress="validate.isNumber($event)"
                v-model="item.transaction_number"
                @change="e => {
                  if (!item.transaction_number) {
                    item.transaction_number = null;
                    refresh();
                  }
                }"
              ></v-text-field>
            </div>
            <div class="col-xs-2 col-sm-2 col-lg-2 nopadding" style="margin-right: 6px">
              <v-select
                 
                outlined
                dense
                background-color="white"
                hide-details
                v-model="item.disbursement_type_id"
                clearable
                @change="refresh"
                :items="disbursementTypes"
                item-text="description"
                item-value="id"
              ></v-select>
            </div>
            <div class="col-xs-1 col-sm-1 col-lg-1 nopadding" style="margin-right: 6px">
              <v-menu
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
                    :value="item.issue_date?.slice(0, 10)"
                    hide-details
                    readonly
                    outlined
                    dense
                    background-color="white"
                    v-bind="attrs"
                    v-on="on"
                    clearable
                    @change=" e => {
                      $emit('refresh', true);
                      item.issue_date = null;
                    }"
                  ></v-text-field>
                </template>
                <v-date-picker
                  :value="item.issue_date?.slice(0, 10)"
                  @input="e => {
                    item.issue_date = e;
                    if (institutionCode === 'LUAA') {
                      item.due_date = e;
                    }
                    item.issue_date_menu = false;
                  }"
                  
                ></v-date-picker>
              </v-menu>
            </div>
            <div v-if="institutionCode === 'LPAH'" class="col-xs-1 col-sm-1 col-lg-1 nopadding" style="margin-right: 6px">
              <v-text-field
                outlined
                dense
                background-color="white"
                hide-details
                @keypress="validate.isNumber($event)"
                v-model="item.tax_year"
                @change="refresh"
              ></v-text-field>
            </div>
            <div v-if="institutionCode === 'LPAH'" class="col-xs-1 col-sm-1 col-lg-1 nopadding" style="margin-right: 6px">
              <v-menu
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
                    :value="item.due_date?.slice(0, 10)"
                    hide-details
                    outlined
                    dense
                    background-color="white"
                    v-bind="attrs"
                    v-on="on"
                    clearable
                    @change=" e => {
                      $emit('refresh', true);
                      item.due_date = null;
                    }"
                  ></v-text-field>
                </template>
                <v-date-picker
                  :value="item.due_date?.slice(0, 10)"
                  @input="e => {
                    item.due_date = e;
                    item.due_date_menu = false;
                  }"
                  
                ></v-date-picker>
              </v-menu>
            </div>
            <div :class="[institutionCode === 'LPAH' ? 'col-xs-3 col-sm-3 col-lg-3' : 'col-xs-4 col-sm-4 col-lg-4', 'nopadding']" style="margin-right: 6px">
              <v-select               
                outlined
                dense
                background-color="white"
                hide-details
                v-model="item.change_reason_id"
                clearable
                @change="refresh"
                :items="changeReasons"
                item-text="description"
                item-value="id"
              ></v-select>
            </div>
            <div class="col-xs-1 col-sm-1 col-lg-1 nopadding" style="margin-right: 6px">
              <v-text-field
                outlined
                dense
                background-color="white"
                hide-details
                @keypress="validate.isNumber($event)"
                v-model="item.financial_batch_id"
                @change="e => {
                  if (!item.financial_batch_id) {
                    item.financial_batch_id = null;
                    refresh();
                  }
                }"
              ></v-text-field>
            </div>
            <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex">
              <v-btn v-if="item?.id"
                  color="error ml-5" 
                  x-small 
                  fab 
                  class="my-1"
                  @click="removeDisbursement(item.id, index)"
                  >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn v-else
                  color="warning ml-5" 
                  x-small 
                  fab 
                  class="my-1"
                  @click="cancelDisburse({ index })"
                  >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom">
          <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex align-end justify-end">
              <v-btn @click="e => {
                addDisburse();
              }" color="success" class="">
                Add
              </v-btn>
          </div>
        </div>
      </v-card>
    </div>
    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>
<script>
import store from "../../../store";
import validator from "@/validator";
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "Home",
  props: {
    fundingRequestId: Number,
  },
  data() {
    return {
      assessed_date_menu: false,
      classes_start_date_menu: false,
      classes_end_date_menu: false,
      effective_rate_date_menu: false,
    }
  },
  computed: {
    ...mapGetters({
      assessment: "assessmentSTA",
      disbursements: "disbursementListSTA",
      assessment: "assessmentSTA",
      application: "selectedApplication",
      cities: "cities",
      changeReasons: "changeReasons",
      disbursementTypes: "disbursementTypes",
    }),
    institutionCode() {
      return this.application?.institution?.federal_institution_code  || "";
    }
  },
  methods: {
    ...mapActions({
      exit: "resetAssessmetSTA",
      saveSTAAssessment: "saveSTAAssessment",
      addDisburse: "addItemDisbursementListSTA",
      cancelDisburse: "cancelItemDisbursementListSTA",
      removeSTADisbursement: "removeSTADisbursement",
      refresh: "refreshSTA",
      disburse: "disburseSTA",
    }),
    save() {
      this.saveSTAAssessment(this);
    },
    removeDisbursement(id, index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this disbursement.",
        () => {
          this.removeSTADisbursement({ index, disbursement_id: id, vm: this });
        },
        () => {}
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
    store.dispatch("setCities");
    store.dispatch("setChangeReasons");
    store.dispatch("setDisbursementTypes");
    store.dispatch("staGetAssessment", { funding_request_id: this.fundingRequestId });
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
  .training-allowance-assessment .right-block-container > div{
    border-left: 0px;
  }
  .training-allowance-assessment .right-block-container{
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
  .training-allowance-assessment .right-block-container img{
    max-height: 80px !important;
    padding-right: 10px;
  }
  @media (max-width: 1263px) {
    .training-allowance-assessment .right-block-container{
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
    .training-allowance-assessment .right-block-container .not-displayed-lg{
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
