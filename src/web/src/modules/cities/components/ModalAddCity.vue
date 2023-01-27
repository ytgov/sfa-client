<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add City</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field label="Description*" v-model="describe" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-autocomplete label="Province" :items="provinces" item-text="description" item-value="id"
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
          <v-btn color="blue darken-1" text @click=" e => {
            addCity();
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
import { CITIES } from '@/urls';
import store from '@/store';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "ModalAddCities",
  data() {
    return {
      is_active: false,
      describe: '',
      select: null,
      DESCRIBE_LENGTH: 3,
    }
  },
  props: {
    dialog: Boolean,
    setDialog: Function,
  },
  methods: {
    async addCity() {

      try {
        const resAddCity = await axios.post(CITIES, {
          is_active: this.is_active,
          province_id: this.select,
          description: this.describe,
        });

        resAddCity?.data?.success ?
          this.messageStatus({ message: 'Added!', status: 'success' })
          :
          this.messageStatus({ message: 'Error!', status: 'error' });

      } catch (error) {

        console.log(error);
        const res = { ...error };
        const message = res?.response?.data?.message ? res.response.data.message : "Error!";
        this.messageStatus({ message, status: 'error' });

      } finally {

        store.dispatch("setCities", false);
        this.select = null;
        this.is_active = false;
        this.describe = '';

      }

    },
    ...mapActions(["cancel", "open", "messageStatus"]),
    close() {
    },
  },
  computed: {
    ...mapGetters(["provinces"]),
  },
}
</script>