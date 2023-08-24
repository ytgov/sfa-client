<template>
  <div>
    <v-breadcrumbs
      divider="/"
      large
      :items="[
        { text: 'Administration Home', to: '/administration', exact: true },
        { 
          text: 'CSL MSFAA Send',
          to: '/administration/csl-msfaa-receive',
          exact: true,
        },
      ]"
    >
    </v-breadcrumbs>
      
    <h1>CSL MSFAA Send</h1>

    <v-card class="default mb-5">        
      <v-card-text>
        <div class="row">                
          <div class="col-md-5">
            <v-menu                  
            :close-on-content-click="false"
            transition="scale-transition"
            left
            nudge-top="26"
            offset-y
            min-width="auto"       
            v-model="exportDate.menu"                
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field                      
                label="Export Date"
                append-icon="mdi-calendar"
                hide-details
                readonly                                
                outlined
                dense
                background-color="white"
                v-bind="attrs"
                v-on="on"       
                :value="exportDate.date ? exportDate.date.toString().slice(0, 10) : exportDate.date"                       
                ></v-text-field>
              </template>
              <v-date-picker    
                v-model="exportDate.date"    
                @input="exportDate.menu = false"   
                @change="checkFilled()"                                              
              ></v-date-picker>
            </v-menu>
          </div> 

          <div class="col-md-5">
            <v-text-field
              outlined
              background-color="white"
              dense              
              hide-details
              label="Sequence Number"
              v-model="seqNum"     
              @change="checkFilled()"          
            ></v-text-field>
          </div>      
        <div class="col-md-1">          
          <v-btn @click="importFile(0)" class="my-0" color="primary"><v-icon>mdi-plus</v-icon>Create</v-btn>                             
        </div>
        <div class="col-md-1">
          <v-btn :disabled="disabled.flag" @click="importFile(1)" class="my-0" color="primary"><v-icon>mdi-plus</v-icon>Resend</v-btn>       
        </div>
                       
      </div>
      </v-card-text>
  </v-card>
  <modal :title="this.modalTitle" ref="modal">      
    <p>{{ this.modalText }}</p>
  </modal>     
  <loading-animation :loading="isLoading.flag" />
  </div>
</template>

<script>
import store from "@/store";  
import { mapState } from "vuex";
import axios from "axios";
import {
  CSL_MSFAA_SEND, INDIGENOUS_LERNER 
} from "../../../urls";
import jsPDF from 'jspdf';
import Modal from "../../../components/commonCatalog/Modal.vue";
import LoadingAnimation from "../../../components/commonCatalog/LoadingScreen.vue";
import moment from "moment";
export default {
  name: "OfficerList",
  data: () => ({
    exportDate: {
      date: null,
      menu: null      
    },
    seqNum: null,
    nextValue: null,    
    tableData: null,
    batch: null,
    modalText: null,
    modalTitle: null,
    disabled: {flag: false},
    documents: null,
    statusDisabled: false,
    uploadedDoc: null,
    modalText: null,
    modalTitle: null,
    disabled: {flag: true},
    isLoading: {flag: false}, 
    pdfData: null,
    seq: null,
    date: null
  }),
  components: {
    Modal,
    LoadingAnimation
  },
  computed: {
    ...mapState(["showSideBarAdmin"]),            
  },
  async mounted() {
    await store.dispatch("setAppSideBarAdmin", this.$route.path.startsWith("/administration"));      
  },
  methods: {                   
    openModal() {
      this.$refs.modal.openModal();
    },
    async importFile(type) {            
      if(this.checkFilled()) {                   
        let resInsert = await axios.get(CSL_MSFAA_SEND + `/${this.exportDate.date ? this.exportDate.date : "0000-00-00"}/${this.seqNum ? this.seqNum : "-1"}/${type}`);                                
        if(resInsert.data.flag) {
          this.$emit("showSuccess", resInsert.data.message)
          let FileSaver = require('file-saver'); 
          let blob = new Blob([resInsert.data.data], {type: "text/plain;charset=utf-8"});    
          FileSaver.saveAs(blob, `${resInsert.data.filename}.txt`);             
        } else {
          this.modalTitle = "Error";
          this.modalText = resInsert.data.message;
          this.openModal();
          let FileSaver = require('file-saver'); 
          let blob = new Blob([resInsert.data.data], {type: "text/plain;charset=utf-8"});    
          FileSaver.saveAs(blob, `${resInsert.data.filename}.txt`);   
        }        
      }      
    },
    async checkFilled() {   
      if(/^\s*$/.test(this.seqNum)) {          
          this.disabled = {flag: true}
      } else {
        if(this.exportDate.date && this.seqNum) {          
          this.disabled = {flag: false}     
          return true;       
        }
      }  
    },
  },
   
};
</script>