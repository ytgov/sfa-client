<template>
  <div class="home">
    <v-card class="default mb-5">
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <h3 class="text-h6 font-weight-regular">Name and SIN</h3>
          </div>
          <div class="col-md-6">
            <v-row>
                <div class="col-md-6">
                    <v-btn block color="success" class="my-0">View SPDEC</v-btn>
                </div>
                <div class="col-md-6">
                    <v-btn block color="success" class="my-0">View spouse NOA</v-btn>
                </div>
            </v-row>
        </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Last name"
              oninput="
                if (this.value.length > 100) this.value = this.value.slice(0, 10);
                if (this.value.length > 100) this.value = this.value.slice(0, 10);
                const arr = this.value.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
                }
                this.value = arr.join(' ');
              "
              v-model="spouse.last_name"
              @change="change({last_name: spouse.last_name})"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="First name"
              oninput="
                if (this.value.length > 100) this.value = this.value.slice(0, 10);
                if (this.value.length > 100) this.value = this.value.slice(0, 10);
                const arr = this.value.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
                }
                this.value = arr.join(' ');
              "
              v-model="spouse.first_name"
              @change="change({first_name: spouse.first_name})"
            ></v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Initial"
              oninput="
                this.value = this.value.slice(0,1);
                this.value = this.value.toUpperCase();
              "
              @keypress="validate.isLetter($event)"
              v-model="spouse.initials"
              @change="change({initials: spouse.initials})"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="SIN"
              v-model="spouse.sin"
              @keypress="validate.isNumber($event)"
                    @change="e => {
                        if (validate.SIN(spouse.sin) || !String(spouse.sin).length) {
                            return change({sin: spouse.sin});
                        } else {
                            $store.dispatch('loadApplication', application.id);
                            return $emit('showError', 'Invalid SIN');
                        }
                    }"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Income (line 150)"
              @keypress="validate.isNumber($event)"
              v-model="application.spouse_ln150_income"
              @change="doSaveApp('spouse_ln150_income', application.spouse_ln150_income)"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="default mb-5">
      <v-card-title>Study Period</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-8">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Study employment status"
              @change="doSaveApp('spouse_study_emp_status_id', application.spouse_study_emp_status_id)"
              v-model="application.spouse_study_emp_status_id"
              :items="prestudyEmployments"
              item-text="description"
              item-value="id"
            ></v-select>
          </div>
          <div class="col-md-4">
            * If employed, enter employment details under income tab
          </div>
          <div class="col-md-2">Post secondary Information</div>
          <div class="col-md-5">
            <v-menu
                v-model="show_menu_from"
                :close-on-content-click="false"
                transition="scale-transition"
                left
                nudge-top="26"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="In school from"
                    append-icon="mdi-calendar"
                    :value="application.spouse_study_school_from?.slice(0, 10)"
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
                :value="application.spouse_study_school_from?.slice(0, 10)"
                @input="e => {
                  application.spouse_study_school_from = e;
                  show_menu_from = false;
                }"
                @change="doSaveApp('spouse_study_school_from', application.spouse_study_school_from)"
                ></v-date-picker>
              </v-menu>
          </div>
          <div class="col-md-5">
            <v-menu
                v-model="show_menu_to"
                :close-on-content-click="false"
                transition="scale-transition"
                left
                nudge-top="26"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="In school to"
                    append-icon="mdi-calendar"
                    :value="application.spouse_study_school_to?.slice(0, 10)"
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
                :value="application.spouse_study_school_to?.slice(0, 10)"
                @input="e => {
                  application.spouse_study_school_to = e;
                  show_menu_to = false;
                }"
                @change="doSaveApp('spouse_study_school_to', application.spouse_study_school_to)"
                ></v-date-picker>
              </v-menu>
          </div>
          <div class="col-md-12 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Applying for Canada Student Loan"
              v-model="application.is_spouse_study_csl"
              @change="doSaveApp('is_spouse_study_csl', application.is_spouse_study_csl)"
            ></v-switch>
          </div>
          <div class="col-md-2">Employment information</div>

          <div class="col-md-3 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Living with spouse"
              v-model="application.study_living_w_spouse"
              @change="doSaveApp('study_living_w_spouse', application.study_living_w_spouse)"
            ></v-switch>
          </div>
          <div class="col-md-3 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Bus service available"
              v-model="application.is_spouse_study_bus"
              @change="doSaveApp('is_spouse_study_bus', application.is_spouse_study_bus)"
            ></v-switch>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="In no, distance from school/work (km)"
              @keypress="validate.isNumber($event)"
              v-model="application.spouse_study_distance"
              @change="doSaveApp('is_spouse_study_bus', application.spouse_study_distance)"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import store from "@/store";
import { APPLICATION_URL, STUDENT_URL } from "@/urls";
import axios from "axios";
import { mapGetters } from 'vuex';
import validator from "@/validator";

export default {
  name: "Home",
  computed: {
    ...mapGetters(['prestudyEmployments']),
    application: function () {
      return store.getters.selectedApplication;
    },
    spouse() {
      return this.application?.spouse_info || {};
    },
  },
  data: () => ({
    employmentStatusOptions: ["Status 1", "Status 2"],
    show_menu_from: false,
    show_menu_to: false,
    study_employment_status: "",
    study_post_secondary_from: "",
    study_post_secondary_to: "",
    study_applying_for_csl: false,
    validate: {},
  }),
  created() {
    store.dispatch('setPrestudyEmployments');
    this.validate = { ...validator };
  },
  methods: {
    doSaveStudent(field, value) {
      store.dispatch("updateStudent", [field, value, this]);
    },
    doSaveApp(field, value) {
      store.dispatch("updateApplication", [field, value, this]);
    },
    async change( data ) {
      try {
        if (this.spouse?.id) {
          const resUpdate = await axios.patch(`${STUDENT_URL}/${this.spouse.id}/person`,
            { data },
          );

          const message = resUpdate?.data?.messages[0];

          if (message?.variant === "success") {
              this.$emit("showSuccess", message.text);
          } else {
              this.$emit("showError", message.text);
          }
        } else {
          const resInsert = await axios.post(`${APPLICATION_URL}/${this.application.id}/person`,
            { data, typeId: "spouse_id" },
          );

          const message = resInsert?.data?.messages[0];

          if (message?.variant === "success") {
              this.$emit("showSuccess", message.text);
          } else {
              this.$emit("showError", message.text);
          }
          
        }
      } catch (error) {
        console.log(error);
        this.$emit("showError", "Error to Update");
                
      } finally {
        store.dispatch("loadApplication", this.application.id);
      }
      
    }
  },
};
</script>
