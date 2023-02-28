<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Disability Type</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field label="Description*" v-model="describe" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field label="CSL Code*" v-model="csl_code" required></v-text-field>
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
            this.is_active = true;
            this.describe = '';
            this.csl_code = '';
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
import { DISABILITY_TYPE } from '@/urls';
import store from '@/store';
import { mapActions } from 'vuex';

export default {
  name: "ModalAddDisabilityType",
  data() {
    return {
      is_active: true,
      describe: '',
      csl_code: '',
      DESCRIBE_LENGTH: 1,
    }
  },
  watch: {
    csl_code(value) {
      if (value.length > 5) {
        this.csl_code = '';
      }
    }
  },
  props: {
    dialog: Boolean,
    setDialog: Function,
  },
  methods: {
    async addRecord() {
      try {
        const res = await axios.post(DISABILITY_TYPE, {
          is_active: this.is_active,
          description: this.describe,
          csl_code: this.csl_code,
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
        this.is_active = true;
        this.describe = '';
        this.csl_code = '';
        store.dispatch("setDisabilityTypes", false);
      }



    },
    ...mapActions(["messageStatus"]),
  },
}
</script>