<template>
    <div class="home">
        <v-card class="default">
            <v-card-text>
                <h1 class="text-h6 font-weight-regular">
                    Student Category
                </h1>
                <div class="row">
                    <div class="col-md-6">
                        <v-select 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Pre-Study Classiﬁcation"
                            v-model="application.csl_classification"
                            :items="cslClasificationOptions"
                        >
                        </v-select>
                    </div>
                    <div class="col-md-6">
                        <v-select 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Study Classiﬁcation"
                            v-model="application.prestudy_csl_classification"
                            :items="cslClasificationOptions"
                        >
                        </v-select>
                    </div>
                </div>
            </v-card-text>
        </v-card>
        <v-card class="default mt-6">
            <v-card-text>
                <h1 class="text-h6 font-weight-regular">
                    Student Education History
                </h1>
                <div class="row">
                    <div class="col-md-10">
                        <v-autocomplete 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="High School Attended"
                            :items="highSchools"
                            item-text="name"
                            item-value="id"
                            v-model="student.high_school_id"
                        >
                        </v-autocomplete>
                    </div>
                    <div class="col-md-2 d-flex justify-end">
                        <v-btn
                            color="success"
                            class="my-0"
                        >
                            View Hst
                        </v-btn>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <h3 class="text-left text-subtitle-1">
                            Left High School
                        </h3>
                    </div>
                    <div class="col-md-2">
                        <v-select 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Year"
                            v-model="student.high_school_left_year"
                            :items="yearOptions"
                        >
                        </v-select>
                    </div>
                    <div class="col-md-2">
                        <v-select 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Month"
                            v-model="student.high_school_left_month"
                            :items="monthOptions"
                        >
                        </v-select>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import axios from "axios";
import store from "../../store";
import { mapGetters, mapState } from 'vuex';
import validator from "@/validator";

export default {
  computed: {
    ...mapGetters(["highSchools", "monthOptions", "yearOptions"]),
    application: function () {
      return store.getters.selectedApplication;
    },
    student: function () {
      return store.getters.selectedStudent;
    },
  },
  data() {
    return {
        cslClasificationOptions: [
            {text: "Single Dependent", value: 1},
            {text: "Single Independent - 2 year workforce", value: 2},
            {text: "Single Independent - 4 year high school", value: 3},
            {text: "Married / Common Law", value: 4},
            {text: "Single Parent", value: 5},
        ],
    };

    
  },
  async created() {
    store.dispatch("setHighSchools");
    store.dispatch("setMonthOptions");
    store.dispatch("setYearsOptions");
  },
  watch: {

  },
  methods: {
  },
};
</script>
