<template>
  <div>
    <v-breadcrumbs
      divider="/"
      large
      :items="[
        { text: 'Administration Home', to: '/administration', exact: true },
        { 
          text: 'CSL MSFAA Receive',
          to: '/administration/csl-msfaa-receive',
          exact: true,
        },
      ]"
    >
    </v-breadcrumbs>
      
    <h1>CSL MSFAA Receive</h1>

    <v-card class="default mb-5">        
      <v-card-text>
        <div class="row"> 

        <div class="col-md-10">
          <v-file-input       
            ref="fileInput"           
            multiple
            truncate-length="15"
            outlined
            dense
            background-color="white"
            hide-details
            label="Upload document"                  
            v-model="documents"     
            @change="uploadDoc()"                         
          ></v-file-input>
        </div> 
        
          
        <div class="col-md-2">
          <v-btn :disabled="disabled.flag" @click="importFile()" class="my-0" color="primary"><v-icon>mdi-plus</v-icon>Import</v-btn>                   
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
  CSL_MSFAA_RECEIVE 
} from "../../../urls";
import jsPDF from 'jspdf';
import Modal from "../../../components/commonCatalog/Modal.vue";
import LoadingAnimation from "../../../components/commonCatalog/LoadingScreen.vue";

export default {
  name: "OfficerList",
  data: () => ({
    from: {
      date: null,
      menu: null
      
    },
    to: {
      date: null,
      menu: null
    },
    seqNum: null,    
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
    async uploadDoc() {                     
      this.statusDisabled = false;                               
      this.uploadedDoc = event.target.files[0]; 
      let enableButton = false;
      this.disabled.flag = enableButton;                  
    },
    async importFile() {
      const formData = new FormData();  
      formData.append('file', this.uploadedDoc);      
      let resInsert = await axios.post(CSL_MSFAA_RECEIVE + `/${this.uploadedDoc.name}`, formData );    
      if(resInsert.data.flag === 1) {        
        this.$emit("showSuccess", resInsert.data.data); 
        let resInsert2 = await axios.put(CSL_MSFAA_RECEIVE + `/`);            
        let newFlag = {flag:true}     
        this.isLoading = newFlag; 
        if(resInsert2.data.flag === 1) {          
          this.modalTitle = "Success";
          this.modalText = resInsert2.data.data;
          this.openModal();  
          let emptyDoc = null;
          this.documents = emptyDoc;
          let disableButton = true;
          this.disabled.flag = disableButton;      
          let newFlag = {flag:false}     
          this.isLoading = newFlag;       
        } else {
          let emptyDoc = null;
          this.documents = emptyDoc;
          let disableButton = true;
          this.disabled.flag = disableButton;     
          this.$emit("showError", resInsert2.data.data); 
          let newFlag = {flag:false}     
          this.isLoading = newFlag; 
        }
      } else {
        let emptyDoc = null;
        this.documents = emptyDoc;
        let disableButton = true;
        this.disabled.flag = disableButton;     
        this.$emit("showError", resInsert.data.data);   
    }
  },
  },
   
};
</script>