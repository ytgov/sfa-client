<template>
  <div>
    <v-card class="default mb-5">
      <v-card-title>Funding Statistics </v-card-title>
      <v-card-text>
        <div class="row">
          <div :class="index === 2 ? 'col-md-3' : 'col-md-2'" v-for="name, index in columns_names" :key="index">
            <h3 class="text-center">
              {{ name }}
            </h3>
          </div>
        </div>
        <!-- Funded Since -->
        <div class="row">
          <div class="col-md-2">
            <p class="text-left text-subtitle-1">
              Funded Since
            </p>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
              v-model="student.pre_funded_year"
            >
  
            </v-text-field>
          </div>
        </div>
        <!--  -->
        <!-- Funded Years Used -->
        <div class="row">
          <div class="col-md-2">
            <p class="text-left text-subtitle-1">
              Funded Years Used
            </p>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
              v-model="student.pre_funding_years_used"
            >
  
            </v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
            >
  
            </v-text-field>
          </div>
        </div>
        <!--  -->
        <!-- YG STA Funded Weeks -->
        <div class="row">
          <div class="col-md-2">
            <p class="text-left text-subtitle-1">
              YG STA Funded Weeks
            </p>
          </div>
          <div class="col-md-2">
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
            >
  
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
              v-model="student.adj_yg_funding_weeks"
            >
  
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
            >
  
            </v-text-field>
          </div>
          <div class="col-md-1">
            <p 
              class="text-left text-subtitle-1"
            >
              Max 170
            </p>
          </div>
        </div>
        <!--  -->
        <!-- YG STA Funded Weeks -->
        <div class="row">
          <div class="col-md-2">
            <p class="text-left text-subtitle-1">
              STA Upgrading Weeks
            </p>
          </div>
          <div class="col-md-2">
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
            >
  
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
              v-model="student.adj_sta_upgrading_weeks"
            >
  
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
            >
  
            </v-text-field>
          </div>
          <div class="col-md-1">
            <p 
              class="text-left text-subtitle-1"
            >
              Max 68
            </p>
          </div>
        </div>
        <!--  -->
        <!-- YG STA Funded Weeks -->
        <div class="row">
          <div class="col-md-2">
            <p class="text-left text-subtitle-1">
              YG Outside Travel Count
            </p>
          </div>
          <div class="col-md-2">
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
            >
  
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
              v-model="student.adj_outside_travel_cnt"
            >
  
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
            >
  
            </v-text-field>
          </div>
          <div class="col-md-1">
            <p 
              class="text-left text-subtitle-1"
            >
              Max 5
            </p>
          </div>
        </div>
        <!--  -->
      </v-card-text>
    </v-card>
    <v-card class="default mb-5">
      <v-card-title>Identification</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-3">
            <v-text-field 
            outlined dense 
            background-color="white" 
            hide-details label="Locator Number"
            v-model="student.locator_number"
            >
            </v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field 
              outlined dense 
              background-color="white" 
              hide-details label="SFA ID">
            </v-text-field>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <v-switch label="Checked for YTID">
            </v-switch>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <v-text-field 
              outlined 
              dense 
              background-color="white" 
              hide-details 
              label="Yukon ID"
              v-model="student.yukon_id"
            >
            </v-text-field>
          </div>
          <div class="col-md-3">
            <v-btn 
              class="my-0" 
              block 
              color="success"
            >
              SEARCH LAST NAME
            </v-btn>
          </div>
          <div class="col-md-4">
            <v-btn
              class="my-0"
              color="success"
            >
              SEARCH PREVIOUS LAST NAME
            </v-btn>
          </div>
        </div>

      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import store from "../../store";
import { mapState, mapGetters } from "vuex";
import validator from "@/validator";

export default {
  data: () => ({
    columns_names: [
      "",
      "Pre-System Data",
      "Pre-Legislation Chg",
      "Adjust",
      "Total Used",
      "",
    ],
    records: [
      "Funded Since",
      "Funded Years Used",
      "YG STA Funded Weeks",
      "STA Upgrading Weeks",
      "YG Outside Travel Count",
    ],
  }),
  computed: {
    student: function () {
      return store.getters.selectedStudent;
    },
  },
  watch: {
  },
  created() {
  },
  methods: {
  },
};
</script>
  