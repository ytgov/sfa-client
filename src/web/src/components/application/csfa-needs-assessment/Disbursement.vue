<template>
    <div class="col-lg-12">
        <v-card class="default mb-5 bg-color-blue">
            
          <div v-if="smallTitle" class="col-lg-12 d-flex align-center  line-jump-height">
            <H3 class="nomargin nopadding">Disbursement (s)</H3>
          </div>
          <v-card-title v-else>Disbursement (s)</v-card-title>
            
            <div v-for="item, index in disbursements" :key="index">
                <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom">
                    <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex align-end justify-end">
                        <v-btn :disabled="show" color="error" x-small fab class="my-0">
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
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
                        <v-text-field :disabled="show" outlined dense background-color="white" hide-details
                            @keypress="validate.isNumber($event)" v-model="disbursed_amt"></v-text-field>
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                        <v-text-field :disabled="show" outlined dense background-color="white" hide-details
                            @keypress="validate.isNumber($event)" v-model="reference_number"></v-text-field>
                    </div>
                    <div class="col-xs-2 col-sm-2 col-lg-2 nopadding">
                        <v-autocomplete :disabled="show" outlined dense background-color="white" hide-details
                            v-model="disbursement_type" :items="disbursementTypes" item-text="description" item-value="id"></v-autocomplete>
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                        <v-text-field :disabled="show" outlined dense background-color="white" hide-details
                            @keypress="validate.isNumber($event)" v-model="issue_date"></v-text-field>
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                        <v-text-field :disabled="show" outlined dense background-color="white" hide-details
                            @keypress="validate.isNumber($event)" v-model="tax_year"></v-text-field>
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                        <v-text-field :disabled="show" outlined dense background-color="white" hide-details
                            @keypress="validate.isNumber($event)" v-model="due_date"></v-text-field>
                    </div>
                    <div class="col-xs-3 col-sm-3 col-lg-3 nopadding">
                        <v-autocomplete :disabled="show" outlined dense background-color="white" hide-details
                            v-model="disbursement_type" :items="changeReasons" item-text="description" item-value="id"></v-autocomplete>
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                        <v-text-field :disabled="show" outlined dense background-color="white" hide-details
                            @keypress="validate.isNumber($event)" v-model="family_size"></v-text-field>
                    </div>
                    
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom">
              <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex align-end justify-end">
                  <v-btn v-if="!!disbursements?.length && !show" @click="show = true" color="success" class="">
                    Add
                  </v-btn>
              </div>
            </div>

            <div v-if="show || !disbursements?.length">
              <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom">
                  <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex align-end justify-end">
                      <v-btn color="success" x-small fab class="my-0">
                          <v-icon>mdi-check</v-icon>
                      </v-btn>
                      <v-btn 
                          color="warning ml-5" 
                          x-small 
                          fab 
                          class="my-0" 
                          @click="setShow"
                        >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
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
                      <v-text-field outlined dense background-color="white" hide-details
                          @keypress="validate.isNumber($event)" v-model="disbursed_amt"></v-text-field>
                  </div>
                  <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                      <v-text-field outlined dense background-color="white" hide-details
                          @keypress="validate.isNumber($event)" v-model="reference_number"></v-text-field>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding">
                      <v-autocomplete :disabled="showAdd" outlined dense background-color="white" hide-details
                          v-model="disbursement_type" :items="disbursementTypes" item-text="description" item-value="id"></v-autocomplete>
                  </div>
                  <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                      <v-text-field outlined dense background-color="white" hide-details
                          @keypress="validate.isNumber($event)" v-model="issue_date"></v-text-field>
                  </div>
                  <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                      <v-text-field outlined dense background-color="white" hide-details
                          @keypress="validate.isNumber($event)" v-model="tax_year"></v-text-field>
                  </div>
                  <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                      <v-text-field outlined dense background-color="white" hide-details
                          @keypress="validate.isNumber($event)" v-model="due_date"></v-text-field>
                  </div>
                  <div class="col-xs-3 col-sm-3 col-lg-3 nopadding">
                      <v-autocomplete :disabled="showAdd" outlined dense background-color="white" hide-details
                          v-model="disbursement_type" :items="changeReasons" item-text="description" item-value="id"></v-autocomplete>
                  </div>
                  <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                      <v-text-field outlined dense background-color="white" hide-details
                          @keypress="validate.isNumber($event)" v-model="family_size"></v-text-field>
                  </div>
              </div>
          </div>
        </v-card>
    </div>
</template>

<script>
import store from "../../../store";
import validator from "@/validator";
import { mapGetters } from 'vuex';

export default {
  name: "Home",
  props: {
    disbursements: Array,
    smallTitle: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    setShow() {
      this.show = !this.show;
    },
  },
  computed: {
    ...mapGetters(['disbursementTypes', 'changeReasons']),
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
    store.dispatch("setChangeReasons");
    store.dispatch("setDisbursementTypes");
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
  .right-block-container > div{
    border-left: 1px solid #ccc;
  }
  .right-block-container .line-jump-height:first-child:first-child{
    height: 72px;
    margin-top: 12px; 
  }
  .not-displayed-lg{
    display: none;
  }
  .v-card__title{
    font-weight: bold !important;
    font-size: 1.65rem !important;
  }
  @media (max-width: 1263px) {
    .v-card__title{
      font-size: 1.25rem !important;
    }
    .not-displayed-lg{
      display: block;
      height: 0px;
      margin: 20px 15px;
    }
    .yukon-excellence-awards-assessment .right-block-container .not-displayed-lg{
      border-top: 1px solid #ccc;
    }
    .not-displayed-sx-md{
      display: none;
    }
    .right-block-container > div{
      border-left: 0px;
    }
  }
  @media (max-width: 599px){
    .not-displayed-sx{
      display: none;
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
    .right-block-container > div:nth-child(5) > div:first-child{
      padding-bottom: 0px;
    }
  }
</style>