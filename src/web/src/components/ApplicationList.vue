<template>
  <v-card class="default my-4 mx-5" v-if="selectedStudent">
    <v-card-title
      >Applications for {{ selectedStudent.name }} ({{
        selectedStudent.sin
      }})</v-card-title
    >
    <v-card-text>
      <div v-if="studentApplications.length == 0">No applications found</div>

      <div v-for="(app, i) of studentApplications" :key="i">
        <v-list-item
          two-line
          :to="'/application/' + app.HISTORY_DETAIL_ID + '/personal'"
        >
          <v-list-item-content>
            <v-list-item-title
              >{{ app.ACADEMIC_YEAR }}:
              {{ app.institution_name }}</v-list-item-title
            >
            <v-list-item-subtitle
              >{{ app.study_area_name }} ({{
                app.program_name
              }})<br />Applications: YG</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-divider v-if="i < studentApplications.length - 1"></v-divider>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["selectedStudent", "studentApplications"],
  data: () => ({}),
  methods: {},
};
</script>
