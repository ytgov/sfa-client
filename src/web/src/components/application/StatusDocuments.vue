<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
    dense
    max-width="500px"
    min-width="400px"
  >
    <template v-slot:activator="{ on, attrs }" class="text-left">
      <v-btn class="my-0" color="primary" v-bind="attrs" v-on="on" block>
        <v-icon>mdi-chevron-down</v-icon>
        Letters
      </v-btn>
    </template>

    <v-card>
      <v-list dense>
        <v-list-item>
          <v-list-item-content class="pb-0">
            <v-list-item-title>
              <div class="float-right text-right">
                <v-btn
                  :disabled="canPrintLetter"
                  dense
                  small
                  color="success"
                  class="mb-3 mr-1 ml-4"
                  @click="printLetterClick(item, 'student')"
                >
                  Generate Student Letter
                </v-btn><br>
                <v-btn
                  :disabled="canPrintLetter"
                  dense
                  small
                  color="success"
                  class="mb-0 mr-1 ml-4"
                  @click="printLetterClick(item, 'institution')"
                >
                  Generate Institution Letter
                </v-btn>
              </div>

              {{ type }}
            </v-list-item-title>

            <v-list-item-subtitle> </v-list-item-subtitle>

            <v-spacer></v-spacer>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list two-line dense>
        <div v-for="(letter, idx) of letters">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="mb-0 pb-0">{{ letter.title }}</v-list-item-title>
              <v-list-item-subtitle class="mt-0 pt-0 d-flex">
                <a @click="previewLetterClick(letter)" class="mr-5">
                  <v-icon small color="primary">mdi-eye</v-icon> Preview</a
                >
                <a @click="downloadLetterClick(letter)" class="mr-5"
                  ><v-icon small color="primary">mdi-download</v-icon> Download</a
                >
                <a @click="publishLetterClick(letter)" class="mr-5" v-if="letter.canPublish">
                  <v-icon small color="primary">mdi-forward</v-icon> Publish</a
                >
                <a @click="emailLetterClick(letter)" class="mr-5">
                  <v-icon small color="primary">mdi-email</v-icon> Email</a
                >
                <v-spacer></v-spacer>
                <a @click="deleteLetterClick(letter)" color="warning" style="color:#fb8c00 ">
                  <v-icon small color="warning">mdi-delete</v-icon> Delete</a
                >
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import axios from "axios";
import { APPLICATION_LETTER_URL, APPLICATION_URL, FUNDING_REQUESTS_URL } from "../../urls";

export default {
  props: ["item", "type"],
  data: () => ({
    menu: false,
    fundingTypeOptions: [],
    letters: [],
    assessments: [],
  }),
  watch: {
    async menu(n) {
      if (n) {
        await this.loadLetters();
      }
    },
  },
  mounted() {
    //console.log(this.item);
  },
  computed: {
    canPrintLetter() {
      const printableStatuses = [6, 7, 4]; // Awarded, Rejected, Qualified
      return !printableStatuses.includes(this.item.status_id);
    },
  },
  methods: {
    async loadAssessments() {
      axios
        .get(`${APPLICATION_URL}/${this.item.application_id}/${this.item.id}/assessments`)
        .then((resp) => {
          //console.log("ASSESS", resp);
          this.assessments = resp.data;
        })
        .catch();
    },
    async loadLetters() {
      /* axios
        .get(`${APPLICATION_LETTER_URL}/${this.item.application_id}/list/${this.item.id}`)
        .then((resp) => {
          console.log("LETTERS", resp);
          this.letters = resp.data;
        })
        .catch(); */
      /*  this.letters = [
        { title: "Student Letter (Generated 2023-08-25)", canPublish: true },
        { title: "Institution Letter", canPublish: false },
      ]; */
    },

    previewLetterClick(item) {},
    downloadLetterClick(item) {},
    publishLetterClick(item) {},
    emailLetterClick(item) {},
    deleteLetterClick(item) {
      console.log("DELETE LETTER", item);
      this.menu = false;
    },

    printLetterClick(item, letterSlug) {
      const fundingRequestId = item.id;
      // See /api/v2/admin/funding-requests/:fundingRequestId/letters for status -> slug options

      let approvalLetterUrl = `${FUNDING_REQUESTS_URL}/${fundingRequestId}/letters/${letterSlug}.pdf`;

      //let approvalLetterUrl = `${APPLICATION_LETTER_URL}/${this.item.application_id}/approval/${item.id}`;

      window.open(approvalLetterUrl);

      /* axios.get(approvalLetterUrl, { responseType: "blob" }).then((resp) => {
        window.open(URL.createObjectURL(resp.data));
      }); */
    },
  },
};
</script>
