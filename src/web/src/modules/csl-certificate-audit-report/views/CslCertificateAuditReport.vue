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
          <v-col cols="12" md="6">
            <v-menu
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
              v-model="from.menu"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Issue date from"
                  append-icon="mdi-calendar"
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
            <v-menu
              :close-on-content-click="false"
              transition="scale-transition"
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
          <v-col cols="12" md="6">
            <v-text-field
              outlined
              background-color="white"
              dense
              label="Academic year"
              v-model="academicYear"
              @change="checkFilled()"
            ></v-text-field>
            <div class="my-0 text-right">
              <v-btn-toggle v-model="icon">
                <v-btn
                  class="my-0"
                  style="height: 40px; border-color: #9e9e9e !important; padding-right: 14px !important"
                  @click="runClick"
                  title="Preview"
                >
                  <span class="hidden-sm-and-down" style="color: #0097a9">Preview</span>

                  <v-icon right color="primary">
                    mdi-eye
                  </v-icon>
                </v-btn>

                <v-btn
                  style="height: 40px; border-color: #9e9e9e !important; padding-right: 14px !important"
                  @click="downloadClick"
                  title="Download PDF"
                >
                  <span class="hidden-sm-and-down text-primary" style="color: #0097a9">Download</span>
                  <v-icon right color="primary">
                    mdi-download
                  </v-icon>
                </v-btn>
              </v-btn-toggle>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";
import moment from "moment";
import store from "@/store";
import { CERTIFICATE_AUDIT_REPORT } from "@/urls";

export default {
  name: "CSLCertificateAuditReport",
  data: () => ({
    icon: "",
    from: {
      date: null,
      menu: null,
    },
    to: {
      date: null,
      menu: null,
    },
    dates: null,
    academicYear: 2023,
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
      Vue.nextTick(() => {
        this.icon = "99"; // just clear the value so it isn't toggled
      });
    },
    downloadClick() {
      window.open(`${CERTIFICATE_AUDIT_REPORT}/${this.from.date}/${this.to.date}/${this.academicYear}.pdf`);
      Vue.nextTick(() => {
        this.icon = "99"; // just clear the value so it isn't toggled
      });
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
