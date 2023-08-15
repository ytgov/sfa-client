<template>      
    <div>
      <v-breadcrumbs
        divider="/"
        large
        :items="[
          { text: 'Administration Home', to: '/administration', exact: true },
          { 
            text: 'CSL Entitlement Feedback',
            to: '/administration/csl-entitlement-feedback',
            exact: true,
          },
        ]"
      >
      </v-breadcrumbs>
        
      <h1>CSL Entitlement Feedback</h1>      
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
  CSL_ENTITLEMENT_FEEDBACK 
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
    async uploadDoc() {                     
      this.statusDisabled = false;                               
      this.uploadedDoc = event.target.files[0]; 
      let enableButton = false;
      this.disabled.flag = enableButton;                  
    },
    async importFile() {
      const formData = new FormData();  
      formData.append('file', this.uploadedDoc);      
      let resInsert = await axios.post(CSL_ENTITLEMENT_FEEDBACK + `/${this.uploadedDoc.name}`, formData );   
      console.log(resInsert)
      this.seq = resInsert.data.seq;
      this.date = resInsert.data.date;      
      if(resInsert.data.flag === 0) {
        this.$emit("showError", resInsert.data.data);
      } else {
        this.$emit("showSuccess", resInsert.data.data);
        this.pdfData =  resInsert.data.tableData;        
        this.generatePDF();
      }
    },

    async generatePDF() {                   
      const doc = new jsPDF();        
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });      

            
      let htmlTop = `<div style="width: 190px">
  <header
    style="
      display: flex;
      padding: 8px;
      padding-bottom: 0;
      margin-bottom: -13px;            
      justify-content: space-evenly;
      align-items: center;
    "
  >  
    <img
      style="
        width: 30.5px;
        height: auto;
        object-fit: contain;
        margin-left: -3px;
      "
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG0AAAAsCAYAAABv/DafAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+makupOJhBxCFDdbKLijiWKhbBQmkrtOpgcv2FJg1Jiouj4Fpw8Gex6uDirKuDqyAI/oC4ujgpukiJ3yWFFjHecdzDe9/7cvcdILRqTDX7YoCqWUY6EZdy+VUp8IogTREhDMjM1JOZxSw8x9c9fHy/i/Is77o/x2ChaDLAJxHHmG5YxBvEs5uWznmfWGQVuUB8Tjxp0AWJH7muuPzGueywwDNFI5ueJxaJpXIPKz3MKoZKPEMcKaga5Qs5lwuctzirtQbr3JO/MFzUVjJcpzWGBJaQRAoSFDRQRQ0WorRrpJhI03ncwz/q+FPkUshVBSPHAupQITt+8D/43VuzND3lJoXjQP+LbX+MA4FdoN207e9j226fAP5n4Err+ustYO6T9GZXixwBQ9vAxXVXU/aAyx1g5EmXDdmR/LSEUgl4P6NvygPDt0Boze1b5xynD0CWerV8AxwcAhNlyl73eHewt2//1nT69wM9bXKRKO7EoAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAN1wAADdcBQiibeAAAAAd0SU1FB+cICBQLNZw59PAAAAhySURBVHja7Zt7cFTVHcc/524CFdkEfECo1Iqjo+hQtegUK9QiKPUBJLQkwqCjyKNFWmytFakl2Fq0VTuto6CMD8TBJBseVmTQMNSBUcEHYFsexbYMVAEhAmE3JJCwe/rHPQs3d8+5eze7Szbtfmd2Zu/vPO/5/c7vdc6FPFKCDBHo6DlYeTb4x+EqLmiMMTrPtBxEYxXD9qygW8JiCUoRjEnYfRIRDjEqz7QORNSiT7CZV2Vl2/URFmMk3CZDdGnD5BAPC8nwPNM6Uv0I9iIZE7mMuXFaZBm9kHwbKA5Lhp6kVzNWwiNAfZ5pp8uxqExcA2mxV/19MBziHgDZymiwnRABZQBHqhkkBYsAgeSArm/5PIV5pmUYkf48EQkxxekVth47yTSQzG+sYhi0sWWlDUu4UAheB74CIAX726jMGoY39udV9hLNMy3DEDFekpJ5Ecnfj4QYLyuxzp5AGGhUVQpjFrXADY5mva0o7wG9HbR6gEiIG8I1rI/B6pjgTfEIsYzPOW/BIFzNIgR3qMftEn4j4NfARb7VrGQCgrsEJx2S7UHBAFGe+Z2WZ5qKvwIWO6CtV5iWrYTxxRVU5R2RLKHnOHZJyYsZ7PLTIkEoayr9/y5wruYKKShFUi8t9ilbVI+FEFE2ShKDaheagTOSrOokabFOtFIiLfoCJULSV8Km4ttZnGdae2xYDZOBZyE1d1xI/hSDxUKwBgimqC8XBHtzrxjKiTzT2omGEDdaklqg2OeiLwxWMFEIZKSGoRJWAV39JFgk/Ky4gqfzNi1N9ChntZAMBnZpRPl9l1NRHbSYJAQSIFjBO0JyBzg8Q8EHkLCLwlIyMpMMi++0s4BhhvJ/A5tS7LMfcLWhbA1wKENznwH8REOfDPzFt417jd4ywEoJA9WK1AZhXKNklrTd/pXBBsrEVFoTAvNqpkrBc8C6YBMjwmcyVkgWqs0Qica4vuc4NmfDEbGAtcBgTflBoD/+82oW8B4wSFO2HhjSRjrTwxygUkMfBaxI1vhQiPMDklIhKEMyBAgIWN1dcJsop0UxZVp3i5dFOc0e9nFitAvLepbREG8jBc/GhwFWIFketKjz6qc9Nu0S4JN4SsaFF4FJPvv7KfAHDf048E1gWwYFLmWmRarpLwVl2Iwa6LLpG5qOM7zkTo6m7eiEmInkMRf5KPCWlCwvamapuJtj6dq0HcCjhjoT4VRW2wPnY6sTHSozzLB2IVrAcSk4iuS4y8nYKgW3ZoJhAEXlPI7kcRd5t4QtlsXmdBjmRgHwsW13E35bfLjHfza03Zyqa53CTtONN9JP46al9D0SYnq4hiVNIc7LhpBEQvwyUs20bPUfxxVAi2ExZnq0Kze0aQWuytJc02JaZ0aB6/mvwFMGBs0GQsBOF73YYMcAfqt2WmfHV5XdL1FrVq88639meJyLgCuBIuBL5Wf8x0/DrsBWgxSv0tR/3lB3m+priqF8isccRhrazEljpw0FjhnaLNTErGcCDyqhixna7QaeAS5IUytcA9QZ6rxv8OwTcK1yzXWd/MBRb5Ch3gk1EXKEad8AGgz1ayHhWlwF8IWhvu7XorRNYTuYNsFDmJxm5s5kGZH1wDxD2dNKJXZR4YCuj6eAj3JEtfUD3jakq14HxjliRwHMBapoe8CZDIUq3FkDnJ1CuxHAyz7SYQXAAmBAsjTWTI39AuiDfZHlIeAyTfmnrh3RkThHqfQSTVkdcLsr9VSp3qu9OdkhShC6+qx/r8av8DJbs0nS4KjqVGfHpmvybCjdPxkyE/mniW7AG8qB0KXTSlXQ7wzKZ3v0t0Ol9E6oPq82CP1g4HfAfSnO94gSliKPOqOBbskSxm8Br2joAYM0zQPW5QDDAsBryjbrVH+pS7AKgScNO+xfwPXApcB4ZVu+pbTMWsP404CLfc71bdVXD6XCBwIbPdTwQD9Z/vuAPT7q7QZm5YhaXKCk0o3NwK2curQTx1jDIn8GXGcQxB3ATYayQp877R9qntsdtE3ALWrnacMPP0xr8DmBqUAkBxg2S6Xe3PgE+zTjsKas1NDXzyHxPqMDLeq9Y4YcaDLbuNilouM4oFS7Nkvm9zxtCbDUo/wltc1zAYMM9LUGhqHUnxthYJnP3fKOht4X+HqStrs8ykyBu0jlEHQ60KShNyqJzHX82GDjCoFzNfS/GZwtHd410Pv4cD5M2G8qSIVpXyhVqZPIw52AaZbK3rgD4B4GNdaYQt+m88aibL1IR6GgnWXpYADwCxftsMEm9UqhX1NAfeB/jWnnJclipINDwB8NZb9S7nscJ4B9htTXWT7Hu05Dk8r77JRMM9mFKz3aXJPGeGHgZuB+g63pqlJHlivY1u32GT7GuxT9HZuN2Jn6Tsm0BgN9hEFCrwW+n8Z4M4APlcqbqtxynYf5Q8fzckNfD4Hnx4LFwCLQfoe9NJvGOdvY6ZG1WIWd7/sO8F3s6wp1pHfSfdDxfxskHPvH8RjwNfX/DRXH6TzLldi51l4u+ijgA4NW2I99ZJMT2EPisUGybElALaTMwG+Oo985+Dua6YL5fHClK1Zr9Rg7qgRwi1LBXvMc75qD37k6YTzSOh07LQopf9zQlMHxW4B7DB7iLdhnZ/Hg+0dJtFI/4HK8r4TPxc570pnVY/xFdvmsuw94IMPjbwBeMJQ94wiuX8BO9ra0Y4yY8kwfPh0B5+lAg5LqZIzbin20kQ1X+QGDKj8H+L3jeT72udiGFPrejp2IflSpsA4LcHV4E+ipCU79vtgAlU4qx775JTh1n2S+csWb1Bi1BqY6/+vq7PUIBSYDd2vKumHnCj9Xzx8qL3aEmuv3sC/3uAWxTnmetXjfnE51rnEHTtdmZ0d+NRNQLnMzuXFomgzdFeMKlHd4sKMm8l9nJ+67xWm0fgAAAABJRU5ErkJggg=="
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
      <p style="font-size: 5px; margin-bottom: 5px;">Entitlement Feedback File Report</p>
      <p style="font-size: 3.1px; font-weight: 400;"></p>
    </div>
  </header>

  <img
    style="width: 100%; height: 1px; padding: 0 8px;"
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoMAAAAHCAYAAABz0EdpAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABLSURBVHhe7dmxDQAhDAPA5PffGdALUVPjuyZSJrDsHksBABDp2xcAgECnGezu/wEAwBtuBmAzMQBAMDMxAEAwYRAAIJgwCAAQq2oCxpYPAOUrzPUAAAAASUVORK5CYII="
    alt=""
  />

  <div style="display: flex; margin-bottom: 2px;">
    <p style="font-size: 3px; padding: 0 8px; margin-bottom: 3px">ECert File Received Date: ${this.date ? this.date : ""}</p>
    <p style="font-size: 3px; padding: 0 8px;">ECert Seq:  ${Number(this.seq) ? Number(this.seq) : ""}</p>
  </div>
  <table style="font-size: 3px; margin: 0 8px;"
    <thead>
      <tr>
        <th>SIN</th>
        <th>Certificate</th>
        <th>Name</th>
        <th>Status</th>
        <th>Sent to NCSL</th>
        <th>Error Message</th>         
      </tr>      
    </thead>
`;


      let dataColumns = "";
      let idx = 0;
          
      if(this.pdfData) {
        for(let col of this.pdfData) {             
          dataColumns += "<tr style='text-align: center;'>"
          dataColumns += "<td>"
            dataColumns += col.sin ? col.sin : "";
          dataColumns += "</td>"

          dataColumns += "<td>"
          dataColumns += col.certificate_number ? col.certificate_number : "";
          dataColumns += "</td>"

          dataColumns += "<td>"
          dataColumns += col.student_name ? col.student_name : "";
          dataColumns += "</td>"

          dataColumns += "<td>"
          dataColumns += col.ecert_status ? col.ecert_status : "";
          dataColumns += "</td>"

          dataColumns += "<td>"          
          dataColumns += col.ecert_sent_date ? col.ecert_sent_date : "";
          dataColumns += "</td>"

          dataColumns += "<td>"
          dataColumns += col.error_message ? col.error_message : "";
          dataColumns += "</td>"      
                  
        dataColumns += "</tr>"                              
      }      
      }
      
      
      
      let htmlBottom = `
      </table>
      </div>`

      console.log("----", this.date);
      let finalHTML = htmlTop + dataColumns + htmlBottom;
      let fileName = `${this.date ? moment(this.date, 'YYYY-MMM-DD').format('YYYY-MM-DD') : ""} MSFAA_RECEIVED_RPT`;

      doc.html(finalHTML, {
        callback: function (doc) {      
          doc.save(fileName);
      },
      x: 10,
      y: 10
      }); 
    },   
  },
   
};
</script>