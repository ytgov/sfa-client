<template>
  <div class="mb-1 overline" style="line-height: 42px;">
    <div class="float-left d-flex">
      <strong>{{ selectedStudentFullName }}</strong>
      <div v-if="selectedApplication && selectedApplication.institution">
        : <strong>{{ selectedApplication.academic_year_id }}</strong> -
        {{ selectedApplication.main_institution.name }} ({{ selectedApplication.institution.name }})
      </div>
    </div>
    <div
      class="float-right d-flex mb-1"
      v-if="selectedApplication && selectedApplication.institution"
      style="text-transform: none;"
    >
      <!-- <strong>{{ selectedApplication.academic_year_id }}</strong> : {{ selectedApplication.main_institution.name }} -->
      <v-combobox
        v-model="flags"
        class="ml-2"
        label="Flags"
        small-chips
        multiple
        :items="allOptions"
        dense
        outlined
        hide-details
        background-color="white"
        style="width: 400px"
        @change="saveFlags"
        clearable
      >
        <template v-slot:selection="data">
          <v-chip small>{{ data.item }}</v-chip>
        </template>
      </v-combobox>
    </div>
    <hr style="clear:both" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { isEmpty, sortBy, uniq } from "lodash";

export default {
  computed: {
    ...mapState(["selectedStudentFullName", "selectedApplication", "flagOptions"]),
    ...mapGetters(["applicationFlags"]),
    allOptions() {
      return uniq([...this.baseOptions, sortBy(...this.flagOptions)]).filter((f) => !isEmpty(f));
    },
  },
  data: () => ({
    baseOptions: ["Director Review", "Manager Review", "See Communications", "Tech Issue", "Urgent", "Vendor ID"],
    flags: [],
  }),
  watch: {
    selectedApplication() {
      this.flags = this.applicationFlags;
    },
    applicationFlags() {
      this.flags = this.applicationFlags;
    },
  },
  methods: {
    ...mapActions(["saveApplicationFlags"]),
    saveFlags() {
      this.saveApplicationFlags(this.flags);
    },
  },
};
</script>
