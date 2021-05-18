<template>
  <div>
    <v-card class="default mb-5">
      <v-card-title>Employment</v-card-title>
      <v-card-text>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    countryOptions: ["Canada", "United States"],
    provinceOptions: ["Yukon", "British Columbia"],

    last_name: "",
    first_name: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    province: "",
    postal: "",
    country: "",

    consents: [],
  }),
  async created() {},
  methods: {
    addConsent() {
      this.consents.push({});
    },
    removeConsent(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this consent.",
        () => {
          this.consents.splice(index, 1);
        },
        () => {}
      );
    },
  },
};
</script>
