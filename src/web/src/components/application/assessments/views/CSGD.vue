<template>
  <div class="home csgd-assessment">
    <div class="col-md-12">
      <v-card class="default mb-5 bg-color-blue">
        <div class="col-lg-12 nopadding d-flex flex-wrap low-margin">
          <v-card-title class="col-xs-12 col-lg-8">Assessment - CSGD</v-card-title>
          <div class="col-xs-12 col-lg-4 nopadding d-flex">
            <div class="col-xs-4 col-sm-4">
              <v-btn :disabled="showAdd" dense color="green" class="my-0" block>
                SAVE
              </v-btn>
            </div>
            <div class="col-xs-4 col-sm-4">
              <v-btn :disabled="showAdd" dense color="orange" class="my-0" block>
                CANCEL
              </v-btn>
            </div>
            <div class="col-xs-4 col-sm-4">
              <v-btn :disabled="showAdd" dense color="red" class="my-0" block>
                EXIT
              </v-btn>
            </div>
          </div>
        </div>
        <v-card-text class="nopadding d-flex flex-wrap">
          <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap low-margin">
            <div class="col-xs-12 col-lg-7 nopadding">
              <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex low-margin">
                <div class="col-xs-12 col-lg-4 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-menu
                      :disabled="showAdd"
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
                          :disabled="showAdd"
                          v-model="assesst_date"
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
                        v-model="assessed_date"
                        @input="assessed_date_menu = false"
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
                  <div class="col-xs-12 col-lg-12 line-jump-height"></div>
                </div>
                <div class="col-xs-12 col-lg-4 nopadding">
                  <div class="col-xs-12 col-lg-12">
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
                          v-model="application.classes_start_date"
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
                        v-model="application.classes_start_date"
                        @input="classes_start_date_menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                  <div class="col-xs-12 col-lg-12">
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
                          v-model="application.classes_start_date"
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
                        v-model="application.classes_end_date"
                        @input="classes_end_date_menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                </div>
                <div class="col-xs-12 col-lg-4 nopadding">
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Study Weeks"
                      @keypress="validate.isNumber($event)"
                      v-model="study_week"
                    ></v-text-field>
                  </div>
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
                      label="Disabled"
                      @keypress="validate.isNumber($event)"
                      v-model="disabled"
                    ></v-text-field>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-lg-5 nopadding">
              <div class="col-lg-12 nopadding d-flex align-center flex-wrap">
                <div class="col-xs-12 col-sm-6 col-lg-6 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-sm-12 col-lg-10">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Study Months"
                      @keypress="validate.isNumber($event)"
                      v-model="study_months"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-lg-10">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Allowed Months"
                      @keypress="validate.isNumber($event)"
                      v-model="travel_allowance"
                    ></v-text-field>
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
                      v-model="family_size"
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
                      v-model="no_of_dependents"
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
                      v-model="student_category"
                    ></v-text-field>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-12 col-lg-7 nopadding left-block-container">
            <div class="col-xs-12 col-lg-12 nopadding d-flex ">
              <div class="col-xs-12 col-sm-4 col-lg-4 nopadding d-flex flex-wrap not-displayed-sx"></div>
              <div class="col-xs-12 col-sm-8 col-lg-8 nopadding d-flex flex-wrap">
                <div class="col-lg-12 d-flex align-center justify-center line-jump-height">
                  <H3 class="nomargin nopadding">Last 2 CSGD Awards</H3>
                </div>
              </div>
            </div>
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
                    v-model="student_income"
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
                    v-model="spouse_income"
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
                    v-model="parent_1_income"
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
                    v-model="parent_2_income"
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
                    v-model="family_income"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-xs-12 col-lg-4 nopadding">
                <div class="col-xs-12 col-lg-12">
                  <v-menu
                    :disabled="showAdd"
                    v-model="issued_date_menu"
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
                        v-model="issued_date"
                        label="Issued Date"
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
                      v-model="issued_date"
                      @input="issued_date_menu = false"
                    ></v-date-picker>
                  </v-menu>
                </div>
                <div class="col-xs-12 col-lg-12">
                  <v-menu
                    :disabled="showAdd"
                    v-model="issued_date_menu"
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
                        v-model="issued_date"
                        label="Issued Date"
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
                      v-model="issued_date"
                      @input="issued_date_menu = false"
                    ></v-date-picker>
                  </v-menu>
                </div>
              </div>
              <div class="col-xs-12 col-lg-4 nopadding">
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
                    label="Assessed Need"
                    @keypress="validate.isNumber($event)"
                    v-model="assessed_need"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-lg-5">
                <v-btn :disabled="showAdd" dense color="blue" class="my-0" block>
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
                    v-model="assessed_amount"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-lg-12 low-margin">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="No. of Disbursements"
                    @keypress="validate.isNumber($event)"
                    v-model="no_of_disbursements"
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
                    v-model="previous_disbursement"
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
                    v-model="previous_disbursement"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-sm-4 col-lg-5 d-flex nopadding line-jump-height align-center low-margin">
                <div class="col-xs-12 col-lg-12 height-fit-content mobile-noppading-top">
                  <v-btn :disabled="showAdd" dense color="blue" class="my-0" block>
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
              v-model="reference_number"
            ></v-text-field>
          </div>
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
              v-model="due_date"
            ></v-text-field>
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
          <div class="col-xs-4 col-sm-4 col-lg-4 nopadding">
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

TET{{ test }}
  </div>
</template>
<script>
import validator from "@/validator";
import { mapState } from "vuex";
export default {
  name: "Home",
  data: () => ({
    showAdd: false,

    assessed_date: null,
    assessed_date_menu: false,

    effective_rate_date: null,
    effective_rate_date_menu: false,

    classes_start_date: null,
    classes_start_date_menu: false,

    classes_end_date: null,
    classes_end_date_menu: false,

    issued_date: null,
    issued_date_menu: false,

    allowed_weeks: null,
    disabled: null,
    study_months: null,
    travel_allowance: null,
    no_of_dependents: null,
    student_category: null,
    student_income: null,
    spouse_income: null,

    study_week: null,
    assesst_date: null,
    family_size: null,
    disbursement_type: null,
    issue_date: null,
    due_date: null,
    disbursed_amt: null,
    reference_number: null,
    previous_disbursement: null,
    no_of_disbursements: null,
    assessed_amount: null,
    assessed_need: null,
    amount: null,
    family_income: null,
    parent_1_income: null,
    parent_2_income: null,
  }),
  computed: {
    ...mapState({ application: "selectedApplication" }),
    ...mapState("csgDisabilityStore", ["test"])
  },
  async created() {
    /* this.validate = validator;
    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;
    if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {
      await store.dispatch("loadApplication", this.applicationId);
    }

    store.dispatch("setAppSidebar", true); */
  },
};
</script>
