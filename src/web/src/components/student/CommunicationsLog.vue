<template>
  <div class="home">
  <h1>Communications Log</h1>     
    <v-card class="default mb-5">
      <v-card-text>
        <div class="row">     
          <div class="col-md-2">
            <v-menu                  
            :close-on-content-click="false"
            transition="scale-transition"
            left
            nudge-top="26"
            offset-y
            min-width="auto"
            v-model="communicationData.date_menu"
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
                :value="communicationData.date ? communicationData.date.toString().slice(0, 10) : communicationData.date"
                ></v-text-field>
              </template>
              <v-date-picker                  
                v-model="communicationData.date"    
                @input="communicationData.date_menu = false"                     
              ></v-date-picker>
            </v-menu>
          </div>                          
          <div class="col-md-4">
            <v-select
            outlined
            dense
            background-color="white"
            hide-details
            :items="requests"
            label="Funding Type"      
            v-model="communicationData.fundingType"                                        
            item-text="description"
            item-value="id"                  
            ></v-select>
          </div>                                         
          <div class="col-md-3">
            <v-select
            outlined
            dense
            background-color="white"
            hide-details
            :items="communications"
            label="Communication Type"                                              
            item-text="description"
            item-value="id"                    
            v-model="communicationData.communicationType"             
            ></v-select>
          </div>          
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Officer"
              disabled
              v-model="this.email_officer"  
              required             
            ></v-text-field>
          </div>     
          <div class="col-md-12">
            <v-textarea
            outlined
            dense
            background-color="#fff"
            hide-details
            label="Notes"      
            v-model="communicationData.notes"                               
            ></v-textarea>     
          </div>
          <div class="col-md-2">
            <v-btn block color="success" class="my-0" @click="addCommunication()">Add</v-btn>
          </div>
        </div>
        <div class="row">     
          <div class="col-md-12">
            <v-expansion-panels accordion v-if="communicationsAccordion.length >= 1">              
                <v-expansion-panel v-for="(item,i) of this.communicationsAccordion" :key="i" ref="panel">                
                <v-expansion-panel-header><span style="font-size: 16px">{{ `${(item.communication_date ? item.communication_date.slice(0, 10) : item.communication_date)} - ${getRequestName(item.request_type_id)} - ${getCommunicationType(item.communication_type_id)}`}}</span></v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="row">
                      <div class="col-md-2">                        
                        <v-menu                  
                          :close-on-content-click="false"
                          transition="scale-transition"
                          left
                          nudge-top="26"
                          offset-y                          
                          min-width="auto"   
                          v-model="item.communication_date_menu"     
                                            
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field                      
                            label="Received date"
                            append-icon="mdi-calendar"
                            hide-details
                            readonly                            
                            outlined
                            dense
                            :value="item.communication_date?.slice(0, 10)"
                            background-color="white"
                            :disabled="disabledItems[i]"
                            v-bind="attrs"
                            v-on="on"                            
                            ></v-text-field>
                          </template>
                          <v-date-picker     
                          :value="item.communication_date?.slice(0, 10)"
                          @input="e => {
                            item.communication_date = e;
                            item.communication_date_menu = false
                          }"  
                          ></v-date-picker>
                        </v-menu>
                      </div>                          
                      <div class="col-md-4">
                        <v-select
                        outlined
                        dense
                        background-color="white"
                        hide-details                        
                        :items="requests"
                        label="Documentation"                              
                        item-text="description"
                        :disabled="disabledItems[i]"
                        item-value="id"            
                        v-model="item.request_type_id"                              
                        ></v-select>
                      </div>                                         
                      <div class="col-md-3">
                        <v-select
                        outlined
                        dense
                        background-color="white"
                        hide-details                        
                        :items="communications"
                        v-model="item.communication_type_id"    
                        label="Documentation"   
                        :disabled="disabledItems[i]"                                           
                        item-text="description"
                        item-value="id"                  
                        ></v-select>
                      </div>          
                      <div class="col-md-3">
                        <v-text-field
                          outlined
                          dense
                          background-color="white"
                          hide-details
                          :disabled="disabledItems[i]"
                          label="Officer"                          
                          :value="checkUser(item.officer_id)"  
                          required         
                          @input="e => {
                            item.officer_id = e;                            
                          }"         
                        ></v-text-field>
                      </div>     
                      <div class="col-md-12">
                        <v-textarea
                        outlined
                        dense
                        background-color="#fff"
                        hide-details                        
                        label="Comments"       
                        :disabled="disabledItems[i]"
                        v-model="item.comments"                                                                  
                        ></v-textarea>     
                      </div>
                      <div class="col-md-2">                        
                        <v-btn block color="primary" class="my-0" @click="activateEdition(i)">Edit</v-btn>
                      </div>
                      <div class="col-md-2">
                        <v-btn block color="success" :disabled="disabledItems[i]" class="my-0" @click="modifyCommunication(item, i)">Save</v-btn>
                      </div>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
          </div>         
        </div>
      </v-card-text>
    </v-card>            
  </div>
</template>
  
<script>
  import { mapState } from "vuex";
  import store from "../../store";
  import { mapGetters } from "vuex";
  import axios from "axios";
  import {
    STUDENT_URL,
    COMMUNICATION_TYPES,  
    REQUEST_TYPES
  } from "../../urls";
    
  import ConsentForm from "./ConsentForm.vue";
  import ContactForm from "./ContactForm.vue";
  import SfaInfoForm from './SfaInfoForm.vue';
  import VendorInfoForm from './VendorInfoForm.vue';

  export default {
    name: "Home",
    components: { ContactForm, ConsentForm, SfaInfoForm, VendorInfoForm },
    computed: {
      ...mapState(["selectedStudent"]),
      username() {
        return store.getters.fullName;
      },
      email_officer() {
        return store.getters.email_officer;
      },
      student: function () {
        return store.getters.selectedStudent;
      },
      communication: function () {
        return store.getters.selectedCommunication;
      },
    },
    data: () => ({
      tab: 0,
      applicationId: -1,     
      dis: true,      
      disabledItems: [],      
      communicationData: {
        date: null, 
        fundingType: null,
        communicationType: null, 
        officer: null,
        notes: null,
        date_menu: null
      }, 
      requests: [],
      users: [],
      communications: [],
      communicationsAccordion: []
    }),
    async created() {      
      this.loadRequestTypes();
      this.loadCommunicationTypes();
      this.loadCommunication(0);
      this.loadUsers();      
      store.dispatch("setMonthOptions");
      store.dispatch("setYearOptions");

      this.applicationId = this.$route.params.id;
      let storeApp = store.getters.selectedApplication;

      if (this.$route.path.indexOf("/communications-log/") >= 0) {        
        await store.dispatch("loadStudent", this.applicationId);
        store.dispatch("setAppSidebar", true);
      } else {
        if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {          
          await store.dispatch("loadApplication", this.applicationId);
          store.dispatch("setAppSidebar", true);
        }
      }        
      console.log(this.$refs.panel[0].toggle(true));
    },   
    methods: {
      hendleEdition(i) {
        activateEdition(i);
        deactivateEdition(i);
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
      checkUser(id) {        
        for(let u of this.users) {
          if(id === u.id) {
            return u.email;
          }
        }      
      },
      activateEdition(i) {          
        const newItems = this.disabledItems.slice();
        newItems[i] = false;        
        this.disabledItems = newItems;          
      },
      deactivateEdition(i) {
        const newItems = this.disabledItems.slice();
        newItems[i] = true;        
        this.disabledItems = newItems;          
      },
      showSuccess(mgs) {
        this.$emit("showSuccess", mgs);
      },
      showError(mgs) {
        this.$emit("showError", mgs);
      },
      getRequestName(id) {
        for(let request of this.requests) {
          if(request.id === id) {
            return request.description;
          }
        }
      },
      getCommunicationType(id) {
        for(let communication of this.communications) {
          if(communication.id === id) {
            return communication.description;
          }
        }
      },
      loadRequestTypes() {      
        axios.get(REQUEST_TYPES).then((resp) => {                
          resp.data.data.forEach((d) => {           
            if(d.is_active === true) {
              this.requests.push({id: d.id, description: d.description})     
            }                       
          });        
        });
      },      
      loadUsers() {
        axios.get(COMMUNICATION_TYPES + "/users").then((resp) => {                
          resp.data.data.forEach((d) => {                       
            this.users.push(d)                 
          });        
        });
      },
      loadCommunicationTypes() {      
        axios.get(COMMUNICATION_TYPES).then((resp) => {                
          resp.data.data.forEach((d) => {           
            if(d.is_active === true) {
              this.communications.push({id: d.id, description: d.description})     
            }                       
          });        
        });
      },
      loadCommunication(flag) {       
        const studentId  = this.$route.params.id;      
        axios.get(COMMUNICATION_TYPES + `/${studentId}`).then((resp) => {   
          if(flag === 1) {
            this.communicationsAccordion = [];
            resp.data.data.forEach((d) => {
              this.communicationsAccordion.push(d)                   
            });                        
            for(let i = 0; i < this.communicationsAccordion.length; i++) {
              this.disabledItems[i] = true;
            }   
          } else {
            resp.data.data.forEach((d) => {                         
              this.communicationsAccordion.push(d) 
            }); 
            for(let i = 0; i < this.communicationsAccordion.length; i++) {
              this.disabledItems[i] = true;
            }            
          } 
        });  
        for(let i = 0; i < this.communicationsAccordion.length; i++) {
          this.disabledItems[i] = true;
        }                  
      },
      async addCommunication() {              
        try {            
          const bodyData = new FormData();          
          bodyData.append("officer_id", this.email_officer);
          bodyData.append("student_id", this.student.id);
          bodyData.append("request_type_id", this.communicationData.fundingType);
          bodyData.append("communication_type_id", this.communicationData.communicationType);
          bodyData.append("comments", this.communicationData.notes);
          bodyData.append("communication_date", this.communicationData.date);
          bodyData.append("show_alert", 0);

          if(this.communicationData.date && this.communicationData.fundingType && this.communicationData.communicationType && this.email_officer && this.communicationData.notes) {
            const resInsert = await axios.post(COMMUNICATION_TYPES + `/communications-log/${this.student.id}`,
          bodyData, {headers: {'Content-Type': 'multipart/form-data' },});                        
          const message = resInsert?.data?.messages[0];                  
            if (message?.variant === "success") {
              this.$emit("showSuccess", message.text);
              this.loadCommunication(1);
              this.communicationData.date = null, 
              this.communicationData.fundingType = null,
              this.communicationData.communicationType = null, 
              this.communicationData.officer = null,
              this.communicationData.notes = null,
              this.communicationData.date_menu = null      
            } else {
              this.$emit("showError", message.text);
            }   
          } else {
            this.$emit("showError", "Please fill-in all required fields");
          }                      
        } catch (error) {
          console.log(error)
          this.$emit("showError", "Error to update inner");
        }                                                
      },
      async modifyCommunication(item, i) {                                    
        try {            
          const bodyData = new FormData();
          bodyData.append("officer_id", this.email_officer);
          bodyData.append("student_id", item.student_id);
          bodyData.append("request_type_id", item.request_type_id);
          bodyData.append("communication_type_id", item.communication_type_id);
          bodyData.append("comments", item.comments);
          bodyData.append("communication_date", item.communication_date);
          bodyData.append("show_alert", 0);
          bodyData.append("id", item.id);          

          const resInsert = await axios.put(COMMUNICATION_TYPES + `/communications-log/${this.student.id}`,
          bodyData, {headers: {'Content-Type': 'multipart/form-data' },});                        
          const message = resInsert?.data?.messages[0];                  
          if (message?.variant === "success") {
            this.$emit("showSuccess", message.text);       
            this.loadCommunication(1);
            this.communicationData.date = null, 
            this.communicationData.fundingType = null,
            this.communicationData.communicationType = null, 
            this.communicationData.officer = null,
            this.communicationData.notes = null,
            this.communicationData.date_menu = null      
            this.$refs.panel[i].toggle(false)       
          } else {
            this.$emit("showError", message.text);
          }   
              
        } catch (error) {
          console.log(error)
          this.$emit("showError", "Error to update inner");
        }                     
      },
    },
  };
</script>
   
