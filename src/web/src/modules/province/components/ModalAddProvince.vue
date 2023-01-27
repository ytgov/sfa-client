<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Province</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field label="Description*" v-model="describe" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-autocomplete label="Country" :items="countries" item-text="description" item-value="id"
                  v-model="select"></v-autocomplete>
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
          <v-btn color="blue darken-1" text @click="e => {
            addProvince();
            setDialog();
          }" :disabled="!(describe?.length > DESCRIBE_LENGTH)">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- SNACKBAR -->
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!-- SNACKBAR -->
  </v-row>
</template>

<script>
import axios from 'axios';
import { PROVINCE } from '@/urls';
import store from '../../../store';
import { mapState } from 'vuex';

export default {
  name: "ModalAddProvince",
  data() {
    return {
      is_active: false,
      describe: '',
      select: null,
      countries: [],
      DESCRIBE_LENGTH: 3,
      snack: false,
      snackText: '',
      snackColor: '',
    }
  },
  props: {
    dialog: Boolean,
    setDialog: Function,
  },
  computed: {
    storedCountries() {
      return store.getters.countries;
    },
    ...mapState(["setProvinces"]),
  },
  methods: {
    async addProvince() {

      try {
        const resAddProvince = await axios.post(PROVINCE, {
          is_active: this.is_active,
          country_id: this.select,
          description: this.describe,
        });

        resAddProvince?.data?.success ?
          this.save()
          :
          this.messageStatus("error", "error");

      } catch (error) {
        const res = { ...error };

        const message = res?.response?.data?.message ?
          res.response.data.message
          :
          "Error!"
        this.messageStatus(message, "error");

      } finally {
        await store.dispatch("setProvinces", false);
        this.is_active = false;
        this.select = null;
        this.describe = '';
      }

    },
    save() {
      this.snack = true
      this.snackColor = "success"
      this.snackText = "Saved!"
    },
    cancel() {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    messageStatus(message = "", status = "") {
      this.snack = true
      this.snackColor = status
      this.snackText = message
    },
    open() {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    close() {
    },
  },
  watch: {
    storedCountries: function () {
      this.countries = this.storedCountries;
    },
  },
  async created() {
    await store.dispatch("setCountries");
  },
}
</script>