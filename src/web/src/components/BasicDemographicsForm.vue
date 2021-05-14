<template>
  <div>
    <v-card class="default mb-5">
      <v-card-title>Basic Demographics</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Language"
              v-model="language"
              :items="languageOptions"
            ></v-select>
          </div>
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Sex"
              v-model="sex"
              :items="sexOptions"
            ></v-select>
          </div>

          <div class="col-md-3">
            <v-menu
              v-model="birth_date_menu"
              :close-on-content-click="false"
              transition="scale-transition"
              left
              nudge-top="26"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="birth_date"
                  label="Birth date"
                  append-icon="mdi-calendar"
                  readonly
                  outlined
                  dense
                  background-color="white"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="birth_date"
                :max="maxDate"
                @input="birth_date_menu = false"
              ></v-date-picker>
            </v-menu>
          </div>
          
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Birth city"
              v-model="birth_city"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Birth province"
              v-model="birth_province"
              :items="provinceOptions"
            ></v-select>
          </div>

          <div class="col-md-3">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Birth country"
              v-model="birth_country"
              :items="countryOptions"
            ></v-select>
          </div>

        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data: () => ({
    languageOptions: ["English", "French"],
    sexOptions: ["Male", "Female", "Unknown"],
    countryOptions: ["Canada", "United States"],
    provinceOptions: ["Yukon", "British Columbia"],
    maxDate: moment().format("YYYY-MM-DD"),
    birth_date_menu: null,

    language: "English",
    sex: "Male",
    birth_date: null,
    birth_city: "",
    birth_province: "",
    birth_country: "",
  }),
  async created() {},
  methods: {
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
        () => {}
      );
    },
  },
};
</script>
