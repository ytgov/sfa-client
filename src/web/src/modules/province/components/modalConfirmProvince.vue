<template>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-text class="text-h5 mt-8">
            You want to permanently delete ?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="cancel"
            >
              Disagree
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="deleteProvince"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script>
import axios from 'axios';
import { PROVINCE } from '@/urls';
import store from '../../../store';

export default {
  data () {
    return {
    }
  },
  props: {
      idDelete: Number,
      dialog: Boolean,
      setDialog: Function,
      messageStatus: Function,
  },
  methods: {
      cancel() {
          this.messageStatus("Cancel", "error");
          this.setDialog(null);
      },
      deleteProvince () {
          axios.delete(PROVINCE+`/${this.idDelete}`)
          .then((resp) => {
              resp?.data?.wasDelete && store.dispatch("setProvinces", false);
              this.messageStatus("success!", "success");
          })
              .catch((err) => {
                console.log(err);
                  this.messageStatus("Error to delete", "error");
              })
              .finally(() => {
                  this.setDialog(null);
              });
      },
  }
}
</script>