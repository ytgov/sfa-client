<template>
    <div>
        <BreadCrumbCities 
          text="Cities"
          to="cities"
        />

        <h1>Cities</h1>

        <BarCities 
        :dialog="dialog"
        :setDialog="setDialog"
        :filterActiveOnly="true" />

        <CitiesTab />

        <ModalAddCity
        :dialog="dialog"
        :setDialog="setDialog"
      />

    </div>
  </template>
  
  <script>
  import store from "@/store";
  import { mapState } from "vuex";
  import BreadCrumbCities from "@/components/commonCatalog/BreadCrumb.vue";
  import BarCities from "@/components/commonCatalog/BarCrud.vue";
  import CitiesTab from "../components/CitiesTab.vue";
  import ModalAddCity from "../components/ModalAddCity.vue";
  
  export default {
    name: "CitiesMain",
    data: () => ({
      dialog: false,
    }),
    methods: {
      setDialog() {
        this.dialog = !this.dialog;
      },
    },
    components: {
        BreadCrumbCities,
        BarCities,
        CitiesTab,
        ModalAddCity,
    },
    computed: {
        ...mapState(["showSideBarAdmin"]),
    },
    async created() {
    await store.dispatch(
      "setAppSideBarAdmin",
      this.$route.path.startsWith("/administration"));
    },
    
  };
  </script>
  