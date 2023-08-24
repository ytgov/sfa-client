<template>
    <v-menu
        :disabled="disabled"
        v-model="menu_change"
        :close-on-content-click="false"
        transition="scale-transition"
        left
        nudge-top="26"
        offset-y
        min-width="auto"
    >
        <template v-slot:activator="{ on, attrs }">
        <v-text-field
            :disabled="disabled"
            v-model="date_formatted"
            :label="label"
            hide-details
            readonly
            outlined
            dense
            background-color="white"
            v-bind="attrs"
            v-on="on"
            clearable
        ></v-text-field>
        </template>
        <v-date-picker
        :disabled="disabled"
        v-model="date_formatted"
        @input="e => {
            $emit('input', e);
            menu_change = false;
        }"
        ></v-date-picker>
    </v-menu>
</template>

<script>
import { DateHelper } from "@/utilities";

const dateHelper = new DateHelper();

export default {
  name: "date-input",
  props: ["value", "label", "disabled", "menu"],
  data() {
    return {
        date_formatted: null,
        menu_change: false,
    };
  },
  methods: {    
    formatDate(value) {
      if (value) {
        return dateHelper.getDateFromUTC(value);
      }
      return null;
    }
  },
  watch: {
    value: {
        immediate: true,
        handler(newVal) {
           this.date_formatted = this.formatDate(newVal);
           this.$emit("input", newVal);
        }
    },
    menu: {
        immediate: true,
        handler(newVal) {
            this.menu_change = newVal;
        }
    }
  },
};
</script>