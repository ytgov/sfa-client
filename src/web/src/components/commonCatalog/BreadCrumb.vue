<template>
    <v-breadcrumbs
        divider="/"
        large
        :items="[
        { text: 'Administration Home', to: '/administration', exact: true },
        {
            text: text,
            to: `/administration/${to}`,
            exact: true,
        },
        ]"
    >
    </v-breadcrumbs>
</template>
<script>
export default {
  name: "BreadCrumb",
  data: () => ({

  }),
  props: {
    text: String,
    to: String,
  }
};
</script>
