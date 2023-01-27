<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Student Category</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field label="Code" v-model="code" :counter="10" :rules="[max10chars]"
                  required></v-text-field>
              </v-col>

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
            addRecord();
            setDialog();
          }" :disabled="!(describe?.length > DESCRIBE_LENGTH && code?.length >= DESCRIBE_LENGTH)">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios';
import { STUDENT_CATEGORY } from '@/urls';
import store from '@/store';
import { mapActions } from 'vuex';

export default {
  name: "ModalAddStudentCategory",
  data() {
    return {
      is_active: false,
      code: '',
      describe: '',
      DESCRIBE_LENGTH: 1,
      max10chars: v => v.length <= 10 || 'Input too long!',
    }
  },
  computed: {

  },
  watch: {
    code(value, oldValue) {
      if (value.length <= 10) {
        this.code = value.toUpperCase();
      } else {
        this.code = "";
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
        const res = await axios.post(STUDENT_CATEGORY, {
          is_active: this.is_active,
          description: this.describe,
          code: this.code,
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
        store.dispatch("setStudentCategories", false);
      }

      this.is_active = false;
      this.describe = '';
      this.code = '';

    },
    ...mapActions(["messageStatus"]),
  },
}
</script>