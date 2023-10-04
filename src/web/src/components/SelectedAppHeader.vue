<template>
  <div class="mb-1 overline" style="">
    <div class="float-left">
      <strong>{{ selectedStudentFullName }}</strong>
    </div>
    <div class="d-none float-right" style="width: 500px">
      <v-autocomplete small-chips multiple :items="options" dense outlined></v-autocomplete>
    </div>
    <div class="float-right" v-if="selectedApplication && selectedApplication.institution">
      <strong>{{ selectedApplication.academic_year_id }}</strong> : {{ selectedApplication.main_institution.name }}
    </div>
    <hr style="clear:both" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["selectedStudentFullName", "selectedStudentLocator", "selectedApplication"]),
  data: () => ({
    options: ["Director Review"],
  }),
};
</script>
