<template>
  <div class="home cslft-assessment">
    <div class="col-lg-12 col-xs-12 col-md-12 nopadding record-section">
      <div class="col-xs-12 col-md-12 col-lg-12 nopadding d-flex">
            <div class="col-xs-4 col-sm-4 d-flex nopadding">
              <v-select
                    :disabled="showAdd"
                    outlined
                    dense
                    background-color="white"
                    label="Assessment"
                    hide-details
                    :items="cslft_get_assessments_index"
                    item-text="id"
                    item-value="value"
                    v-model="current"
                ></v-select>
                <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    :disabled="true"
                    prefix="/"
                    v-model="cslft_get_assessments_count"                    
                  ></v-text-field>
            </div>
            <div class="spacer col-xs-4 col-sm-4">
            
            </div>
            <div class="col-xs-4 col-sm-4 nopadding">
              <v-btn 
                :disabled="isNaN(cslft_get_current)"
                dense
                color="green" 
                class="my-0"
                block
                @click="createAssessment"
              >
              <v-icon left>
                mdi-plus
              </v-icon>
              CREATE ASSESSMENT
              </v-btn>
            </div>
          </div>  
    </div>
    <div class="col-xs-12 nopadding-lr col-sm-12 col-lg-12">
      <div class="col-lg-12 nopadding default bg-color-blue v-card v-sheet">
        <div class="col-lg-12 nopadding d-flex flex-wrap low-margin">
          <v-card-title class="col-xs-12 col-md-8 col-lg-8">Assessment - CSLFT</v-card-title>        
          <div class="col-xs-12 col-md-4 col-lg-4 nopadding d-flex">
            <div class="col-xs-4 col-sm-4">
              <v-btn 
                :disabled="showAdd"
                dense
                color="green" 
                class="my-0"
                block
                @click="saveAssessment"
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
                @click="close"
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
                @click="close"
              >
              EXIT
              </v-btn>
            </div>
          </div>
        </div>
        <v-tabs v-model="tab" background-color="#DEEFFC">
          <v-tab key="0">BASE</v-tab>
          <v-tab key="1">COSTS</v-tab>
          <v-tab key="2">CONTRIBUTION</v-tab>
          <v-tab key="3">PARENTAL</v-tab>
          <v-tab key="4">AWARD</v-tab>
          <v-tab key="5">MSFAA</v-tab>
        </v-tabs>
      </div>
    </div>
    <v-tabs-items v-model="tab">
      <v-tab-item key="0">
        <CSLFTBase 
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
          >
        </CSLFTBase>
      </v-tab-item>
      <v-tab-item key="1">
        <CSLFTCosts 
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
          >
        </CSLFTCosts>
      </v-tab-item>
      <v-tab-item key="2">
        <CSLFTContribution 
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
          >
        </CSLFTContribution>
      </v-tab-item>
      <v-tab-item key="3">
        <CSLFTParental 
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
          >
        </CSLFTParental>
      </v-tab-item>
      <v-tab-item key="4">
        <CSLFTAward
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
          >
        </CSLFTAward>
      </v-tab-item>
      <v-tab-item key="5">
        <CSLFTMSFAA
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
          >
        </CSLFTMSFAA>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import store from "../../../store";
import validator from "@/validator";
import { 
  CSLFTBase, 
  CSLFTCosts, 
  CSLFTContribution, 
  CSLFTParental, 
  CSLFTAward, 
  CSLFTMSFAA } from "@/components/application/csfa-needs-assessment/CSLFT-detail";
import {mapGetters} from "vuex";

export default {
  components: {
    CSLFTBase,
    CSLFTCosts,
    CSLFTContribution,
    CSLFTParental,
    CSLFTAward,
    CSLFTMSFAA,
  },
  name: "cslft-assessment",
  props: ["request_type_id", "fundingRequestId"],
  computed: {
    ...mapGetters([
      "cslft_get_assessments", 
      "cslft_get_assessments_index",
      "cslft_get_assessments_count",
      "cslft_get_current",
    ]),
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  data: () => ({
    tab: 0,
    applicationId: -1,
    showAdd: false,   
    totalAssessement: 0,
    current: 0,
  }),
  watch: {
    student: function (val) {
      if (val) this.updateView(val);
    },
    cslft_get_current: {
      deep: true,
      handler(newVal) {
        this.current = newVal;
      }
    },
    current: {
      handler(newVal, oldVal) {
        if (oldVal !== 0) {
          store.dispatch("switchAssessment", newVal);
        }
      }
    }
  },
  methods: {
    showSuccess(mgs) {
      this.$emit("showSuccess", mgs);
    },
    showError(mgs) {
      this.$emit("showError", mgs);
    },
    close() {
      this.$emit("close");
    },
    saveAssessment() {
      store.dispatch("saveCslftAssessment", this);
    },
    createAssessment() {
      store.dispatch("createCslftAssessment", this.$props.fundingRequestId);
    }
  },
  async created() {
    const frId = this.$props.fundingRequestId;    
    this.validate = validator;
    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;
    if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {
      await store.dispatch("loadApplication", this.applicationId);
      await store.dispatch("getCslLookup", this.application.academic_year_id);
    }
    store.dispatch("setAppSidebar", true);
    store.dispatch("getCslftAssessInfo", frId);
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
  .cslft-assessment .right-block-container > div{
    border-left: 0px;
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
  .cslft-assessment .right-block-container img{
    max-height: 80px !important;
    padding-right: 10px;
  }
  @media (max-width: 1263px) {
    .cslft-assessment .right-block-container{
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
    .cslft-assessment .right-block-container .not-displayed-lg{
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
