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
              v-model="application.MOVING_FLAG"
            ></v-switch>
          </div>
          <div class="col-md-12 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Maintaining two residences"
              v-model="application.TWO_RESIDENCE_FLAG"
            ></v-switch>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import store from "../../store";

export default {
  computed: {
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  data: () => ({
    is_applying: false,
  }),
  watch: {
    application: function () {
      let mv = this.application.MOVING_FLAG || 0;
      let tr = this.application.TWO_RESIDENCE_FLAG || 0;

      this.is_applying = mv == 1 || tr == 1;
    },
  },
  async created() {
    let mv = this.application.MOVING_FLAG || 0;
    let tr = this.application.TWO_RESIDENCE_FLAG || 0;

    this.is_applying = mv == 1 || tr == 1;
  },
  methods: {},
};
</script>
