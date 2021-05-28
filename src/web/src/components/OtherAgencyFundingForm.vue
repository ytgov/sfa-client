<template>
  <div class="home">

    <v-switch
      dense
      hide-details
      label="Applied for other funding"
      v-model="applied_other_funding"
    ></v-switch>

    <div v-if="applied_other_funding" class="mt-5">
      <v-card class="default mb-5" v-for="(item, i) of other_fundings" :key="i">
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
              <v-select
                outlined
                dense
                background-color="white"
                hide-details
                label="Agency name"
                :items="agencyOptions"
                v-model="item.agency"
              ></v-select>
            </div>
            <div class="col-md-4">
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

            <div class="col-md-2 py-0">
              <v-switch
                dense
                hide-details
                label="Tuition"
                v-model="item.tuition"
              ></v-switch>
            </div>
            <div class="col-md-2 py-0">
              <v-switch
                dense
                hide-details
                label="Books"
                v-model="item.books"
              ></v-switch>
            </div>
            <div class="col-md-2 py-0">
              <v-switch
                dense
                hide-details
                label="Living expenses"
                v-model="item.living_expenses"
              ></v-switch>
            </div>
            <div class="col-md-2 py-0">
              <v-switch
                dense
                hide-details
                label="Transportation"
                v-model="item.transportation"
              ></v-switch>
            </div>

            <div class="col-md-4">
              <v-text-field
                outlined
                dense
                background-color="white"
                hide-details
                label="Other purposes"
                v-model="item.other_purposes"
              ></v-text-field>
            </div>

            <div class="col-md-12">
              <v-textarea
                outlined
                dense
                background-color="white"
                hide-details
                label="Comments"
                v-model="item.comments"
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
export default {
  name: "Home",
  data: () => ({
    agencyOptions: ["Mom", "Dad"],

    applied_other_funding: false,
    other_fundings: [],
  }),
  async created() {},
  methods: {
    addOtherFunding() {
      this.other_fundings.push({ amount: 0 });
    },
    removeOtherFunding(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this other funding.",
        () => {
          console.log("DID CONFIR%M");
          this.other_fundings.splice(index, 1);
        },
        () => {}
      );
    },
  },
};
</script>
