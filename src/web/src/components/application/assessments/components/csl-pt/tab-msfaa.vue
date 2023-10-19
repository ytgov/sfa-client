<template>
  <div>
    <v-card-text>
      <h3>Master Student Financial Assistance Agreement (MSFAA)</h3>
      <v-row v-if="msfaa">
        <v-col cols="12" md="6">
          <v-text-field
            :value="msfaa.id"
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
            :value="formatDate(msfaa.rec_create_date)"
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
            :value="formatDate(msfaa.cancel_date)"
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
            :value="formatDate(msfaa.sent_date)"
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
            :value="msfaa.cancel_reason"
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
            :value="formatDate(msfaa.signed_date)"
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
            :value="formatDate(msfaa.last_reminder_sent)"
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
            :value="formatDate(msfaa.received_date)"
            label="Date received by NSLSC"
            readonly
            outlined
            dense
            hide-details
            background-color="#ddd"
            append-icon="mdi-lock"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6"> </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            :value="msfaa.msfaa_status"
            label="NSLSC status"
            readonly
            outlined
            dense
            hide-details
            background-color="#ddd"
            append-icon="mdi-lock"
          ></v-text-field>
        </v-col>
      </v-row>
      <div v-else>
        <v-alert type="warning">
          No MSFAA record exists for this application
        </v-alert>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { isEmpty } from "lodash";
import moment from "moment";

export default {
  data: () => ({}),
  computed: {
    ...mapState({ student: "selectedStudent" }),
    ...mapState("cslPartTimeStore", ["assessment", "msfaa"]),
  },
  methods: {
    formatDate(input) {
      if (!isEmpty(input)) {
        return moment(input).format("YYYY-MM-DD");
      }
      return "";
    },
  },
};
</script>
