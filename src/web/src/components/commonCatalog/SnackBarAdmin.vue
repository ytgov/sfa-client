<template>
    <!-- SNACKBAR -->
    <v-snackbar
        v-model="statusSnack"
        :timeout="3000"
        :color="snackColor"
    >
        {{ snackText }}

        <template v-slot:action="{ attrs }">
        <v-btn
            v-bind="attrs"
            text
            @click="closeSnack"
        >
            Close
        </v-btn>
        </template>
    </v-snackbar>
    <!-- SNACKBAR -->
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";

export default {
    data() {
        return {
            statusSnack: false,
        };
    },
    computed: {
        ...mapGetters(["snack", "snackColor", "snackText"]),

    },
    methods: {
        closeSnack() {
            store.dispatch("setSnack", false);
        }
    },
    watch: {
        snack() {
            this.statusSnack = this.snack;
        },
        statusSnack(val) {
            store.dispatch("setSnack", val);
        }
    }
};
</script>


