<template>
  <div>
    <v-card class="default mb-5">
      <v-card-text>
        <h3 class="text-h6 font-weight-regular">Mandatory (Student may not leave blank)</h3>

        <div class="row mb-5">
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Estimated tuition fees"
              v-model="application.tuition_estimate_amount"
              @change="doSaveApp('tuition_estimate_amount', parseMoney(application.tuition_estimate_amount))"
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
              v-model="application.books_supplies_cost"
              v-currency="{ currency: 'USD', locale: 'en' }"
              @change="doSaveApp('books_supplies_cost', parseMoney(application.books_supplies_cost))"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <p class="pt-2 mb-0">
              {{ "Max of $3,000 combined for Book & Supplies and Computer Supplies" }}
            </p>
          </div>
        </div>

        <hr class="mb-5" />
        <h3>Optional input only those that student has specified</h3>

        <div class="row" v-for="(item, i) of studyExpenses" :key="i">
          <div class="col-md-4">
            <v-select
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              label="Expense type"
              v-model="item.category_id"
              @change="updateExpense(item.id, { category_id: item.category_id })"
              :items="expenseCategories"
              item-text="description"
              item-value="id"
            ></v-select>
          </div>
          <div class="col-md-2">
            <v-text-field
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              label="Amount"
              v-model="item.amount"
              @change="updateExpense(item.id, { amount: item.amount })"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              label="Comment"
              v-model="item.description"
              @change="updateExpense(item.id, { description: item.description })"
            ></v-text-field>
          </div>
          <div class="col-md-1">
            <v-btn
              :disabled="showAdd"
              color="warning"
              x-small
              fab
              class="my-0 float-right"
              title="Remove"
              @click="removeExpense(item.id)"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </div>
        </div>

        <div class="row" v-if="showAdd">
          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Expense type"
              v-model="newRecord.category_id"
              :items="expenseCategories"
              item-text="description"
              item-value="id"
            ></v-select>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Amount"
              type="number"
              v-model="newRecord.amount"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-textarea
              rows="1"
              outlined
              dense
              background-color="white"
              hide-details
              label="Comment"
              v-model="newRecord.description"
            ></v-textarea>
          </div>
          <div class="col-md-2">
            <div class="row">
              <div class="col-6 d-flex justify-md-end">
                <v-btn color="success" x-small fab class="my-0" title="Save" @click="addExpense"
                  ><v-icon>mdi-check</v-icon></v-btn
                >
              </div>
              <div class="col-6 d-flex justify-end">
                <v-btn color="error" x-small fab class="my-0" title="Cancel" @click="setShowAdd"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3">
          <v-btn color="info" v-if="!showAdd" @click="showAdd = true">Add expense</v-btn>
          <v-btn color="info" v-else @click="setShowAdd">Cancel</v-btn>
        </div>
      </v-card-text>
    </v-card>

    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
import { parse as vueCurrencyInputParse } from "vue-currency-input";
import { mapGetters } from "vuex";
import store from "@/store";
import { APPLICATION_URL } from "@/urls";
import axios from "axios";

export default {
  name: "study-expenses-form",
  computed: {
    ...mapGetters(["expenseCategories"]),
    application: function() {
      return store.getters.selectedApplication;
    },
    studyExpenses() {
      const newList = this.application?.expenses?.filter((e) => e?.period_id === 2) || [];
      return newList;
    },
  },
  data: () => ({
    showAdd: false,
    newRecord: {
      category_id: null,
      amount: 0,
      description: "",
    },
  }),
  async created() {},
  methods: {
    parseMoney(input, decimals = 2) {
      if (input) {
        let val = vueCurrencyInputParse(input);
        if (decimals == 0) val = Math.round(val);
        return val;
      }

      return input;
    },
    async doSaveApp(field, value) {
      store.dispatch("updateApplication", [field, value, this]).then(() => {
        store.dispatch("loadApplication", this.application.id);
      });
    },
    setShowAdd() {
      this.newRecord = {
        category_id: null,
        amount: 0,
        description: "",
      };
      this.showAdd = false;
    },
    async updateExpense(id, data) {
      try {
        const resUpdate = await axios.patch(`${APPLICATION_URL}/${this.application.id}/expense/${id}`, { data });

        const message = resUpdate?.data?.messages[0];

        if (message?.variant === "success") {
          this.$emit("showSuccess", message.text);
        } else {
          this.$emit("showError", message.text);
        }
      } catch (error) {
        console.log(error);
        this.$emit("showError", "Error to update");
      } finally {
        store.dispatch("loadApplication", this.application.id);
      }
    },
    async addExpense() {
      try {
        const resInsert = await axios.post(`${APPLICATION_URL}/${this.application.id}/expense`, {
          data: { ...this.newRecord, period_id: 2 },
        });

        const message = resInsert?.data?.messages[0];

        if (message?.variant === "success") {
          this.$emit("showSuccess", message.text);
          this.setShowAdd();
        } else {
          this.$emit("showError", message.text);
        }
      } catch (error) {
        console.log(error);
        this.$emit("showError", "Error to insert");
      } finally {
        store.dispatch("loadApplication", this.application.id);
      }
    },
    async deleteExpense(id) {
      try {
        const resDelete = await axios.delete(`${APPLICATION_URL}/expense/${id}`);

        const message = resDelete?.data?.messages[0];

        if (message?.variant === "success") {
          this.$emit("showSuccess", message.text);
        } else {
          this.$emit("showError", message.text);
        }
      } catch (error) {
        console.log(error);
        this.$emit("showError", "Error to delete");
      } finally {
        store.dispatch("loadApplication", this.application.id);
      }
    },
    removeExpense(id) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this expense.",
        () => {
          this.deleteExpense(id);
        },
        () => {}
      );
    },
  },
};
</script>
