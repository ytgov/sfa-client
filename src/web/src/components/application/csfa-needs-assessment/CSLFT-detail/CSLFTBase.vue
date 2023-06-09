<template>
  <div class="home cslft-base-assessment">
    <v-card class="default mb-5 bg-color-blue">
      <v-card-text class="nopadding d-flex flex-wrap top-margin low-margin">
        <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
          <div class="col-xs-12 col-lg-12 nopadding">
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
              <div class="col-xs-12 col-sm-4 col-lg-3 nopadding">
                <div class="col-xs-12 col-lg-12">
                  <v-select
                    :disabled="showAdd"
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Assessment Type"
                    :items="assessmentTypes"
                    v-model="cslft.base.assessed_type"
                    item-text="description"
                    item-value="id"
                  ></v-select>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-lg-3 nopadding xs-md-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-menu
                      :disabled="showAdd"
                      v-model="cslft.base.assessed_date_menu"
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
                          v-model="cslft.base.assessed_date"
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
                        v-model="cslft.base.assessed_date"
                        @input="cslft.base.assessed_date_menu = false"
                      ></v-date-picker>
                  </v-menu>
                </div>
              </div>
              <div class="col-xs-12 col-sm-1 col-lg-1 nopadding not-displayed-sx">
              </div>
              <div class="col-xs-12 col-sm-3 col-lg-3 nopadding xs-md-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="No. of Dependents"
                    @keypress="validate.isNumber($event)"
                    v-model="cslft.base.no_dependents"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-xs-12 col-lg-1 nopadding not-displayed-sx-md">
              </div>
              <div class="col-xs-12 col-lg-1 nopadding not-displayed-sx-md">
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
            <div class="col-xs-12 col-lg-12 nopadding">
              <v-card-title class="nopadding-bottom" >Pre-study Period</v-card-title>
            </div>
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
              <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-menu
                        :disabled="showAdd"
                        v-model="cslft.base.pre_study_start_date_menu"
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
                          v-model="cslft.base.pre_study_start_date"
                          label="Start Date"
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
                        v-model="cslft.base.pre_study_start_date"
                        @input="cslft.base.pre_study_start_date_menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-menu
                        :disabled="showAdd"
                        v-model="cslft.base.pre_study_end_date_menu"
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
                          v-model="cslft.base.pre_study_end_date"
                          label="End Date"
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
                        v-model="cslft.base.pre_study_end_date"
                        @input="cslft.base.pre_study_end_date_menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-autocomplete
                      :disabled="showAdd"
                      clearable
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Pre-Study Province"
                      :items="provinces"
                      v-model="cslft.base.pre_study_province"
                      item-text="description"
                      item-value="id"
                    ></v-autocomplete>
                  </div>
                  <div class="col-xs-12 col-lg-12 nopadding d-flex">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Pre-Study Wks"
                        @keypress="validate.isNumber($event)"
                        v-model="cslft.base.pre_study_wks"
                      ></v-text-field>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Pre-Study Mon"
                        @keypress="validate.isNumber($event)"
                        v-model="cslft.base.pre_study_mon"
                      ></v-text-field>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 nopadding">
                    <div class="col-xs-12 col-sm-8 col-lg-8">
                      <v-select
                        :disabled="showAdd"
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Accommodation Type"
                        :items="accommodationTypes"
                        v-model="cslft.base.pre_study_accommodation_type"
                        item-text="description"
                        item-value="id"
                      ></v-select>
                    </div>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-select
                        :disabled="showAdd"
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Pre-Study Classification"
                        :items="cslClassifications"
                        v-model="cslft.base.pre_study_classification"
                        item-text="description"
                        item-value="id"
                      ></v-select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
            <div class="col-xs-12 col-lg-12 nopadding">
              <v-card-title class="nopadding-bottom" >Study Period</v-card-title>
            </div>
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
              <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-menu
                        :disabled="showAdd"
                        v-model="cslft.base.study_start_date_menu"
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
                          v-model="cslft.base.study_start_date"
                          label="Start Date"
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
                        v-model="cslft.base.study_start_date"
                        @input="cslft.base.study_start_date_menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-menu
                        :disabled="showAdd"
                        v-model="cslft.base.study_end_date_menu"
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
                          v-model="cslft.base.study_end_date"
                          label="End Date"
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
                        v-model="cslft.base.study_end_date"
                        @input="cslft.base.study_end_date_menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-autocomplete
                      :disabled="showAdd"
                      clearable
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Study Province"
                      :items="provinces"
                      v-model="cslft.base.study_province"
                      item-text="description"
                      item-value="id"
                    ></v-autocomplete>
                  </div>
                  <div class="col-xs-12 col-lg-12 nopadding d-flex">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Study Weeks"
                        @keypress="validate.isNumber($event)"
                        v-model="cslft.base.study_weeks"
                      ></v-text-field>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Study Months"
                        @keypress="validate.isNumber($event)"
                        v-model="cslft.base.study_months"
                      ></v-text-field>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 nopadding">
                    <div class="col-xs-12 col-sm-8 col-lg-8">
                      <v-select
                        :disabled="showAdd"
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Accommodation Type"
                        :items="accommodationTypes"
                        v-model="cslft.base.study_accommodation_type"
                        item-text="description"
                        item-value="id"
                      ></v-select>
                    </div>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                      <v-select
                        :disabled="showAdd"
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Study Classification"
                        :items="cslClassifications"
                        v-model="cslft.base.study_classification"
                        item-text="description"
                        item-value="id"
                      ></v-select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
              <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-autocomplete
                      :disabled="showAdd"
                      clearable
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Study Area"
                      :items="studyAreas"
                      v-model="cslft.base.study_area"
                      item-text="description"
                      item-value="id"
                    ></v-autocomplete>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-select
                      :disabled="showAdd"
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Study Program"
                      :items="programs"
                      v-model="cslft.base.study_program"
                      item-text="description"
                      item-value="id"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 nopadding d-flex">
                    <div class="col-xs-12 col-sm-6 col-lg-6">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="FOS Code"
                        @keypress="validate.isNumber($event)"
                        v-model="cslft.base.fos_code"
                      ></v-text-field>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-lg-6">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Period"
                        @keypress="validate.isNumber($event)"
                        v-model="cslft.base.period"
                      ></v-text-field>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
              <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-select
                      :disabled="showAdd"
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Marital Status"
                      :items="maritalStatusList"
                      v-model="cslft.base.marital_status"
                      item-text="description"
                      item-value="id"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-autocomplete
                      :disabled="showAdd"
                      clearable
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Spouse Province"
                      :items="provinces"
                      v-model="cslft.base.spouse_province"
                      item-text="description"
                      item-value="id"
                    ></v-autocomplete>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import store from "@/store";
import validator from "@/validator";
import { mapGetters } from 'vuex';

export default {
  name: "cslft-base",
  computed: {
    ...mapGetters(["cslClassifications", "accommodationTypes", "maritalStatusList", "studyAreas", "provinces", "assessmentTypes", "programs"]),
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  data: () => ({
    showAdd: false,
    cslft: {
      base: {
        assessed_type: undefined,
        assessed_date: undefined,
        assessed_date_menu: undefined,
        no_dependents: undefined,
        pre_study_accommodation_type: undefined,
        pre_study_end_date: undefined,
        pre_study_end_date_menu: undefined,
        pre_study_start_date: undefined,
        pre_study_start_date_menu: undefined,
        pre_study_classification: undefined,
        pre_study_mon: undefined,
        pre_study_wks: undefined,
        pre_study_province: undefined,
        study_accommodation_type: undefined,
        study_end_date: undefined,
        study_end_date_menu: undefined,
        study_start_date: undefined,
        study_start_date_menu: undefined,
        study_area: undefined,
        study_classification: undefined,
        study_months: undefined,
        study_program: undefined,
        study_province: undefined,
        study_weeks: undefined,
        spouse_province: undefined,
        marital_status: undefined,
        period: undefined,
        fos_code: undefined,
      }
    }
  }),
  async created() {
    store.dispatch("setCslClassifications");
    store.dispatch("setAccommodationTypes");
    store.dispatch("setMaritalStatusList");
    store.dispatch("setStudyAreas");
    store.dispatch("setProvinces");
    store.dispatch("setAssessmentTypes");
    store.dispatch("setPrograms");
    this.validate = validator;
    this.applicationId = this.$route.params.id;
    const storeApp = store.getters.selectedApplication;
    if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {
      await store.dispatch("loadApplication", this.applicationId);
    }
  },
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
  .cslft-base-assessment .right-block-container > div{
    border-left: 0px;
  }
  .cslft-base-assessment .right-block-container{
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
  .cslft-base-assessment .right-block-container img{
    max-height: 80px !important;
    padding-right: 10px;
  }
  @media (max-width: 1263px) {
    .cslft-base-assessment .right-block-container{
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
    .cslft-base-assessment .right-block-container .not-displayed-lg{
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
