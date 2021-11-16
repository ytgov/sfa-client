<template>
  <div>
    <v-card
      class="default mb-5"
      v-for="(item, i) of application.dependents"
      :key="i"
    >
      <v-card-title
        >Dependent {{ 1 + i }}
        <v-spacer></v-spacer>
        <v-btn
          color="warning"
          x-small
          fab
          class="my-0"
          @click="removeDependent(i)"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Last name"
              v-model="item.LAST_NAME"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="First name"
              v-model="item.FIRST_NAME"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-menu
              v-model="item.birth_date_menu"
              :close-on-content-click="false"
              transition="scale-transition"
              left
              nudge-top="26"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="item.BIRTH_DATE"
                  label="Birth date"
                  append-icon="mdi-calendar"
                  readonly
                  outlined
                  hide-details
                  dense
                  background-color="white"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="item.BIRTH_DATE"
                :max="maxDate"
                @input="item.birth_date_menu = false"
                @change="birthChanged(item)"
              ></v-date-picker>
            </v-menu>
          </div>

          <div class="col-md-8">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Relationship"
              :items="relationshipOptions"
              v-model="item.RELATIONSHIP_ID"
              item-text="DESCRIPTION"
              item-value="RELATIONSHIP_ID"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              readonly
              label="Age"
              :value="getAge(item)"
              append-icon="mdi-lock"
            ></v-text-field>
          </div>

          <div class="col-md-4">
            <v-select
              dense
              hide-details
              outlined
              background-color="white"
              label="Resides with"
              v-model="item.eligibility.RESIDES_WITH"
              :items="residesOptions"
            ></v-select>
          </div>

          <div class="col-md-4 py-0">
            <v-switch
              dense
              hide-details
              label="Shared custody"
              v-model="item.eligibility.SHARES_CUSTODY"
            ></v-switch>
          </div>

          <div class="col-md-4 py-0">
            <v-switch
              dense
              hide-details
              label="In post-secondary"
              v-model="item.POST_SECONDARY"
            ></v-switch>
          </div>

          <div class="col-md-4 py-0">
            <v-switch
              dense
              hide-details
              label="STA eligible dependent"
              v-model="item.ELIGIBLE"
            ></v-switch>
          </div>

          <div class="col-md-4 py-0">
            <v-switch
              dense
              hide-details
              label="CSL eligible dependent"
              v-model="item.CSL_ELIGIBLE"
            ></v-switch>
          </div>
          <div class="col-md-4 py-0">
            <v-switch
              dense
              hide-details
              label="CSG eligible dependent"
              v-model="item.CSG_ELIGIBLE"
            ></v-switch>
          </div>

          <div class="col-md-6 mt-3">
            <v-textarea
              outlined
              dense
              background-color="white"
              hide-details
              label="Comments"
              v-model="item.COMMENTS"
            ></v-textarea>
          </div>
          <div class="col-md-6 mt-3">
            <v-textarea
              outlined
              dense
              background-color="white"
              hide-details
              label="Shared custody info"
              v-model="item.SHARES_CUSTODY_DETAILS"
            ></v-textarea>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-btn color="info" @click="addDependent()">Add dependent</v-btn>

    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
import moment from "moment";
import store from "../store";
import axios from "axios";
import { RELATIONSHIP_URL } from "../urls";

export default {
  data: () => ({
    relationshipOptions: [],
    residesOptions: [],
    maxDate: moment().format("YYYY-MM-DD"),
  }),
  computed: {
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  async created() {
    this.loadRelationships();
  },
  methods: {
    loadRelationships() {
      axios.get(RELATIONSHIP_URL).then((resp) => {
        this.relationshipOptions = resp.data;
      });
    },
    addDependent() {
      this.application.dependents.push({ BIRTH_DATE: "", eligibility: {} });
    },
    removeDependent(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this dependent.",
        () => {
          this.application.dependents.splice(index, 1);
        },
        () => {}
      );
    },
    birthChanged(item) {
      item.age = moment().diff(item.BIRTH_DATE, "years");
    },
    getAge(item) {
      if (item.BIRTH_DATE)
      return moment().diff(item.BIRTH_DATE, "years");
      return "";
    },
  },
};
</script>