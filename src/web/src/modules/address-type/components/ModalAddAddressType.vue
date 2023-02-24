<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Address Type</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field label="Description*" v-model="describe" required></v-text-field>
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
            addAddressType();
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
import { ADDRESS_TYPE } from '@/urls';
import store from '@/store';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "ModalAddAddressType",
  data() {
    return {
      is_active: false,
      describe: '',
      DESCRIBE_LENGTH: 3,
    }
  },
  props: {
    dialog: Boolean,
    setDialog: Function,
  },
  methods: {
    async addAddressType() {
      try {
        const resAddAddressType = await axios.post(ADDRESS_TYPE, {
          is_active: this.is_active,
          description: this.describe,
        });

        resAddAddressType?.data?.success ?
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
        store.dispatch("setAddressTypes", false);
      }

      this.is_active = false;
      this.describe = '';

    },
    ...mapActions(["messageStatus"]),
  },
  computed: {
    ...mapGetters(["addressTypes"]),
  },
}
</script>