<template>
  <div class="home cslft-parental-assessment">
    <v-card class="default mb-5 bg-color-blue">
      <v-card-text class="nopadding d-flex flex-wrap top-margin low-margin">
        <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
          <div class="col-xs-12 col-lg-12 nopadding">
            <v-card-title class="nopadding-bottom" >Base Parent Information</v-card-title>
          </div>
          <div class="col-xs-12 col-lg-12 nopadding">
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
              <div class="col-xs-12 col-sm-3 col-lg-2 nopadding">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Family Size"
                    @keypress="validate.isNumber($event)"
                    v-model="cslft.family_size"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-xs-12 col-sm-3 col-lg-2 nopadding xs-md-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Family Income"
                    @keypress="validate.isNumber($event)"
                    v-model="cslft.family_income"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-xs-12 col-sm-3 col-lg-5 nopadding xs-md-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-select
                    :disabled="showAdd"
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Parent Province"
                    :items="provinces"
                    v-model="cslft.parent_province_id"
                    item-text="description"
                    item-value="id"
                  ></v-select>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
            <div class="col-xs-12 col-lg-12 nopadding">
              <v-card-title class="nopadding-bottom" >Income</v-card-title>
            </div>
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
              <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center justify-center not-displayed-sx">
                    <h2 class="nomargin nopadding">Parent 1</h2>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Income"
                      @keypress="validate.isNumber($event)"
                      v-model="cslft.parent1_income"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Tax Paid"
                      @keypress="validate.isNumber($event)"
                      v-model="cslft.parent1_tax_paid"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center not-displayed-sx"></div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center justify-center not-displayed-sx">
                    <h2 class="nomargin nopadding">Parent 2</h2>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Income"
                      @keypress="validate.isNumber($event)"
                      v-model="cslft.parent2_income"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Tax Paid"
                      @keypress="validate.isNumber($event)"
                      v-model="cslft.parent2_tax_paid"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center not-displayed-sx"></div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Total Income"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="cslft_parent_total_income"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Total Tax"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="cslft_parent_total_tax"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Net Income"
                      @keypress="validate.isNumber($event)"
                      :disabled="isTotal"
                      v-model="cslft_parent_net_income"
                    ></v-text-field>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 nopadding d-flex flex-wrap mobile-low-margin">
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 nopadding d-flex">
                    <div  class="col-xs-9 col-lg-9">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Moderate Standard of Living"
                        @keypress="validate.isNumber($event)"
                        :disabled="isTotal"
                        v-model="cslft.parent_msol"
                      ></v-text-field>
                    </div>
                    <div class="col-xs-1 col-lg-1 line-jump-height d-flex align-center justify-center not-displayed-sx">
                      <h2 class="nomargin nopadding">T8</h2>
                    </div>
                  </div>
                  <div class="col-xs-12 col-lg-12 nopadding">
                    <div  class="col-xs-9 col-lg-9">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Discretionary Income"
                        @keypress="validate.isNumber($event)"
                        :disabled="isTotal"
                        v-model="cslft_parent_discretionary_income"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="col-xs-12 col-lg-12 nopadding d-flex">
                    <div  class="col-xs-9 col-lg-9">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Weekly Contribution per student"
                        @keypress="validate.isNumber($event)"
                        :disabled="isTotal"
                        v-model="cslft.parent_weekly_contrib"
                      ></v-text-field>
                    </div>
                    <div class="col-xs-1 col-lg-1 line-jump-height d-flex align-center justify-center not-displayed-sx">
                      <h2 class="nomargin nopadding">T9</h2>
                    </div>
                  </div>
                  <div class="col-xs-12 col-lg-12 nopadding low-margin">
                    <div  class="col-xs-9 col-lg-9">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Calculated Parental Contribution"
                        @keypress="validate.isNumber($event)"
                        :disabled="isTotal"
                        v-model="cslft_calculated_parental_contribution"
                      ></v-text-field>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center justify-end">
                  <h2 class="nomargin nopadding">Total Contribution</h2>
                </div>
                <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center not-displayed-sx">
                </div>
                <div class="col-xs-12 col-lg-12 line-jump-height d-flex align-center not-displayed-sx">
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 nopadding">
                    <div  class="col-xs-9 col-lg-9">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        @keypress="validate.isNumber($event)"
                        :disabled="isTotal"
                        v-model="cslft_parent_total_contribution"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="col-xs-12 col-lg-12 nopadding">
                    <div  class="col-xs-9 col-lg-9">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Contribution Override"
                        @keypress="validate.isNumber($event)"
                        v-model="cslft.parent_contribution_override"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="col-xs-12 col-lg-12 nopadding height-fit-content d-flex justify-start align-center">
                    <v-switch 
                      label="Reduce on Re-Assess" 
                      v-model="cslft.parent_contribution_review"
                      true-value="YES"
                      false-value="NO"
                    >
                    </v-switch>
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
import {mapGetters, mapState} from "vuex";
import {ref} from "vue";
export default {
  name: "cslft-parental",
  setup() {
    const isTotal = ref(true);
    const showAdd = ref(true);

    return {
      isTotal,
      showAdd
    }
  },
  computed: {
    ...mapGetters([
        "provinces",
        "cslft_parent_total_income",
        "cslft_parent_total_tax",
        "cslft_parent_net_income",
        "cslft_calculated_parental_contribution",
        "cslft_parent_total_contribution",
        "cslft_parent_discretionary_income"
      ]),
    ...mapState({
      cslft: state => state.cslft.cslft
    }),
    application: function () {
      return store.getters.selectedApplication;
    },    
  },
  watch: {
    cslft_parent_net_income: {
      immediate: true,
      handler(newValue) {
        store.dispatch("setCslftParentWeeklyContrib");
      }
    }
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
  .cslft-parental-assessment .right-block-container > div{
    border-left: 0px;
  }
  .cslft-parental-assessment .right-block-container{
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
  .cslft-parental-assessment .right-block-container img{
    max-height: 80px !important;
    padding-right: 10px;
  }
  @media (max-width: 1263px) {
    .cslft-parental-assessment .right-block-container{
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
    .cslft-parental-assessment .right-block-container .not-displayed-lg{
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
