<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <p>
      The authentication for this application is managed by our authentication
      partner Vivvo. When you click the button below, you will be redirected to
      their site and once authenticated, back here.
    </p>
    <p>
      If you have already authenticated with Vivvo and your session is still
      active, it may skip the sign in process and return you here immediately.
    </p>

    <a class="v-btn primary v-size--default" :href="loginLink"
      >Click here to sign in</a
    >
  </div>
</template>

<script>
import { applicationName } from "../config";
import { LOGIN_URL } from "../urls";
import router from "../router";
import store from "../store";

export default {
  name: "Login",
  data: () => ({
    loginLink: `${LOGIN_URL}`,
    title: `Sign in to ${applicationName}`,
  }),
  async created() {
    await store.dispatch("checkAuthentication");
    var isAuthenticated = store.getters.isAuthenticated;

    if (isAuthenticated) {
      router.push("/");
    }
  },
};
</script>
