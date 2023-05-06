<template>
    <div>
        <v-card class="default row mb-8">
            <div class="col-md-6">
                <h3 class="text-h6 font-weight-regular">Mailing Address</h3>
            </div>
            <div class="col-md-6">
                <v-row>
                    <div class="col-md-6">
                        <v-btn block color="success" class="my-0">View YG/STA PDEC</v-btn>
                    </div>
                    <div class="col-md-6">
                        <v-btn block color="success" class="my-0">View CSFA PDEC</v-btn>
                    </div>
                </v-row>
            </div>

            <div class="col-md-6">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Address line 1"
                    v-model="parent.address1"
                    @change="update({ address1: parent.address1 })"
                >
                </v-text-field>
            </div>
            <div class="col-md-6">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Address line 2"
                    v-model="parent.address2"
                    @change="update({ address2: parent.address2 })"
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
                    v-model="parent.city_id"
                    @change="update({ city_id: parent.city_id })"
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
                    v-model="parent.province_id"
                    @change="update({ province_id: parent.province_id })"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-3">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Postal code"
                    v-model="parent.postal_code"
                    @change="update({ postal_code: parent.postal_code })"
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
                    v-model="parent.country_id"
                    @change="update({ country_id: parent.country_id })"
                >
                </v-autocomplete>
            </div>

        </v-card>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '@/store';
import { APPLICATION_URL } from '@/urls';
import axios from 'axios';

export default {
    components: {

    },
    computed: {
        ...mapGetters(["cities", "provinces", "countries"]),
        application() {
            return store.getters.selectedApplication;
        },
    },
    data: () => ({

    }),
    async created() {
        store.dispatch("setCities");
        store.dispatch("setProvinces");
        store.dispatch("setCountries");
    },
    watch: {

    },
    methods: {
        async update(data) {
            try {
                if (this.parent?.id && this.parent?.person_address_id) {
                    const resUpdate = await axios.patch(
                        `${APPLICATION_URL}/${this.parent.person_address_id}/person-address`,
                        { data }
                    );
                    
                    const message = resUpdate?.data?.messages[0];

                    if (message?.variant === "success") {
                        this.$emit("showSuccess", message.text);
                        //this.setClose();
                    } else {
                        this.$emit("showError", message.text);
                    }
                } else {
                    const resInsert = await axios.post(
                        `${APPLICATION_URL}/${this.application.id}/person-address`,
                        { data, personAddressId: this.parent?.id || null, }
                    );
                    
                    const message = resInsert?.data?.messages[0];

                    if (message?.variant === "success") {
                        this.$emit("showSuccess", message.text);
                        //this.setClose();
                    } else {
                        this.$emit("showError", message.text);
                    }
                }

            } catch (error) {
                console.log(error);
                this.$emit("showError", "Error to insert");
                
            } finally {
                store.dispatch("loadApplication", this.application.id);
            }
        },
    },
    props: {
        parent: Object,
    }
};
</script>