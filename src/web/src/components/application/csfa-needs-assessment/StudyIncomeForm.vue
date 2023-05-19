<template>
  <div>
    <v-card class="default mb-5">
      <v-card-text>
        <h3>Study Income</h3>

        <div class="row" v-for="(item, i) of application?.incomes" :key="i">
          <div class="col-md-4">
            <v-select
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              label="Income type"
              v-model="item.income_type_id"
              :items="incomeTypes"
              item-text="description"
              item-value="id"
              @change="updateIncome(item.id, {income_type_id: item.income_type_id})"
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
              @change="updateIncome(item.id, {amount: item.amount})"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-textarea
              rows="1"
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              label="Comment"
              v-model="item.comment"
              @change="updateIncome(item.id, {comment: item.comment})"
            ></v-textarea>
          </div>
          <div class="col-md-1">
            <v-btn
              :disabled="showAdd"
              color="warning"
              x-small
              fab
              class="my-0 float-right"
              title="Remove"
              @click="removeIncome(item.id)"
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
              label="Income type"
              :items="incomeTypes"
              item-text="description"
              item-value="id"
              v-model="newRecord.income_type_id"
            ></v-select>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Amount"
              v-model="newRecord.amount"
              type="number"
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
              v-model="newRecord.comment"
            ></v-textarea>
          </div>
          <div class="col-md-2">
            <div class="row">
              <div class="col-6 d-flex justify-md-end">
                <v-btn
                  color="success"
                  x-small
                  fab
                  class="my-0"
                  title="Save"
                  @click="addIncome"
                  ><v-icon>mdi-check</v-icon></v-btn
                >
              </div>
              <div class="col-6 d-flex justify-end">
                <v-btn
                color="error"
                x-small
                fab
                class="my-0"
                title="Cancel"
                @click="setShowAdd"
                ><v-icon>mdi-close</v-icon></v-btn>
              </div>
            </div>
          </div>
        </div>
        <v-btn color="info" v-if="!showAdd" @click="showAdd = true">Add income</v-btn>
        <v-btn color="info" v-else @click="setShowAdd()">Cancel</v-btn>
      </v-card-text>
    </v-card>

    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from "@/store";
import { APPLICATION_URL } from '@/urls';
import axios from 'axios';
export default {
  computed: {
    ...mapGetters(["incomeTypes"]),
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  data: () => ({
    showAdd: false,
    newRecord: {
      income_type_id: null,
      amount: 0,
      comment: ""
    },
  }),
  async created() {
    store.dispatch("setIncomeTypes");
  },
  methods: {
    setShowAdd() {
      this.newRecord = {
        income_type_id: null,
        amount: 0,
        comment: ""
      };
      this.showAdd = false;
    },
    async updateIncome(id, data) {
      try {
        const resUpdate = await axios.patch(
          `${APPLICATION_URL}/${this.application.id}/income/${id}`,
          { data }
        );

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
    async addIncome() {
      try {
        const resInsert = await axios.post(
          `${APPLICATION_URL}/${this.application.id}/income`,
          { data: { ...this.newRecord } }
        );

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
    async deleteIncome(id) {
            try {
                const resDelete = await axios.delete(`${APPLICATION_URL}/income/${id}`);

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
    removeIncome(id) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this income.",
        () => {
          this.deleteIncome(id);
        },
        () => {}
      );
    },
  },
};
</script>
