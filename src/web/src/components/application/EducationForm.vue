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
                        <v-select 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="High School Attended"
                        >
                        </v-select>
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
  },
  data() {
    return {

    };
  },
  async created() {

  },
  watch: {

  },
  methods: {
  },
};
</script>
