<template>
  <div>
      <!-- TITLE AND SWITCH -->
      <div class="row  mt-2">
          <v-switch
            label=""
            class="my-0 mr-2"
          >
          </v-switch>
          <h3 class="text-h6 font-weight-regular">Student Applied for CSG for Students with Disabilities</h3>
      </div>
      <!--  -->
      
      <v-card class="default row mb-5">
        <div class="col-md-4">
          <v-switch
            label="Permenant Disability"
            class="my-0"
          >
          </v-switch>
        </div>
        <div class="col-md-4">
          <v-switch
              label="Presistent/Prolonged Disability"
              class="my-0"
          >
          </v-switch>
        </div>
        <div class="col-md-3">
          <v-text-field 
            outlined 
            dense 
            background-color="white" 
            hide-details
            label="Disability start date"
          >
          </v-text-field>
        </div>
      </v-card>
      <!-- DISABILITIES -->
      <v-card class="default row mb-5">
        <div class="col-md-12">
          <h3 class="text-h6 mb-n2 font-weight-regular">Disabilities</h3>
        </div>
        <div class="col-md-6">
          <v-autocomplete 
            outlined 
            dense 
            background-color="white" 
            hide-details
          >
          </v-autocomplete>
        </div>
        <div class="col-md-4">
          <v-switch
            label="Verified"
            class="my-1"
          >
          </v-switch>
        </div>
        <div class="col-md-2">
          <div class="row">
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="success"
                x-small
                fab
                title="Add"
                class="my-0"
              >
              <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="error"
                x-small
                fab
                title="Remove"
                class="my-0"
              >
              <v-icon>mdi-minus</v-icon>
              </v-btn>
            </div>
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="warning"
                x-small
                fab
                title=""
                class="my-0"
              >
              <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>
      <!--  -->
      <!-- TITLE AND SWITCH -->
      <div class="row  mt-2">
        <v-switch
          label=""
          class="my-0 mr-2"
        >
        </v-switch>
        <h3 class="text-h6 font-weight-regular">Student Applied for CSG for Services and Equipment</h3>
      </div>
      <!--  -->
      <v-card class="default row mb-5">
        <div class="col-md-12">
          <h3 class="text-h6 mb-n2 font-weight-regular">Service required</h3>
        </div>
        <div class="col-md-6">
          <v-autocomplete 
            outlined 
            dense 
            background-color="white" 
            hide-details
          >
          </v-autocomplete>
        </div>
        <div class="col-md-4">
          <v-switch
            label="Verified"
            class="my-1"
          >
          </v-switch>
        </div>
        <div class="col-md-2">
          <div class="row">
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="success"
                x-small
                fab
                title="Add"
                class="my-0"
              >
              <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="error"
                x-small
                fab
                title="Remove"
                class="my-0"
              >
              <v-icon>mdi-minus</v-icon>
              </v-btn>
            </div>
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="warning"
                x-small
                fab
                title=""
                class="my-0"
              >
              <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </div>
          </div>
        </div>

        <div class="col-md-3 pr-2 mr-n2">
          <v-text-field 
            outlined 
            dense 
            background-color="white" 
            hide-details
            label="Requested Amount"
            value="$5,000.00"
          >
          </v-text-field>
        </div>
        <div class="col-md-3 px-2 mr-n2">
          <v-text-field 
            outlined 
            dense 
            background-color="white" 
            hide-details
            label="Maximum allowed amount"
            value="$2,000.00"
            disabled
          >
          </v-text-field>
        </div>
        <div class="col-md-3 pl-2 mr-n2">
          <v-text-field 
            outlined 
            dense 
            background-color="white" 
            hide-details
            label="Approve amount"
            value="$2,000.00"
          >
          </v-text-field>
        </div>
        <div class="col-md-3  pl-1 mb-0">
          <div class="row">
            <div class="col-md-6 mx-0">
              <v-btn
              color="blue"
              block
              class="text-subtitle-2 mt-0"
            >
            View quote
            </v-btn>
            </div>
            <div class="col-md-6 mx-0">
              <v-btn
              color="blue"
              block
              class="text-subtitle-2 mt-0"
              disabled
            >
            View receipt
            </v-btn>
            </div>
          </div>
        </div>

      </v-card>
      <v-card class="default row mb-5">
        <div class="col-md-12">
          <h3 class="text-h6 mb-n2 font-weight-regular">Equipment required</h3>
        </div>
        <div class="col-md-6">
          <v-autocomplete 
            outlined 
            dense 
            background-color="white" 
            hide-details
          >
          </v-autocomplete>
        </div>
        <div class="col-md-4">
          <v-switch
            label="Verified"
            class="my-1"
          >
          </v-switch>
        </div>
        <div class="col-md-2">
          <div class="row">
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="success"
                x-small
                fab
                title="Add"
                class="my-0"
              >
              <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="error"
                x-small
                fab
                title="Remove"
                class="my-0"
              >
              <v-icon>mdi-minus</v-icon>
              </v-btn>
            </div>
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="warning"
                x-small
                fab
                title=""
                class="my-0"
              >
              <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </div>
          </div>
        </div>

        <div class="col-md-3 pr-2 mr-n2">
          <v-text-field 
            outlined 
            dense 
            background-color="white" 
            hide-details
            label="Requested Amount"
            value="$5,000.00"
          >
          </v-text-field>
        </div>
        <div class="col-md-3 px-2 mr-n2">
          <v-text-field 
            outlined 
            dense 
            background-color="white" 
            hide-details
            label="Maximum allowed amount"
            value="$2,000.00"
            disabled
          >
          </v-text-field>
        </div>
        <div class="col-md-3 pl-2 mr-n2">
          <v-text-field 
            outlined 
            dense 
            background-color="white" 
            hide-details
            label="Approve amount"
            value="$2,000.00"
          >
          </v-text-field>
        </div>
        <div class="col-md-3  pl-1 mb-0">
          <div class="row">
            <div class="col-md-6 mx-0">
              <v-btn
              color="blue"
              block
              class="text-subtitle-2 mt-0"
            >
            View quote
            </v-btn>
            </div>
            <div class="col-md-6 mx-0">
              <v-btn
              color="blue"
              block
              class="text-subtitle-2 mt-0"
              disabled
            >
            View receipt
            </v-btn>
            </div>
          </div>
        </div>

      </v-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '@/store';

export default {
  components: {

  },
  computed: {
  },
  data: () => ({
      itemOptions: [{text: '', value: null}, {text: 'Yes', value: 1}, {text: 'No', value: 0}]
  }),
  async created() {
  },
  watch: {

  },
  methods: {

  },
};
</script>