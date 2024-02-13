<template>
  <v-dialog v-model="dialogModel" persistent max-width="500px">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions class="mb-3">
        <v-btn color="primary" v-if="showConfirm" @click="doConfirm()">Confirm</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="doDeny()">{{ messageButton }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    title: "",
    message: "",
    dialogModel: null,
    confirmCallback: null,
    denyCallback: null,
    showConfirm: true,
    messageButton: "Cancel",
  }),
  methods: {
    show(title, message, confirmCallback, denyCallback, showConfirm = true, messageButton = "Cancel") {
      this.title = title;
      this.message = message;
      this.confirmCallback = confirmCallback;
      this.denyCallback = denyCallback;
      this.showConfirm = showConfirm;
      this.messageButton = messageButton;
      this.dialogModel = true;
    },

    doConfirm() {
      this.confirmCallback();
      this.dialogModel = null;
    },
    doDeny() {
      this.denyCallback();
      this.dialogModel = null;
    },
  },
};
</script>
