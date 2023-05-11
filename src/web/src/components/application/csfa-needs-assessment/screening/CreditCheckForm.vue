<template>
  <div>
    <!-- TITLE AND SWITCH -->
    <div class="col-md-12 mt-n5">
      <div class="row  mt-2">
        <v-switch
            label=""
            class="my-0 mr-2"
            v-model="application.requires_credit_check"
            @change="doSaveApp('requires_credit_check', application.requires_credit_check)"
        >
        </v-switch>
        <h3 class="text-h6 font-weight-regular">Requires Credit Check</h3>
      </div>
    </div>
    <!--  -->
  
    <v-card class="default mb-5" v-if="application?.requires_credit_check">
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
                  :value="application.credit_chk_app_comp_date?.slice(0, 10)" 
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
              :value="application.credit_chk_app_comp_date?.slice(0, 10)" 
              @input="e => {
                application.credit_chk_app_comp_date = e;
                check_completion_menu = false;
              }" 
              @change="doSaveApp('credit_chk_app_comp_date', application.credit_chk_app_comp_date)"
              ></v-date-picker>
            </v-menu>
          </div>
          <div class="col-md-3 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Credit check passed"
              v-model="application.credit_check_passed"
              @change="doSaveApp('credit_chk_passed', application.credit_check_passed)"
            ></v-switch>
          </div>

          <div class="col-md-3">
            <v-menu
              v-model="last_checked_menu"
              :close-on-content-click="false"
              transition="scale-transition"
              left
              nudge-top="26"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="application.last_checked_on?.slice(0, 10)" 
                  label="Last checked on"
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
              :value="application.last_checked_on?.slice(0, 10)" 
              @input="e => {
                  application.last_checked_on = e;
                  last_checked_menu = false;
                }" 
                @change="doSaveApp('last_checked_on', application.last_checked_on)"
              ></v-date-picker>
            </v-menu>
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
import store from "@/store";
import { mapGetters, mapState } from 'vuex';

export default {
  computed: {
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  data: () => ({
    check_completion_menu: null,
    last_checked_menu: null,
    check_completion_date: null,
    credit_check_passed: false,
  }),
  async created() {},
  methods: {
    doSaveApp(field, value) {
      store.dispatch("updateApplication", [field, value, this]);
    },
  },
};
</script>
