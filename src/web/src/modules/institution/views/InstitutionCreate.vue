<template>
  <div>
    <v-breadcrumbs
      divider="/"
      large
      :items="[
        { text: 'Administration Home', to: '/administration', exact: true },
        {
          text: 'Institutions',
          to: '/administration/institutions',
          exact: true,
        },
        {
          text: 'Create',
          to: '/administration/institutions/create',
          exact: true,
        },
      ]"
    >
    </v-breadcrumbs>
    <h1>Create an Institution</h1>

    <v-row>
      <v-col cols="6">
        <v-card class="default">
          <v-card-title>Institution details</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="institution.name"
              label="Name"
              dense
              outlined
              background-color="white"
              @change="checkName"
              hide-details
              :error="nameError.length > 0"
            >
            </v-text-field>
            <span style="color: red">{{ nameError }}</span>

            <v-row class="mt-3">
              <v-col cols="12"
                ><v-select
                  :items="levelOptions"
                  item-text="description"
                  item-value="id"
                  v-model="institution.institution_level_id"
                  label="Level"
                  dense
                  outlined
                  background-color="white"
                ></v-select
              ></v-col>
            </v-row>

            <v-text-field
              v-model="institution.federal_institution_code"
              dense
              outlined
              label="Federal code"
              background-color="white"
              @change="checkCode"
              @keyup="codeKeyUp"
              :error="codeError.length > 0"
              hide-details
            ></v-text-field>
            <div style="color: red">{{ codeError }}</div>

            <v-divider class="mt-4"></v-divider>
            <v-btn
              color="primary"
              @click="createInstitution"
              :disabled="!isValid"
              >Create</v-btn
            >
            <v-btn
              color="secondary"
              class="float-right"
              to="/administration/institutions"
              >Cancel</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6"> </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import { INSTITUTION_URL } from "@/urls";

export default {
  data: () => ({
    isLoading: false,
    institution: {
      institution_level_id: 1,
      name: "",
      federal_institution_code: "",
    },
    levelOptions: [],
    nameError: "",
    codeError: "",
    codeIsGood: false,
  }),
  created() {
    this.loadLevels();
  },
  computed: {
    isValid: function () {
      let name = this.institution.name.trim();
      let code = this.institution.federal_institution_code.trim();

      if (name.length == 0) return false;
      else if (this.nameError.length > 0) return false;
      else if (this.codeError.length > 0) return false;
      else if (code.length == 0) return false;
      else if (!this.codeIsGood) return false;

      return true;
    },
  },
  methods: {
    loadLevels() {
      axios.get(`${INSTITUTION_URL}/levels`).then((resp) => {
        this.levelOptions = resp.data.data;
        this.institution.institution_level_id = this.levelOptions[0].id;
      });
    },
    checkName() {
      axios
        .get(`${INSTITUTION_URL}?name=${this.institution.name}`)
        .then((resp) => {
          if (resp.data.data.length > 0) {
            this.nameError = "This institution already exists";
          } else this.nameError = "";
        });
    },
    codeKeyUp() {
      this.institution.federal_institution_code =
        this.institution.federal_institution_code.toUpperCase();

      this.institution.federal_institution_code =
        this.institution.federal_institution_code.substring(0, 4);
    },
    checkCode() {
      this.codeIsGood = false;
      if (this.institution.federal_institution_code.length == 0) {
        this.codeError = "";
        return;
      }

      axios
        .get(
          `${INSTITUTION_URL}?code=${this.institution.federal_institution_code}`
        )
        .then((resp) => {
          if (resp.data.data.length > 0) {
            this.codeError = "This code already exists";
            this.codeIsGood = false;
          } else {
            this.codeError = "";
            this.codeIsGood = true;
          }
        });
    },
    createInstitution() {
      this.isLoading = true;
      let body = {
        name: this.institution.name,
        institution_level_id: this.institution.institution_level_id,
        federal_institution_code: this.institution.federal_institution_code,
      };

      axios
        .post(`${INSTITUTION_URL}`, body)
        .then((resp) => {
          console.log(resp.data);

          this.$emit("showAPIMessages", resp.data);
          this.$router.push(
            `/administration/institutions/${resp.data.data.id}`
          );
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
