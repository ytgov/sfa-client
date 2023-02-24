<template>
    <div>
        <BreadCrumbProvince />
        <h1>Province</h1>
        <BarProvince />
        <ProvinceTab />
    </div>
  </template>
  
  <script>
  import store from "@/store";
  import { mapState } from "vuex";
  import BreadCrumbProvince from "../components/BreadCrumb.vue";
  import BarProvince from "../components/BarProvince.vue";
  import ProvinceTab from "../components/ProvinceTab.vue";
  
  export default {
    name: "ProvinceMain",
    data: () => ({

    }),
    components: {
        BreadCrumbProvince,
        BarProvince,
        ProvinceTab,
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
  