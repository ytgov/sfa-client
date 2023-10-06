<template>
  <v-row v-if="assessment">
    <v-col cols="12" md="4">
      <v-select
        outlined
        dense
        background-color="white"
        hide-details
        label="Assessed Type"
        v-model="assessment.assessed_type"
        item-text="DESCRIPTION"
        item-value="REQUEST_TYPE_ID"
      ></v-select>
    </v-col>
    <v-col cols="12" md="4">
      <v-menu
        v-model="assessed_date_menu"
        :close-on-content-click="false"
        transition="scale-transition"
        left
        nudge-top="26"
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
          ></v-text-field>
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
        label="No. of Dependents"
        v-model="assessment.dependent_count"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-card-title class="nopadding-bottom">Study Period</v-card-title>
    </v-col>
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
        append-icon="mdi-lock"
        readonly
        label="Study Weeks"
        v-model="assessment.study_weeks"
      />
      <v-text-field
        outlined
        dense
        background-color="#ddd"
        append-icon="mdi-lock"
        readonly
        hide-details
        label="Study Months"
        v-model="assessment.study_months"
      />
    </v-col>
    <v-col cols="12" md="4"> </v-col>
    <v-col cols="12" md="4">
      <v-text-field
        outlined
        dense
        background-color="#ddd"
        append-icon="mdi-lock"
        hide-details
        label="Study Area"
        v-model="application.study_area_id"
      />
    </v-col>
    <v-col cols="12" md="4"
      ><v-text-field
        outlined
        dense
        background-color="#ddd"
        append-icon="mdi-lock"
        readonly
        hide-details
        label="Study Province"
        v-model="institutionProvince"
      />
    </v-col>
    <v-col cols="12" md="4">
      <v-text-field
        outlined
        dense
        background-color="#ddd"
        append-icon="mdi-lock"
        readonly
        hide-details
        label="Study Classification"
        :value="cslClassifications?.find((c) => c.id == application.csl_classification)?.description"
      />
    </v-col>
    <v-col cols="12" md="4">
      <v-text-field
        outlined
        dense
        label="Study Program"
        background-color="#ddd"
        append-icon="mdi-lock"
        readonly
        hide-details
        v-model="application.program_id"
      />
    </v-col>
    <v-col cols="12" md="4">
      <v-text-field
        outlined
        dense
        background-color="#ddd"
        append-icon="mdi-lock"
        readonly
        hide-details
        label="Spouse Province"
        v-model="assessment.spouse_province"
      />
    </v-col>
    <v-col cols="12" md="4">
      <v-text-field
        outlined
        dense
        background-color="#ddd"
        append-icon="mdi-lock"
        readonly
        hide-details
        label="Marital Status"
        :value="maritalStatusList?.find((c) => c.id == application.marital_status_id)?.description"
      />
    </v-col>
    <v-col cols="12" md="4">
      <v-text-field
        outlined
        dense
        background-color="#ddd"
        append-icon="mdi-lock"
        readonly
        hide-details
        label="FOS Code"
        v-model="assessment.fos_code"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
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
    {{ maritalStatusList }}
  </v-row>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  data: () => ({
    assessed_date_menu: null,
  }),
  computed: {
    ...mapState({ application: "selectedApplication" }),
    ...mapGetters(["cslClassifications", "maritalStatusList"]),
    ...mapState("cslPTStore", ["csgThresholds", "assessment"]),
    ...mapGetters("cslPTStore", ["assessed_amount"]),

    institutionProvince() {
      if (this.application && this.application.institution) return this.application.institution.address_province_id;
      return 99;
    },
  },
  methods: {},
};
</script>
