<template>
  <div>
    <v-card class="default">
      <v-card-title>Statistical Demographics</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Marital status"
              v-model="marital_status"
              :items="maritalOptions"
            ></v-select>
          </div>
          <div class="col-md-3 py-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Disabled"
              v-model="disabled"
            ></v-switch>
          </div>
          <div class="col-md-3 py-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Visible Minority"
              v-model="visible_minority"
            ></v-switch>
          </div>

          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Citizenship"
              v-model="citizenship"
              :items="citizenshipOptions"
            ></v-select>
          </div>
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Aboriginal status"
              v-model="aboriginal_status"
              :items="aboriginalStatusOptions"
            ></v-select>
          </div>




          <div class="col-md-6 offset-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Yukon First Nation"
              v-model="yukon_first_nation"
              :items="firstNationOptions"
            ></v-select>
          </div>
          <div class="col-md-12">
            <v-textarea
              outlined
              dense
              background-color="white"
              hide-details
              label="Comment"
              v-model="comment"
            ></v-textarea>
          </div>


        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    maritalOptions: ["Single", "Married"],
    citizenshipOptions: ["Not Recorded", "Canadian", "Permanent Resident", "Protected Person", "Non-Citizen"],
    aboriginalStatusOptions: ["Not Recorded", "Non-Aboriginal", "Yukon First Nations Status", "Yukon First Nations Non-Status", "Métis", "Inuit", "Other First Nations Status", "Other First Nations Non-Status"],
    firstNationOptions: ["FN1", "FN2"],

    marital_status: "",
    citizenship: "",
    aboriginal_status: "",
    yukon_first_nation: "",
    disabled: false,
    visible_minority: false,
    comment: "",
  }),
  async created() {},
  methods: {},
};
</script>
