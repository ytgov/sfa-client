<template>
    <div>
        <BreadCrumbAddressType 
          text="Address Type"
          to="address-type"
        />

        <h1>Address Type</h1>

        <BarAddressType 
        :dialog="dialog"
        :setDialog="setDialog"
        :filterActiveOnly="true" />

        <AddressTypeTab />

        <ModalAddAddressType
        :dialog="dialog"
        :setDialog="setDialog"
      />

    </div>
  </template>
  
  <script>
  import store from "@/store";
  import { mapState } from "vuex";
  import BreadCrumbAddressType from "@/components/commonCatalog/BreadCrumb.vue";
  import BarAddressType from "@/components/commonCatalog/BarCrud.vue";
  import AddressTypeTab from "../components/AddressTypeTab.vue";
  import ModalAddAddressType from "../components/ModalAddAddressType.vue";
  
  export default {
    name: "AddressTypeMain",
    data: () => ({
      dialog: false,
    }),
    methods: {
      setDialog() {
        this.dialog = !this.dialog;
      },
    },
    components: {
        BreadCrumbAddressType,
        BarAddressType,
        AddressTypeTab,
        ModalAddAddressType,
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
  