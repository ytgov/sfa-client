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
        {
          text: 'Student Detail',
          to: '/administration/students/123',
          exact: true,
        },
      ]"
    >
    </v-breadcrumbs>
    <h1>Student Detail</h1>
  </div>
</template>


<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    studentId: 0,
    student: {},
    isLoading: false,
  }),
  computed: {},
  methods: {
    ...mapActions("student", ["loadStudent"]),
  },
  async mounted() {
    this.studentId = this.$route.params.id;

    await this.loadStudent(this.studentId)
      .then((resp) => {
        this.student = resp;
        console.log(this.student);
      })
      .catch((err) => {
        console.log("MAJOR ERR", err);
        this.$emit("showError", "FAILED")
      });
  },
};
</script>