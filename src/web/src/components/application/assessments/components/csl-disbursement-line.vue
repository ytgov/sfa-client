<template>
  <tr class="narrow">
    <td>
      <v-text-field
        v-if="canEdit('transaction_number')"
        v-model="item.transaction_number"
        dense
        hide-details
        outlined
        background-color="white"
        @change="saveDisbursement"
        class="narrowInput"
      ></v-text-field>
      <v-text-field
        v-else
        v-model="item.transaction_number"
        dense
        hide-details
        readonly
        outlined
        background-color="#ccc"
        class="narrowInput"
      ></v-text-field>
    </td>
    <td>
      <div v-if="canEdit('disbursed_amount')">
        <v-text-field
          v-model="amount"
          @change="saveDisbursement"
          v-currency
          ref="amount1"
          dense
          outlined
          background-color="white"
          hide-details
          class="narrowInput"
        ></v-text-field>
      </div>
      <div v-else>
        <v-text-field
          :value="formatMoney(item.disbursed_amount)"
          dense
          readonly
          outlined
          background-color="#ccc"
          hide-details
          class="narrowInput"
        ></v-text-field>
      </div>
    </td>
    <td>
      <v-text-field
        :value="getType(item.disbursement_type_id)"
        v-if="item.csl_cert_seq_number"
        dense
        readonly
        hide-details
        outlined
        background-color="#ccc"
        class="narrowInput"
      ></v-text-field>
      <v-autocomplete
        v-model="item.disbursement_type_id"
        v-else
        :items="disbursementTypes"
        item-text="description"
        item-value="id"
        dense
        hide-details
        outlined
        :readyonly="!item.csl_cert_seq_number"
        class="narrowInput"
        @change="saveDisbursement"
      ></v-autocomplete>
    </td>
    <td>
      <v-text-field
        :value="item.issue_date"
        v-if="item.csl_cert_seq_number"
        dense
        readonly
        hide-details
        outlined
        background-color="#ccc"
        class="narrowInput"
      ></v-text-field>

      <v-menu
        v-else
        v-model="menus1[idx]"
        :close-on-content-click="false"
        transition="scale-transition"
        left
        nudge-top="26"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="item.issue_date"
            readonly
            outlined
            dense
            hide-details
            background-color="white"
            class="narrowInput"
            v-bind="attrs"
            v-on="on"
            @change="saveDisbursement"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="item.issue_date"
          @input="
            menus1[idx] = false;
            saveDisbursement();
          "
        >
          <v-btn
            text
            color="primary"
            @click="
              item.issue_date = undefined;
              menus1[idx] = false;
            "
          >
            Clear
          </v-btn>
        </v-date-picker>
      </v-menu>
    </td>
    <td>
      <v-text-field
        :value="item.due_date"
        v-if="item.csl_cert_seq_number"
        dense
        readonly
        hide-details
        outlined
        background-color="#ccc"
        class="narrowInput"
      ></v-text-field>

      <v-menu
        v-else
        v-model="menus2[idx]"
        :close-on-content-click="false"
        transition="scale-transition"
        left
        nudge-top="26"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="item.due_date"
            readonly
            outlined
            dense
            hide-details
            background-color="white"
            v-bind="attrs"
            v-on="on"
            @change="saveDisbursement"
            class="narrowInput"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="item.due_date"
          @input="
            menus2[idx] = false;
            saveDisbursement();
          "
        >
          <v-btn
            text
            color="primary"
            @click="
              item.due_date = undefined;
              menus2[idx] = false;
            "
          >
            Clear
          </v-btn>
        </v-date-picker>
      </v-menu>
    </td>
    <td>
      <v-autocomplete
        v-model="item.change_reason_id"
        :items="changeReasons"
        item-text="description"
        item-value="id"
        dense
        hide-details
        outlined
        @change="saveDisbursement"
        class="narrowInput"
      ></v-autocomplete>
    </td>
    <td>
      <v-text-field
        v-model="item.financial_batch_id"
        dense
        hide-details
        readonly
        outlined
        background-color="#ccc"
        class="narrowInput"
      ></v-text-field>
    </td>
    <td>
      <v-btn
        fab
        class="my-0 mr-1"
        color="warning"
        x-small
        @click="deleteDisbursement(item, idx)"
        v-if="!item.csl_cert_seq_number"
        ><v-icon>mdi-delete</v-icon></v-btn
      >
    </td>
  </tr>
</template>

<script>
import { mapGetters } from "vuex";
import { isNumber, isEmpty } from "lodash";
import { setValue, getValue } from "vue-currency-input";

export default {
  props: ["item", "idx", "saveDisbursement", "deleteDisbursement"],
  data: () => ({
    menus1: [],
    menus2: [],
    amount: null,
  }),
  computed: {
    ...mapGetters(["cslClassifications", "disbursementTypes", "changeReasons"]),
  },
  mounted() {
    if (this.$refs.amount1) setValue(this.$refs.amount1.$el, this.item.disbursed_amount);
  },
  watch: {
    item() {
      if (this.$refs.amount1) setValue(this.$refs.amount1.$el, this.item.disbursed_amount);
    },
    amount() {
      if (this.canEdit("disbursed_amount")) this.item.disbursed_amount = getValue(this.$refs.amount1.$el);
    },
  },
  methods: {
    canEdit(field) {
      let alwaysEditable = ["transaction_number", "change_reason_id"];
      if (alwaysEditable.includes(field)) return true;

      if (isEmpty(this.item.csl_cert_seq_number)) return true;

      return false;
    },
    formatMoney(input) {
      if (isNumber(input)) {
        return Intl.NumberFormat("en", {
          currency: "USD",
          style: "currency",
        }).format(input);
      }
      return "";
    },
    getReason(item) {
      let val = this.changeReasons.filter((r) => r.id == item);
      return val[0] ? val[0].description : "";
    },
    getType(item) {
      let val = this.disbursementTypes.filter((r) => r.id == item);
      return val[0] ? val[0].description : "";
    },
  },
};
</script>

<style scoped>
.narrow td {
  padding: 0 2px !important;
}
</style>
