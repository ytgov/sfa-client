<template>
  <div>
    <v-breadcrumbs
      divider="/"
      large
      :items="[
        { text: 'Administration Home', to: '/administration', exact: true },
        {
          text: 'CSL Certificate Audit Report',
          to: '/administration/csl-certificate-audit-report',
          exact: true,
        },
      ]"
    >
    </v-breadcrumbs>

    <h1>CSL Certificate Audit Report</h1>

    <v-card class="default mb-5">
      <v-card-text>
        <v-row>
          <v-col>
            <v-menu
              :close-on-content-click="false"
              transition="scale-transition"
              left
              nudge-top="26"
              offset-y
              min-width="auto"
              v-model="from.menu"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Issue date from"
                  append-icon="mdi-calendar"
                  hide-details
                  readonly
                  outlined
                  dense
                  background-color="white"
                  v-bind="attrs"
                  v-on="on"
                  :value="from.date ? from.date.toString().slice(0, 10) : from.date"
                ></v-text-field>
              </template>
              <v-date-picker v-model="from.date" @input="from.menu = false" @change="checkFilled()"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-menu
              :close-on-content-click="false"
              transition="scale-transition"
              left
              nudge-top="26"
              offset-y
              min-width="auto"
              v-model="to.menu"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Issue date to"
                  append-icon="mdi-calendar"
                  hide-details
                  readonly
                  outlined
                  dense
                  background-color="white"
                  v-bind="attrs"
                  v-on="on"
                  :value="to.date ? to.date.toString().slice(0, 10) : to.date"
                ></v-text-field>
              </template>
              <v-date-picker v-model="to.date" @input="to.menu = false" @change="checkFilled()"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-text-field
              outlined
              background-color="white"
              dense
              hide-details
              label="Academic year"
              v-model="academicYear"
              @change="checkFilled()"
            ></v-text-field>
          </v-col>
          <v-col class="text-right d-flex">
            <!-- <v-btn :disabled="disabled.flag" @click="importFile()" class="my-0" color="primary"><v-icon>mdi-plus</v-icon>Import</v-btn>-->
            <v-btn :disabled="disabled.flag" @click="runClick" class="my-0" color="primary">Preview</v-btn>
            <v-btn :disabled="disabled.flag" @click="downloadClick" class="my-0" color="primary">Download</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import store from "@/store";
import { CERTIFICATE_AUDIT_REPORT } from "@/urls";

export default {
  name: "CSLCertificateAuditReport",
  data: () => ({
    from: {
      date: null,
      menu: null,
    },
    to: {
      date: null,
      menu: null,
    },
    academicYear: null,
    disabled: { flag: true },
  }),
  computed: {
    ...mapState(["showSideBarAdmin"]),
  },
  async mounted() {
    await store.dispatch("setAppSideBarAdmin", this.$route.path.startsWith("/administration"));

    this.from.date = moment()
      .add(-30, "days")
      .format("YYYY-MM-DD");
    this.to.date = moment()
      .add(-1, "days")
      .format("YYYY-MM-DD");
  },
  methods: {
    runClick() {
      window.open(`${CERTIFICATE_AUDIT_REPORT}/${this.from.date}/${this.to.date}/${this.academicYear}.html`);
    },
    downloadClick() {
      window.open(`${CERTIFICATE_AUDIT_REPORT}/${this.from.date}/${this.to.date}/${this.academicYear}.pdf`);
    },

    async checkFilled() {
      if (/^\s*$/.test(this.academicYear)) {
        this.disabled = { flag: true };
      } else {
        if (this.from.date && this.to.date && this.academicYear) {
          this.disabled = { flag: false };
        }
      }
    },
  },
};
</script>
