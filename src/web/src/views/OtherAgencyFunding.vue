<template>
  <div class="home">
    <h1>Other Agencies Funding</h1>
    <hr />

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">Contact</v-tab>
      <v-tab key="1">Basic</v-tab>
      <v-tab key="1">Statistical</v-tab>
      <v-tab key="1">Ids / Pre-system info</v-tab>
      <v-tab key="1">Next of kin / consent</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="padding: 20px">
      <v-tab-item key="0">
      </v-tab-item>
      <v-tab-item key="1">
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import router from "../router";
import store from "../store";

export default {
  name: "Home",
  data: () => ({
    tab: 0,
  }),
  async created() {
    await store.dispatch("checkAuthentication");
    var isAuth = store.getters.isAuthenticated;

    if (isAuth) router.push("/dashboard");
  },
  methods: {},
};
</script>
