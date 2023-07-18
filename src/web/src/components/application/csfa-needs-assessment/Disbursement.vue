<template>
    <div class="col-lg-12">
        <v-card class="default mb-5 bg-color-blue">
            
          <div v-if="smallTitle" class="col-lg-12 d-flex align-center  line-jump-height">
            <H3 class="nomargin nopadding">Disbursement (s)</H3>
          </div>
          <v-card-title v-else>Disbursement (s)</v-card-title>
          
          <div class="col-xs-12 col-sm-12 col-lg-12 d-flex">
            <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center" style="margin-right: 4px">
                <p class="nomargin" style="font-size: 14px">Disbursed Amt</p>
            </div>
            <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center" style="margin-right: 4px">
                <p class="nomargin" style="font-size: 14px">Reference #</p>
            </div>
            <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center" style="margin-right: 4px">
                <p class="nomargin" style="font-size: 14px">Disbursement Type</p>
            </div>
            <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center" style="margin-right: 4px">
                <p class="nomargin" style="font-size: 14px">Issue Date</p>
            </div>
            <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center" style="margin-right: 4px">
                <p class="nomargin" style="font-size: 14px">Tax Year</p>
            </div>
            <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center" style="margin-right: 4px">
                <p class="nomargin" style="font-size: 14px">Due Date</p>
            </div>
            <div class="col-xs-3 col-sm-3 col-lg-3 nopadding d-flex align-center justify-center" style="margin-right: 4px">
                <p class="nomargin" style="font-size: 14px">Change Reason</p>
            </div>
            <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center" style="margin-right: 4px">
                <p class="nomargin" style="font-size: 14px">Batch ID</p>
            </div>
          </div>
            <div v-for="item, index in disbursementsByAssessmentId" :key="index">
                <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-top">
                    <div class="col-xs-1 col-sm-1 col-lg-1 nopadding" style="margin-right: 6px">
                        <v-text-field  outlined dense background-color="white" hide-details 
                            @keypress="validate.isNumber($event)" v-model="item.disbursed_amount" @change=" e => {
                              $emit('blockDisburse', true);
                              refreshData();
                            }"></v-text-field>
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1 nopadding" style="margin-right: 6px">
                        <v-text-field  outlined dense background-color="white" hide-details 
                            @keypress="validate.isNumber($event)" v-model="item.transaction_number" @change=" e => {
                              $emit('blockDisburse', true);
                              refreshData();
                            }"></v-text-field>
                    </div>
                    <div class="col-xs-2 col-sm-2 col-lg-2 nopadding" style="margin-right: 6px">
                        <v-autocomplete outlined dense background-color="white" hide-details 
                            v-model="item.disbursement_type_id" :items="disbursementTypes" item-text="description" item-value="id" @change=" e => {
                              $emit('blockDisburse', true);
                              refreshData();
                            }"></v-autocomplete>
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1 nopadding" style="margin-right: 6px">
                        <v-menu
                          v-model="item.issue_date_menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          left
                          nudge-top="26"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :value="item.issue_date?.slice(0, 10)"
                              label="Issue Date"
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
                            :value="item.issue_date?.slice(0, 10)"
                            @input="e => {
                              item.issue_date = e;
                              item.issue_date_menu = false;
                            }"
                            @change=" e => {
                              $emit('blockDisburse', true);
                              refreshData();
                            }"
                          ></v-date-picker>
                        </v-menu>
            
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1 nopadding" style="margin-right: 6px">
                        <v-text-field  outlined dense background-color="white" hide-details
                            @keypress="validate.isNumber($event)" v-model="item.tax_year" @change=" e => {
                              $emit('blockDisburse', true);
                              refreshData();
                            }"></v-text-field>
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1 nopadding" style="margin-right: 6px">
                        <v-menu
                          v-model="item.due_date_menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          left
                          nudge-top="26"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :value="item.due_date?.slice(0, 10)"
                              label="Due Date"
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
                            :value="item.due_date?.slice(0, 10)"
                            @input="e => {
                              item.due_date = e;
                              item.due_date_menu = false;
                            }"
                            @change=" e => {
                              $emit('blockDisburse', true);
                              refreshData();
                            }"
                          ></v-date-picker>
                        </v-menu>
                    </div>
                    <div class="col-xs-3 col-sm-3 col-lg-3 nopadding" style="margin-right: 6px">
                        <v-autocomplete  outlined dense background-color="white" hide-details
                            v-model="item.change_reason_id" :items="changeReasons" item-text="description" item-value="id" @change=" e => {
                              $emit('blockDisburse', true);
                              refreshData();
                            }"></v-autocomplete>
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex" style="margin-right: 12px">
                        <v-text-field  outlined dense background-color="white" hide-details
                            @keypress="validate.isNumber($event)" v-model="item.financial_batch_id" @change=" e => {
                              $emit('blockDisburse', true);
                              refreshData();
                            }"></v-text-field>
                    </div>
                    <div v-if="item?.id" class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex">
                        <v-btn color="error" x-small fab class="my-1" @click="removeDisbursement(item.id)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>

            <div v-for="item, index in previewDisbursementList" :key="index+'sd'">
              <!-- <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom">
                <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex align-end justify-end">
                  <v-btn 
                      color="warning ml-5" 
                      x-small 
                      fab
                      class="my-1" 
                      @click="cancelDisbursement(index)"
                      >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </div>
              </div> -->

              <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-top">
                  <div class="col-xs-1 col-sm-1 col-lg-1 nopadding" style="margin-right: 6px">
                      <v-text-field  outlined dense background-color="white" hide-details 
                        @keypress="validate.isNumber($event)" v-model="item.disbursed_amount" @change=" e => {
                          $emit('blockDisburse', true);
                          refreshData();
                        }">
                      </v-text-field>
                  </div>
                  <div class="col-xs-1 col-sm-1 col-lg-1 nopadding" style="margin-right: 6px">
                      <v-text-field outlined dense background-color="white" hide-details 
                          @keypress="validate.isNumber($event)" v-model="item.transaction_number" ></v-text-field>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding" style="margin-right: 6px">
                      <v-autocomplete outlined dense background-color="white" hide-details
                          v-model="item.disbursement_type_id" :items="disbursementTypes" item-text="description" item-value="id" ></v-autocomplete>
                  </div>
                  <div class="col-xs-1 col-sm-1 col-lg-1 nopadding" style="margin-right: 6px">
                      <v-menu
                        v-model="item.issue_date_menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        left
                        nudge-top="26"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            :value="item.issue_date?.slice(0, 10)"
                            label="Issue Date"
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
                          :value="item.issue_date?.slice(0, 10)"
                          @input="e => {
                            item.issue_date = e;
                            item.issue_date_menu = false;
                          }"
                          
                        ></v-date-picker>
                      </v-menu>
          
                  </div>
                  <div class="col-xs-1 col-sm-1 col-lg-1 nopadding" style="margin-right: 6px">
                      <v-text-field outlined dense background-color="white"
                          @keypress="validate.isNumber($event)" v-model="item.tax_year"></v-text-field>
                  </div>
                  <div class="col-xs-1 col-sm-1 col-lg-1 nopadding" style="margin-right: 6px">
                      <v-menu
                        v-model="item.due_date_menu" 
                        :close-on-content-click="false"
                        transition="scale-transition"
                        left
                        nudge-top="26"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            :value="item.due_date?.slice(0, 10)"
                            label="Due Date"
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
                          :value="item.due_date?.slice(0, 10)"
                          @input="e => {
                            item.due_date = e;
                            item.due_date_menu = false;
                          }"
                        ></v-date-picker>
                      </v-menu>
                  </div>
                  <div class="col-xs-3 col-sm-3 col-lg-3 nopadding" style="margin-right: 6px">
                      <v-autocomplete outlined dense background-color="white" hide-details
                          v-model="item.change_reason_id" :items="changeReasons" item-text="description" item-value="id" ></v-autocomplete>
                  </div>
                  <div class="col-xs-1 col-sm-1 col-lg-1 nopadding" style="margin-right: 12px">
                      <v-text-field outlined dense background-color="white" hide-details
                          @keypress="validate.isNumber($event)" v-model="item.financial_batch_id"></v-text-field>
                  </div>
                  <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex">
                    <v-btn 
                      color="warning" 
                      x-small 
                      fab 
                      class="my-1" 
                      @click="cancelDisbursement(index)"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </div>
              </div>
          </div>
          
            <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom">
              <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex align-end justify-end">
                  <v-btn @click="e => {
                    addDisbursement();
                  }" color="success" class="">
                    Add
                  </v-btn>
              </div>
            </div>
        </v-card>
        <confirm-dialog ref="confirm"></confirm-dialog>
    </div>
</template>

<script>
import store from "../../../store";
import validator from "@/validator";
import { mapGetters } from 'vuex';

export default {
  name: "Home",
  props: {
    assessmentId: Number,
    fundingRequestId: Number,
    smallTitle: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    fundingRequestId() {
      store.dispatch("getDisbursements", { application_id: this.application.id, funding_request_id: this.fundingRequestId });
    }
  },
  data() {
    return {
      currentIndex: null,
      show: false,
      currentEditing: null,
      newDibursement: {
        disbursement_type_id: null,
        disbursed_amount: 0,
        due_date: null,
        tax_year: null,
        issue_date: null,
        transaction_number: null,
        change_reason_id: null,
        financial_batch_id: null,
      },
      issue_date_menu: false,
      new_issue_date_menu: false,
      due_date_menu: false,
      new_due_date_menu: false,
    };
  },
  methods: {
    setShow(show) {
      this.newDibursement = {};
      this.$emit('blockDisburse', show);
      this.show = show;
    },
    editing(disbursement, index) {
      if (this.currentEditing === null) {
        this.currentIndex = index;
        this.$emit("blockDisburse", true);
        this.$emit("currentEditing", true);
        this.currentEditing = disbursement;
      }

    },
    closeEditor() {
      const list = [ ...this.disbursements ];
      list[this.currentIndex] = { ...this.currentEditing };
      store.dispatch("backDisbursement", list);
      this.$emit("blockDisburse", false);
      this.$emit("currentEditing", false);
      this.currentEditing = null;
      this.currentIndex = null;
    },
    saveEdition() {
      this.$emit("blockDisburse", false);
      this.$emit("currentEditing", false);
      this.currentEditing = null;
    },
    saveDisbursement(item) {
      store.dispatch("updateDisbursement", {
        data: { ...item },
        disbursement_id: item.id,
        application_id: this.application.id,
        funding_request_id: this.fundingRequestId, 
        emiter: this
      });
    },
    addDisbursement() {
      store.dispatch("addItemPreviewDisbursementList");
    },
    cancelDisbursement(index = -1) {
      store.dispatch("cancelItemPreviewDisbursementList", { index });
      this.refreshData();
    },
    removeDisbursement(id) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this disbursement.",
        () => {
          store.dispatch("removeDisbursement", {  application_id: this.application.id, emiter:this, disbursement_id: id, funding_request_id: this.fundingRequestId });
        },
        () => {}
      );
    },
    showSuccess(mgs) {
      this.$emit("showSuccess", mgs);
    },
    showError(mgs) {
      this.$emit("showError", mgs);
    },
    refreshData() {
      const previewDisburseAmountsList = this.previewDisbursementList?.map(d => {
        return Number(d.disbursed_amount);
      }) || [];

      const disburseFilter = this.disbursements?.filter(d => d.assessment_id === this.customAssessment?.id )
      let disburseAmountsList = [];
      
      if (disburseFilter?.length) {
        disburseAmountsList = disburseFilter.map(d => {
          return Number(d.disbursed_amount);
        }) || [];
      }

      store.dispatch("refreshAssessment", { 
        application_id: this.application.id, 
        data: { ...this.customAssessment },
        disburseAmountList: [ ...previewDisburseAmountsList, ...disburseAmountsList ],
      });
    },
  },
  computed: {
    ...mapGetters(['customAssessment', 'disbursements', 'disbursementTypes', 'changeReasons', 'isPreviewCharged', 'previewDisbursementList', 'isPreviewCharged']),
    disbursementsByAssessmentId() {
      const list = this.disbursements?.filter(d => d.assessment_id === this.assessmentId ) || [];
      return list;
    },
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
    store.dispatch("getDisbursements", { application_id: this.application.id, funding_request_id: this.fundingRequestId });
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