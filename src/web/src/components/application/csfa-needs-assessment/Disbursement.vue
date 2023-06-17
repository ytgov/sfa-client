<template>
    <div class="col-lg-12">
        <v-card class="default mb-5 bg-color-blue">
            
          <div v-if="smallTitle" class="col-lg-12 d-flex align-center  line-jump-height">
            <H3 class="nomargin nopadding">Disbursement (s)</H3>
          </div>
          <v-card-title v-else>Disbursement (s)</v-card-title>
            
            <div v-for="item, index in disbursementsByAssessmentId" :key="index">
                <div v-if="item?.id" class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom">
                  <div v-if="currentEditing?.id === item.id" class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex align-end justify-end">
                    <v-btn color="success" x-small fab class="my-0" @click="saveDisbursement(item)">
                        <v-icon>mdi-check</v-icon>
                    </v-btn>
                    <v-btn 
                        color="warning ml-5" 
                        x-small 
                        fab 
                        class="my-0" 
                        @click="closeEditor(index)"
                      >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </div>
                  <div v-else class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex align-end justify-end">
                      <v-btn :disabled="isPreviewCharged || show || (currentEditing !== null && !(currentEditing?.id === item.id))" color="error" x-small fab class="my-0" @click="removeDisbursement(item.id)">
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
                        <v-text-field :disabled="isPreviewCharged || show || (currentEditing !== null && !(currentEditing?.id === item.id))" outlined dense background-color="white" hide-details @focus="editing({ ...item })" 
                            @keypress="validate.isNumber($event)" v-model="item.disbursed_amount"></v-text-field>
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                        <v-text-field :disabled="isPreviewCharged || show || (currentEditing !== null && !(currentEditing?.id === item.id))" outlined dense background-color="white" hide-details @focus="editing({ ...item })" 
                            @keypress="validate.isNumber($event)" v-model="item.transaction_number"></v-text-field>
                    </div>
                    <div class="col-xs-2 col-sm-2 col-lg-2 nopadding">
                        <v-autocomplete outlined dense background-color="white" hide-details @focus="editing({ ...item })" :disabled="isPreviewCharged || show || (currentEditing !== null && !(currentEditing?.id === item.id))"
                            v-model="item.disbursement_type_id" :items="disbursementTypes" item-text="description" item-value="id"></v-autocomplete>
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                        <v-menu
                          v-model="issue_date_menu"
                          :disabled="isPreviewCharged || show || (currentEditing !== null && !(currentEditing?.id === item.id))" 
                          :close-on-content-click="false"
                          transition="scale-transition"
                          left
                          nudge-top="26"
                          offset-y
                          min-width="auto"
                          @focus="editing({ ...item })"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :disabled="isPreviewCharged || show || (currentEditing !== null && !(currentEditing?.id === item.id))" 
                              @focus="editing({ ...item })"
                              :value="item.issue_date?.slice(0, 10)"
                              label="Assessed Date"
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
                              issue_date_menu = false;
                            }"
                          ></v-date-picker>
                        </v-menu>
            
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                        <v-text-field :disabled="isPreviewCharged || show || (currentEditing !== null && !(currentEditing?.id === item.id))" outlined dense background-color="white" hide-details @focus="editing({ ...item })"
                            @keypress="validate.isNumber($event)" v-model="item.tax_year"></v-text-field>
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                        <v-menu
                          v-model="due_date_menu"
                          :disabled="isPreviewCharged || show || (currentEditing !== null && !(currentEditing?.id === item.id))" 
                          :close-on-content-click="false"
                          transition="scale-transition"
                          left
                          nudge-top="26"
                          offset-y
                          min-width="auto"
                          @focus="editing({ ...item })"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :disabled="isPreviewCharged || show || (currentEditing !== null && !(currentEditing?.id === item.id))" 
                              @focus="editing({ ...item })"
                              :value="item.due_date?.slice(0, 10)"
                              label="Assessed Date"
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
                              due_date_menu = false;
                            }"
                          ></v-date-picker>
                        </v-menu>
                    </div>
                    <div class="col-xs-3 col-sm-3 col-lg-3 nopadding">
                        <v-autocomplete :disabled="isPreviewCharged || show || (currentEditing !== null && !(currentEditing?.id === item.id))" outlined dense background-color="white" hide-details @focus="editing({ ...item })"
                            v-model="item.change_reason_id" :items="changeReasons" item-text="description" item-value="id"></v-autocomplete>
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                        <v-text-field :disabled="isPreviewCharged || show || (currentEditing !== null && !(currentEditing?.id === item.id))" outlined dense background-color="white" hide-details
                            @keypress="validate.isNumber($event)" @focus="editing({ ...item })" v-model="item.financial_batch_id"></v-text-field>
                    </div>
                    
                </div>
            </div>

            <div v-for="item, index in previewDisbursementList" :key="index">
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
                          @keypress="validate.isNumber($event)" v-model="item.disbursed_amount"></v-text-field>
                  </div>
                  <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                      <v-text-field outlined dense background-color="white" hide-details 
                          @keypress="validate.isNumber($event)" v-model="item.transaction_number"></v-text-field>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding">
                      <v-autocomplete outlined dense background-color="white" hide-details
                          v-model="item.disbursement_type_id" :items="disbursementTypes" item-text="description" item-value="id"></v-autocomplete>
                  </div>
                  <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                      <v-menu
                        v-model="issue_date_menu"
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
                            label="Assessed Date"
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
                            issue_date_menu = false;
                          }"
                        ></v-date-picker>
                      </v-menu>
          
                  </div>
                  <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                      <v-text-field outlined dense background-color="white"
                          @keypress="validate.isNumber($event)" v-model="item.tax_year"></v-text-field>
                  </div>
                  <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                      <v-menu
                        v-model="due_date_menu" 
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
                            label="Assessed Date"
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
                            due_date_menu = false;
                          }"
                        ></v-date-picker>
                      </v-menu>
                  </div>
                  <div class="col-xs-3 col-sm-3 col-lg-3 nopadding">
                      <v-autocomplete outlined dense background-color="white" hide-details
                          v-model="item.change_reason_id" :items="changeReasons" item-text="description" item-value="id"></v-autocomplete>
                  </div>
                  <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                      <v-text-field outlined dense background-color="white" hide-details
                          @keypress="validate.isNumber($event)" v-model="item.financial_batch_id"></v-text-field>
                  </div>
                  
              </div>
          </div>
          
            <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom">
              <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex align-end justify-end">
                  <v-btn v-if="!!disbursementsByAssessmentId?.length && !show" @click="e => {
                    $emit('blockDisburse', true);
                    show = true;
                  }" :disabled="isPreviewCharged || show || currentEditing !== null" color="success" class="">
                    Add
                  </v-btn>
              </div>
            </div>

            <div v-if="show || !disbursementsByAssessmentId?.length">
              <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom">
                  <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex align-end justify-end">
                      <v-btn :disabled="isPreviewCharged" color="success" x-small fab class="my-0"  @click="addDisbursement">
                          <v-icon>mdi-check</v-icon>
                      </v-btn>
                      <v-btn 
                          color="warning ml-5" 
                          x-small 
                          fab 
                          class="my-0" 
                          @click="setShow(false)"
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
                        @keypress="validate.isNumber($event)" v-model="newDibursement.disbursed_amount"></v-text-field>
                </div>
                <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                    <v-text-field outlined dense background-color="white" hide-details
                        @keypress="validate.isNumber($event)" v-model="newDibursement.transaction_number"></v-text-field>
                </div>
                <div class="col-xs-2 col-sm-2 col-lg-2 nopadding">
                    <v-autocomplete  outlined dense background-color="white" hide-details
                        v-model="newDibursement.disbursement_type_id" :items="disbursementTypes" item-text="description" item-value="id"></v-autocomplete>
                </div>
                <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                        <v-menu
                          v-model="new_issue_date_menu" 
                          :close-on-content-click="false"
                          transition="scale-transition"
                          left
                          nudge-top="26"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :value="newDibursement.issue_date"
                              label="Assessed Date"
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
                            :value="newDibursement.issue_date"
                            @input="e => {
                              newDibursement.issue_date = e;
                              new_issue_date_menu = false;
                            }"
                          ></v-date-picker>
                        </v-menu>
                </div>
                <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                    <v-text-field outlined dense background-color="white" hide-details
                        @keypress="validate.isNumber($event)" v-model="newDibursement.tax_year"></v-text-field>
                </div>
                <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                        <v-menu
                          v-model="new_due_date_menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          left
                          nudge-top="26"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :value="newDibursement.due_date"
                              label="Assessed Date"
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
                            :value="newDibursement.due_date"
                            @input="e => {
                              newDibursement.due_date = e;
                              new_due_date_menu = false;
                            }"
                          ></v-date-picker>
                        </v-menu>
                </div>
                <div class="col-xs-3 col-sm-3 col-lg-3 nopadding">
                    <v-autocomplete outlined dense background-color="white" hide-details
                        v-model="newDibursement.change_reason_id" :items="changeReasons" item-text="description" item-value="id"></v-autocomplete>
                </div>
                <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
                    <v-text-field outlined dense background-color="white" hide-details
                        @keypress="validate.isNumber($event)" v-model="newDibursement.financial_batch_id"></v-text-field>
                </div>
                
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
      store.dispatch("getDisbursements", { funding_request_id: this.fundingRequestId });
    }
  },
  data() {
    return {
      show: false,
      currentEditing: null,
      newDibursement: {},
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
    editing(disbursement) {
      
      if (this.currentEditing === null) {
        this.$emit("blockDisburse", true);
        this.currentEditing = disbursement;
      }

    },
    closeEditor(index) {

      const list = [ ...this.disbursements ];
      list[index] = { ...this.currentEditing };
      store.dispatch("backDisbursement", list);
      this.$emit("blockDisburse", false);
      this.currentEditing = null;
    },
    saveDisbursement(item) {
      store.dispatch("updateDisbursement", {
        data: { ...item },
        disbursement_id: item.id,
        emiter: this
      });
    },
    addDisbursement() {
      store.dispatch("postDisbursement", {
        data: { assessment_id: this.assessmentId, funding_request_id: this.fundingRequestId, ...this.newDibursement },
        emiter: this
      });
    },
    removeDisbursement(id) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this disbursement.",
        () => {
          store.dispatch("removeDisbursement", { emiter:this, disbursement_id: id, funding_request_id: this.fundingRequestId });
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
    ...mapGetters(['disbursements', 'disbursementTypes', 'changeReasons', 'isPreviewCharged', 'previewDisbursementList', 'isPreviewCharged']),
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
    store.dispatch("getDisbursements", { funding_request_id: this.fundingRequestId });
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