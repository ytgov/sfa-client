<template>
  <div>
    <h3>
      Disbursements
      <v-btn @click="addClick" color="primary" class="float-right" small>Add</v-btn>
    </h3>
    <v-simple-table class="text-left narrow">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="narrow">Certificate</th>
            <th class="narrow">Amount</th>
            <th class="narrow">Type</th>
            <th class="narrow">Issue Date</th>
            <th class="narrow">Due Date</th>
            <th class="narrow">Tax Year</th>
            <th class="narrow">Change Reason</th>
            <th class="narrow">Batch</th>
            <th class="narrow"></th>
          </tr>
        </thead>
        <tbody>
          <SfaDisbursementLine
            v-for="(item, idx) of disbursements"
            :item="item"
            :idx="idx"
            :saveDisbursement="saveDisbursement"
            :deleteDisbursement="deleteDisbursement"
          />
        </tbody>
      </template>
    </v-simple-table>
    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";
import SfaDisbursementLine from "./sfa-disbursement-line.vue";

export default {
  name: "CSGDisbursemetns",
  props: ["store"],
  components: { SfaDisbursementLine },
  data: () => ({}),
  created() {},
  computed: {
    ...mapGetters(["cslClassifications", "disbursementTypes", "changeReasons"]),
    disbursements() {
      return store.getters[`${this.store}/disbursements`];
    },
  },
  methods: {
    addClick() {
      let addFunction = store._actions[`${this.store}/addDisbursement`][0];
      addFunction();
    },
    async saveDisbursement() {
      let saveFunction = store._actions[`${this.store}/save`][0];
      saveFunction().then(() => {
        this.$emit("showSuccess", "Disbursements saved");
      });
    },
    async deleteDisbursement(item, index) {
      let removeFunction = store._actions[`${this.store}/removeDisbursement`][0];
      removeFunction({ item, index }).then(() => {
        this.$emit("showSuccess", "Disbursements saved");
      });
    },
  },
};
</script>
