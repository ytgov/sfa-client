<template>
  <div>
    <MailingAddress :parent="mailingAddressParents" v-on:showSuccess="showSuccess" v-on:showError="showError" />
    <Parent :index="1" :parent="parent1" v-on:showSuccess="showSuccess" v-on:showError="showError" />
    <Parent :index="2" :parent="parent2" v-on:showSuccess="showSuccess" v-on:showError="showError" />
    <hr />
    <ParentsDependents v-on:showSuccess="showSuccess" v-on:showError="showError" />
  </div>
</template>
<script>
import store from "@/store";
import MailingAddress from "./ MailingAddress";
import Parent from "./Parent";
import ParentsDependents from "./ParentsDependents";

export default {
  components: {
    MailingAddress,
    Parent,
    ParentsDependents,
  },
  computed: {
    application() {
      return store.getters.selectedApplication;
    },
    parent1() {
      return this.application?.parent1 || {};
    },
    parent2() {
      return this.application?.parent2 || {};
    },
    mailingAddressParents() {
      return this.application?.mailing_address || {};
    },
  },
  methods: {
    showSuccess(mgs) {
      this.$emit("showSuccess", mgs);
    },
    showError(mgs) {
      this.$emit("showError", mgs);
    },
  },
};
</script>
