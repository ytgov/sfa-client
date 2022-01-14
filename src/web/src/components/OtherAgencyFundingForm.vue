<template>
  <div class="home">
    <v-switch
      dense
      hide-details
      label="Applied for other funding"
      v-model="applied_other_funding"
    ></v-switch>

    <div v-if="applied_other_funding" class="mt-5">
      <v-card
        class="default mb-5"
        v-for="(item, i) of application.other_funding"
        :key="i"
      >
        <v-card-title>
          Agency {{ 1 + i }}
          <v-spacer></v-spacer>
          <v-btn
            color="warning"
            x-small
            fab
            class="my-0"
            @click="removeOtherFunding(i)"
            ><v-icon>mdi-close</v-icon></v-btn
          ></v-card-title
        >
        <v-card-text>
          <div class="row">
            <div class="col-md-8">
              <v-autocomplete
                outlined
                dense
                background-color="#ffaaaa"
                hide-details
                label="Agency name"
                :items="agencyOptions"
                v-model="item.AGENCY_ID"
                item-text="DESCRIPTION"
                item-value="AGENCY_ID"
              ></v-autocomplete>
            </div>
            <div class="col-md-4">
              <v-text-field
                outlined
                dense
                background-color="#ffaaaa"
                hide-details
                label="Amount"
                v-model="item.AMOUNT"
                v-currency="{ currency: 'USD', locale: 'en' }"
              ></v-text-field>
            </div>

            <div class="col-md-2 py-0">
              <v-switch
                dense
                hide-details
                label="Tuition"
                v-model="item.TUITION_FLAG"
              ></v-switch>
            </div>
            <div class="col-md-2 py-0">
              <v-switch
                dense
                hide-details
                label="Books"
                v-model="item.BOOKS_FLAG"
              ></v-switch>
            </div>
            <div class="col-md-2 py-0">
              <v-switch
                dense
                hide-details
                label="Living expenses"
                v-model="item.LIVING_EXPENSE_FLAG"
              ></v-switch>
            </div>
            <div class="col-md-2 py-0">
              <v-switch
                dense
                hide-details
                label="Transportation"
                v-model="item.TRANSPORTATION_FLAG"
              ></v-switch>
            </div>

            <div class="col-md-4">
              <v-text-field
                outlined
                dense
                background-color="#ffaaaa"
                hide-details
                label="Other purposes"
                v-model="item.OTHER_PURPOSE"
              ></v-text-field>
            </div>

            <div class="col-md-12">
              <v-textarea
                outlined
                dense
                background-color="#ffaaaa"
                hide-details
                label="Comments"
                v-model="item.AGENCY_COMMENT"
              ></v-textarea>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-btn color="info" @click="addOtherFunding()">Add other funding</v-btn>
    </div>
    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
import store from "../store";
import axios from "axios";
import { AGENCY_URL } from "../urls";

export default {
  name: "Home",
  computed: {
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  data: () => ({
    agencyOptions: [],
    applied_other_funding: false,
  }),
  async created() {
    this.applied_other_funding = this.application.other_funding.length > 0;
    this.loadAgencies();
  },
  methods: {
    loadAgencies() {
      axios.get(AGENCY_URL).then((resp) => {
        this.agencyOptions = resp.data;
      });
    },
    addOtherFunding() {
      this.application.other_funding.push({ amount: 0 });
    },
    removeOtherFunding(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this other funding.",
        () => {
          console.log("DID CONFIR%M");
          this.application.other_funding.splice(index, 1);
        },
        () => {}
      );
    },
  },
};
</script>
