<template>
  <div class="home">
    <h1>Communications Log</h1>
    <v-card class="default mb-5">
      <v-card-text>
        <v-row v-if="!communicationData">
          <v-col cols="12" md="5">
            <v-text-field
              label="Search"
              dense
              outlined
              background-color="white"
              hide-details
              prepend-inner-icon="mdi-magnify"
              v-model="search"
              clearable
            />
          </v-col>
          <v-col cols="12" md="7" class="text-right">
            <v-btn color="primary" @click="addClick">Add to Log</v-btn>
          </v-col>
        </v-row>

        <v-row v-if="communicationData">
          <v-col cols="12" md="5">
            <v-menu
              :close-on-content-click="false"
              transition="scale-transition"
              right
              nudge-top="26"
              offset-y
              min-width="auto"
              v-model="communicationData.date_menu"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Date"
                  append-icon="mdi-calendar"
                  readonly
                  outlined
                  dense
                  hide-details
                  background-color="white"
                  v-bind="attrs"
                  v-on="on"
                  :value="
                    communicationData.communication_date
                      ? communicationData.communication_date.toString().slice(0, 10)
                      : communicationData.communication_date
                  "
                />
              </template>
              <v-date-picker
                v-model="communicationData.communication_date"
                @input="communicationData.date_menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="7">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              :items="requests"
              label="Funding Type"
              v-model="communicationData.request_type_id"
              item-text="description"
              item-value="id"
            ></v-select>
          </v-col>
          <v-col cols="12" md="5">
            <v-select
              outlined
              dense
              hide-details
              background-color="white"
              :items="communications"
              label="Communication Type"
              item-text="description"
              item-value="id"
              v-model="communicationData.communication_type_id"
            />
          </v-col>
          <v-col cols="12" md="7">
            <v-text-field
              outlined
              dense
              hide-details
              background-color="white"
              label="Officer"
              readonly
              :value="checkUser(communicationData.officer_id)"
              append-inner-icon="mdi-lock"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              outlined
              dense
              background-color="#fff"
              label="Notes"
              hide-details
              v-model="communicationData.comments"
            />
          </v-col>
          <v-col cols="12" md="5">
            <v-switch label="Follow up?" hide-details class="my-0" v-model="communicationData.show_alert"></v-switch>
          </v-col>
          <v-col class="text-right">
            <v-btn v-if="communicationData.id" color="success" class="my-0" @click="modifyCommunication">Save</v-btn>
            <v-btn v-else color="success" class="my-0" @click="addCommunication">Save</v-btn>
            <v-btn color="warning" class="my-0 ml-5" @click="cancelClick">Cancel</v-btn>
          </v-col>
        </v-row>

        <v-list two-line outlined class="mt-4 py-0">
          <div v-for="(item, i) of this.communicationsAccordion" :key="i" :style="`background-color: ${item.color};`">
            <v-list-item @click="rowClick(item)">
              <v-list-item-icon v-if="item.show_alert">
                <v-icon color="red">mdi-flag</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <strong>{{ item.communication_date.slice(0, 10) }}</strong>
                  ({{ getCommunicationType(item.communication_type_id) }}) :
                  <strong>{{ getRequestName(item.request_type_id) }}</strong>
                  by
                  <strong>{{ checkUser(item.officer_id) }}</strong>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.comments }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
          </div>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../../store";
import axios from "axios";
import moment from "moment";
import { clone } from "lodash";
import { COMMUNICATION_TYPES, REQUEST_TYPES } from "../../urls";

import ConsentForm from "./ConsentForm.vue";
import ContactForm from "./ContactForm.vue";
import SfaInfoForm from "./SfaInfoForm.vue";
import VendorInfoForm from "./VendorInfoForm.vue";

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
    student: function() {
      return store.getters.selectedStudent;
    },
    communication: function() {
      return store.getters.selectedCommunication;
    },
  },
  data: () => ({
    tab: 0,
    applicationId: -1,
    dis: true,
    disabledItems: [],
    communicationData: null,
    requests: [],
    users: [],
    communications: [],
    communicationsAccordion: [],

    search: "",
    isDisabled: true,
  }),
  async mounted() {
    this.loadRequestTypes();
    this.loadCommunicationTypes();
    this.loadCommunication(0);
    this.loadUsers();
    store.dispatch("setMonthOptions");
    store.dispatch("setYearOptions");

    this.studentId = this.$route.params.id;

    await store.dispatch("loadStudent", this.studentId);
    store.dispatch("setAppSidebar", true);
  },
  watch: {
    search() {
      this.doSearch();
    },
  },
  methods: {
    addClick() {
      this.communicationData = {
        communication_date: moment().format("YYYY-MM-DD"),
        officer_id: 52,
      };
    },
    rowClick(item) {
      window.scrollTo(0, 120);
      this.communicationData = clone(item);
    },
    cancelClick() {
      this.communicationData = null;
    },

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
      for (let u of this.users) {
        if (id === u.id) {
          return u.email;
        }
      }
    },
    showSuccess(mgs) {
      this.$emit("showSuccess", mgs);
    },
    showError(mgs) {
      this.$emit("showError", mgs);
    },
    getRequestName(id) {
      for (let request of this.requests) {
        if (request.id === id) {
          return request.description;
        }
      }
    },
    getCommunicationType(id) {
      for (let communication of this.communications) {
        if (communication.id === id) {
          return communication.description;
        }
      }
    },
    loadRequestTypes() {
      axios.get(REQUEST_TYPES).then((resp) => {
        resp.data.data.forEach((d) => {
          if (d.is_active === true) {
            this.requests.push({ id: d.id, description: d.description });
          }
        });
      });
    },
    loadUsers() {
      axios.get(COMMUNICATION_TYPES + "/users").then((resp) => {
        resp.data.data.forEach((d) => {
          this.users.push(d);
        });
      });
    },
    loadCommunicationTypes() {
      axios.get(COMMUNICATION_TYPES).then((resp) => {
        resp.data.data.forEach((d) => {
          if (d.is_active === true) {
            this.communications.push({ id: d.id, description: d.description });
          }
        });
      });
    },
    loadCommunication(flag) {
      const studentId = this.$route.params.id;
      axios.get(`${COMMUNICATION_TYPES}/${studentId}`).then((resp) => {
        let items = resp.data.data;
        this.communicationsAccordion = items;
        this.doSearch();
      });
    },
    doSearch() {
      let value = (this.search ?? "").toLowerCase().trim();

      this.communicationsAccordion.map((i) => {
        if (value.length > 0 && i.comments.toLowerCase().indexOf(value) >= 0) i.color = "#00800033";
        else i.color = "#fff";
      });
    },
    async addCommunication() {
      try {
        if (
          this.communicationData.communication_date &&
          this.communicationData.request_type_id &&
          this.communicationData.communication_type_id &&
          this.communicationData.comments
        ) {
          const resInsert = await axios.post(
            `${COMMUNICATION_TYPES}/communications-log/${this.student.id}`,
            this.communicationData
          );

          const message = resInsert?.data?.messages[0];
          if (message?.variant === "success") {
            this.$emit("showSuccess", message.text);
            this.loadCommunication(1);
            this.communicationData = null;
          } else {
            this.$emit("showError", message.text);
          }
        } else {
          this.$emit("showError", "Please fill-in all required fields");
        }
      } catch (error) {
        console.log(error);
        this.$emit("showError", "Error to update inner");
      }
    },
    async modifyCommunication(item, i) {
      try {
        const resUpdate = await axios.put(
          `${COMMUNICATION_TYPES}/communications-log/${this.student.id}`,
          this.communicationData
        );

        const message = resUpdate?.data?.messages[0];
        if (message?.variant === "success") {
          this.$emit("showSuccess", message.text);
          this.loadCommunication(1);
          this.communicationData = null;
        } else {
          this.$emit("showError", message.text);
        }
      } catch (error) {
        console.log(error);
        this.$emit("showError", "Error to update inner");
      }
    },
  },
};
</script>
