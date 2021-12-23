<template>
  <v-navigation-drawer
    v-model="showDrawer"
    absolute
    right
    temporary
    width="600"
  >
    <v-list-item loading>
      <v-list-item-content>
        <v-list-item-title style="line-height: 28px;"> Create student 
          <v-btn @click="saveClick" color="primary" class="float-right my-0" small :disabled="!formValid"
            ><v-icon class="mr-3">mdi-content-save</v-icon> Save</v-btn
          ></v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-card class="default my-4 mx-5">
      <v-card-text>
        <v-form v-model="formValid">
          <v-text-field
            label="First name"
            dense
            outlined
            background-color="white"
            v-model="student.first_name"
          ></v-text-field>
          <v-text-field
            label="Last name"
            dense
            outlined
            background-color="white"
            v-model="student.last_name"
          ></v-text-field>
          <v-text-field
            label="SIN"
            dense
            outlined
            background-color="white"
            v-model="student.sin"
          ></v-text-field>
          <v-text-field
            label="SIN"
            dense
            outlined
            background-color="white"
            v-model="student.sin"
          ></v-text-field>

          </v-form
        >
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import axios from "axios";
import { STUDENT_URL } from "../urls";

export default {
  name: "create-student-dialog",
  data: () => ({
    showDrawer: false,
    student: { first_name: "", last_name: "" },
  }),
  computed: {
    formValid: function () {
      let fn = this.student.first_name.trim();
      let ln = this.student.last_name.trim();

      if (fn.length == 0 || ln.length == 0) return false;

      return true;
    },
  },
  async created() {},
  methods: {
    show() {
      console.log("SHOWING");
      this.showDrawer = true;
    },
    saveClick() {
      console.log("Saving");

      axios.post(`${STUDENT_URL}`, this.student).then((resp) => {
        console.log(resp.data.data);

        if (resp.data.data.STUDENT_ID) {
          this.$router.push(`/student/${resp.data.data.STUDENT_ID}`);
        }
      });
    },
  },
};
</script>
