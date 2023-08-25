<template>      
    <div>
      <v-breadcrumbs
        divider="/"
        large
        :items="[
          { text: 'Administration Home', to: '/administration', exact: true },
          { 
            text: 'CSL Certificate Export',
            to: '/administration/csl-certificate-export',
            exact: true,
          },
        ]"
      >
      </v-breadcrumbs>
        
      <h1>CSL Certificate Export</h1>      
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
                v-model="from.menu"    
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field                      
                    label="Date"
                    append-icon="mdi-calendar"
                    hide-details
                    readonly                                
                    outlined
                    dense
                    background-color="white"
                    v-bind="attrs"
                    v-on="on"       
                    :value="from.date ? from.date.toString().slice(0, 10) : from.date"         
                    ></v-text-field>
                  </template>
                  <v-date-picker    
                    v-model="from.date"    
                    @input="from.menu = false"   
                    @change = "checkFilled()"                                            
                  ></v-date-picker>
              </v-menu>
            </div>    

            <div class="col-md-5">
                <v-menu                  
                :close-on-content-click="false"
                transition="scale-transition"
                left
                nudge-top="26"
                offset-y
                min-width="auto"        
                v-model="to.menu"        
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field                      
                    label="Date"
                    append-icon="mdi-calendar"
                    hide-details
                    readonly                                
                    outlined
                    dense
                    background-color="white"
                    v-bind="attrs"
                    v-on="on"         
                    :value="to.date ? to.date.toString().slice(0, 10) : to.date"                
                    ></v-text-field>
                  </template>
                  <v-date-picker   
                    v-model="to.date"    
                    @input="to.menu = false"       
                    @change = "checkFilled()"
                  ></v-date-picker>
              </v-menu>
            </div> 
            
              
            <div class="col-md-1">
              <v-btn :disabled=disabled.flag @click="generateReport(0)" class="my-0" color="primary"><v-icon>mdi-plus</v-icon>Export</v-btn>                   
            </div>

            <div class="col-md-1">
              <v-btn :disabled=disabled.flag @click="generateReport(1)" class="my-0" color="primary"><v-icon style="margin-right: 2px;">mdi-eye</v-icon>Preview</v-btn>       
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
  CSL_CERTIFICATE_EXPORT
} from "../../../urls";
import jsPDF from 'jspdf';
import Modal from "../../../components/commonCatalog/Modal.vue";
import LoadingAnimation from "../../../components/commonCatalog/LoadingScreen.vue";
import moment from "moment";

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
    async checkFilled() {
      if(this.from.date && this.to.date) {        
        this.disabled = {flag: false}
      }      
    },

    async generateReport(isPreview) {           
      
      if(this.from.date === "" || this.from.date === null || this.to.date === "" || this.to.date === null) {
        this.modalTitle = "Error";
        this.modalText ="Please fill in all the fields";
        this.openModal();
      } else {   
        let newFlag = {flag:true}     
        this.disabled = newFlag;    
        
        let newLoading = {flag:true}     
        this.isLoading = newFlag; 
        let resInsert;
        if(isPreview) {          
          resInsert = await axios.put(CSL_CERTIFICATE_EXPORT + `/${this.from.date}/${this.to.date}/1`);          
        } else {          
          resInsert = await axios.put(CSL_CERTIFICATE_EXPORT + `/${this.from.date}/${this.to.date}/0`);          
        }
      
        if(resInsert.data.flag === 0 || !resInsert.data.data) {   
          let newFlag = {flag:false}     
          this.disabled = newFlag;                 
          let newLoading = {flag:false}     
          this.isLoading = newFlag; 
          this.$emit("showError", resInsert.data.data);          
        } else {
          let resInsert2;
          if(isPreview === 1) {
            resInsert2 = await axios.get(CSL_CERTIFICATE_EXPORT + `/${this.from.date}/${this.to.date}/${resInsert.data.data}/1`);
          } else {
            resInsert2 = await axios.get(CSL_CERTIFICATE_EXPORT + `/${this.from.date}/${this.to.date}/${resInsert.data.data}/0`);
          }
                        

          if(resInsert2.data.success) {
            this.tableData = resInsert2.data.data1;
            this.batch =  resInsert2.data.batch;
            this.generatePDF(isPreview);          
          
            let FileSaver = require('file-saver');                                                            
            const regex = /PPYT\.EDU\.CERTS\.D\d+\.001/;
            
            const match = resInsert2.data.data2[0]['fileText'] ? resInsert2.data.data2[0]['fileText'].match(regex) : '';            
            const resultado = match ? match[0] : '';

            let blob = new Blob([resInsert2.data.data2[0]['fileText'].replace(/PPYT\.EDU\.CERTS\.D\d+\.001/, '')], {type: "text/plain;charset=utf-8"});    
            FileSaver.saveAs(blob, `${isPreview === 1 ? 'PREVIEW_' : ''}${resultado}.txt`);   
            let newFlag = {flag:false}     
            this.disabled = newFlag;                 

            let newLoading = {flag:false}     
            this.isLoading = newFlag; 
          } else {
            this.$emit("showError", resInsert2.data.message);
            let newFlag = {flag:false}     
            this.disabled = newFlag;  
            
            let newLoading = {flag:false}     
            this.isLoading = newLoading;                         
          }
        }
      }  
      
    },    
    strMonth(month) {
      let stringMonth = "";
      switch(parseInt(month)) {
              case 1:
                  stringMonth = "Jan";
                  break;
              case 2:
                  stringMonth = "Feb";
                  break;
              case 3:
                  stringMonth = "Mar";
                  break;
              case 4:
                  stringMonth = "Apr";
                  break;
              case 5:
                  stringMonth = "May";
                  break;
              case 6:
                  stringMonth = "Jun";
                  break;
              case 7:
                  stringMonth = "Jul";
                  break;
              case 8:
                  stringMonth = "Aug";
                  break;
              case 9:
                  stringMonth = "Sep";
                  break;
              case 10:
                  stringMonth = "Oct";
                  break;
              case 11:
                  stringMonth = "Nov";
                  break;
              case 12:
                  stringMonth = "Dec";
                  break;
              default:
                  stringMonth = "?"                        
          }       
      return stringMonth.toUpperCase();                    
    },
    async generatePDF(isPreview) {                   
      const doc = new jsPDF();        
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });      

            
      let htmlTop = `<div style="width: 190px">
  <header
    style="
      display: flex;
      padding: 15px;
      padding-bottom: 0;
      margin-bottom: -13px;
    "
  >
    <img
      style="
        width: 52.5px;
        height: 20.7px;
        object-fit: contain;
        margin-left: -3px;
      "
      src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QMuaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA2LjAtYzAwMiA3OS4xNjQ0NjAsIDIwMjAvMDUvMTItMTY6MDQ6MTcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI2MDc0RDgyRDY4MjExRUE4QzRDODg2MTc1MjgxRkU2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI2MDc0RDgzRDY4MjExRUE4QzRDODg2MTc1MjgxRkU2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDc0MDlDQjVENjgxMTFFQThDNEM4ODYxNzUyODFGRTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDc0MDlDQjZENjgxMTFFQThDNEM4ODYxNzUyODFGRTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAACAgICAgICAgICAwICAgME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"
      alt=""
    />
    <div
      style="
        width: 104px;
        font-family: Montserrat, Helvetica, Arial, sans-serif;
        font-weight: 700;
        text-align: right;
        font-size: 3.6px;
      "
    >
      <p>GOVERNMENT OF YUKON, DEPARTMENT OF EDUCATION</p>
      <p>STUDENT FINANCIAL ASSISTANCE</p>
      <p style="font-size: 5px; margin-bottom: 1px;">CSL Entitlement List</p>      
      <p style="font-size: 3.1px; font-weight: 400;">FROM: ${moment(this.from.date.slice(0, 10), 'YYYY-MM-DD').format('YYYY MMM DD').toUpperCase()} TO: ${moment(this.to.date, 'YYYY-MM-DD').format('YYYY MMM DD').toUpperCase()}</p>
    </div>
  </header>  

  <img
    style="width: 100%; height: 1px; padding: 0 15px"
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoMAAAAHCAYAAABz0EdpAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABLSURBVHhe7dmxDQAhDAPA5PffGdALUVPjuyZSJrDsHksBABDp2xcAgECnGezu/wEAwBtuBmAzMQBAMDMxAEAwYRAAIJgwCAAQq2oCxpYPAOUrzPUAAAAASUVORK5CYII="
    alt=""
  />

  <p style="font-size: 3px; padding: 0 15px">BATCH ID: ${this.batch}</p>
  <table style="font-size: 3px; width: 160px; margin: 0 15px"
    <thead>
      <tr>
        <th>Certificate</th>
        <th>Name</th>
        <th>Funding Request type</th>
        <th>CSL Amount</th>
        <th>Issue Date</th>
        <th>Due Date</th>
      </tr>      
    </thead>
`;


      let dataColumns = "";
      let idx = 0;
      
      if(this.tableData) {
        for(let col of this.tableData) {             
          dataColumns += "<tr style='text-align: center;'>"
          dataColumns += "<td>"
            dataColumns += col.id;
          dataColumns += "</td>"

          dataColumns += "<td>"
          dataColumns += col.name;
          dataColumns += "</td>"

          dataColumns += "<td>"
          dataColumns += col.description;
          dataColumns += "</td>"

          dataColumns += "<td>"
          dataColumns += formatter.format(col.csl_amount);
          dataColumns += "</td>"

          dataColumns += "<td>"          
          dataColumns += col.issue_date ? moment(col.issue_date, 'YYYY-MM-DD').format('YYYY MMM DD').toUpperCase() : null;
          dataColumns += "</td>"

          dataColumns += "<td>"
          dataColumns += col.due_date ? moment(col.due_date, 'YYYY-MM-DD').format('YYYY MMM DD').toUpperCase() : null;

          dataColumns += "</td>"                         
        dataColumns += "</tr>"                              
      }
      }      

      let htmlBottom = `
      </table>
      </div>`

      let finalHTML = htmlTop + dataColumns + htmlBottom;
      
      let fileName = `${isPreview === 1 ? 'PREVIEW_' : ''}EDU-SFA`;

      doc.html(finalHTML, {
        callback: function (doc) {      
          doc.save(fileName);
      },
      x: 10,
      y: 10
      }); 
    },   
    openModal() {
      this.$refs.modal.openModal();
    },
    
  },
};
</script>
