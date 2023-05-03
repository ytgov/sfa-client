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
                            v-model="application.prestudy_csl_classification"
                            @change="doSaveApp('prestudy_csl_classification', application.prestudy_csl_classification)"
                            :items="cslClassifications"
                            item-text="description"
                            item-value="id"
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
                            v-model="application.csl_classification"
                            @change="doSaveApp('csl_classification', application.csl_classification)"
                            :items="cslClassifications"
                            item-text="description"
                            item-value="id"
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
                            @change="doSaveStudent('high_school_id', student.high_school_id, 'studentInfo', student.id)"
                        >
                        </v-autocomplete>
                    </div>
                    <div class="col-md-2 d-flex justify-end">
                        <v-btn
                            color="success"
                            class="my-0"
                        >
                            View HST
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
                            @change="doSaveStudent('high_school_left_year', student.high_school_left_year, 'studentInfo', student.id)"
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
                            @change="doSaveStudent('high_school_left_month', student.high_school_left_month, 'studentInfo', student.id)"
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
    ...mapGetters(["highSchools", "monthOptions", "yearOptions", "cslClassifications"]),
    application: function () {
      return store.getters.selectedApplication;
    },
    student: function () {
      return store.getters.selectedStudent;
    },
  },
  data() {
    return {
    };

    
  },
  async created() {
    store.dispatch("setCslClassifications");
    store.dispatch("setHighSchools");
    store.dispatch("setMonthOptions");
    store.dispatch("setYearsOptions");
  },
  watch: {

  },
  methods: {
    doSaveStudent(field, value, type, extraId = null, addressType = "") {
      store.dispatch("updateStudent", [field, value, type, extraId, this, addressType]);
    },
    doSaveApp(field, value) {
      store.dispatch("updateApplication", [field, value, this]);
    },
  },
};
</script>
