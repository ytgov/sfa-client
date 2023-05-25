<template>
  <div class="home csgtp-assessment">
    <h1>Funding Status</h1>
    <div class="col-md-12">
      <v-card class="default mb-5 bg-color-blue" v-for="item, index in application.funding_requests" :key="index">
        <div class="col-lg-12 nopadding d-flex flex-wrap">
          <v-card-title class="col-xs-12 col-lg-6">Assessment - CSGTP</v-card-title>
          <div class="col-xs-12 col-lg-6 nopadding d-flex">
            <div class="col-xs-3 col-sm-3">
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
            <div class="col-xs-3 col-sm-3">
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
            <div class="col-xs-3 col-sm-3">
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
            <div class="col-xs-3 col-sm-3">
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
          <div class="col-xs-12 col-md-12 col-lg-12 nopadding left-block-container">
            <div class="col-xs-12 col-lg-12 nopadding d-flex ">
              <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
                <div class="col-lg-12 d-flex align-center  line-jump-height">
                  <H3 class="nomargin nopadding">Disbursement (s)</H3>
                </div>
              </div>
            </div>
          </div>
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
        </v-card-text>
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
  .padding-top{
    padding-top: 17px !important;
  }
  .equalize-heights {
    height: 40px;
  }
  .border-top {
    border-top: 3px solid #ccc;
  }
  .nomargin {
    margin: 0 !important;
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
  .csgtp-assessment .right-block-container > div{
    border-left: 0px;
  }
  .csgtp-assessment .right-block-container{
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
  .csgtp-assessment .right-block-container img{
    max-height: 80px !important;
    padding-right: 10px;
  }
  .csgtp-assessment .right-block-container{
    margin-top: 64px;
  }
  @media (max-width: 1263px) {
    .csgtp-assessment .right-block-container{
      margin-top: 0px;
    }
    .csgtp-assessment .right-block-container{
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
    .csgtp-assessment .right-block-container .not-displayed-lg{
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
      width: 0px !important;
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
