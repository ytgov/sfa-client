<template>
  <div>
    <v-card class="default mb-5">
      <v-card-title>Basic Demographics</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-select outlined dense background-color="white" hide-details label="Language"
              v-model="student.language_id" item-text="description" item-value="id" :items="languages"
              @change="doSaveStudent('language_id', student.language_id, 'personInfo', student.id)"></v-select>
          </div>
          <div class="col-md-6">
            <v-select outlined dense background-color="white" hide-details label="Sex" v-model="student.sex_id"
              item-text="description" item-value="id" :items="sexes"
              @change="doSaveStudent('sex_id', student.sex_id, 'personInfo', student.id)"></v-select>
          </div>

          <div class="col-md-3">
            <v-menu v-model="birth_date_menu" :close-on-content-click="false" transition="scale-transition" left
              nudge-top="26" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="student.birth_date" label="Birth date" append-icon="mdi-calendar" readonly
                  outlined dense background-color="white" v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="student.birth_date" :min="minDate" :max="maxDate" @input="birth_date_menu = false"
                @change="doSaveStudent('birth_date', student.birth_date, 'personInfo', student.id)"></v-date-picker>
            </v-menu>
          </div>
          <div class="col-md-3">
            <v-text-field outlined dense background-color="white" hide-details label="SFA number"
              oninput="
                if (this.value.length > 20) this.value = this.value.slice(0, 20);
              "
              @keypress="validate.isNumber($event)"
              v-model="student.yukon_id"
              @change="doSaveStudent('yukon_id', student.yukon_id, 'studentInfo', student.id)"></v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field outlined dense background-color="white" hide-details label="Records locator number"
              oninput="
                if (this.value.length > 15) this.value = this.value.slice(0, 15);
              "
              @keypress="validate.isNumber($event)"
              v-model="student.locator_number" @change="
                doSaveStudent('locator_number', student.locator_number, 'studentInfo', student.id)
              "></v-text-field>
          </div>
          <div class="col-md-3">
            <v-select outlined dense background-color="white" hide-details label="Funded since"
              v-model="student.pre_funded_year" @change="
                doSaveStudent('pre_funded_year', student.pre_funded_year, 'studentInfo', student.id)
              " :items="yearOptions"></v-select>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import store from "../../store";
import { mapGetters, mapState } from "vuex";
import validator from "@/validator";

export default {
  computed: {
    ...mapState(["selectedStudent"]),
    ...mapGetters(["languages", "sexes"]),
    student: function () {
      const studentSelected = {
        ...store.getters.selectedStudent,
        birth_date: store.getters.selectedStudent.birth_date.slice(0, 10),
        pre_funded_year: store.getters.selectedStudent.pre_funded_year.toString(),
        
      }

      return studentSelected;
    },
    application: function () {
      return store.getters.selectedApplication;
    },
    sfaNumber: {
      get() {
        return String(this.student.yukon_id).slice(0,12);
      },
      set() {
        console.log(newValue);
        console.log(this.student.yukon_id);
        if (String(newValue).length > 10) {
          this.student.yukon_id = "";
        }

      }
    },
  },
  data: () => ({
    validate: {},
    languageOptions: [],
    sexOptions: [
      { value: 1, text: "Male" },
      { value: 2, text: "Female" },
      { value: 3, text: "Unknown" },
    ],
    yearOptions: [],
    maxDate: moment().format("YYYY-MM-DD"),
    minDate: "1940-01-01",
    birth_date_menu: null,
  }),
  async created() {
    this.validate = validator;
    store.dispatch("setLanguages");
    store.dispatch("setSexes");
    this.yearOptions = [];
    
    let startYear = 1990;
    let currentYear = moment().year();
    
    for (let i = currentYear; i >= startYear; i--) {
      this.yearOptions.push(`${i}`);
    }
  },
  methods: {
    updateValue(event){
      if (String(event).length > 12) {
        console.log("entrando");
        this.$set(this.student,'yukon_id', String(event).slice(0,10));
      }
      //367854344
    },
    
    addConsent() {
      this.consents.push({});
    },
    removeConsent(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this consent.",
        () => {
          this.consents.splice(index, 1);
        },
        () => { }
      );
    },
    doSaveStudent(field, value, type, addressId = null) {
      store.dispatch("updateStudent", [field, value, type, addressId, this]);
    },
  },
};
</script>
