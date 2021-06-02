<template>
  <div>
    <v-card class="default">
      <v-card-text>
        <div class="row">
          <div class="col-md-2">
            <h4 class="mb-5">Pre-system data</h4>
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Funding years used"
              v-model="pre_system_funding_year"
              type="number"
            ></v-text-field>
          </div>

          <div class="col-md-3">
            <h4 class="mb-5">Pre-legislation chg</h4>
            <v-text-field
              class="mb-5"
              outlined
              dense
              background-color="white"
              hide-details
              label="Funding years used"
              v-model="pre_leg_funding_year"
              type="number"
            ></v-text-field>

            <v-text-field
              class="mb-5"
              outlined
              dense
              background-color="white"
              hide-details
              label="YG/STA funding weeks"
              v-model="pre_leg_funding_weeks"
              type="number"
            ></v-text-field>
            <v-text-field
              class="mb-5"
              outlined
              dense
              background-color="white"
              hide-details
              label="STA upgrading weeks"
              v-model="pre_leg_upgrading_weeks"
              type="number"
            ></v-text-field>

            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="YG outside travel count"
              v-model="pre_leg_travel_count"
              type="number"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <h4 class="mb-5">Adjust</h4>
            <div style="height: 60px" class="d-sm-none d-md-block"></div>

            <v-text-field
              class="mb-5"
              outlined
              dense
              background-color="white"
              hide-details
              label="YG/STA funding weeks"
              v-model="adjust_funding_weeks"
              type="number"
            ></v-text-field>
            <v-text-field
              class="mb-5"
              outlined
              dense
              background-color="white"
              hide-details
              label="STA upgrading weeks"
              v-model="adjust_upgrading_weeks"
              type="number"
            ></v-text-field>

            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="YG outside travel count"
              v-model="adjust_travel_count"
              type="number"
            ></v-text-field>
          </div>
          <div class="col-md-2">
            <h4 class="mb-5">Totals used</h4>
            <div style="height: 60px" class="d-sm-none d-md-block"></div>

            <v-text-field
              class="mb-5"
              outlined
              dense
              background-color="white"
              hide-details
              readonly
              label="Total funding weeks"
              v-model="total_funding_weeks"
              :error="total_funding_weeks > 170"
            ></v-text-field>
            <v-text-field
              class="mb-5"
              outlined
              dense
              background-color="white"
              hide-details
              readonly
              label="Total upgrading weeks"
              v-model="total_upgrading_weeks"
              :error="total_upgrading_weeks > 68"
            ></v-text-field>

            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              readonly
              label="Total travel count"
              v-model="total_travel_count"
              :error="total_travel_count > 5"
            ></v-text-field>
          </div>

          <div class="col-md-2 d-sm-none d-md-block">
            <div style="height: 65px" class="d-sm-none d-md-block"></div>
            <div
              style="margin-top: 45px; font-weight: 700"
              :class="total_funding_weeks > 170 ? 'text-error' : ''"
            >
              Max 170
            </div>
            <div
              style="margin-top: 40px; font-weight: 700"
              :class="total_upgrading_weeks > 68 ? 'text-error' : ''"
            >
              Max 68
            </div>
            <div
              style="margin-top: 35px; font-weight: 700"
              :class="total_travel_count > 5 ? 'text-error' : ''"
            >
              Max 5
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    pre_system_funding_year: 1,
    pre_leg_funding_year: 2,
    pre_leg_funding_weeks: 3,
    pre_leg_upgrading_weeks: 4,
    pre_leg_travel_count: 5,
    adjust_funding_weeks: 6,
    adjust_upgrading_weeks: 7,
    adjust_travel_count: 8,
  }),
  computed: {
    total_funding_weeks: function () {
      return (
        Number(this.pre_leg_funding_weeks) + Number(this.adjust_funding_weeks)
      );
    },
    total_upgrading_weeks: function () {
      return (
        Number(this.pre_leg_upgrading_weeks) +
        Number(this.adjust_upgrading_weeks)
      );
    },
    total_travel_count: function () {
      return (
        Number(this.pre_leg_travel_count) + Number(this.adjust_travel_count)
      );
    },
  },
  async created() {},
  methods: {},
};
</script>
