<template>
  <div class="mb-1 overline" style="">
    <strong>{{selectedStudentFullName}}</strong> : {{selectedStudentLocator}}
    <hr />
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: mapState(["selectedStudentFullName", "selectedStudentLocator"]),
};
</script>