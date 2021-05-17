<template>
  <div>
    <v-card class="default">
      <v-card-title>CSL Restriction</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-4">
            <v-text-field
              class="mb-5"
              outlined
              dense
              background-color="white"
              hide-details
              label="Restrict / Warning Code"
              v-model="restrict_code"
            ></v-text-field>
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Type"
              v-model="restrict_type"
            ></v-text-field>
          </div>
          <div class="col-md-8">
            <v-textarea
              outlined
              dense
              background-color="white"
              hide-details
              label="Definition"
              v-model="restrict_definition"
            ></v-textarea>
          </div>

          <div class="col-md-4">
            <v-text-field
              class="mb-5"
              outlined
              dense
              background-color="white"
              hide-details
              label="Reason Code"
              v-model="reason_code"
            ></v-text-field>
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Type"
              v-model="reason_type"
            ></v-text-field>
          </div>
          <div class="col-md-8">
            <v-textarea
              outlined
              dense
              background-color="white"
              hide-details
              label="Definition"
              v-model="reason_definition"
            ></v-textarea>
          </div>

          <div class="col-md-4">
            <v-menu
              v-model="clearance_received_menu"
              :close-on-content-click="false"
              transition="scale-transition"
              left
              nudge-top="26"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="clearance_received_date"
                  label="Clearance received date"
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
                v-model="clearance_received_date"
                @input="clearance_received_menu = false"
              ></v-date-picker>
            </v-menu>
          </div>
          <div class="col-md-8">
            <v-textarea
              outlined
              dense
              background-color="white"
              hide-details
              label="Comment"
              v-model="clearance_comment"
            ></v-textarea>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    clearance_received_menu: null,

    restrict_code: "",
    restrict_type: "",
    restrict_definition: "",
    reason_code: "",
    reason_type: "",
    reason_definition: "",
    clearance_received_date: null,
    clearance_comment: "",
  }),
  async created() {},
  methods: {},
};
</script>
