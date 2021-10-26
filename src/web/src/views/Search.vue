<template>
  <div>
    <h1>Search</h1>

    <v-text-field label="Search" outlined v-model="search"></v-text-field>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: "",
  }),
  created() {
    if (this.$route.query && this.$route.query.text)
      this.search = this.$route.query.text;
  },
  methods: {},
};
</script>
