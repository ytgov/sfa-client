<template>
  <div class="home cslft-contribution-assessment">
    <v-card class="default mb-5 bg-color-blue" v-for="item, index in application.funding_requests" :key="index">
      <v-card-text class="nopadding d-flex flex-wrap top-margin low-margin">
        <div class="col-xs-12 col-lg-6 nopadding left-block-container">
          <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex low-margin">
            <div class="col-xs-12 col-lg-8 nopadding">
              <div class="col-xs-12 col-lg-6">
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
            </div>
          </div>
          <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex low-margin flex-wrap">
            <div class="col-xs-12 col-lg-12 nopadding">
              <v-card-title>Student Contribution</v-card-title>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 nopadding col-lg-12 d-flex">
              <div class="col-xs-12 col-sm-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding height-fit-content d-flex justify-center">
                  <v-switch label="Exempt">
                    </v-switch>
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-lg-6 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    v-model="exempt_txt"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 nopadding col-lg-12 d-flex">
              <div class="col-xs-12 col-sm-6 col-lg-6 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Gross Income"
                    @keypress="validate.isNumber($event)"
                    v-model="gross_income"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 nopadding col-lg-12 d-flex">
              <div class="col-xs-12 col-sm-6 col-lg-6 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Expeted Contribution"
                    @keypress="validate.isNumber($event)"
                    v-model="expected_contribution"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 nopadding col-lg-12 d-flex">
              <div class="col-xs-12 col-sm-6 col-lg-6 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Previous Contribution"
                    @keypress="validate.isNumber($event)"
                    v-model="previous_contribution"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 nopadding col-lg-12 d-flex">
              <div class="col-xs-12 col-sm-6 col-lg-6 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Net Contributuion"
                    @keypress="validate.isNumber($event)"
                    v-model="net_contribution"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 nopadding col-lg-12 d-flex">
              <div class="col-xs-12 col-sm-6 col-lg-6 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Contribution Override"
                    @keypress="validate.isNumber($event)"
                    v-model="contribution_override"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 nopadding col-lg-12 d-flex">
              <div class="col-xs-12 col-sm-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding height-fit-content d-flex justify-center">
                  <v-switch label="Reduce on Re-Assess">
                    </v-switch>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-lg-6 nopadding right-block-container">
          <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex low-margin">
            <div class="col-xs-12 col-lg-8 nopadding">
              <div class="col-xs-12 col-lg-6">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Family Income"
                  @keypress="validate.isNumber($event)"
                  v-model="family_income"
                ></v-text-field>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex low-margin flex-wrap left-border-line">
            <div class="col-xs-12 col-lg-12 nopadding">
              <v-card-title>Spouse Contribution</v-card-title>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 nopadding col-lg-12 d-flex">
              <div class="col-xs-12 col-sm-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding height-fit-content d-flex justify-center">
                  <v-switch label="Exempt">
                  </v-switch>
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-lg-6 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    v-model="exempt_txt"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 nopadding col-lg-12 d-flex">
              <div class="col-xs-12 col-sm-6 col-lg-6 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Gross Income"
                    @keypress="validate.isNumber($event)"
                    v-model="spouse_gross_income"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 nopadding col-lg-12 d-flex">
              <div class="col-xs-12 col-sm-6 col-lg-6 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Expeted Contribution"
                    @keypress="validate.isNumber($event)"
                    v-model="spouse_expected_contribution"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 nopadding col-lg-12 d-flex">
              <div class="col-xs-12 col-sm-6 col-lg-6 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Previous Contribution"
                    @keypress="validate.isNumber($event)"
                    v-model="spouse_previous_contribution"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 nopadding col-lg-12 d-flex">
              <div class="col-xs-12 col-sm-6 col-lg-6 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Net Contributuion"
                    @keypress="validate.isNumber($event)"
                    v-model="spouse_net_contribution"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 nopadding col-lg-12 d-flex">
              <div class="col-xs-12 col-sm-6 col-lg-6 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Contribution Override"
                    @keypress="validate.isNumber($event)"
                    v-model="spouse_contribution_override"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 nopadding col-lg-12 d-flex">
              <div class="col-xs-12 col-sm-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding height-fit-content d-flex justify-center">
                  <v-switch label="Reduce on Re-Assess">
                    </v-switch>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex low-margin flex-wrap">
          <div class="col-xs-12 col-lg-12 nopadding">
            <v-card-title>Other Income/Resources</v-card-title>
          </div>
          <div class="col-xs-12 col-sm-3 col-lg-3 nopadding d-flex flex-wrap mobile-low-margin">
            <div class="col-xs-12 col-lg-12">
              <v-text-field
                outlined
                dense
                background-color="white"
                hide-details
                label="Gross"
                @keypress="validate.isNumber($event)"
                v-model="gross"
              ></v-text-field>
            </div>
          </div>
          <div class="col-xs-12 col-sm-3 col-lg-3 nopadding d-flex flex-wrap mobile-low-margin">
            <div class="col-xs-12 col-lg-12">
              <v-text-field
                outlined
                dense
                background-color="white"
                hide-details
                label="Other Income Net"
                @keypress="validate.isNumber($event)"
                v-model="other_income_net"
              ></v-text-field>
            </div>
            <div class="col-xs-12 col-lg-12">
              <v-text-field
                outlined
                dense
                background-color="white"
                hide-details
                label="Assest Override"
                @keypress="validate.isNumber($event)"
                v-model="asset_override"
              ></v-text-field>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
            <div class="col-xs-12 col-lg-6 nopadding line-jump-height d-flex align-center not-displayed-sx not-displayed-sx-md">
              <div class="col-xs-12 col-lg-6 line-jump-height d-flex align-center justify-end">
                <h2 class="nomargin nopadding">Total Assets</h2>
              </div>
              <div class="col-xs-12 col-lg-6">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  @keypress="validate.isNumber($event)"
                  v-model="total_assets"
                ></v-text-field>
              </div>
            </div>
            <div class="col-xs-12 col-lg-6 nopadding d-flex">
              <div class="col-xs-5 col-lg-5 line-jump-height d-flex align-center justify-end">
                <h2 class="nomargin nopadding">Combined Contribution</h2>
              </div>
              <div class="col-xs-7 col-lg-7">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  @keypress="validate.isNumber($event)"
                  v-model="combined_contribution"
                ></v-text-field>
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
  .cslft-contribution-assessment .right-block-container > div{
    border-left: 0px;
  }
  .cslft-contribution-assessment .right-block-container .left-border-line{
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
  .cslft-contribution-assessment .right-block-container img{
    max-height: 80px !important;
    padding-right: 10px;
  }
  @media (max-width: 1263px) {
    .cslft-contribution-assessment .right-block-container{
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
    .cslft-contribution-assessment .right-block-container .not-displayed-lg{
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
