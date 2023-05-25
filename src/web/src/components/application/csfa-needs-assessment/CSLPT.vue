<template>
  <div class="home cslpt-assessment">
    <div class="col-xs-12 nopadding-lr col-sm-12 col-lg-12">
      <div class="col-lg-12 nopadding default bg-color-blue v-card v-sheet">
        <div class="col-lg-12 nopadding d-flex flex-wrap low-margin">
          <v-card-title class="col-xs-12 col-md-8 col-lg-8">Assessment - CSLPT</v-card-title>
          <div class="col-xs-12 col-md-4 col-lg-4 nopadding d-flex">
            <div class="col-xs-4 col-sm-4">
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
            <div class="col-xs-4 col-sm-4">
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
            <div class="col-xs-4 col-sm-4">
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
        <v-tabs v-model="tab" background-color="#DEEFFC">
          <v-tab key="0">BASE</v-tab>
          <v-tab key="1">COSTS</v-tab>
          <v-tab key="2">INCOME</v-tab>
          <v-tab key="3">AWARD</v-tab>
          <v-tab key="4">MSFAA</v-tab>
        </v-tabs>
      </div>
    </div>
    <v-tabs-items v-model="tab">
      <v-tab-item key="0">
        <CSLPTBase 
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
          >
        </CSLPTBase>
      </v-tab-item>
      <v-tab-item key="2">
        <CSLPTCosts 
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
          >
        </CSLPTCosts>
      </v-tab-item>
      <v-tab-item key="3">
        <CSLPTIncome 
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
          >
        </CSLPTIncome>
      </v-tab-item>
      <v-tab-item key="4">
        <CSLPTAward 
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
          >
        </CSLPTAward>
      </v-tab-item>
      <v-tab-item key="4">
        <CSLPTMSFAA 
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
          >
        </CSLPTMSFAA>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import store from "../../../store";
import validator from "@/validator";
import CSLPTBase from "../csfa-needs-assessment/CSLPT-detail/CSLPTBase.vue";
import CSLPTCosts from "../csfa-needs-assessment/CSLPT-detail/CSLPTCosts.vue";
import CSLPTIncome from "../csfa-needs-assessment/CSLPT-detail/CSLPTIncome.vue";
import CSLPTAward from "../csfa-needs-assessment/CSLPT-detail/CSLPTAward.vue";
import CSLPTMSFAA from "../csfa-needs-assessment/CSLPT-detail/CSLPTMSFAA.vue";
export default {
  components: {
    CSLPTBase,
    CSLPTCosts,
    CSLPTIncome,
    CSLPTAward,
    CSLPTMSFAA,
  },
  name: "Home",
  computed: {
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  data: () => ({
    tab: 0,
    applicationId: -1,
  }),
  watch: {
    student: function (val) {
      if (val) this.updateView(val);
    },
    //selectedStudent: function (val) {
    //console.log("WATCH selectedStudent", val);
    //},
  },
  methods: {
    showSuccess(mgs) {
      this.$emit("showSuccess", mgs);
    },
    showError(mgs) {
      this.$emit("showError", mgs);
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
  .cslpt-assessment .right-block-container > div{
    border-left: 0px;
  }
  .cslpt-assessment .right-block-container{
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
  .cslpt-assessment .right-block-container img{
    max-height: 80px !important;
    padding-right: 10px;
  }
  @media (max-width: 1263px) {
    .cslpt-assessment .right-block-container{
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
    .cslpt-assessment .right-block-container .not-displayed-lg{
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
