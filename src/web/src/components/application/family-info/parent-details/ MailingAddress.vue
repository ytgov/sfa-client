<template>
    <div>
        <v-card class="default row mb-8">
            <div class="col-md-6">
                <h3 class="text-h6 font-weight-regular">Mailing Address</h3>
            </div>
            <div class="col-md-6">
                <v-row>
                    <div class="col-md-6">
                        <v-btn block color="success" class="my-0">VIEW YG/STA PDEC</v-btn>
                    </div>
                    <div class="col-md-6">
                        <v-btn block color="success" class="my-0">VIEW CSFA PDEC</v-btn>
                    </div>
                </v-row>
            </div>

            <div class="col-md-6">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Address Line 1"
                >
                </v-text-field>
            </div>
            <div class="col-md-6">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Address Line 2"
                >
                </v-text-field>
            </div>

            <div class="col-md-3">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :items="cities"
                    item-text="description"
                    item-value="id"
                    label="City"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-3">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :items="provinces"
                    item-text="description"
                    item-value="id"
                    label="Province"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-3">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Postal Code"
                >
                </v-text-field>
            </div>
            <div class="col-md-3">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :items="countries"
                    item-text="description"
                    item-value="id"
                    label="Country"
                >
                </v-autocomplete>
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
        ...mapGetters(["cities", "provinces", "countries"]),
    },
    data: () => ({

    }),
    async created() {
        store.dispatch("setCities");
        store.dispatch("setProvinces");
        store.dispatch("setCoutries");
    },
    watch: {

    },
    methods: {

    },
};
</script>