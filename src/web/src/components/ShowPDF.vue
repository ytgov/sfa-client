<template>
    <v-dialog v-model="dialogModel" max-width="600px">
        <v-card>
            <embed :src="url" type="application/pdf" width="100%" height="700px">
        </v-card>
    </v-dialog>
</template>
  
<script>

export default {
    data: () => ({
        url: "",
        dialogModel: null,
        confirmCallback: null,
        denyCallback: null,
    }),
    methods: {
        show(url, confirmCallback, denyCallback) {
            this.url = url;
            this.confirmCallback = confirmCallback;
            this.denyCallback = denyCallback;
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