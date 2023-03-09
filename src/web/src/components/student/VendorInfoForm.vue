<template>
    <div>
      <v-card class="default mb-5">
        <v-card-text>
            <div class="row">
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-3">
                            <v-card-title
                            class="my-n4 ml-n4"
                            >Vendor</v-card-title>
                        </div>
                        <div class="col-md-4">
                            <v-btn
                              class="my-0"
                              color="success"
                              block
                            >
                              Search
                            </v-btn>
                        </div>
                        <div class="col-md-4">
                            <v-btn
                              class="my-0"
                              color="error"
                              block
                            >
                              Remove
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-3">
                            <p
                                class="text-left text-subtitle-1" 
                            >
                                Vendor ID
                            </p>
                        </div>
                        <div class="col-md-6">
                            <v-text-field 
                                outlined dense 
                                background-color="white" 
                                hide-details label=""
                            >
                            </v-text-field>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <p
                                class="text-left text-subtitle-1" 
                            >
                                Payment Type
                            </p>
                        </div>
                        <div class="col-md-2">
                            <v-text-field 
                                outlined dense 
                                background-color="white" 
                                hide-details label=""
                            >
                            </v-text-field>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-3">
                            <p
                                class="text-left text-subtitle-1" 
                            >
                                Vendor Info
                            </p>
                        </div>
                        <div class="col-md-9">
                            <v-textarea 
                                outlined dense 
                                background-color="white" 
                                hide-details label=""
                            >
                            </v-textarea>
                        </div>
                    </div>
                </div>
            </div>
        </v-card-text>
      </v-card>
      <v-card class="default mb-5">
        <v-card-title>SFA Address Data</v-card-title>
        <v-card-text>
            <div class="row">
                <div class="col-md-3 mb-n2">
                  <v-text-subtitle class="text-subtitle-1">Permanent Address</v-text-subtitle>
                </div>
            </div> 
            <div class="row">
                <div class="col-md-4">
                    <v-text-field 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Main Address"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        outlined dense 
                        background-color="white" 
                        hide-details label="City"
                        :items="cities"
                        item-text="description"
                        item-value="id"
                    >
                    </v-autocomplete>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Province"
                        :items="provinces"
                        item-text="description"
                        item-value="id"
                    >
                    </v-autocomplete>
                </div>
                <div class="col-md-2">
                    <v-text-field 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Postal Code"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Country"
                        :items="countries"
                        item-text="description"
                        item-value="id"
                    >
                    </v-autocomplete>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <v-text-field 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Phone"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-5">
                    <v-text-field 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Email"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-4 d-flex justify-end">
                    <v-btn 
                        dense
                        color="blue" 
                        class="my-0"
                    >
                        Copy
                    </v-btn>
                </div>
            </div>  
        </v-card-text>
        <v-card-text>
            <div class="row">
                <div class="col-md-3 mb-n2">
                  <v-text-subtitle class="text-subtitle-1">Address While in School</v-text-subtitle>
                </div>
            </div> 
            <div class="row">
                <div class="col-md-4">
                    <v-text-field 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Main Address"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        outlined dense 
                        background-color="white" 
                        hide-details label="City"
                        :items="cities"
                        item-text="description"
                        item-value="id"
                    >
                    </v-autocomplete>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Province"
                        :items="provinces"
                        item-text="description"
                        item-value="id"
                    >
                    </v-autocomplete>
                </div>
                <div class="col-md-2">
                    <v-text-field 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Postal Code"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Country"
                        :items="countries"
                        item-text="description"
                        item-value="id"
                    >
                    </v-autocomplete>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <v-text-field 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Phone"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-5">
                    <v-text-field 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Email"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-4 d-flex justify-end">
                    <v-btn 
                        dense
                        color="blue" 
                        class="my-0"
                    >
                        Copy
                    </v-btn>
                </div>
            </div>  
        </v-card-text>
      </v-card>

      <v-btn
        class="primary mt-0"
      >
      Add Vendor Request
      </v-btn>

      <v-card class="default mb-5">
        <v-card-text>
            <div class="row">
                <div class="col-md-4">
                    <v-text-field 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Main Address"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        outlined dense 
                        background-color="white" 
                        hide-details label="City"
                        :items="cities"
                        item-text="description"
                        item-value="id"
                    >
                    </v-autocomplete>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Province"
                        :items="provinces"
                        item-text="description"
                        item-value="id"
                    >
                    </v-autocomplete>
                </div>
                <div class="col-md-2">
                    <v-text-field 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Postal Code"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-2">
                    <v-autocomplete 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Country"
                        :items="countries"
                        item-text="description"
                        item-value="id"
                    >
                    </v-autocomplete>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <v-text-field 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Phone"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-5">
                    <v-text-field 
                        outlined dense 
                        background-color="white" 
                        hide-details label="Email"
                    >
                    </v-text-field>
                </div>
                <div class="col-md-4 d-flex justify-end">
                    <v-btn 
                        dense
                        color="success" 
                        class="my-0"
                    >
                        Print
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

  }),
  computed: {
    ...mapGetters(["cities", "provinces", "countries"]),
  },
  watch: {

  },
  created() {
    store.dispatch("setCities");
    store.dispatch("setProvinces");
    store.dispatch("setCountries");
  },
  methods: {

  },
};
</script>
  