<template>
  <div>
    <v-card class="default">
      <v-card-text>
        <div class="row">
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="YEA awarded"
              v-model="yea_awarded"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="YEA total used"
              v-model="yea_used"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="YEA remaining"
              v-model="yea_remaining"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import store from "../store";

export default {
  data: () => ({
    yea_awarded: 0,
    yea_used: 0,
    yea_remaining: 0,
  }),
  async created() {},
  methods: {
    doSaveStudent(field, value) {
      store.dispatch("updateStudent", [field, value, this]);
    },
  },
};
</script>
