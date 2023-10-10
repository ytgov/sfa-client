<template>
  <div v-if="assessment">
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          outlined
          dense
          background-color="#ddd"
          append-icon="mdi-lock"
          readonly
          hide-details
          label="Assessment type"
          v-model="assessmentType"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-menu
          v-model="assessed_date_menu"
          :close-on-content-click="false"
          transition="scale-transition"
          left
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="assessment.assessed_date"
              label="Assessed date"
              append-icon="mdi-calendar"
              hide-details
              readonly
              outlined
              dense
              background-color="white"
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker v-model="assessment.assessed_date" @input="assessed_date_menu = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          outlined
          dense
          background-color="#ddd"
          append-icon="mdi-lock"
          readonly
          hide-details
          label="Dependents"
          v-model="assessment.dependent_count"
        />
      </v-col>
    </v-row>
    <v-divider class="my-5" />
    <h3 class="mb-5">Study Period</h3>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="assessment.classes_start_date"
          label="Classes start date"
          readonly
          outlined
          dense
          background-color="#ddd"
          append-icon="mdi-lock"
        ></v-text-field>
        <v-text-field
          v-model="assessment.classes_end_date"
          label="Classes end date"
          hide-details
          readonly
          outlined
          dense
          background-color="#ddd"
          append-icon="mdi-lock"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          outlined
          dense
          background-color="#ddd"
          append-icon="mdi-calculator"
          readonly
          label="Study weeks"
          v-model="assessment.study_weeks"
        />
        <v-text-field
          outlined
          dense
          background-color="#ddd"
          append-icon="mdi-calculator"
          readonly
          hide-details
          label="Study months"
          v-model="assessment.study_months"
        />
      </v-col>
    </v-row>
    <v-divider class="my-5" />
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          outlined
          dense
          background-color="#ddd"
          append-icon="mdi-lock"
          label="Study area"
          :value="studyAreas?.find((s) => s.id == assessment.study_area_id)?.description"
        />
        <v-text-field
          outlined
          dense
          label="Study program"
          background-color="#ddd"
          append-icon="mdi-lock"
          readonly
          :value="programs?.find((p) => p.id == assessment.program_id)?.description"
        />
        <v-text-field
          outlined
          dense
          background-color="#ddd"
          append-icon="mdi-lock"
          readonly
          hide-details
          label="Period"
          v-model="assessment.period"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4"
        ><v-text-field
          outlined
          dense
          background-color="#ddd"
          append-icon="mdi-lock"
          readonly
          label="Study province"
          :value="provinces?.find((p) => p.id == assessment.study_province_id)?.description"
        />
        <v-text-field
          outlined
          dense
          background-color="#ddd"
          append-icon="mdi-lock"
          readonly
          hide-details
          label="FOS code"
          v-model="application.field_program_code"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          outlined
          dense
          background-color="#ddd"
          append-icon="mdi-lock"
          readonly
          label="Spouse province"
          :value="provinces?.find((p) => p.id == assessment.spouse_province_id)?.description"
        />
        <v-text-field
          outlined
          dense
          background-color="#ddd"
          append-icon="mdi-lock"
          readonly
          label="Study classification"
          :value="cslClassifications?.find((c) => c.id == assessment.csl_classification)?.description"
        />
        <v-text-field
          outlined
          dense
          background-color="#ddd"
          append-icon="mdi-lock"
          readonly
          hide-details
          label="Marital status"
          :value="maritalStatusList?.find((c) => c.id == assessment.marital_status_id)?.description"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  data: () => ({
    assessed_date_menu: null,
  }),
  computed: {
    ...mapState({ application: "selectedApplication" }),
    ...mapGetters(["cslClassifications", "maritalStatusList", "provinces", "studyAreas", "programs"]),
    ...mapState("cslPartTimeStore", ["csgThresholds", "assessment"]),
    ...mapGetters("cslPartTimeStore", ["assessed_amount", "assessmentType"]),

    institutionProvince() {
      if (this.application && this.application.institution && this.provinces)
        return this.provinces.find((p) => this.application.institution.address_province_id == p.id)?.description;
      return "";
    },
  },
  methods: {},
};
</script>
