<template>
  <div>
    <v-breadcrumbs
      divider="/"
      large
      :items="[
        { text: 'Administration Home', to: '/administration', exact: true },
        {
          text: 'Students',
          to: '/administration/students',
          exact: true,
        },
      ]"
    >
    </v-breadcrumbs>
    <h1>Students</h1>

    <router-link to="/administration/students/1233">Go to student</router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store";

export default {
  data: () => ({}),
  created() {},
  methods: {},
  computed: {
    ...mapState(["showSideBarAdmin"]),
  },
  async created() {
    await store.dispatch(
      "setAppSideBarAdmin",
      this.$route.path.startsWith("/administration"));
  }
};
</script>