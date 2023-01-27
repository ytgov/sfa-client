<template>
    <v-breadcrumbs
        divider="/"
        large
        :items="[
        { text: 'Administration Home', to: '/administration', exact: true },
        {
            text: 'Province',
            to: '/administration/province',
            exact: true,
        },
        ]"
    >
    </v-breadcrumbs>
</template>

<script>
export default {
  name: "BreadCrumbProvince",
  data: () => ({

  }),
};
</script>
