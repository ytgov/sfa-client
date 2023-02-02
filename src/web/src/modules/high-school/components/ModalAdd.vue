<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add High School</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field label="Name*" v-model="describe" required></v-text-field>
              </v-col>

              <!-- CITY_NAME -->
              <v-col cols="12">
                <v-autocomplete label="City" placeholder="Not Listed" :items="cities" item-text="description"
                  item-value="id" v-model="citySelected" :value="citySelected" />
              </v-col>

              <!-- PROVINCE_NAME -->
              <v-col cols="12">
                <v-autocomplete label="Province" placeholder="Not Listed" :items="provinces" item-text="description"
                  item-value="id" v-model="provinceSelected" />
              </v-col>

              <!-- COUNTRY_NAME -->
              <v-col cols="12">
                <v-autocomplete label="Country" placeholder="Not Listed" :items="countries" item-text="description"
                  item-value="id" v-model="countrySelected" />
              </v-col>

              <v-col cols="6">
                <v-switch v-model="is_active" :label="`Status*: ${is_active ? ' Active' : ' Inactive'}`"></v-switch>
              </v-col>
            </v-row>
          </v-container>
          <small>* indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="(e) => {
            setDialog();
          }">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click=" e => {
            addRecord();
            setDialog();
          }" :disabled="!(describe?.length > DESCRIBE_LENGTH)">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios';
import { HIGH_SCHOOL } from '@/urls';
import store from '@/store';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "ModalAddHighSchool",
  data() {
    return {
      citySelected: 0,
      provinceSelected: 0,
      countrySelected: 0,
      is_active: false,
      describe: '',
      DESCRIBE_LENGTH: 1,
      max10chars: v => v.length <= 10 || 'Input too long!',
    }
  },
  computed: {

  },
  props: {
    dialog: Boolean,
    setDialog: Function,
  },
  methods: {
    async addRecord() {
      try {
        const res = await axios.post(HIGH_SCHOOL, {
          is_active: this.is_active,
          name: this.describe,
          citySelected: this.citySelected === null ? 0 : this.citySelected,
          provinceSelected: this.provinceSelected === null ? 0 : this.provinceSelected,
          countrySelected: this.countrySelected === null ? 0 : this.countrySelected,
        });

        res?.data?.success ?
          this.messageStatus({ message: 'Added!', status: 'success' })
          :
          this.messageStatus({ message: 'Error!', status: 'error' });

      } catch (err) {
        console.log(err);
        const res = { ...err };
        const message = res?.response?.data?.message ?
          res.response.data.message
          :
          "Error!"
        this.messageStatus({ message, status: "error" });
      } finally {
        store.dispatch("setHighSchools", false);
      }

      this.is_active = false;
      this.describe = '';
      this.citySelected = 0;
      this.provinceSelected = 0;
      this.countrySelected = 0;

    },
    ...mapActions(["messageStatus"]),
  },
  computed: {
    ...mapGetters(["cities", "provinces", "countries"]),
  },
  created() {
    store.dispatch("setCities");
    store.dispatch("setProvinces");
    store.dispatch("setCountries");
    this.citySelected = 0;
    this.provinceSelected = 0;
    this.countrySelected = 0;
  },
}
</script>