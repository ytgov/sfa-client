<template>
  <div>
    <v-card class="default mb-5">
      <v-card-text>
        <h3>Canada Study/Access Grant - Other</h3>

        <div class="row" v-for="(item, i) of grants" :key="i">
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Grant"
              v-model="item.grant"
              :items="grantOptions"
            ></v-select>
          </div>
          <div class="col-md-6">
            <v-btn
              color="warning"
              x-small
              fab
              class="my-0"
              @click="removeGrant(i)"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </div>
        </div>
        <v-btn color="info" @click="addGrant()">Add record</v-btn>
      </v-card-text>
    </v-card>

    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    grantOptions: ["Independent DO NOT USE"],

    grants: [],
  }),
  async created() {},
  methods: {
    addGrant() {
      this.grants.push({});
    },
    removeGrant(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this grant.",
        () => {
          this.grants.splice(index, 1);
        },
        () => {}
      );
    },
  },
};
</script>
