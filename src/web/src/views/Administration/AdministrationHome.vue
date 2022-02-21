<template>
  <div>
    <v-breadcrumbs
      divider="/"
      large
      :items="[
        { text: 'Administration Home', to: '/administration', exact: true },
      ]"
    >
    </v-breadcrumbs>
    <h1>Administration Home</h1>


    <p><router-link to="/administration/institutions">Institutions</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  created() {},
  methods: {},
};
</script>
