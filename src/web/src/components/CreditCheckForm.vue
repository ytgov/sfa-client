<template>
  <div>
    <v-card class="default">
      <v-card-title>Credit Check</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-4">
            <v-menu
              v-model="check_required_menu"
              :close-on-content-click="false"
              transition="scale-transition"
              left
              nudge-top="26"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="check_required_date"
                  label="Check required date"
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
                v-model="check_required_date"
                @input="check_required_menu = false"
              ></v-date-picker>
            </v-menu>
          </div>
          <div class="col-md-8"></div>

          <div class="col-md-4">
            <v-menu
              v-model="fax_sent_menu"
              :close-on-content-click="false"
              transition="scale-transition"
              left
              nudge-top="26"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="fax_sent_date"
                  label="Fax sent date"
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
                v-model="fax_sent_date"
                @input="fax_sent_menu = false"
              ></v-date-picker>
            </v-menu>
          </div>
          <div class="col-md-8"></div>

          <div class="col-md-4">
            <v-menu
              v-model="check_completion_menu"
              :close-on-content-click="false"
              transition="scale-transition"
              left
              nudge-top="26"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="check_completion_date"
                  label="Check completion date"
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
                v-model="check_completion_date"
                @input="check_completion_menu = false"
              ></v-date-picker>
            </v-menu>
          </div>
          <div class="col-md-8 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Credit check passed"
              v-model="credit_check_passed"
            ></v-switch>
          </div>

          <div class="col-md-4">
            <v-menu
              v-model="appeal_menu"
              :close-on-content-click="false"
              transition="scale-transition"
              left
              nudge-top="26"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="appeal_date"
                  label="Appeal date"
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
                v-model="appeal_date"
                @input="appeal_menu = false"
              ></v-date-picker>
            </v-menu>
          </div>
          <div class="col-md-8"></div>
          <div class="col-md-4">
            <v-menu
              v-model="appeal_completion_menu"
              :close-on-content-click="false"
              transition="scale-transition"
              left
              nudge-top="26"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="appeal_completion_date"
                  label="Appeal completion date"
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
                v-model="appeal_completion_date"
                @input="appeal_completion_menu = false"
              ></v-date-picker>
            </v-menu>
          </div>
          <div class="col-md-8 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Appeal passed"
              v-model="appeal_passed"
            ></v-switch>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    check_required_menu: null,
    fax_sent_menu: null,
    check_completion_menu: null,
    appeal_menu: null,
    appeal_completion_menu: null,

    check_required_date: null,
    fax_sent_date: null,
    check_completion_date: null,
    credit_check_passed: false,
    appeal_date: null,
    appeal_completion_date: null,
    appeal_passed: false,
  }),
  async created() {},
  methods: {},
};
</script>
