<template>
  <div>
    <!-- TITLE AND SWITCH -->
    <div class="col-md-12 mt-n5">
      <div class="row  mt-2">
        <v-switch
            label=""
            class="my-0 mr-2"
            v-model="requiresCC"
        >
        </v-switch>
        <h3 class="text-h6 font-weight-regular">Requires Credit Check</h3>
      </div>
    </div>
    <!--  -->
  
    <v-card class="default mb-5" v-if="requiresCC">
      <v-card-title>Credit Check</v-card-title>
      <v-card-text>
        <div class="row">

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
          <div class="col-md-3 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Credit check passed"
              v-model="credit_check_passed"
            ></v-switch>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              hide-details
              label="Last checked on"
              background-color="white"
            ></v-text-field>
          </div>
          <div class="col-md-2 pt-0">
            <v-btn color="info" class="float-right">Check credit</v-btn>
          </div>

        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    requiresCC: true,
    check_completion_menu: null,

    check_completion_date: null,
    credit_check_passed: false,
  }),
  async created() {},
  methods: {},
};
</script>
