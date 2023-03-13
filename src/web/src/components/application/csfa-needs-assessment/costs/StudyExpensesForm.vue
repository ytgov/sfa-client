<template>
  <div>
    <v-card class="default mb-5">
      <v-card-text>
        <h3>Mandatory (Student may not leave blank)</h3>

        <div class="row mb-5">
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Estimated tuition fees"
              v-model="tuition_amount"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-6 d-none d-md-block"></div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Books & supplies"
              v-model="book_supplies_amount"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <p class="pt-2 mb-0">
              Max of $3,000 combined for Book & Supplies and Computer Supplies
            </p>
          </div>
        </div>

        <hr class="mb-5" />
        <h3>Optional (input only those that student has specified</h3>

        <div class="row" v-for="(item, i) of expenses" :key="i">
          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Expense type"
              v-model="item.expense_type"
              :items="expenseTypeOptions"
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
              @click="removeExpense(i)"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </div>
        </div>
        <v-btn color="info" @click="addExpense()">Add expense</v-btn>
      </v-card-text>
    </v-card>

    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    expenseTypeOptions: [
      "Alimony Support",
      "Child Support",
      "Computer Hardware/Software/Supplies",
      "Day Care Costs - Monthly",
    ],

    tuition_amount: 0,
    book_supplies_amount: 0,
    expenses: [],
  }),
  async created() {},
  methods: {
    addExpense() {
      this.expenses.push({ amount: 0 });
    },
    removeExpense(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this expense.",
        () => {
          this.expenses.splice(index, 1);
        },
        () => {}
      );
    },
  },
};
</script>
