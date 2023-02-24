<template>
    <div>
      
        <ModalAddCountry
          :dialog="dialog"
          :setDialog="setDialog"
        />
        <BreadCrumbCountries 
          text="Countries"
          to="countries"
        />

        <h1>Countries</h1>

        <BarCountries 
        :dialog="dialog"
        :setDialog="setDialog"
        :filterActiveOnly="true" />

        <CountriesTab />

    </div>
  </template>
  
  <script>
  import store from "@/store";
  import { mapState } from "vuex";
  import BreadCrumbCountries from "@/components/commonCatalog/BreadCrumb.vue";
  import BarCountries from "@/components/commonCatalog/BarCrud.vue";
  import CountriesTab from "../components/CountriesTab.vue";
  import ModalAddCountry from "../components/ModalAddCountry.vue";
  
  export default {
    name: "CountriesMain",
    data: () => ({
      dialog: false,
    }),
    methods: {
    setDialog() {
        this.dialog = !this.dialog;
    },
  },
    components: {
        BreadCrumbCountries,
        BarCountries,
        CountriesTab,
        ModalAddCountry,
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
  