<template>
  <div>
    <h3>
      Disbursements
      <v-btn @click="addClick" color="primary" class="float-right" small>Add</v-btn>
    </h3>
    <v-simple-table class="text-left narrow" v-if="disbursements.length > 0">
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
            :key="idx"
          />
        </tbody>
      </template>
    </v-simple-table>
    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
import store from "@/store";
import { mapActions, mapGetters, mapState } from "vuex";
import CslDisbursementLine from "./csl-disbursement-line.vue";

export default {
  name: "CSLPTDisbursements",
  components: { CslDisbursementLine },
  data: () => ({}),
  created() {},
  computed: {
    ...mapGetters(["cslClassifications", "disbursementTypes", "changeReasons"]),
    ...mapState("cslPartTimeStore", ["disbursements"]),
  },
  methods: {
    ...mapActions("cslPartTimeStore", ["addDisbursement", "removeDisbursement", "save"]),
    addClick() {
      this.addDisbursement();
    },
    async saveDisbursement() {
      this.save();
    },
    async deleteDisbursement(item, index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this disbursement.",
        () => {
          this.removeDisbursement({ item, index });
        },
        () => {}
      );
    },
  },
};
</script>
