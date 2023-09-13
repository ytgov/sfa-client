<template>
  <v-dialog v-model="visible" persistent max-width="600px">
    <v-card class="">
      <v-card-title>Delete Application</v-card-title>
      <v-card-text>
        <v-divider class="mb-5"></v-divider>
        <v-form v-model="valid">
          <p class="text-error">
            This action is permanent and cannot be undone. When you click 'Delete' below, this application, funding
            requests and documents will be removed.
          </p>
          <v-checkbox v-model="confirm" label="I want to delete the application and all associated data" />

          <v-btn color="secondary" @click="hide">Cancel</v-btn>
          <v-btn color="error" class="float-right" @click="deleteClick" :disabled="!confirm">Delete</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import store from "../../store";
import { APPLICATION_URL } from "../../urls";

export default {
  data: () => ({
    visible: false,
    valid: false,
    application: undefined,
    confirm: false,
  }),
  methods: {
    show(application) {
      this.application = application;
      this.confirm = false;
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    deleteClick() {
      let body = {
        studentId: this.studentId,
        academicYear: this.academicYear,
        institutionId: this.institutionId,
      };

      axios
        .delete(`${APPLICATION_URL}/${this.application.id}`)
        .then((resp) => {
          this.$emit("showAPIMessages", resp.data);

          if (resp.data && resp.data.data) {
            this.visible = false;
            store.dispatch("clearStudent");
            store.dispatch("clearApplication");
            store.dispatch("loadStudent", this.application.student_id);
            this.$router.push(`/student/${this.application.student_id}`);
          }
        })
        .catch((err) => {
          this.$emit("showAPIMessages", err.response.data);
        });
    },
  },
};
</script>
