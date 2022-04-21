<template>
  <div>
    <v-switch
      outlined
      dense
      hide-details
      label="Applying for Yukon Grant"
      v-model="is_applying"
    ></v-switch>

    <v-card v-if="is_applying" class="default mt-5">
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Category"
              v-model="category"
              :items="categoryOptions"
            ></v-select>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Estimated tuition fees"
              v-model="estimated_fees"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    categoryOptions: ["Independent DO NOT USE"],

    is_applying: false,
    category: "",
    estimated_fees: 0,
  }),
  async created() {},
  methods: {},
};
</script>
