<template>
  <div>
    <h3 class="text-h5 font-weight-regular mb-5">Student’s Dependents</h3>
    <v-card class="default row mb-5" v-for="(dependent, index) in filterList" :key="index">
      <div class="col-md-6">
        <h3 class="text-h6 font-weight-regular">Dependent {{ index + 1 }}</h3>
      </div>
      <div class="col-md-6">
        <v-row>
          <div class="col-md-6">
            <v-btn
              :disabled="showAdd"
              block
              color="error"
              @click="removeRecord(dependent.d_id, dependent.de_id)"
              class="my-0"
              >Remove dependent</v-btn
            >
          </div>
          <div class="col-md-6">
            <v-btn :disabled="showAdd" block color="success" class="my-0" @click="showPDF(dependent)">View BCERT</v-btn>
          </div>
        </v-row>
      </div>

      <div class="col-md-3">
        <v-text-field
          :disabled="showAdd"
          outlined
          dense
          background-color="white"
          hide-details
          label="Last name"
          oninput="
                        if (this.value.length > 100) this.value = this.value?.slice(0, 10);
                        const arr = this.value.split(' ');


                        for (var i = 0; i < arr.length; i++) {
                            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i]?.slice(1);

                        }

                        this.value = arr.join(' ');
                    "
          @change="updateDependent(dependent.d_id, { last_name: dependent.last_name }, 'dependent')"
          v-model="dependent.last_name"
        >
        </v-text-field>
      </div>
      <div class="col-md-3">
        <v-text-field
          :disabled="showAdd"
          outlined
          dense
          background-color="white"
          hide-details
          label="First name"
          oninput="
                        if (this.value.length > 100) this.value = this.value?.slice(0, 10);
                        const arr = this.value.split(' ');


                        for (var i = 0; i < arr.length; i++) {
                            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i]?.slice(1);

                        }

                        this.value = arr.join(' ');
                    "
          @change="updateDependent(dependent.d_id, { first_name: dependent.first_name }, 'dependent')"
          v-model="dependent.first_name"
        >
        </v-text-field>
      </div>
      <div class="col-md-2">
        <v-menu
          :disabled="showAdd"
          v-model="dependent.show_menu"
          :close-on-content-click="false"
          transition="scale-transition"
          left
          nudge-top="26"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :disabled="showAdd"
              label="Birth date"
              append-icon="mdi-calendar"
              readonly
              :value="dependent.birth_date?.slice(0, 10)"
              outlined
              dense
              background-color="white"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            :value="dependent.birth_date?.slice(0, 10)"
            @input="
              (e) => {
                dependent.birth_date = e;
                dependent.show_menu = false;
              }
            "
            @change="updateDependent(dependent.d_id, { birth_date: dependent.birth_date }, 'dependent')"
            :disabled="showAdd"
          >
          </v-date-picker>
        </v-menu>
      </div>
      <div class="col-md-2 d-flex">
        <h3 class="text-subtitle-1 mt-1 mr-2">Age</h3>
        <v-text-field
          disabled
          outlined
          dense
          background-color="white"
          :value="moment().diff(dependent.birth_date, 'years') || 0"
          hide-details
          label="Age"
        >
        </v-text-field>
      </div>
      <div class="col-md-2">
        <v-autocomplete
          :disabled="showAdd"
          outlined
          dense
          background-color="white"
          hide-details
          label="Relationship"
          @change="updateDependent(dependent.d_id, { relationship_id: dependent.relationship_id }, 'dependent')"
          v-model="dependent.relationship_id"
          :items="relationships"
          item-text="description"
          item-value="id"
        >
        </v-autocomplete>
      </div>

      <div class="col-md-4">
        <v-switch
          :disabled="showAdd"
          class="my-n5"
          label="Resides with"
          v-model="dependent.resides_with_student"
          @change="
            updateDependent(dependent.de_id, { resides_with_student: dependent.resides_with_student }, 'd_eligibility')
          "
        >
        </v-switch>
      </div>
      <div class="col-md-4">
        <v-switch
          :disabled="showAdd"
          class="my-n5"
          label="Shared custody"
          v-model="dependent.is_shares_custody"
          @change="
            updateDependent(dependent.de_id, { is_shares_custody: dependent.is_shares_custody }, 'd_eligibility')
          "
        >
        </v-switch>
      </div>
      <div class="col-md-4">
        <v-switch
          :disabled="showAdd"
          class="my-n5"
          label="In post-secondary"
          v-model="dependent.is_post_secondary"
          @change="
            updateDependent(dependent.de_id, { is_post_secondary: dependent.is_post_secondary }, 'd_eligibility')
          "
        >
        </v-switch>
      </div>

      <div class="col-md-4">
        <v-switch
          :disabled="showAdd"
          class="my-n5"
          label="STA eligible"
          v-model="dependent.is_sta_eligible"
          @change="toggle($event, 'is_sta_eligible', dependent.de_id, 'd_eligibility')"
        >
        </v-switch>
      </div>
      <div class="col-md-4">
        <v-switch
          :disabled="showAdd"
          class="my-n5"
          label="CSG eligible"
          v-model="dependent.is_csg_eligible"
          @change="toggle($event, 'is_csg_eligible', dependent.de_id, 'd_eligibility')"
        >
        </v-switch>
      </div>
      <div class="col-md-4">
        <v-switch
          :disabled="showAdd"
          class="my-n5"
          label="CSL eligible"
          v-model="dependent.is_csl_eligible"
          @change="toggle($event, 'is_csl_eligible', dependent.de_id, 'd_eligibility')"
        >
        </v-switch>
      </div>

      <div class="col-md-12">
        <v-textarea
          :disabled="showAdd"
          outlined
          rows="1"
          dense
          background-color="white"
          hide-details
          label="Comment"
          v-model="dependent.comments"
          @change="updateDependent(dependent.d_id, { comments: dependent.comments }, 'dependent')"
        >
        </v-textarea>
      </div>
    </v-card>

    <v-card class="default row mb-5" v-if="showAdd">
      <div class="col-md-6">
        <h3 class="text-h6 font-weight-regular">Add Dependent</h3>
      </div>
      <div class="col-md-6">
        <v-row>
          <div class="col-md-6">
            <v-btn @click="setClose" block color="error" class="my-0">Cancel</v-btn>
          </div>
          <div class="col-md-6">
            <v-btn block color="success" class="my-0" @click="insertDependent">Add</v-btn>
          </div>
        </v-row>
      </div>

      <div class="col-md-3">
        <v-text-field
          outlined
          dense
          background-color="white"
          hide-details
          label="Last name"
          v-model="dependentData.last_name"
        >
        </v-text-field>
      </div>
      <div class="col-md-3">
        <v-text-field
          outlined
          dense
          background-color="white"
          hide-details
          label="First name"
          v-model="dependentData.first_name"
        >
        </v-text-field>
      </div>
      <div class="col-md-2">
        <v-menu
          v-model="show_menu_add"
          :close-on-content-click="false"
          transition="scale-transition"
          left
          nudge-top="26"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="Birth date"
              append-icon="mdi-calendar"
              v-model="dependentData.birth_date"
              readonly
              outlined
              dense
              background-color="white"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            :value="dependentData.birth_date"
            @input="
              (e) => {
                dependentData.birth_date = e;
                show_menu_add = false;
              }
            "
          >
          </v-date-picker>
        </v-menu>
      </div>
      <div class="col-md-2 d-flex">
        <h3 class="text-subtitle-1 mt-1 mr-2">Age</h3>
        <v-text-field
          disabled
          outlined
          dense
          background-color="white"
          hide-details
          label="Age"
          :value="moment().diff(dependentData.birth_date, 'years') || 0"
        >
        </v-text-field>
      </div>
      <div class="col-md-2">
        <v-autocomplete
          outlined
          dense
          background-color="white"
          hide-details
          label="Relationship"
          v-model="dependentData.relationship_id"
          :items="relationships"
          item-text="description"
          item-value="id"
        >
        </v-autocomplete>
      </div>

      <div class="col-md-4">
        <v-switch class="my-n5" label="Resides with" v-model="dEligibilityData.resides_with_student"> </v-switch>
      </div>
      <div class="col-md-4">
        <v-switch class="my-n5" label="Shared custody" v-model="dEligibilityData.is_shares_custody"> </v-switch>
      </div>
      <div class="col-md-4">
        <v-switch class="my-n5" label="In post-secondary" v-model="dEligibilityData.is_post_secondary"> </v-switch>
      </div>

      <div class="col-md-4">
        <v-switch class="my-n5" label="STA eligible"> </v-switch>
      </div>
      <div class="col-md-4">
        <v-switch class="my-n5" label="CSG eligible" v-model="dEligibilityData.is_csg_eligible"> </v-switch>
      </div>
      <div class="col-md-4">
        <v-switch class="my-n5" label="CSL eligible" v-model="dEligibilityData.is_csl_eligible"> </v-switch>
      </div>

      <div class="col-md-12">
        <v-textarea
          outlined
          rows="1"
          dense
          background-color="white"
          hide-details
          label="Comment"
          v-model="dependentData.comments"
        >
        </v-textarea>
      </div>
    </v-card>

    <v-btn color="primary" @click="setClose" v-if="!showAdd">
      Add Dependent
    </v-btn>
    <v-btn v-else color="primary" @click="setClose">
      Cancel
    </v-btn>
    <confirm-dialog ref="confirm"></confirm-dialog>

    <show-pdf ref="showPdf"> </show-pdf>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "@/store";
import axios from "axios";
import { APPLICATION_URL, STUDENT_URL } from "@/urls";
import moment from "moment";

export default {
  components: {},
  computed: {
    ...mapGetters(["relationships"]),
    application: function() {
      return store.getters.selectedApplication;
    },
    student: function() {
      return store.getters.selectedStudent;
    },
    filterList() {
      return this.student?.dependent_info?.filter((d) => d.application_id === this.application?.id) || [];
    },
    fullTime() {
      const request = this.application?.funding_requests?.find((fr) => fr.request_type_id === 4);
      this.checkFullTime = !!request;
      return request || {};
    },
    partTime() {
      const request = this.application?.funding_requests?.find((fr) => fr.request_type_id === 5);
      this.checkPartTime = !!request;
      return request || {};
    },
    grantDFT() {
      const request = this.application?.funding_requests?.find((fr) => fr.request_type_id === 32);
      this.checkGrantDFT = !!request;
      return request || {};
    },
    grantDPT() {
      const request = this.application?.funding_requests?.find((fr) => fr.request_type_id === 33);
      this.checkGrantDPT = !!request;
      return request || {};
    },
  },
  data: () => ({
    checkFullTime: false,
    checkPartTime: false,
    checkGrantDFT: false,
    checkGrantDPT: false,
    showAdd: false,
    moment: {},
    show_menu_add: false,
    dependentData: {
      birth_date: null,
      comments: null,
      first_name: null,
      last_name: null,
      relationship_id: null,
    },
    dEligibilityData: {
      is_csg_eligible: false,
      is_csl_eligible: false,
      is_post_secondary: false,
      is_shares_custody: false,
      resides_with_student: false,
    },
  }),
  async created() {
    this.moment = moment;
    store.dispatch("setRelationships");
  },
  watch: {},
  methods: {
    showDependant(dependent) {
      console.log(dependent.d_id);
      console.log(this.student);
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
    doSaveDependent(field, value, type, extraId = null, isInsertion = false) {
      if (isInsertion) {
        const validate = { ...value };
      }

      const url = type === "dependentInfo" ? "/dependent" : "";

      store.dispatch("updateStudent", [field, value, type, extraId, this, null, url, isInsertion]);
    },
    async updateDependent(id, data, type) {
      try {
        const resUpdate = await axios.put(`${STUDENT_URL}/${this.student.id}/${this.application.id}/dependent/${id}`, {
          data,
          type,
        });

        const message = resUpdate?.data?.messages[0];

        if (message?.variant === "success") {
          this.$emit("showSuccess", message.text);
        } else {
          this.$emit("showError", message.text);
        }
      } catch (error) {
        console.log(error);
        this.$emit("showError", "Error to update");
      } finally {
        store.dispatch("loadStudent", this.student.id);
      }
    },
    async insertDependent() {
      try {
        const resInsert = await axios.post(`${STUDENT_URL}/${this.student.id}/${this.application.id}/dependent`, {
          dependentData: this.dependentData,
          dEligibilityData: this.dEligibilityData,
        });

        const message = resInsert?.data?.messages[0];

        if (message?.variant === "success") {
          this.$emit("showSuccess", message.text);
          this.setClose();
        } else {
          this.$emit("showError", message.text);
        }
      } catch (error) {
        console.log(error);
        this.$emit("showError", "Error to insert");
      } finally {
        store.dispatch("loadStudent", this.student.id);
      }
    },
    async deleteRecord(dependentId, dEligibilityId) {
      try {
        const resDelete = await axios.delete(`${STUDENT_URL}/${dEligibilityId}/${dependentId}/dependent`);

        const message = resDelete?.data?.messages[0];

        if (message?.variant === "success") {
          this.$emit("showSuccess", message.text);
        } else {
          this.$emit("showError", message.text);
        }
      } catch (error) {
        console.log(error);
        this.$emit("showError", "Error to delete");
      } finally {
        store.dispatch("loadStudent", this.student.id);
      }
    },
    removeRecord(dependentId, dEligibilityId) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this dependent.",
        () => {
          this.deleteRecord(dependentId, dEligibilityId);
        },
        () => {}
      );
    },
    async insertGrant(grantOne = null, grantTwo = null, both = false) {
      try {
        let resInsert = null;
        let resInsertTwo = null;

        if (!both && (grantOne === 32 || grantOne === 33)) {
          resInsert = await axios.post(APPLICATION_URL + `/${this.application.id}/status`, {
            request_type_id: grantOne,
            received_date: new Date(),
          });
        } else if (both && (grantOne === 32 || grantOne === 33) && (grantTwo === 32 || grantTwo === 33)) {
          resInsert = await axios.post(APPLICATION_URL + `/${this.application.id}/status`, {
            request_type_id: grantOne,
            received_date: new Date(),
          });
          resInsertTwo = await axios.post(APPLICATION_URL + `/${this.application.id}/status`, {
            request_type_id: grantTwo,
            received_date: new Date(),
          });
        }

        if (both) {
          const message = resInsert?.data?.messages[0];
          const messageTwo = resInsertTwo?.data?.messages[0];

          if (message?.variant === "success" && messageTwo?.variant === "success") {
            this.$emit("showSuccess", message.text);
            return true;
          } else {
            this.$emit("showError", "Some insert failed");
            return false;
          }
        } else {
          const message = resInsert?.data?.messages[0];

          if (message?.variant === "success") {
            this.$emit("showSuccess", message.text);
            return true;
          } else {
            this.$emit("showError", "Insert failed");
            return false;
          }
        }
      } catch (error) {
        this.$emit("showError", "Error to insert");
        return false;
      } finally {
        store.dispatch("loadApplication", this.application.id);
      }
    },
    toggle(event, switchType, itemId, tableType) {
      if (event) {
        if (this.fullTime?.id && this.partTime?.id && !this.grantDFT?.id && !this.grantDPT?.id) {
          if (this.insertGrant(32, 33, true)) {
            const objToSend = {};
            objToSend[switchType] = event;
            this.updateDependent(itemId, objToSend, tableType);
          }
        } else if (this.fullTime?.id && !this.grantDFT?.id) {
          const res = this.insertGrant(32);
          if (res) {
            const objToSend = {};
            objToSend[switchType] = event;
            this.updateDependent(itemId, objToSend, tableType);
          }
        } else if (this.partTime?.id && !this.grantDPT?.id) {
          if (this.insertGrant(33)) {
            const objToSend = {};
            objToSend[switchType] = event;
            this.updateDependent(itemId, objToSend, tableType);
          }
        } else {
          const objToSend = {};
          objToSend[switchType] = event;
          this.updateDependent(itemId, objToSend, tableType);
        }
      } else {
        if (this.grantDFT?.id && this.grantDPT?.id) {
          this.removeGrant(this.grantDFT.id, this.grantDPT.id, switchType, itemId, tableType);
        } else if (this.grantDFT?.id) {
          this.removeGrant(this.grantDFT.id, null, switchType, itemId, tableType);
        } else if (this.grantDPT?.id) {
          this.removeGrant(this.grantDPT.id, null, switchType, itemId, tableType);
        } else {
          const objToSend = {};
          objToSend[switchType] = event;
          this.updateDependent(itemId, objToSend, tableType);
        }
      }
    },
    async deleteGrant(firstId = null, secondId = null) {
      try {
        let resDelete = null;
        let resDeleteTwo = null;

        if (firstId && secondId) {
          resDelete = await axios.delete(APPLICATION_URL + `/${firstId}/status`);

          resDeleteTwo = await axios.delete(APPLICATION_URL + `/${secondId}/status`);

          const message = resDelete.data.messages[0];
          const messageTwo = resDeleteTwo.data.messages[0];

          if (message.variant === "success" && messageTwo.variant === "success") {
            this.$emit("showSuccess", message.text);
            return true;
          } else {
            this.$emit("showError", "Some delete failed");
            return false;
          }
        } else if (firstId) {
          resDelete = await axios.delete(APPLICATION_URL + `/${firstId}/status`);

          const message = resDelete.data.messages[0];

          if (message.variant == "success") {
            this.$emit("showSuccess", message.text);
            return true;
          } else {
            this.$emit("showError", message.text);
            return false;
          }
        }
      } catch (error) {
        this.$emit("showError", "Error to delete");
        return false;
      } finally {
        store.dispatch("loadApplication", this.application.id);
      }
    },
    removeGrant(firstId = null, secondId = null, switchType, itemId, tableType) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this funding record.",
        () => {
          if (firstId && secondId) {
            const res = this.deleteGrant(firstId, secondId);

            if (res) {
              const objToSend = {};
              objToSend[switchType] = !res;
              this.updateDependent(itemId, objToSend, tableType);
            }
          } else if (firstId) {
            const res = this.deleteGrant(firstId);

            if (res) {
              const objToSend = {};
              objToSend[switchType] = !res;
              this.updateDependent(itemId, objToSend, tableType);
            }
          }
        },
        () => {
          if (tableType === "d_eligibility") {
            for (const item of this.filterList) {
              if (item?.de_id === itemId) {
                item[switchType] = !item[switchType];
                break;
              }
            }
          }
        }
      );
    },
    async showPDF(dependent) {
      try {
        console.log(dependent.d_id);
        console.log(this.student);
        let buf = await fetch(
          APPLICATION_URL +
            `/${this.application.id}/student/${this.student.id}/files/73/fellow_type/dependent/fellow/${dependent.d_id}/`
        ).then((r) => r.arrayBuffer());
        const blob = new Blob([buf], { type: "application/pdf" });
        const blobURL = URL.createObjectURL(blob) || "";
        this.$refs.showPdf.showModal(blobURL);
      } catch (error) {
        console.log(error);
      }
    },
  },
  props: {
    index: Number,
  },
};
</script>
