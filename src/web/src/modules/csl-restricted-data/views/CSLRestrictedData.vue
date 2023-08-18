<template>
  <div>
    <v-breadcrumbs
      divider="/"
      large
      :items="[
        { text: 'Administration Home', to: '/administration', exact: true },
        { 
          text: 'CSL Restricted Data',
          to: '/administration/csl-restricted-data',
          exact: true,
        },
      ]"
    >
    </v-breadcrumbs>
    <h1>CSL Restricted Data</h1>
    <v-card class="default mb-5">        
      <v-card-text>
        <div class="row">

          <div class="col-md-10">
            <v-file-input
            v-model="files"
            label="File"
            hide-details                         
            outlined
            dense
            background-color="white" 
            ></v-file-input> 
          </div> 
          
          <div class="col-md-2">
            <v-btn :disabled="!files" class="my-0" color="primary" @click="loadFile">
              Update
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
import { CSL_RESTRICTED_DATA } from "@/urls";
export default {
  name: "ChequeReqList",
  data: () => ({
    issueDate: "",
    files: null,
    reRunBatch: "",
    issue_date_calendar: false,
  }),
  watch: {
  },
  components: {},
  computed: {
    ...mapState(["showSideBarAdmin"]),            
  },
  async mounted() {
    await store.dispatch("setAppSideBarAdmin", this.$route.path.startsWith("/administration"));      
  },
  methods: {
    ...mapActions(["cancel", "open", "messageStatus"]),
    async loadFile() {
      try {

        const formData = new FormData();
        const headers = { 'Content-Type': 'multipart/form-data' }

        formData.append("file", this.files)

        const res = await axios.post(CSL_RESTRICTED_DATA + "/upload-file", formData, { headers });
        
        
        if (res?.data?.success) {
          
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>