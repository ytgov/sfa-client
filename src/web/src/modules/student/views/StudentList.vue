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