<template>
  <div>
    <h3>Master Student Financial Assistance Agreement (MSFAA)</h3>
    <v-row v-if="assessment">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="msfaa.number"
          label="MSFAA number"
          readonly
          outlined
          dense
          hide-details
          background-color="#ddd"
          append-icon="mdi-lock"
        />
      </v-col>
      <v-col cols="12" md="6"> </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="msfaa.number"
          label="Date issued"
          readonly
          outlined
          dense
          hide-details
          background-color="#ddd"
          append-icon="mdi-lock"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="msfaa.number"
          label="Date cancelled"
          readonly
          outlined
          dense
          hide-details
          background-color="#ddd"
          append-icon="mdi-lock"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="msfaa.number"
          label="Date sent to NSLSC"
          readonly
          outlined
          dense
          hide-details
          background-color="#ddd"
          append-icon="mdi-lock"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="msfaa.number"
          label="Cancelled reason"
          readonly
          outlined
          dense
          hide-details
          background-color="#ddd"
          append-icon="mdi-lock"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="msfaa.number"
          label="Date student signed"
          readonly
          outlined
          dense
          hide-details
          background-color="#ddd"
          append-icon="mdi-lock"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="msfaa.number"
          label="Home email"
          readonly
          outlined
          dense
          hide-details
          background-color="#ddd"
          append-icon="mdi-lock"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="msfaa.number"
          label="Date received by NSLSC"
          readonly
          outlined
          dense
          hide-details
          background-color="#ddd"
          append-icon="mdi-lock"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="msfaa.number"
          label="Reminder sent"
          readonly
          outlined
          dense
          hide-details
          background-color="#ddd"
          append-icon="mdi-lock"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="msfaa.number"
          label="NSLSC status"
          readonly
          outlined
          dense
          hide-details
          background-color="#ddd"
          append-icon="mdi-lock"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="msfaa.number"
          label="Update status"
          readonly
          outlined
          dense
          hide-details
          background-color="#ddd"
          append-icon="mdi-lock"
        ></v-text-field>
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
    ...mapState("cslPartTimeStore", ["assessment", "msfaa"]),
    ...mapGetters("cslPartTimeStore", ["assessed_amount"]),
  },
  methods: {},
};
</script>
