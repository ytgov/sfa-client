<template>
  <div>
    <v-switch
      outlined
      dense
      hide-details
      label="Applying for Student Training Allowance"
      v-model="is_applying"
    ></v-switch>
    <v-card v-if="is_applying" class="default mt-5">
      <v-card-text>
        <div class="row">
          <div class="col-md-12 py-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Moving to another community to attend program?"
              v-model="is_moving"
            ></v-switch>
          </div>
          <div class="col-md-12 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Maintaining two residences"
              v-model="is_two_residences"
            ></v-switch>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    is_applying: false,
    is_moving: false,
    is_two_residences: false,
  }),
  async created() {},
  methods: {},
};
</script>
