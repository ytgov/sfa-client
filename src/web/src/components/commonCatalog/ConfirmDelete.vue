<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-text class="text-h5 mt-8">
          You want to permanently delete?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cancel">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteFunction">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    dialog: Boolean,
    setDialog: Function,
    messageStatus: Function,
    deleteFunction: Function,
  },
  methods: {
    cancel() {
      this.messageStatus({ message: "Cancel", status: "error" });

      this.setDialog(null);
    },
  },
};
</script>
