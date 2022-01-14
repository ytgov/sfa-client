<template>
  <div>
    <v-card class="default mb-5">
      <v-card-text>
        <h3>Pre-Study Expenses</h3>

        <div class="row" v-for="(item, i) of expenses" :key="i">
          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="#ffaaaa"
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
              background-color="#ffaaaa"
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
              background-color="#ffaaaa"
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
    expenseTypeOptions: ["Alimony Support", "Child Support", "Computer Hardware/Software/Supplies", "Day Care Costs - Monthly"],

    expenses: [],
  }),
  async created() {},
  methods: {
    addExpense() {
      this.expenses.push({amount: 0});
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
