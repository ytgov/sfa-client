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
              @change="doSaveStudent('pre_funded_year', student.pre_funded_year, 'studentInfo', student.id)"
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
              @change="doSaveStudent('pre_funding_years_used', student.pre_funding_years_used, 'studentInfo', student.id)"
            >
  
            </v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
              disabled
              v-model="student.funded_years_used_preleg_chg"
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
              disabled
              v-model="student.prev_pre_leg_weeks"
            >
  
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
              @keypress="validate.isNumber($event)"
              v-model="student.adj_yg_funding_weeks"
              @change="doSaveStudent('adj_yg_funding_weeks', student.adj_yg_funding_weeks, 'studentInfo', student.id)"
            >
  
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
              disabled
              :value="totalYGSTAFundWeeks"
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
              disabled
              outlined dense background-color="white" 
              hide-details label=""
              v-model="student.pre_leg_sta_up_weeks"
            >
  
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
              @keypress="validate.isNumber($event)"
              v-model="student.adj_sta_upgrading_weeks"
              @change="doSaveStudent('adj_sta_upgrading_weeks', student.adj_sta_upgrading_weeks, 'studentInfo', student.id)"
            >
  
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
              disabled
              :value="totalSTAUpWeeks"
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
              disabled
              outlined dense background-color="white" 
              hide-details label=""
              v-model="student.pre_leg_outside_travel"
            >
  
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
              v-model="student.adj_outside_travel_cnt"
              @change="doSaveStudent('adj_outside_travel_cnt', student.adj_outside_travel_cnt, 'studentInfo', student.id)"
            >
  
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined dense background-color="white" 
              hide-details label=""
              disabled
              :value="totalYGSOTTravel"
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
            @keypress="validate.isNumber($event)"
            v-model="student.locator_number"
            @change="doSaveStudent('locator_number', student.locator_number, 'studentInfo', student.id)"
            >
            </v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field
              disabled
              outlined dense 
              background-color="white" 
              hide-details label="SFA ID"
              v-model="student.id"
              >
            </v-text-field>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <v-switch label="Checked for YTID"
            v-model="student.checked_for_yukon_id"
            @change="doSaveStudent('checked_for_yukon_id', student.checked_for_yukon_id, 'studentInfo', student.id)"
            >
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
              @keypress="validate.isNumber($event)"
              v-model="student.yukon_id"
              disabled
            >
            </v-text-field>
          </div>
          <div class="col-md-3">
            <v-btn 
              class="my-0" 
              block 
              color="success"
              @click="e => {
                this.getAllYEAList('last_name');
                showModal();
              }"
            >
              Search last name
            </v-btn>
          </div>
          <div class="col-md-4">
            <v-btn
              class="my-0"
              color="success"
              @click="e => {
                this.getAllYEAList('previous_last_name');
                showModal();
              }"
            >
              Search previous last name
            </v-btn>
          </div>
        </div>

      </v-card-text>
    </v-card>
    <SearchByLastName 
      :showModal="showModal" 
      :dialogModel="dialogModel" 
      :yeaList="yeaList"
      v-on:showSuccess="showSuccess"
      v-on:showError="showError"
    />
  </div>
</template>
<script>
import axios from "axios";
import store from "../../store";
import { mapState, mapGetters } from "vuex";
import { APPLICATION_URL } from '@/urls';
import validator from "@/validator";
import SearchByLastName from "../application/SearchByLastName.vue";

export default {
  data: () => ({
    dialogModel: false,
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
    validate: {},
    yeaList: [],
  }),
  computed: {
    student: function () {
      return store.getters.selectedStudent;
    },
    application: function () {
      return store.getters.selectedApplication;
    },
    totalSTAUpWeeks() {
      const total = this.student.pre_leg_sta_up_weeks + 
        Number(this.student.adj_sta_upgrading_weeks) + this.student.post_leg_sta_up_weeks;
      return total || 0;
    },
    totalYGSTAFundWeeks() {
      const total = this.student.post_leg_weeks +
        this.student.pre_leg_weeks + Number(this.student.adj_yg_funding_weeks);
      return total || 0;
    },
    totalYGSOTTravel() {
      const total = this.student.post_leg_outside_travel +
        this.student.pre_leg_outside_travel + Number(this.student.adj_outside_travel_cnt);
      return total || 0;
    }
  },
  watch: {
  },
  created() {
    this.validate = { ...validator };
  },
  methods: {
    doSaveStudent(field, value, type, extraId = null, addressType = "") {
      store.dispatch("updateStudent", [field, value, type, extraId, this, addressType]);
    },
    showModal(show = true) {
      this.dialogModel = show;
    },
    setTypeSearch(type = "") {
      this.typeSearch = type;
    },
    async getAllYEAList(typeSearch = "") {
      const last_name = typeSearch === "previous_last_name" ? 
          this.student.previous_last_name
          :
          typeSearch === "last_name" ? 
              this.student.last_name 
              :
              "";
      try {
        const res = await axios.get(APPLICATION_URL+`/yea/all?last_name=${last_name}`);
        if (res?.data?.success) {
            this.yeaList = [...res.data.data];
        }
      } catch (error) {
        console.log("Error to get YEA List");
      }
    },
    showSuccess(mgs) {
      this.$emit("showSuccess", mgs);
    },
    showError(mgs) {
      this.$emit("showError", mgs);
    },
  },
  components: {
    SearchByLastName,
  }
};
</script>
  