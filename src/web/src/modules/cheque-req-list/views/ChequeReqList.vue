<template>
  <div>
    <v-breadcrumbs
      divider="/"
      large
      :items="[
        { text: 'Administration Home', to: '/administration', exact: true },
        { 
          text: 'Cheque Req List',
          to: '/administration/cheque-req-list',
          exact: true,
        },
      ]"
    >
    </v-breadcrumbs>
    <h1>Cheque Req List</h1>
    <v-card class="default mb-5">        
      <v-card-text>
        <div class="row">

          <div class="col-md-5">
            <v-menu     
            v-model="issue_date_calendar"             
            :close-on-content-click="false"
            transition="scale-transition"
            left
            nudge-top="26"
            offset-y
            min-width="auto" 
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field     
                v-model="issueDate"                 
                label="Issue Date"
                append-icon="mdi-calendar"
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
              :value="issueDate"
              @input="e => {
                issueDate = e;
                issue_date_calendar = false;
              }"                                          
              ></v-date-picker>
          </v-menu>
        </div> 

          <div class="col-md-5">
            <v-text-field                      
              label="Re-run Batch from"
              type="number"
              hide-details                         
              outlined
              dense
              v-model="reRunBatch"
              background-color="white" 
            ></v-text-field>
          </div> 
          
          <div class="col-md-2">
            <v-btn class="my-0" color="primary" @click="e => {
              getFiles();
            }">
              <v-icon>mdi-note-text</v-icon>
              Generate
            </v-btn>
          </div>

        </div>
      </v-card-text>
    </v-card>
    <v-overlay
      v-if="showOverlay"
      :model-value="true"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import store from "@/store";  
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "ChequeReqList",
  data: () => ({
    issueDate: "",
    reRunBatch: null,
    issue_date_calendar: false,
  }),
  components: {},
  computed: {
    ...mapGetters(["showOverlay"]),
    ...mapState(["showSideBarAdmin"]),            
  },
  async created() {
    this.resetChequeReqData();
  },
  async mounted() {
    await store.dispatch("setAppSideBarAdmin", this.$route.path.startsWith("/administration"));      
  },
  methods: {
    ...mapActions(["cancel", "open", "messageStatus", "generateCSLReqListPDF", "genereteFiles", "resetChequeReqData"]),
    async getFiles() {
      this.genereteFiles({ issueDate: this.issueDate, reRunBatch: this.reRunBatch });
    }       
  }
};
</script>