<template>
  <div>
    <v-card class="default">
      <v-card-title>Yukon Excellence Awards</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-12 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Applying for YEA reimbursement or direct payment"
              v-model="is_applying"
            ></v-switch>
          </div>

          <div class="col-md-3">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Left high school year"
              v-model="high_school_year"
              :items="yearOptions"
            ></v-select>
          </div>
          <div class="col-md-3">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Left high school month"
              v-model="high_school_month"
              :items="monthOptions"
            ></v-select>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="YEA request amount"
              v-model="yea_request_amount"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              disabled
              background-color="white"
              hide-details
              label="Current YEA balance"
              v-model="yea_balance"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>

          <div class="col-md-3">
            <v-menu
              v-model="yea_expiry_menu"
              :close-on-content-click="false"
              transition="scale-transition"
              left
              nudge-top="26"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="yea_expiry_date"
                  label="YEA expiry date"
                  append-icon="mdi-calendar"
                  readonly
                  outlined
                  hide-details
                  dense
                  background-color="white"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="yea_expiry_date"
                @input="yea_expiry_menu = false"
              ></v-date-picker>
            </v-menu>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Yukon ID"
              v-model="yukon_id"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <hr class="mt-5 mb-5" />
    <v-card class="default mb-5" v-for="(item, i) of earned" :key="i">
      <v-card-title
        >Earned {{ 1 + i }}
        <v-spacer></v-spacer>
        <v-btn color="warning" x-small fab class="my-0" @click="removeEarned(i)"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="First name"
              v-model="item.first_name"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Last name"
              v-model="item.last_name"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Course"
              v-model="item.course"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Amount"
              v-model="item.amount"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Year"
              v-model="item.year"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-btn color="info" @click="addEarned()">Add YEA earned</v-btn>

    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data: () => ({
    yearOptions: [],
    monthOptions: [],
    yea_expiry_menu: null,

    is_applying: false,
    high_school_year: "",
    high_school_month: "06",
    yea_request_amount: 0,
    yea_balance: 0,
    yea_expiry_date: null,
    yukon_id: "",

    earned: [],
  }),
  async created() {
    this.monthOptions = [];
    this.yearOptions = [];

    for (let i = 1; i <= 12; i++) {
      let m = `0${i}`;
      this.monthOptions.push(m.substring(m.length - 2));
    }

    let startYear = 2000;
    let currentYear = moment().year();

    for (let i = currentYear; i >= startYear; i--) {
      this.yearOptions.push(`${i}`);
    }
  },
  methods: {
    addEarned() {
      this.earned.push({amount: 0});
    },
    removeEarned(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this YEA.",
        () => {
          this.earned.splice(index, 1);
        },
        () => {}
      );
    },
  },
};
</script>
