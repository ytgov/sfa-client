<template>
  <div class="home">
    <div class="row">
      <div class="col-md-12">
        <v-card class="default mb-5" v-for="item, index in filterList" :key="index">
          <v-card-text>
            <v-card-title class="mb-5">Residence {{ index + 1 }}
              <v-spacer></v-spacer>
              <v-btn
                :disabled="showAdd"
                color="warning" 
                x-small 
                fab class="my-0"
                @click="deleteRecord(item.id)"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <div class="row">
              <div class="col-md-3">
                <v-select
                  outlined 
                  dense 
                  background-color="white" 
                  :disabled="showAdd"
                  v-model="item.from_year"
                  :items="yearOptions"
                  @change="doSaveResidence('from_year', item.from_year, 'residenceInfo', item.id)"
                  hide-details label="From Year"
                ></v-select>
              </div>
              <div class="col-md-3">
                <v-select
                  outlined 
                  dense 
                  background-color="white"
                  :disabled="showAdd"
                  :items="monthOptions"
                  v-model="item.from_month"
                  @change="doSaveResidence('from_month', item.from_month, 'residenceInfo', item.id)"
                  hide-details label="From Month"
                ></v-select>
              </div>
              <div class="col-md-3">
                <v-select
                  outlined 
                  dense 
                  background-color="white"
                  :disabled="showAdd"
                  v-model="item.to_year"
                  :items="yearOptions.filter(year => year.value >= item.from_year)"
                  @change="doSaveResidence('to_year', item.to_year, 'residenceInfo', item.id)"
                  hide-details label="To Year"
                ></v-select>
              </div>
              <div class="col-md-3">
                <v-select
                  outlined 
                  dense 
                  background-color="white"
                  :disabled="showAdd"
                  v-model="item.to_month"
                  :items="
                    item.from_year === item.to_year ? 
                      monthOptions.filter(month => month.value >= item.from_month)
                      :
                      monthOptions
                  "
                  @change="doSaveResidence('to_month', item.to_month, 'residenceInfo', item.id)"
                  hide-details label="To Month"
                ></v-select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <v-autocomplete
                  outlined 
                  dense 
                  background-color="white"
                  :disabled="showAdd"
                  @change="doSaveResidence('city_id', item.city_id, 'residenceInfo', item.id)"
                  v-model="item.city_id"
                  :items="cities"
                  item-text="description"
                  item-value="id"
                  hide-details label="city"
                ></v-autocomplete>
              </div>
              <div class="col-md-3">
                <v-autocomplete
                  outlined 
                  dense 
                  background-color="white"
                  :disabled="showAdd"
                  @change="doSaveResidence('province_id', item.province_id, 'residenceInfo', item.id)"
                  v-model="item.province_id"
                  :items="provinces"
                  item-text="description"
                  item-value="id"
                  hide-details label="Province"
                ></v-autocomplete>
              </div>
              <div class="col-md-3">
                <v-autocomplete
                  outlined 
                  dense 
                  background-color="white"
                  :disabled="showAdd"
                  @change="doSaveResidence('country_id', item.country_id, 'residenceInfo', item.id)"
                  v-model="item.country_id"
                  :items="countries"
                  item-text="description"
                  item-value="id"
                  hide-details label="Country"
                ></v-autocomplete>
              </div>
              <div class="col-md-3">
                <v-text-field
                  outlined 
                  dense 
                  background-color="white"
                  :disabled="showAdd"
                  oninput="
                    if (this.value.length > 4) {
                      this.value = this.value.slice(0, 4);
                    }
                  "
                  @keypress="validate.isNumber($event)"
                  @change="doSaveResidence('in_school', item.in_school, 'residenceInfo', item.id)"
                  v-model="item.in_school"
                  hide-details 
                  label="In School"
                ></v-text-field>
              </div>
            </div>

            <div class="row">
              <div class="col-md-2 mt-0 pt-0">
                <v-switch 
                :disabled="showAdd"
                  @change="doSaveResidence('is_in_progress', item.is_in_progress, 'residenceInfo', item.id)"
                  v-model="item.is_in_progress"
                  label="Is in Progress"
                >
                </v-switch>
              </div>
            </div>
          </v-card-text>
        </v-card>
        <v-card class="default mb-5" v-if="showAdd">
          <v-card-text>
            <v-card-title>Add Residence</v-card-title>
            <div class="row">
              <div class="col-md-3">
                <v-select
                  outlined 
                  dense 
                  background-color="white"
                  v-model="newRecord.from_year"
                  :items="yearOptions"
                  hide-details label="From Year"
                ></v-select>
              </div>
              <div class="col-md-3">
                <v-select
                  outlined 
                  dense 
                  background-color="white"
                  v-model="newRecord.from_month"
                  :items="monthOptions"
                  hide-details label="From Month"
                ></v-select>
              </div>
              <div class="col-md-3">
                <v-select
                  outlined 
                  dense 
                  background-color="white"
                  :disabled="!newRecord.from_year"
                  v-model="newRecord.to_year"
                  :items="yearOptions.filter(year => year.value >= newRecord.from_year)"
                  hide-details label="To Year"
                ></v-select>
              </div>
              <div class="col-md-3">
                <v-select
                  outlined 
                  dense 
                  background-color="white"
                  :disabled="!newRecord.from_month"
                  v-model="newRecord.to_month"
                  :items="
                  newRecord.from_year === newRecord.to_year ? 
                      monthOptions.filter(month => month.value >= newRecord.from_month)
                      :
                      monthOptions
                  "
                  hide-details label="To Month"
                ></v-select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <v-select
                  outlined 
                  dense 
                  background-color="white"
                  v-model="newRecord.city_id"
                  :items="cities"
                  item-text="description"
                  item-value="id"
                  hide-details label="city"
                ></v-select>
              </div>
              <div class="col-md-3">
                <v-select
                  outlined 
                  dense 
                  background-color="white"
                  v-model="newRecord.province_id"
                  :items="provinces"
                  item-text="description"
                  item-value="id"
                  hide-details label="Province"
                ></v-select>
              </div>
              <div class="col-md-3">
                <v-select
                  outlined 
                  dense 
                  background-color="white"
                  v-model="newRecord.country_id"
                  :items="countries"
                  item-text="description"
                  item-value="id"
                  hide-details label="Country"
                ></v-select>
              </div>
              <div class="col-md-3">
                <v-text-field
                  outlined 
                  dense 
                  background-color="white"
                  hide-details
                  oninput="
                    if (this.value.length > 4) {
                      this.value = this.value.slice(0, 4);
                    }
                  "
                  @keypress="validate.isNumber($event)"
                  v-model="newRecord.in_school"
                  label="In School"
                ></v-text-field>
              </div>
            </div>
          </v-card-text>
          <v-card-title>
            <v-switch
              v-model="newRecord.is_in_progress"
              label="Is in Progress"
            >
            </v-switch>
            <v-spacer></v-spacer>
            <v-btn 
              color="red" 
              class="my-0" 
              @click="setClose()"
            >
              <v-icon 
                color="white font-weight-thin" 
                size="21"
              >
                {{ 'mdi-close' }}
              </v-icon>
            </v-btn>
            <v-btn 
              color="success" 
              class="my-0 ml-5"
              @click="doSaveResidence('data', { ...newRecord }, 'residenceInfo', null, true)"
            >
              <v-icon 
                color="white font-weight-thin" 
                size="21"
              >
                {{ 'mdi-content-save' }}
              </v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <v-btn color="info mb-5 mt-0" v-if="!showAdd" @click="setClose()">Add residence</v-btn>
        <v-btn color="info mb-5 mt-0" v-else  @click="showAdd = !showAdd">Cancel</v-btn>
        <v-card class="default">
          <v-card-text>
            <div class="row">
              <div class="col-md-6" v-if="currentCanadianResident">
                <h3>Canadian resident from</h3>
                <div class="row">
                  <div class="col-md-6">
                    <v-select
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Year"
                      v-model="currentCanadianResident.from_year"
                      @change="doSaveResidence('from_year', currentCanadianResident.from_year, 'residenceInfo', currentCanadianResident.id)"
                      :disabled="showAdd"
                      :items="yearOptions"
                    ></v-select>
                  </div>

                  <div class="col-md-6">
                    <v-select
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Month"
                      v-model="currentCanadianResident.from_month"
                      @change="doSaveResidence('from_month', currentCanadianResident.from_month, 'residenceInfo', currentCanadianResident.id)"
                      :disabled="showAdd"
                      :items="monthOptions"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="col-md-6" v-else>
                <h3>Add Canadian resident from</h3>
                <div class="row">
                  <div class="col-md-6">
                    <v-select
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Year"
                      v-model="canadianResident.from_year"
                      @change="addCanadianResident"
                      :disabled="showAdd"
                      :items="yearOptions"
                    ></v-select>
                  </div>

                  <div class="col-md-6">
                    <v-select
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Month"
                      v-model="canadianResident.from_month"
                      @change="addCanadianResident"
                      :disabled="showAdd"
                      :items="monthOptions"
                    ></v-select>
                  </div>
                </div>
              </div>

              <div class="col-md-6" v-if="currentYukonResident">
                <h3>Yukon resident from</h3>
                <div class="row">
                  <div class="col-md-6">
                    <v-select
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Year"
                      v-model="currentYukonResident.from_year"
                      @change="doSaveResidence('from_year', currentYukonResident.from_year, 'residenceInfo', currentYukonResident.id)"
                      :disabled="showAdd"
                      :items="yearOptions"
                    ></v-select>
                  </div>

                  <div class="col-md-6">
                    <v-select
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Month"
                      v-model="currentYukonResident.from_month"
                      @change="doSaveResidence('from_month', currentYukonResident.from_month, 'residenceInfo', currentYukonResident.id)"
                      :disabled="showAdd"
                      :items="monthOptions"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="col-md-6" v-else>
                <h3>Add Yukon resident from</h3>
                <div class="row">
                  <div class="col-md-6">
                    <v-select
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Year"
                      v-model="yukonResident.from_year"
                      @change="addYukonResident"
                      :disabled="showAdd"
                      :items="yearOptions"
                    ></v-select>
                  </div>

                  <div class="col-md-6">
                    <v-select
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Month"
                      v-model="yukonResident.from_month"
                      @change="addYukonResident"
                      :disabled="showAdd"
                      :items="monthOptions"
                    ></v-select>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div class="col-md-6">
        <v-card class="default mb-5">
          <v-card-title>Tax Year 1</v-card-title>
          <v-card-text>
            <div class="row">
              <div class="col-md-6">
                <v-select
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Year"
                  :disabled="showAdd"
                  :items="yearOptions"
                ></v-select>
              </div>
              <div class="col-md-6">
                <v-select
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Where taxes filed"
                  :disabled="showAdd"
                  :items="provinces"
                  item-text="description"
                  item-value="id"
                ></v-select>
              </div>
              <div class="col-md-6 pt-0">
                <v-switch
                  outlined
                  dense
                  hide-details
                  :disabled="showAdd"
                  label="Taxes not filed"
                ></v-switch>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div class="col-md-6">
        <v-card class="default mb-5">
          <v-card-title>Tax Year 2</v-card-title>
          <v-card-text>
            <div class="row">
              <div class="col-md-6">
                <v-select
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Year"
                  :disabled="showAdd"
                  :items="yearOptions"
                ></v-select>
              </div>
              <div class="col-md-6">
                <v-select
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Where taxes filed"
                  :disabled="showAdd"
                  :items="provinces"
                  item-text="description"
                  item-value="id"
                ></v-select>
              </div>
              <div class="col-md-6 pt-0">
                <v-switch
                  outlined
                  dense
                  hide-details
                  :disabled="showAdd"
                  label="Taxes not filed"
                ></v-switch>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>
<script>
import moment from "moment";
import store from "@/store";
import { mapGetters } from "vuex";
import validator from "@/validator";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["monthOptions", "yearOptions", "cities", "provinces", "countries"]),
    student: function () {
      return store.getters.selectedStudent;
    },
    application: function () {
      return store.getters.selectedApplication;
    },
    fromYear() {
      return this.newRecord.from_year;
    },
    fromMonth() {
      return this.newRecord.from_month;
    },
    toYear() {
      return this.newRecord.to_year;
    },
    filterList() {
      const list = this.student?.residence_info
      ?.filter((residence) => !(residence.country_id === 1 && residence.to_year === null 
          && residence.to_month === null))
      ?.filter((residence) => !(residence.country_id === 1 && residence.province_id === 3 
        && residence.to_year === null && residence.to_month === null));
      return list;
    },
    currentCanadianResident() {
      const resident = this.student?.residence_info
      ?.find((residence) => (residence.country_id === 1 && residence.to_year === null 
          && residence.to_month === null));
      return resident;
    },
    currentYukonResident() {
      const resident = this.student?.residence_info
      ?.find((residence) => (residence.country_id === 1 && residence.province_id === 3
        && residence.to_year === null  && residence.to_month === null));
      return resident;
    },
  },
  watch: {
    fromYear() {
      this.newRecord.to_year = null;
    },
    fromMonth() {
      this.newRecord.to_month = null;
    },
    toYear() {
      if (this.newRecord.from_year === this.newRecord.to_year) {
        this.newRecord.to_month = null;
      }
    },
  },
  data: () => ({
    showAdd: false,
    newRecord: {
      from_year: null,
      from_month: null,
      to_year: null,
      to_month: null,
      is_in_progress: true,
      in_school: null,
      city_id: null,
      province_id: null,
      country_id: null,
    },
    canadianResident: {
      from_year: null,
      from_month: null,
      is_in_progress: true,
      in_school: null,
      country_id: 1,
    },
    yukonResident: {
      from_year: null,
      from_month: null,
      is_in_progress: true,
      province_id: 3,
      country_id: 1,
    },
    validate: {},
    tax_year_1: {
      year: null,
      where_filed: "",
      taxes_not_filed: false,
    },
    tax_year_2: {
      year: null,
      where_filed: "",
      taxes_not_filed: false,
    },
  }),
  async created() {
    this.validate = validator;
    store.dispatch("setCities");
    store.dispatch("setProvinces");
    store.dispatch("setCountries");
  },
  methods: {
    setClose() {
      this.canadianResident = {
        from_year: null,
        from_month: null,
        is_in_progress: true,
        country_id: 1,
      };
      this.yukonResident = {
        from_year: null,
        from_month: null,
        is_in_progress: true,
        province_id: 3,
        country_id: 1,
      };

      this.newRecord = {
        from_year: null,
        from_month: null,
        to_year: null,
        to_month: null,
        is_in_progress: false,
        in_school: null,
        city_id: null,
        province_id: null,
        country_id: null,
      };
      this.showAdd = !this.showAdd;
    },
    deleteRecord(idToDelete) {

      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this consent.",
        () => {
          store.dispatch(
            "deleteResidence",
            [this, idToDelete],
          );
        },
        () => { }
      );

    },
    addCanadianResident() {
      if (this.canadianResident?.from_year !== null &&
        this.canadianResident?.from_month !== null) {

        store.dispatch(
          "updateStudent",
          ["data", this.canadianResident, 'residenceInfo', null, this, null, '/residence', true],
        );

        setTimeout(() => {
          this.canadianResident = {
            from_year: null,
            from_month: null,
            is_in_progress: true,
            country_id: 1,
          };
        }, 1000);
      }

    },
    addYukonResident() {
      if (this.yukonResident?.from_year !== null &&
        this.yukonResident?.from_month !== null) {

        store.dispatch(
          "updateStudent",
          ["data", this.yukonResident, 'residenceInfo', null, this, null, '/residence', true],
        );

        setTimeout(() => {
          this.yukonResident = {
            from_year: null,
            from_month: null,
            is_in_progress: true,
            province_id: 3,
            country_id: 1,
          };
        }, 1000);
      }

    },
    doSaveResidence(field, value, type, extraId = null, isInsertion = false) {

      if (isInsertion) {
        console.log(this.newRecord.from_year);
        if (!this.newRecord.from_year || !this.newRecord.from_month) {
          return this.newRecord.from_year ? this.$emit("showError", "from_month is required") :
          this.$emit("showError", "from_year is required");
        }
        if (!this.newRecord.to_month || !this.newRecord.to_year) {
          return this.newRecord.to_year ? this.$emit("showError", "to_month is required") :
          this.$emit("showError", "to_year is required");
        }
        if (!this.newRecord.city_id || !this.newRecord.province_id || !this.newRecord.country_id) {
          return this.newRecord.city_id ?
          (this.newRecord.province_id ? this.$emit("showError", "country is required") : this.$emit("showError", "province is required"))
          :
          this.$emit("showError", "city is required");
        }
      }

      const url = type === "residenceInfo" ? "/residence" : "";

      store.dispatch(
        "updateStudent",
        [field, value, type, extraId, this, null, url, isInsertion],
      );

    },
  },
};
</script>