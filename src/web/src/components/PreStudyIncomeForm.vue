<template>
  <div>
    <v-card class="default mb-5">
      <v-card-text>
        <h3>Pre-Study Income</h3>

        <div class="row" v-for="(item, i) of incomes" :key="i">
          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Income type"
              v-model="item.income_type"
              :items="incomeTypeOptions"
            ></v-select>
          </div>
          <div class="col-md-2">
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
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Comment"
              v-model="item.comment"
            ></v-text-field>
          </div>
          <div class="col-md-1">
            <v-btn
              color="warning"
              x-small
              fab
              class="my-0 float-right"
              title="Remove"
              @click="removeIncome(i)"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </div>
        </div>
        <v-btn color="info" @click="addIncome()">Add income</v-btn>
      </v-card-text>
    </v-card>

    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    incomeTypeOptions: [
      "Alimony Support",
      "Child Support",
      "Computer Hardware/Software/Supplies",
      "Day Care Costs - Monthly",
    ],

    incomes: [],
  }),
  async created() {},
  methods: {
    addIncome() {
      this.incomes.push({ amount: 0 });
    },
    removeIncome(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this income.",
        () => {
          this.incomes.splice(index, 1);
        },
        () => {}
      );
    },
  },
};
</script>
