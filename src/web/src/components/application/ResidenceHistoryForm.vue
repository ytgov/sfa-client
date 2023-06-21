<template>
  <div class="home">
    <div class="row">
      <div class="col-md-12">
        <v-card class="default">
          <v-card-text>
            <div class="row">
              <div class="col-md-6" v-if="currentCanadianResident">
                <div class="row">
                  <h3 class="col-md-6 text-right text-subtitle-1">Canadian resident from</h3>
                  <div class="col-md-3">
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

                  <div class="col-md-3">
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
                <div class="row">
                  <h3 class="col-md-6 text-right text-subtitle-1">Add Canadian resident from</h3>
                  <div class="col-md-3">
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

                  <div class="col-md-3">
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
                <div class="row">
                  <h3 class="col-md-6 text-right text-subtitle-1">Yukon resident from</h3>
                  <div class="col-md-3">
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

                  <div class="col-md-3">
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
                <div class="row">
                  <h3 class="col-md-6 text-right text-subtitle-1">Add Yukon resident from</h3>
                  <div class="col-md-3">
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

                  <div class="col-md-3">
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
      
      <div class="col-md-12">
        <v-card class="default mb-5" v-if="showAdd || !filterList.length">
          <v-card-text>
            <div class="row">
              <div class="col-md-5">
                <div class="row">
                  <div class="col-md-6">
                    <div class="col-md-12 text-center text-subtitle-1">
                      From yr/mon 
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <v-select
                          append-icon
                          outlined 
                          dense 
                          background-color="white"
                          v-model="newRecord.from_year"
                          :items="yearOptions"
                          hide-details label="From Year"
                        ></v-select>
                      </div>
                      <div class="col-md-6">
                        <v-select
                          append-icon
                          outlined 
                          dense 
                          background-color="white"
                          :items="monthOptions"
                          v-model="newRecord.from_month"
                          hide-details label="From Month"
                        ></v-select>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="col-md-12 text-center text-subtitle-1">
                      To yr/mon 
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <v-select
                          append-icon
                          outlined 
                          dense 
                          background-color="white"
                          v-model="newRecord.to_year"
                          :disabled="!newRecord.from_year"
                          :items="yearOptions.filter(year => year.value >= newRecord.from_year)"
                          hide-details label="To Year"
                        ></v-select>
                      </div>
                      <div class="col-md-6">
                        <v-select
                          append-icon
                          outlined 
                          dense 
                          background-color="white"
                          :disabled="!newRecord.from_month"
                          :items="
                          newRecord.from_year === newRecord.to_year ? 
                              monthOptions.filter(month => month.value >= newRecord.from_month)
                              :
                              monthOptions
                          "
                          v-model="newRecord.to_month"
                          hide-details label="To Month"
                        ></v-select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-7">
                <div class="row">
                  <div class="col-md-2">
                    <div class="col-md-12 text-center text-subtitle-1">
                      City  
                    </div>
                    <v-autocomplete
                      append-icon
                      outlined 
                      dense 
                      background-color="white"
                      v-model="newRecord.city_id"
                      :items="cities"
                      item-text="description"
                      item-value="id"
                      hide-details label="city"
                    ></v-autocomplete>
                  </div>
                  <div class="col-md-2">
                    <div class="col-md-12 text-no-wrap text-center text-subtitle-1">
                      Province  
                    </div>
                    <v-autocomplete
                      append-icon
                      outlined 
                      dense 
                      background-color="white"
                      v-model="newRecord.province_id"
                      :items="provinces"
                      item-text="description"
                      item-value="id"
                      hide-details label="Province"
                    ></v-autocomplete>
                  </div>
                  <div class="col-md-2">
                    <div class="col-md-12 text-center text-no-wrap text-subtitle-1">
                      Country  
                    </div>
                    <v-autocomplete
                      append-icon
                      outlined 
                      dense 
                      background-color="white"
                      v-model="newRecord.country_id"
                      :items="countries"
                      item-text="description"
                      item-value="id"
                      hide-details label="Country"
                    ></v-autocomplete>
                  </div>
                  <div class="col-md-2">
                    <div class="col-md-12 text-no-wrap text-center text-subtitle-1">
                      In School Status
                    </div>
                    <v-select          
                          append-icon                
                          outlined 
                          dense 
                          background-color="white"
                          :items="inSchoolStatus"
                          item-text="description"
                          item-value="id"
                          v-model="newRecord.in_school"
                          hide-details 
                          label="In School"                          
                        ></v-select>
                  </div>
                  <div class="col-1 mt-13">
                  </div>
                  <div class="col-1 mt-13">
                    <v-btn
                      color="error"
                      x-small
                      fab
                      title="Remove"
                      class="my-0 float-left"
                      @click="setClose"
                      v-if="filterList.length"
                    >
                    <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </div>
                  <div class="col-1 mt-13">
                    <v-btn
                      color="success"
                      x-small
                      fab
                      title="Add"
                      class="my-0"
                      @click="doSaveResidence('data', { ...newRecord }, 'residenceInfo', null, true)"
                    >
                    <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
        <v-card class="default mb-5" v-for="item, index in filterList" :key="index">
          <v-card-text>
            <div class="row">
              <div class="col-md-5">
                <div class="row">
                  <div class="col-md-6">
                    <div class="col-md-12 text-center text-subtitle-1">
                      From yr/mon 
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <v-select
                          append-icon
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
                      <div class="col-md-6">
                        <v-select
                          append-icon
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
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="col-md-12 text-center text-subtitle-1">
                      To yr/mon 
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <v-select
                          append-icon
                          outlined 
                          dense 
                          background-color="white" 
                          :disabled="showAdd"
                          v-model="item.to_year"
                          :items="yearOptions"
                          @change="doSaveResidence('to_year', item.to_year, 'residenceInfo', item.id)"
                          hide-details label="to Year"
                        ></v-select>
                      </div>
                      <div class="col-md-6">
                        <v-select
                          append-icon
                          outlined 
                          dense 
                          background-color="white"
                          :disabled="showAdd"
                          :items="monthOptions"
                          v-model="item.to_month"
                          @change="doSaveResidence('to_month', item.to_month, 'residenceInfo', item.id)"
                          hide-details label="To Month"
                        ></v-select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-7">
                <div class="row">
                  <div class="col-md-2">
                    <div class="col-md-12 text-center text-subtitle-1">
                      City  
                    </div>
                    <v-autocomplete
                      append-icon
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
                  <div class="col-md-2">
                    <div class="col-md-12 text-no-wrap text-center text-subtitle-1">
                      Province  
                    </div>
                    <v-autocomplete
                      append-icon
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
                  <div class="col-md-2">
                    <div class="col-md-12 text-center text-no-wrap text-subtitle-1">
                      Country  
                    </div>
                    <v-autocomplete
                      append-icon
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
                  <div class="col-md-2">
                    <div class="col-md-12 text-no-wrap text-center text-subtitle-1">
                      In School Status  
                    </div>
                    <v-select        
                          append-icon                 
                          outlined 
                          dense 
                          background-color="white"
                          :items="inSchoolStatus"
                          :disabled="showAdd"
                          item-text="description"
                          item-value="id"
                          @change="doSaveResidence('in_school', item.in_school, 'residenceInfo', item.id)"
                          v-model="item.in_school"
                          hide-details 
                          label="In School"                          
                        ></v-select>
                  </div>
                  <div class="col-1 mt-13">
                    <v-btn
                      :disabled="showAdd"
                      color="success"
                      x-small
                      fab
                      title="Add"
                      class="my-0"
                      @click="setClose"
                      v-if="(index) === 0"
                    >
                    <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <div class="col-1 mt-13">
                    <v-btn
                      :disabled="showAdd" 
                      color="error"
                      x-small
                      fab
                      title="Remove"
                      class="my-0 float-left"
                      @click="deleteRecord(item.id)"
                    >
                    <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </div>
                  <div class="col-1 mt-13">
                    <v-btn
                      :disabled="showAdd"
                      color="warning"
                      x-small
                      fab
                      title=""
                      class="my-0 float-left"
                    >
                    <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>        
      </div>

      <div class="col-md-12">
        <div class="col-md-12 mt-n5">
          <div class="row">
            <v-switch
                label=""
                class="my-0 mr-2"
                v-model="hasbeenAway"
            >
            </v-switch>
            <h3 class="text-h6 font-weight-regular">Student has been away from Yukon for more than 4 months</h3>
          </div>
        </div>
        <v-card class="default mb-5" v-if="hasbeenAway">
          <v-card-text>
            <div class="row">
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-3 text-left text-subtitle-1">
                    Tax Year 1
                  </div>
                  <div class="col-md-4">
                    <v-select
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Year"
                      :disabled="showAdd"
                      :items="yearOptions"
                      v-model="application.taxes1_filed_year"
                      @change="doSaveApp('taxes1_filed_year', application.taxes1_filed_year)"
                    ></v-select>
                  </div>
                  <div class="col-md-5">
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
                      v-model="application.taxes1_filed_province_id"
                      @change="doSaveApp('taxes1_filed_province_id', application.taxes1_filed_province_id)"
                    ></v-select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3 text-left text-subtitle-1">
                    Tax Year 2
                  </div>
                  <div class="col-md-4">
                    <v-select
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Year"
                      :disabled="showAdd"
                      :items="yearOptions"
                      v-model="application.taxes2_filed_year"
                      @change="doSaveApp('taxes2_filed_year', application.taxes2_filed_year)"
                    ></v-select>
                  </div>
                  <div class="col-md-5">
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
                      v-model="application.taxes2_filed_province_id"
                      @change="doSaveApp('taxes2_filed_province_id', application.taxes2_filed_province_id)"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6 pt-0">
                    <v-switch
                      outlined
                      dense
                      hide-details
                      :disabled="showAdd"
                      label="Taxes not filed"
                      v-model="application.taxes1_not_filed"
                      @change="doSaveApp('taxes1_not_filed', application.taxes1_not_filed)"
                    ></v-switch>
                  </div>
                  <div class="col-md-6 pt-0 d-flex justify-end">
                    <v-switch
                      outlined
                      dense
                      hide-details
                      :disabled="showAdd"
                      label="Veriﬁed"
                      v-model="application.taxes1_verified"
                      @change="doSaveApp('taxes1_verified', application.taxes1_verified)"
                    ></v-switch>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 pt-0">
                    <v-switch
                      outlined
                      dense
                      hide-details
                      :disabled="showAdd"
                      label="Taxes not filed"
                      v-model="application.taxes2_not_filed"
                      @change="doSaveApp('taxes2_not_filed', application.taxes2_not_filed)"
                    ></v-switch>
                  </div>
                  <div class="col-md-6 pt-0 d-flex justify-end">
                    <v-switch
                      outlined
                      dense
                      hide-details
                      :disabled="showAdd"
                      label="Veriﬁed"
                      v-model="application.taxes2_verified"
                      @change="doSaveApp('taxes2_verified', application.taxes2_verified)"
                    ></v-switch>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="row">
                  <h3 class="col-md-4 text-left text-subtitle-1 mt-1">Student has Valid Yukon Driver’s License</h3>
                  <div class="col-md-4">        
                    <v-select
                      outlined
                      dense
                      hide-details
                      background-color="white"
                      :disabled="showAdd"
                      :items="itemOptions"
                      v-model="application.valid_driver_license"
                      @change="doSaveApp('valid_driver_license', application.valid_driver_license)"
                    >
                    </v-select>
                  </div>
                  <div class="col-md-4">
                    <v-textarea
                      rows="1"
                      outlined
                      dense
                      hide-details
                      background-color="white"
                      label="Notes"
                      v-model="application.valid_driver_license_comment"
                      @change="doSaveApp('valid_driver_license_comment', application.valid_driver_license_comment)"
                    >
                    </v-textarea>
                  </div>
                  
                  <h3 class="col-md-4 text-left text-subtitle-1 mt-1">Student has Valid Yukon Health Care Card</h3>
                  <div class="col-md-4">
                    <v-select
                      outlined
                      dense
                      hide-details
                      background-color="white"
                      :disabled="showAdd"
                      :items="itemOptions"
                      v-model="application.valid_yhcip"
                      @change="doSaveApp('valid_yhcip', application.valid_yhcip)"
                    >

                    </v-select>
                  </div>
                  <div class="col-md-4">
                    <v-textarea
                      rows="1"
                      outlined
                      dense
                      hide-details
                      background-color="white"
                      label="Notes"
                      v-model="application.valid_yhcip_comment"
                      @change="doSaveApp('valid_yhcip_comment', application.valid_yhcip_comment)"
                    >
                    </v-textarea>
                  </div>
                </div>
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
    ...mapGetters(["monthOptions", "yearOptions", "cities", "provinces", "countries", "inSchoolStatus"]),    
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
        console.log("***", list);

      list.sort((a, b) => {
        if (a.from_year > b.from_year) {
          return -1;
        }
        if (a.from_year < b.from_year) {
          return 1;
        }   
        if(a.from_year === b.from_year) {
          if (a.from_month > b.from_month) {
            return -1;
          }
          if (a.from_month < b.from_month) {
            return 1;
          }  
          return 0;
        }  
      });
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
    hasbeenAway: true,
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
    itemOptions: [
      {text: "Yes", value: true},
      {text: "No", value: false},
      {text: "Not Available", value: null},
    ],
    
  }),
  async created() {
    
    this.validate = validator;
    store.dispatch("setCities");
    store.dispatch("setProvinces");
    store.dispatch("setCountries");
    store.dispatch("setYearOptions");
    store.dispatch("setMonthOptions");        
    store.dispatch("setInSchoolStatus");
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
    doSaveApp(field, value) {
      store.dispatch("updateApplication", [field, value, this]);
    },
  },
};
</script>