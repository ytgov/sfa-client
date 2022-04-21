<template>
  <div class="mb-1 overline" style="">
    <div class="float-left">  <strong>{{selectedStudentFullName}}</strong> : {{selectedStudentLocator}}</div>
    <div class="float-right" v-if="selectedApplication && selectedApplication.institution">  <strong>{{selectedApplication.academic_year_id}}</strong> : {{selectedApplication.institution.name}}</div>
    <hr style="clear:both" />
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: mapState(["selectedStudentFullName", "selectedStudentLocator", "selectedApplication"]),
};
</script>