<template>
  <div class="home cslft-msfaa-assessment">
    <v-card class="default mb-5 bg-color-blue">
      <v-card-text class="nopadding d-flex flex-wrap top-margin low-margin">
        <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
          <div class="col-xs-12 col-lg-12 nopadding">
            <v-card-title class="nopadding-bottom" >Master Student Financial Assistance Agreement (MSFAA)</v-card-title>
          </div>
          <div class="col-xs-12 col-lg-12 nopadding">
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
              <div class="col-xs-12 col-sm-6 col-lg-4 nopadding mobile-low-margin">
                <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="MSFAA Number"
                    @keypress="validate.isNumber($event)"
                    :disabled="showAdd"
                    v-model="cslft_msfaa.id"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10 mobile-low-margin">
                  <DateInput
                    label="Date Issued"
                    :menu="date_issued_menu"
                    :disabled="true"
                    v-model="cslft_msfaa.rec_create_date"
                  ></DateInput>
                </div>
                <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                  <DateInput
                    label="Date Sent to NSLSC"
                    :menu="sent_date_to_nslsc_menu"
                    :disabled="true"
                    v-model="cslft_msfaa.sent_date"
                  ></DateInput>
                </div>
                <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                  <DateInput
                    label="Date Student Signed"
                    :menu="date_student_signed_menu"
                    :disabled="true"
                    v-model="cslft_msfaa.signed_date"
                  ></DateInput>
                </div>
                <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                  <DateInput
                    label="Date Received by NSLSC"
                    :menu="received_date_by_nslsc_menu"
                    :disabled="true"
                    v-model="cslft_msfaa.received_date"
                  ></DateInput>
                </div>
                <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="NSLSC Status"
                    :disabled="showAdd"
                    v-model="cslft_msfaa.msfaa_status"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-lg-8 nopadding">
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 line-jump-height not-displayed-sx"></div>
                <div class="col-xs-12 col-sm-10 col-md-10 col-lg-6">
                  <DateInput
                    label="Date Cancelled"
                    :menu="cancel_date_menu"
                    :disabled="true"
                    v-model="cslft_msfaa.cancel_date"
                  ></DateInput>
                </div>
                <div class="col-xs-12 col-sm-10 col-md-10 col-lg-6">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Cancelled Reason"
                    :disabled="showAdd"
                    v-model="cslft_msfaa.cancel_reason"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-sm-10 col-md-10 col-lg-6">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Home Email"
                    :disabled="showAdd"
                    v-model="cslft_msfaa.email"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-sm-10 col-md-10 col-lg-6">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Reminder Sent"
                    :disabled="showAdd"
                    v-model="cslft_msfaa.last_reminder_sent"
                  ></v-text-field>
                </div>
                <div class="col-xs-12 col-sm-10 col-md-10 col-lg-6">
                  <v-select
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Update Status"
                    :items="['Pending', 'Received', 'Cancelled']"                    
                    v-model="cslft_msfaa.msfaa_status"
                  ></v-select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <div class="col-lg-12">
      <v-card class="default mb-5 bg-color-blue">
        <v-card-title>E-Certificate</v-card-title>
        <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom">
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
            <p class="nomargin">Cert #</p>
          </div>
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
            <p class="nomargin">Sent Date</p>
          </div>
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
            <p class="nomargin">Response Date</p>
          </div>
          <div class="col-xs-2 col-sm-2 col-lg-2nopadding d-flex align-center justify-center">
            <p class="nomargin">Status</p>
          </div>
          <div class="col-xs-4 col-sm-4 col-lg-4 nopadding d-flex align-center justify-center">
            <p class="nomargin">Portal Status</p>
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-12 d-flex low-margin noppading-top" v-for="cert, index in cslft_get_e_certs" :key="index">
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              @keypress="validate.isNumber($event)"
              :disabled="true"
              v-model="cert.transaction_number"
            ></v-text-field>
          </div>
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding">
            <DateInput
              label="Sent Date"
              :menu="sent_date_menu"
              :disabled="true"
              v-model="cert.ecert_sent_date"
            ></DateInput>
          </div>
          <div class="col-xs-3 col-sm-2 col-lg-2 nopadding">
            <DateInput
              label="Response Date"
              :menu="response_date_menu"
              :disabled="true"
              v-model="cert.ecert_response_date"
            ></DateInput>
          </div>
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              @keypress="validate.isNumber($event)"
              :disabled="true"
              v-model="cert.ecert_status"
            ></v-text-field>
          </div>
          <div class="col-xs-4 col-sm-4 col-lg-4 nopadding">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              v-model="cert.ecert_portal_status_id"
              :items="portalStatus"
              item-text="description"
              item-value="id"
            ></v-select>
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
import DateInput from "../../../DateInput.vue";

export default {
  name: "cslft-msfaa",
  components: {
    DateInput,
  },  
  data() {
    return {
      date_issued_menu: null, 
      sent_date_to_nslsc_menu: null,
      date_student_signed_menu:null,
      received_date_by_nslsc_menu:null,
      cancel_date_menu:null,
      email:null,
      sent_date_menu: null,
      response_date_menu: null,
      showAdd: true,
    };
  },
  computed: {
    ...mapState({
      cslft_msfaa: state => state.cslft.cslft_msfaa
    }),
    ...mapGetters([
      "cslft_get_e_certs",
      "portalStatus",
    ]),
    application: function () {
      return store.getters.selectedApplication;
    }
  },
  async created() {
    this.validate = validator;
    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;
    if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {
      await store.dispatch("loadApplication", this.applicationId);
    }
    store.dispatch("setPortalStatus");
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
  .noppading-top,
  .nopadding-top {
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
  .cslft-msfaa-assessment .right-block-container > div{
    border-left: 0px;
  }
  .cslft-msfaa-assessment .right-block-container{
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
  .cslft-msfaa-assessment .right-block-container img{
    max-height: 80px !important;
    padding-right: 10px;
  }
  @media (max-width: 1263px) {
    .cslft-msfaa-assessment .right-block-container{
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
    .cslft-msfaa-assessment .right-block-container .not-displayed-lg{
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
