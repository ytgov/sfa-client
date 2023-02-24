<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Age Distribution</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field label="Start Age*" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                  v-model="startAge" type="number" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="End Age*" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                  v-model="endAge" type="number" required></v-text-field>
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
          }" :disabled="!(validateRange)">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios';
import { AGE_DISTRIBUTION } from '@/urls';
import store from '@/store';
import { mapActions } from 'vuex';

export default {
  name: "ModalAddAgeDistribution",
  data() {
    return {
      is_active: false,
      describe: '',
      startAge: 0,
      endAge: 1,
      DESCRIBE_LENGTH: 1,
      flag: false
    }
  },
  props: {
    dialog: Boolean,
    setDialog: Function,
  },
  watch: {
    startAge(value, oldValue) {
      const regexRange = /^[0-9]$|^[1-9][0-9]$|^[0-1][0-9][0-9]$/g;
      if (regexRange.test(value)) {
        this.startAge = value;
      } else {
        this.startAge = "";
      }
    },
    endAge(value, oldValue) {
      const regexRange = /^[0-9]$|^[1-9][0-9]$|^[0-1][0-9][0-9]$/g;
      if (regexRange.test(value)) {
        this.endAge = value;
      } else {
        this.endAge = "";
      }
    }
  },
  computed: {
    validateRange() {
      return this.startAge < this.endAge;
    },
  },
  methods: {
    async addRecord() {
      try {
        const res = await axios.post(AGE_DISTRIBUTION, {
          start_age: this.startAge,
          end_age: this.endAge,
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
        store.dispatch("setAgeDistributions");
      }

      this.startAge = 0;
      this.endAge = 1;

    },
    ...mapActions(["messageStatus"]),
  },
}
</script>