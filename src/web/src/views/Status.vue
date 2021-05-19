<template>
  <div class="home">
    <h1>Assessment & Status</h1>

    <v-card class="default mb-5">
      <v-card-text>
        <div class="row">
          <div class="col-md-12">
            <h3>Funding</h3>
            <div v-for="(item, i) of funding" :key="i" class="row">
              <div class="col-md-6">
                <v-select
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Funding Type"
                  v-model="item.funding_type"
                  :items="fundingTypeOptions"
                ></v-select>
              </div>
              <div class="col-md-3">
                <v-menu
                  v-model="item.received_date_menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  left
                  nudge-top="26"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="item.received_date"
                      label="Date app received"
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
                    v-model="item.received_date"
                    @input="item.received_date_menu = false"
                  ></v-date-picker>
                </v-menu>
              </div>

              <div class="col-md-3">
                <v-select
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Status"
                  v-model="item.status"
                  :items="statusOptions"
                ></v-select>
              </div>
              <div class="col-md-6">
                <v-select
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Reason"
                  v-model="item.reason"
                  :items="reasonOptions"
                ></v-select>
              </div>
              <div class="col-md-3">
                <v-menu
                  v-model="item.status_date_menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  left
                  nudge-top="26"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="item.status_date"
                      label="Status date"
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
                    v-model="item.status_date"
                    @input="item.status_date_menu = false"
                  ></v-date-picker>
                </v-menu>
              </div>

              <div class="col-md-3">
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
              <div v-if="i < funding.length - 1" class="col-md-12"><hr /></div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-btn color="info" @click="addDocumentation()" class="mb-5"
      >Add funding record</v-btn
    >

    <v-card class="default mb-5">
      <v-card-text>
        <div class="row">
          <div class="col-md-12">
            <h3>Requirements</h3>
            <div v-for="(item, i) of requirements" :key="i" class="row">
              <div class="col-md-6">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Requirement Type"
                  v-model="item.requirement_type"
                ></v-text-field>
              </div>
              <div class="col-md-3">
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
                    v-model="item.completed_date"
                    @input="item.completed_date_menu = false"
                  ></v-date-picker>
                </v-menu>
              </div>

              <div class="col-md-3">
                <v-btn
                  color="warning"
                  x-small
                  fab
                  title="Remove"
                  class="my-0 float-right"
                  @click="removeRequirement(i)"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </div>
              <div v-if="i < requirements.length - 1" class="col-md-12">
                <hr />
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-btn color="info" @click="addRequirement()">Add requirement</v-btn>

    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    fundingTypeOptions: ["Yukon Grant", "CSL Full-time"],
    reasonOptions: ["Reason 1", "Reason 2"],
    statusOptions: [
      "Awarded",
      "CGS Only",
      "Cancelled",
      "Check",
      "Expired - o",
      "Online",
      "Online - in",
      "Pending",
      "Qualified",
      "Recommended",
    ],
    funding: [],
    requirements: [],
  }),
  async created() {},
  methods: {
    addDocumentation() {
      this.funding.push({ status_date: "" });
    },
    removeDocumentation(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this funding record.",
        () => {
          this.funding.splice(index, 1);
        },
        () => {}
      );
    },

    addRequirement() {
      this.requirements.push({ birth_date: "" });
    },
    removeRequirement(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this funding requirement.",
        () => {
          this.requirements.splice(index, 1);
        },
        () => {}
      );
    },
  },
};
</script>
