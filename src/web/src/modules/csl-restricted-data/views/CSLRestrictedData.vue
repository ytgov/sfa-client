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
            <v-btn :disabled="!files" class="my-0" color="primary" @click="loadFile" >
              Update
            </v-btn>
            <div  v-if="total == 0" class="text-body-1">
              <p>
                <strong>NOTE:</strong> before clicking UPDATE, please verify that the process has not run today, this process can take up to 30 minutes.
              </p>
            </div>
          </div>
          <div class="text-body-1"> <strong>COUNT:</strong> {{ total }}</div>
        </div>
      </v-card-text>
    </v-card>

      <modal :title="this.modalTitle" ref="modal">
        <p class="mt-2">{{ this.modalText }}</p>
      </modal>
      <loading-animation :loading="isLoading.flag" />
  </div>
</template>

<script>
import store from "@/store";  
import Modal from "../../../components/commonCatalog/Modal.vue";
import LoadingAnimation from "../../../components/commonCatalog/LoadingScreen.vue";
import { mapActions, mapState } from "vuex";
import axios from 'axios';
import { CSL_RESTRICTED_DATA } from "@/urls";
export default {
  name: "ChequeReqList",
  data: () => ({
    issueDate: "",
    total: 0,
    files: null,
    reRunBatch: "",
    issue_date_calendar: false,
    modalText: null,
    modalTitle: null,
    disabled: {flag: true},
    isLoading: {flag: false},
  }),
  watch: {
  },
  async created() {
      this.getCount();
  },
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
    ...mapActions(["cancel", "open", "messageStatus"]),
    async getCount(){
      axios.get(CSL_RESTRICTED_DATA + "/csl-restricted-count").then((resp) => {
        this.total = resp && resp.data &&  resp.data.total ? resp.data.total : 0;
      });
    },
    async loadFile() {
      try {

        const formData = new FormData();
        const headers = { 'Content-Type': 'multipart/form-data' }

        formData.append("file", this.files)

        const res = await axios.post(CSL_RESTRICTED_DATA + "/upload-file", formData, { headers });
        
        if (res?.status == 200) {
          this.modalTitle = "Work in progress...";
          this.modalText = 'The process has started, and the table counter is 0, when the process finishes the counter will updated.';
          this.openModal();
          this.total = 0;
          this.files = null;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>