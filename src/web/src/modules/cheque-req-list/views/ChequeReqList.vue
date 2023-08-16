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
{{ reRunBatch }}
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
            <v-btn class="my-0" color="primary" @click="getData">
              <v-icon>mdi-note-text</v-icon>
              Generate
            </v-btn>
          </div>

        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import store from "@/store";  
import { mapActions, mapState } from "vuex";
import axios from 'axios';
import { CHEQUE_REQ_LIST } from '../../../urls';
import { saveAs } from 'file-saver';

export default {
  name: "ChequeReqList",
  data: () => ({
    issueDate: "",
    reRunBatch: null,
    issue_date_calendar: false,
  }),
  components: {},
  computed: {
    ...mapState(["showSideBarAdmin"]),            
  },
  async mounted() {
    await store.dispatch("setAppSideBarAdmin", this.$route.path.startsWith("/administration"));      
  },
  methods: {
    ...mapActions(["cancel", "open", "messageStatus"]),
    async getData() {
      try {
        const res = await axios.get(CHEQUE_REQ_LIST + "?issueDate=" + this.issueDate + "&reRunBatch=" + this.reRunBatch);

        if (res?.data?.success) {
          const records = res?.data?.data.records ?? [];
          const filename = res?.data?.data.filename ?? 'file.dat';
          
          let text = '';
          let v_switch = null;

          if (records?.length > 0) {
            for (const recordset of records) {

              if (recordset.record1 !== v_switch || v_switch === null) {
                text += recordset.record1 + '\n';
                  v_switch = recordset.record1;
              }

              text += recordset.record2 + '\n';
              text += recordset.record3 + '\n';
              text += recordset.record4 + '\n';
            }
          }

          let blob = new Blob([text], {type: "text/plain;charset=utf-8"});    
          saveAs(blob, filename);
        } else {
          this.messageStatus({ message: res?.data?.text , status: "error" });
        }

      } catch (error) {
        console.log(error);
      }
    }          
  }
};
</script>