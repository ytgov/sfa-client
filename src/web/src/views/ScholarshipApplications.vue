<template>
  <div>
    <h1>Scholarship Applications</h1>

    <v-card class="default mb-5">
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="High school/official transcript percentage"
              v-model="transscript_percentage"
              type="number"
              step="0.01"
              min="0.00"
              max="4.00"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="default mb-5" v-for="(item, i) of applications" :key="i">
      <v-card-title
        >Scholarship {{ 1 + i }}
        <v-spacer></v-spacer>
        <v-btn
          color="warning"
          x-small
          fab
          class="my-0"
          @click="removeApplication(i)"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Scholarship"
              v-model="item.scholarship"
              :items="scholarshipOptions"
            ></v-select>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-btn color="info" @click="addApplication()"
      >Add scholarship application</v-btn
    >

    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data: () => ({
    scholarshipOptions: ["Scholarship AAA", "Scholarship BBB"],

    transscript_percentage: "4.0",
    applications: [],
    maxDate: moment().format("YYYY-MM-DD"),
  }),
  async created() {},
  methods: {
    addApplication() {
      this.applications.push({ birth_date: "" });
    },
    removeApplication(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this scholarship application.",
        () => {
          this.applications.splice(index, 1);
        },
        () => {}
      );
    },
  },
};
</script>