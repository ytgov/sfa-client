<template>
  <div class="home">
    <h1>Documentation Required and Received</h1>

    <v-card class="default mb-5">
      <v-card-text>
        <div class="row">
          <div class="col-md-12">
            <h3>Documentation</h3>
            <div v-for="(item, i) of this.application.finalDocumentation" :key="i" class="row">                       
              
              <div class="col-md-4">
                <v-select
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  disabled
                  label="Documentation"
                  v-model="item.description"
                  :items="documents2"
                  item-text="description"
                  item-value="description"                  
                ></v-select>
              </div>
              <div class="col-md-2">
                <v-menu
                  v-model="item.upload_date_menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  left
                  nudge-top="26"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="item.upload_date"
                      label="Received date"
                      append-icon="mdi-calendar"
                      hide-details
                      readonly
                      disabled
                      outlined
                      dense
                      background-color="white"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="item.upload_date"                    
                    @input="item.upload_date_menu = false"
                  ></v-date-picker>
                </v-menu>
              </div>

              <div class="col-md-2">
                <v-menu
                  v-model="item.completed_date_menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  left
                  nudge-top="26"
                  offset-y
                  min-width="auto"                  
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="item.completed_date"
                      label="Completed date"
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
                    :value="formatDate(item.completed_date)"
                    @input="e => {
                      item.completed_date = e;
                      item.completed_date_menu = false;
                    }"                                        
                    @change="updateReqMet({completed_date: item.completed_date}, item.requirement_type_id, item)"
                  ></v-date-picker>
                </v-menu>
              </div>

              <div class="col-md-3">
                
                <v-autocomplete
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Status"
                  v-model="item.status"
                  :items="documentStatusList"
                  item-text="description"
                  item-value="id"
                  @change="updateStatus({status: item.status}, item.requirement_type_id)"
                  @click="printItem(item)"
                ></v-autocomplete>
               
                
              </div>

              <div class="col-md-1">
                <v-btn
                  color="warning"
                  x-small
                  fab
                  title="Remove"
                  class="my-0 float-right"
                  @click="removeDocumentation(i)"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </div>
              <div class="col-md-4">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Comment"
                  v-model="item.comment"    
                  @change="updateReqMet({comment: item.comment}, item.requirement_type_id)" 
                  required             
                ></v-text-field>
              </div>
              <div class="col-md-4">
                <v-file-input
                  multiple
                  truncate-length="15"
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Upload document"
                  @change="uploadDoc(item)"
                ></v-file-input>
              </div>
              <div class="col-md-1" v-if="item.file_name && item.upload_date">
                <h4 class>{{ item.file_name }}</h4>
              </div>

              <div class="col-md-1" v-if="item.file_name && item.upload_date && item.mime_type === 'application/pdf'">           
                <v-btn
                  class="mt-0"
                  color="success"   
                  @click="showPDF(item.requirement_type_id)"               
                  >
                    Preview
                </v-btn>                                
              </div>

              <div class="col-md-1" v-if="item.file_name && item.upload_date">
                <!-- <a :href="downloadPdf(item.requirement_type_id)">{{ item.file_name }}</a> -->
                <v-btn
                  class="mt-0"
                  color="success"                                          
                  :href="downloadPdf(item.requirement_type_id)"          
                  >
                  {{ item.file_name }}
                </v-btn>  
              </div>     
              
              
            </div>            
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- <v-btn color="info" @click="addDocumentation()">Add documentation</v-btn> -->

     <v-card class="default mb-5 row"  v-if="showAdd"> 
      
            <div class="col-md-6">
                <h3 class="text-h6 font-weight-regular">Add Documentation</h3>
            </div>
            <div class="col-md-6">
                <v-row>
                    <div class="col-md-6">
                        <v-btn @click="setClose" block color="error" class="my-0">Cancel</v-btn>
                    </div>
                    <div class="col-md-6">
                        <v-btn block color="success" class="my-0" @click="handleUploadAndClose()">Add</v-btn>
                    </div>
                </v-row>
            </div>

            
            <div class="col-md-4">
                <v-select
                  outlined
                  dense
                  background-color="white"
                  hide-details                  
                  label="Documentation"
                  v-model="documentationData.description"
                  :items="documents2"
                  item-text="description"
                  item-value="id"
                ></v-select>
              </div>
              <div class="col-md-2">
                <v-menu
                  v-model="documentationData.received_date_menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  left
                  nudge-top="26"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="documentationData.received_date"
                      label="Received date"
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
                    v-model="documentationData.received_date"                    
                    @input="documentationData.received_date_menu = false"
                  ></v-date-picker>
                </v-menu>
              </div>

              <div class="col-md-2">
                <v-menu
                  v-model="documentationData.completed_date_menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  left
                  nudge-top="26"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="documentationData.completed_date"
                      label="Completed date"
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
                    v-model="documentationData.completed_date"
                    @input="documentationData.completed_date_menu = false"                    
                  ></v-date-picker>
                </v-menu>
              </div>

              <div class="col-md-3">
                
                <v-autocomplete
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Status"
                  v-model="documentationData.status"
                  :items="documentStatusList"
                  item-text="description"
                  item-value="id"                  
                ></v-autocomplete>                               
              </div>
              <div class="col-md-4">
                <v-file-input
                  multiple
                  truncate-length="15"
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Upload document"     
                  @change="checkFile"
                ></v-file-input>
              </div>

        </v-card>

        <v-btn
            color="primary"
            @click="setClose"
            v-if="!showAdd"
        >
            Add Documentation
        </v-btn>
        <v-btn
            v-else
            color="primary"
            @click="setClose"
        >
            Cancel
        </v-btn>
    <confirm-dialog ref="confirm"></confirm-dialog>
    <show-pdf ref="showPdf">
        </show-pdf>
  </div>
</template>

<script>
import store from "../../store";
import { mapGetters } from "vuex";
import axios from "axios";
import {
  APPLICATION_URL,
  REQUIREMENT_TYPE_URL,  
} from "../../urls";

export default {
  name: "Home",
  data: () => ({
    applicationId: -1,
    documentationOptions: [
      "YG Application",
      "Official Transcript - Original document (must be mailed)",
    ],
    documents: [],
    documents2: [],
    uploadedDoc: null,
    showAdd: false,
    documentationData: {
      description: null,
      received_date: null,
      completed_date: null,
      status: null,
      received_date_menu: null,
      completed_date_menu: null,
      file: null
    }
  }),
  computed: {
    ...mapGetters(["documentStatusList"]),   
    application: function () {    
      return store.getters.selectedApplication;
    },
    student: function () {
      return store.getters.selectedStudent;
    },
  },  
  async created() {    
    this.loadRequirementTypes();        
    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;
    
    if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {
      await store.dispatch("loadApplication", this.applicationId);
    }
    
    store.dispatch("setAppSidebar", true);
    store.dispatch("setDocumentStatus");
  },
  methods: {    
    checkFile(event) {      
      const formData = new FormData();
      // Agrega los archivos al objeto FormData
      //formData.append('files', event.target.files[0]);
      
      //this.documentationData.file = formData;
      //console.log(event)
      this.documentationData.file = event;            
    },    
    handleUploadAndClose() {
      this.uploadNewDoc(),
      this.setClose()
    },
    async uploadNewDoc() {          
          
      const formData = new FormData();
      // Agrega los archivos al objeto FormData
      formData.append('files', this.documentationData.file[0]);
      formData.append("requirement_type_id", this.documentationData.description);
      formData.append("disability_requirement_id", null);
      formData.append("person_id", null);
      formData.append("dependent_id", null);

      const innerFormData = new FormData();   
      innerFormData.append('requirement_type_id', this.documentationData.description  );
      innerFormData.append('completed_date', this.documentationData.completed_date  );
            
      console.log(this.documentationData.description);
      console.log(this.documentationData.completed_date);
    
        try {          
          const resInsert = await axios.post(APPLICATION_URL + `/${this.application.id}/student/${this.student.id}/files`,
          formData, {headers: {'Content-Type': 'multipart/form-data'},});            

          try {                             
            const resInsert = await axios.post(APPLICATION_URL + `/${this.application.id}/student/${this.student.id}/files/${this.documentationData.description}`,
            innerFormData, {headers: {'Content-Type': 'multipart/form-data' },});                        
            const message = resInsert?.data?.messages[0];            
            if (message?.variant === "success") {
              this.$emit("showSuccess", message.text);
            } else {
              this.$emit("showError", message.text);
            }   
                
          } catch (error) {
            console.log(error)
            this.$emit("showError", "Error to update inner");
          } finally {
            store.dispatch("loadApplication", this.applicationId);
          }
          
          const message = resInsert.data.messages[0];          
          if (message?.variant === "success") {
            this.$emit("showSuccess", message.text);
          } else {
            this.$emit("showError", message.text);
          }          
        } catch (error) {
          console.log(error)
          this.$emit("showError", "Error to update");
        } finally {
          store.dispatch("loadApplication", this.applicationId);
        }        
        
    },
    print(data) {
      //console.log(data);      
      //console.log(this.documents2);  
      console.log("**",this.documentationData)   
    },
    printItem(item) {
      console.log(item);
    },
    saveDocumentation(data) {

    },
    formatDate(date) {
      if (!date) return null; 
      
      const formattedDate = new Date(date);
      
      if (isNaN(formattedDate.getTime())) {
        return null;
      }
      
      const year = formattedDate.getFullYear();
      const month = ("0" + (formattedDate.getMonth() + 1)).slice(-2);
      const day = ("0" + formattedDate.getDate()).slice(-2);
      
      return `${year}-${month}-${day}`;
    },
    
    setClose() {
            this.dependentData = {
                birth_date: null,
                comments: null,
                first_name: null,
                last_name: null,
                relationship_id: null,
            };
            this.dEligibilityData = {
                is_csg_eligible: false,
                is_csl_eligible: false,
                is_post_secondary: false,
                is_shares_custody: false,
                resides_with_student: false,
            };
            this.showAdd = !this.showAdd;
        },
    addDocumentation() {
      this.documents.push({ birth_date: "" });
    },   
    removeDocumentation(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this documentation.",
        () => {
          this.documents.splice(index, 1);
        },
        () => {}
      );
    },
    loadRequirementTypes() {
      axios.get(REQUIREMENT_TYPE_URL).then((resp) => {
        resp.data.forEach((d) => {             
          if(d.IS_ACTIVE_FLG === "Y") {
            this.documents2.push(
            {id: d.REQUIREMENT_TYPE_ID,
            description: d.DESCRIPTION}
          )     
          }
                       
        });
//        this.documents2 = resp.data;
      });
    },
    async showPDF(refId) {        
      //console.log(this.documents2) 
       //const { requirement_type_id, disability_requirement_id, person_id, dependent_id } = req.body;
       //console.log(refId);
      //console.log(this.application);
      try {              
          let buf = await fetch(APPLICATION_URL + `/${this.application.id}/student/${this.student.id}/files/${refId}`)           
            .then((r) => r.arrayBuffer());                        
            const blob = new Blob([buf], {type: 'application/pdf'});
            const blobURL = URL.createObjectURL(blob) || "";                  
            this.$refs.showPdf.showModal(blobURL);                                                                   
      } catch (error) {
        console.log(error);
      }             
    },
    downloadPdf(refId) {
      return APPLICATION_URL + `/${this.application.id}/student/${this.student.id}/files/${refId}`;
    },
    async updateReqMet(itemToUpdate, refId, item) {
      //console.log(item)
      try {
        const resInsert = await axios.put(
          APPLICATION_URL + `/${this.application.id}/files/${refId}`,
            { data: { ...itemToUpdate } },
          );
          const message = resInsert?.data?.messages[0];

          if (message?.variant === "success") {
            this.$emit("showSuccess", message.text);
          } else {
            this.$emit("showError", message.text);
          }
          
      } catch (error) {
        this.$emit("showError", "Error to update");
      } finally {
        store.dispatch("loadApplication", this.applicationId);
      }
    },
    async updateStatus(itemToUpdate, refId) {
      //console.log(APPLICATION_URL + `/${this.application.id}/student/${this.student.id}/files/${refId}`)
      try {
        const resInsert = await axios.put(
          APPLICATION_URL + `/${this.application.id}/student/${this.student.id}/files/${refId}`,
            { data: { ...itemToUpdate } },
          );
          const message = resInsert?.data?.messages[0];

          if (message?.variant === "success") {
            this.$emit("showSuccess", message.text);
          } else {
            this.$emit("showError", message.text);
          }
          
      } catch (error) {
        this.$emit("showError", "Error to update");
      } finally {
        store.dispatch("loadApplication", this.applicationId);
      }
    },    
    getFile(event) {
      //console.log(event)
    },

    async uploadDoc(item) {          
      
      console.log(event.target.files[0]);
      const formData = new FormData();
      // Agrega los archivos al objeto FormData
      formData.append('files', event.target.files[0]);
      formData.append("requirement_type_id", item.requirement_type_id);
      formData.append("disability_requirement_id", item.disability_requirement_id);
      formData.append("person_id", item.person_id);
      formData.append("dependent_id", item.dependent_id);

      const innerFormData = new FormData();   
      innerFormData.append('completed_data', item.completed_date  );
      
      /*
      const formData = new FormData();
      formData.append('file', file);
*/         
        try {          
          const resInsert = await axios.post(APPLICATION_URL + `/${this.application.id}/student/${this.student.id}/files`,
          formData, {headers: {'Content-Type': 'multipart/form-data' },});                                         

          const message = resInsert?.data?.messages[0];
            
          if (message?.variant === "success") {
            this.$emit("showSuccess", message.text);
          } else {
            this.$emit("showError", message.text);
          }          
        } catch (error) {
          console.log(error)
          this.$emit("showError", "Error to update");
        } finally {
          store.dispatch("loadApplication", this.applicationId);
        }
        
    },
  },  
};
</script>
