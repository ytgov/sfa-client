<template>
  <div>
    <!-- TABLE -->
    <v-data-table :search="search" :headers="[
      { text: 'Province', value: 'description', filterable: !provinceSelected, },
      { text: 'Country', value: 'country_name', filterable: !countrySelected, },
      { text: 'Status', value: 'is_active', sortable: false, filterable: false },
      { text: 'Delete', value: 'id', sortable: false, filterable: false },
    ]" :items="filteredList">
      <!-- PROVINCE -->
      <template v-slot:item.description="props">
        <v-edit-dialog :return-value.sync="props.item.description" large
          @save="save(props.item.id, descriptionToChange)" @cancel="cancel" @open="open(props.item.description)" @close="close">
          {{ props.item.description }}
          <template v-slot:input>
            <v-text-field v-model="descriptionToChange" :rules="[max199chars]" label="Edit" single-line counter
              color="#F3B228"></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <!-- COUNTRY_NAME -->
      <template v-slot:item.country_name="props">
        <v-autocomplete label="Country" :items="countries" item-text="description" item-value="id"
          v-model="props.item.country_id"
          @change="changeContry(props.item.id, props.item.country_id, props.item.description)"></v-autocomplete>
      </template>

      <!-- STATUS -->
      <template v-slot:item.is_active="props">
        <div style="width: 40px;">
          <v-switch v-model="props.item.is_active"
            @click="changeStatus(props.item.id, props.item.is_active)"></v-switch>
        </div>
      </template>

      <!-- DELETE -->
      <template v-slot:item.id="props">
        <v-btn color="transparent" @click="showModalDelete(props.item.id)">

          <v-icon color="black font-weight-thin" size="21">
            {{ 'mdi-trash-can-outline'}}
          </v-icon>

        </v-btn>
      </template>

    </v-data-table>
    <!-- TABLE -->

    <!-- SNACKBAR -->
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!-- SNACKBAR -->
    <modalConfirmProvince :messageStatus="messageStatus" :idDelete="idAppToDelete" :dialog="isHide"
      :setDialog="showModalDelete"></modalConfirmProvince>
  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
import _ from "lodash";
import { PROVINCE } from '@/urls';
import axios from "axios";
import modalConfirmProvince from "./modalConfirmProvince.vue";

export default {
  name: "ProvinceTab",
  data() {
    return {
      descriptionToChange: '',
      search: '',
      provinces: [],
      countries: [],
      snack: false,
      snackText: '',
      snackColor: '',
      isHide: false,
      idAppToDelete: undefined,
      provinceSelected: false,
      countrySelected: false,
      max199chars: v => v.length <= 199 || 'Input too long!',
    };
  },
  methods: {
    save(id, description) {
      this.changeDescription(id, description);
    },
    cancel() {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    messageStatus(message = "", status = "") {
      this.snack = true
      this.snackColor = status
      this.snackText = message
    },
    open(value) {
      this.descriptionToChange = value;
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    close() {
    },
    changeStatus(id, isActive) {
      axios.patch(PROVINCE + `/status/${id}`, { is_active: isActive })
        .then((resp) => {

          resp?.data?.wasUpdated ?
            this.messageStatus("Switched!", "success")
            :
            this.messageStatus({ message: "Error!", status: "error" });

        })
        .catch((err) => {
          console.log(err);
          this.messageStatus({ message: "Error!", status: "error" });
        })
        .finally(() => {
          store.dispatch("setCountries");
          store.dispatch("setProvinces", false);
        });
    },
    changeDescription(id, description) {
      axios.patch(PROVINCE + `/description/${id}`, { description: description })
        .then((resp) => {
          resp?.data?.wasUpdated ?
            this.messageStatus("Updated!", "success")
            :
            this.messageStatus({ message: "Error!", status: "error" });
        })
        .catch((err) => {
          console.log(err);
          const res = { ...err };
          const message = res?.response?.data?.message ?
            res.response.data.message
            :
            "Error!"
          this.messageStatus(message, "error");
        })
        .finally(() => {
          store.dispatch("setCountries");
          store.dispatch("setProvinces", false);
        });
    },
    changeContry(id, idCountry, description) {
      axios.patch(PROVINCE + `/country/${id}`, { country_id: idCountry, description })
        .then((resp) => {
          resp?.data?.wasUpdated ?
            this.messageStatus("Updated!", "success")
            :
            this.messageStatus({ message: "Error!", status: "error" });
        })
        .catch((err) => {
          console.log(err);
          const res = { ...err };
          const message = res?.response?.data?.message ?
            res.response.data.message
            :
            "Error!"
          this.messageStatus(message, "error");
        })
        .finally(() => {
          store.dispatch("setCountries");
          store.dispatch("setProvinces", false);
        });
    },
    showModalDelete(id) {
      this.isHide = !this.isHide;
      this.idAppToDelete = id;
    }
  },
  computed: {
    filteredList: function () {
      let l = _.clone(this.provinces);

      if (this.storedActiveOnly) l = l.filter((i) => i.is_active);

      return l;
    },
    storedSearch: function () {
      return store.getters.searchProvince;
    },
    storedProvinces: function () {
      return store.getters.provinces;
    },
    storedCountries: function () {
      return store.getters.countries;
    },
    storedActiveOnly: function () {
      return store.getters.activeOnlyProvince;
    },
    storedCountrySelected: function () {
      return store.getters.countrySelected;
    },
    storedProvinceSelected: function () {
      return store.getters.provinceSelected;
    },
    ...mapState(["setProvinces"]),
  },
  async created() {
    await store.dispatch("setCountries");
    await store.dispatch("setProvinces", false);
  },
  watch: {
    storedSearch: function () {
      this.search = this.storedSearch;
    },
    storedProvinces: function () {
      this.provinces = this.storedProvinces;
    },
    storedCountries: function () {
      this.countries = this.storedCountries;
    },
    storedCountrySelected: function () {
      this.countrySelected = store.getters.countrySelected;
    },
    storedProvinceSelected: function () {
      this.provinceSelected = store.getters.provinceSelected;
    },
  },
  components: {
    modalConfirmProvince,
  }
};
</script>
