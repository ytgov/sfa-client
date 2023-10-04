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
            <th class="narrow">Change Reason</th>
            <th class="narrow">eCert</th>
            <th class="narrow"></th>
          </tr>
        </thead>
        <tbody>
          <CslDisbursementLine
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
import CslDisbursementLine from "./csl-disbursement-line.vue";

export default {
  name: "CSGDisbursemetns",
  props: ["disbursements"],
  components: { CslDisbursementLine },
  data: () => ({}),
  created() {},
  computed: {
    ...mapGetters(["cslClassifications", "disbursementTypes", "changeReasons"]),
  },
  methods: {
    addClick() {
      store.dispatch("addCslftDisbursement");
    },
    async saveDisbursement() {},
    async deleteDisbursement(item, index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this disbursement.",
        () => {
          store.dispatch("removeCslftDisbursement", index);
        },
        () => {}
      );
    },
  },
};
</script>
