<template>
  <div class="home cslpt-base-assessment">
    <v-card class="default mb-5 bg-color-blue" v-for="item, index in application.funding_requests" :key="index">
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
                    label="Assessed Type"
                    v-model="assessed_type"
                    item-text="DESCRIPTION"
                    item-value="REQUEST_TYPE_ID"
                  ></v-select>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-lg-3 nopadding xs-md-low-margin">
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
                          v-model="assessed_date"
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
              </div>
              <div class="col-xs-12 col-sm-1 col-lg-1 nopadding not-displayed-sx"></div>
              <div class="col-xs-12 col-sm-3 col-lg-3 nopadding xs-md-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="No. of Dependents"
                    @keypress="validate.isNumber($event)"
                    v-model="assessed_amount"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-xs-12 col-lg-1 nopadding not-displayed-sx-md"></div>
              <div class="col-xs-12 col-lg-1 nopadding not-displayed-sx-md"></div>
            </div>
          </div>
          <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
            <div class="col-xs-12 col-lg-12 nopadding">
              <v-card-title class="nopadding-bottom" >Study Period</v-card-title>
            </div>
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
              <div class="col-xs-12 col-sm-6 col-md-5 col-lg-5 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-7 col-lg-7 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-menu
                        :disabled="showAdd"
                        v-model="start_date_menu"
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
                          v-model="start_date"
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
                        v-model="start_date"
                        @input="start_date_menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-menu
                        :disabled="showAdd"
                        v-model="end_date_menu"
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
                          v-model="end_date"
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
                        v-model="end_date"
                        @input="end_date_menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-5 col-lg-5 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Study Weeks"
                      @keypress="validate.isNumber($event)"
                      v-model="study_weeks"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12">
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
                </div>
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-select
                      :disabled="showAdd"
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Study Area"
                      v-model="disbursement_type"
                      item-text="DESCRIPTION"
                      item-value="REQUEST_TYPE_ID"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-select
                      :disabled="showAdd"
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Study Province"
                      v-model="disbursement_type"
                      item-text="DESCRIPTION"
                      item-value="REQUEST_TYPE_ID"
                    ></v-select>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-select
                      :disabled="showAdd"
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Study Classification"
                      v-model="disbursement_type"
                      item-text="DESCRIPTION"
                      item-value="REQUEST_TYPE_ID"
                    ></v-select>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-select
                      :disabled="showAdd"
                      outlined
                      dense
                      label="Study Program"
                      background-color="white"
                      hide-details
                      v-model="disbursement_type"
                      item-text="DESCRIPTION"
                      item-value="REQUEST_TYPE_ID"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 nopadding d-flex flex-wrap">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-select
                      :disabled="showAdd"
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Spouse Province"
                      v-model="spouse_province"
                      item-text="DESCRIPTION"
                      item-value="REQUEST_TYPE_ID"
                    ></v-select>
                  </div>
                  <div class="col-xs-12 col-lg-12 nopadding">
                    <div class="col-xs-12 col-sm-8 col-lg-8">
                      <v-select
                        :disabled="showAdd"
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Marrital Status"
                        v-model="marrital_status"
                        item-text="DESCRIPTION"
                        item-value="REQUEST_TYPE_ID"
                      ></v-select>
                    </div>
                  </div>
                  <div class="col-xs-12 col-lg-12 nopadding  d-flex">
                    <div class="col-xs-12 col-sm-6 col-lg-6">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="FOS Code"
                        @keypress="validate.isNumber($event)"
                        v-model="fos_code"
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
                        v-model="period"
                      ></v-text-field>
                    </div>
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
  .cslpt-base-assessment .right-block-container > div{
    border-left: 0px;
  }
  .cslpt-base-assessment .right-block-container{
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
  .cslpt-base-assessment .right-block-container img{
    max-height: 80px !important;
    padding-right: 10px;
  }
  @media (max-width: 1263px) {
    .cslpt-base-assessment .right-block-container{
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
    .cslpt-base-assessment .right-block-container .not-displayed-lg{
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
