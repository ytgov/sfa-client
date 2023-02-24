<template>
<div>
    <ModalAddProvince 
        :dialog="dialog"
        :setDialog="setDialog"
    />
    <v-row>
        
        <v-col cols="6"
          >
          <v-text-field
            v-model="search"
            label="Search"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col
            ><v-switch
                label="Active only?"
                class="mt-1"
                v-model="activeOnly"
            ></v-switch
            >
        </v-col>
        <v-col>
            <v-btn
                color="primary"
                class="my-0 float-right"
                @click="setDialog"
            >
            <v-icon>mdi-plus</v-icon> Add
            </v-btn>
        </v-col>
    </v-row>
</div>
</template>

<script>
import store from "@/store";
import ModalAddProvince from "./ModalAddProvince.vue";

export default {
  name: "BarProvince",
  data: () => ({
    search: '',
    dialog: false,
    activeOnly: false,
    provinceSelected: false,
    countrySelected: false,
  }),
  methods: {
    setDialog() {
        this.dialog = !this.dialog;
    },
    provinceFilter() {
      this.provinceSelected = !this.provinceSelected;
    },
    countryFilter() {
      this.countrySelected = !this.countrySelected;
    },
  },
  computed: {
    storedSearch: function () {
        return store.getters.searchProvince;
    },
    storedActiveOnly: function () {
        return store.getters.activeOnly;
    },
  },
  async created() {
    
  },
  watch: {
    search (val) {
        store.dispatch("setSearchProvince", val);
    },
    activeOnly: function (val) {
      store.dispatch("setActiveOnlyProvince", val);
    },
    provinceSelected: function (val) {
      store.dispatch("setActiveProvinceSelected", val);
    },
    countrySelected: function (val) {
      store.dispatch("setActiveCountrySelected", val);
    },
  },
  components: {
    ModalAddProvince,
  }
};
</script>

<style scoped>

</style>
