<template>
  <div>
    <v-card class="default mb-5 bg-color-blue">
        
      <div v-if="smallTitle" class="col-lg-12 d-flex align-center  line-jump-height">
        <H3 class="nomargin nopadding">Disbursement (s)</H3>
      </div>
      <v-card-title v-else>Disbursement (s)</v-card-title>
      
      <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom">
        <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
          <p class="nomargin">Reference #</p>
        </div>
        <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
          <p class="nomargin">Disbursed Amt</p>
        </div>
        <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
          <p class="nomargin">Disbursement Type</p>
        </div>
        <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
          <p class="nomargin">Due Date</p>
        </div>
        <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
          <p class="nomargin">Issue Date</p>
        </div>
        <div class="col-xs-3 col-sm-3 col-lg-3 nopadding d-flex align-center justify-center">
          <p class="nomargin">Change Reason</p>
        </div>
        <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
          <p class="nomargin">Batch ID</p>
        </div>
        <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
          <p class="nomargin"></p>
        </div>
      </div>        
      <div class="col-xs-12 col-sm-12 col-lg-12 d-flex low-margin noppading-top" v-for="disbursement, idx in disbursementList" :key="idx">          
        <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">            
          <v-text-field
            outlined
            dense
            background-color="white"
            hide-details
            @keypress="validate.isNumber($event)"
            v-model="disbursement.transaction_number"
          ></v-text-field>
        </div>
        <div class="col-xs-2 col-sm-2 col-lg-2 nopadding">
          <v-text-field
            outlined
            dense
            background-color="white"
            hide-details
            @keypress="validate.isNumber($event)"
            v-model="disbursement.disbursed_amount"
          ></v-text-field>
        </div>
        <div class="col-xs-2 col-sm-2 col-lg-2 nopadding">
          <v-select
            :disabled="blockDisbursement"
            outlined
            dense
            background-color="white"
            hide-details
            v-model="disbursement.disbursement_type_id"
            :items="disbursementTypes"
            item-text="description"
            item-value="id"
          ></v-select>
        </div>
        <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
          <DateInput
            label="Due Date"
            :menu="due_date_menu"
            :disabled="blockDisbursement"
            v-model="disbursement.due_date"
          ></DateInput>
        </div>
        <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
          <DateInput
            label="Issue Date"
            :menu="issue_date_menu"
            :disabled="blockDisbursement"
            v-model="disbursement.issue_date"
          ></DateInput>
        </div>
        <div class="col-xs-3 col-sm-3 col-lg-3 nopadding">
          <v-select
            :disabled="blockDisbursement"
            outlined
            dense
            background-color="white"
            hide-details
            v-model="disbursement.change_reason_id"
            :items="changeReasons"
            item-text="description"
            item-value="id"
          ></v-select>
        </div>
        <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
          <v-text-field
            outlined
            dense
            background-color="white"
            hide-details
            @keypress="validate.isNumber($event)"
            v-model="disbursement.financial_batch_id"
          ></v-text-field>
        </div>
        <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex justify-center">
            <v-btn color="error" x-small fab class="my-1" @click="removeDisbursement(idx)">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom" v-if="showAdd">
        <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex align-end justify-end">
            <v-btn @click="e => {
              addDisbursement();
            }" color="success" class=""
            >
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
import DateInput from "../../DateInput.vue";

export default {
  name: "disbursement-list",
  components: {
    DateInput
  },
  props: {
    refreshFrom: String,
    disbursementList: Array,
    disbursementRemove: String,
    smallTitle: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      blockDisbursement: false,
      showAdd: false,
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
    removeDisbursement(idx) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this disbursement.",
        () => {
          store.dispatch(this.disbursementRemove, idx);
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
  },
  computed: {
    ...mapGetters(['disbursementTypes', 'changeReasons']),
    application: function () {
      return store.getters.selectedApplication;
    },
    dispatchRefreshFrom() {
      return this.refreshFrom || "refreshAssessment"
    }
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