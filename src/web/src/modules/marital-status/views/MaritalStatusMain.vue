<template>
  <div>
    <BreadCrumbMaritalStatus text="Marital Status" to="marital-status" />

    <h1>Marital Status</h1>

    <BarMaritalStatus :dialog="dialog" :setDialog="setDialog" :filterActiveOnly="true" />

    <MaritalStatusTab />

    <ModalAddMaritalStatus :dialog="dialog" :setDialog="setDialog" />

  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
import BreadCrumbMaritalStatus from "@/components/commonCatalog/BreadCrumb.vue";
import BarMaritalStatus from "@/components/commonCatalog/BarCrud.vue";
import MaritalStatusTab from "../components/MaritalStatusTab.vue";
import ModalAddMaritalStatus from "../components/ModalAddMaritalStatus.vue";

export default {
  name: "MaritalStatusMain",
  data: () => ({
    dialog: false,
  }),
  methods: {
    setDialog() {
      this.dialog = !this.dialog;
    },
  },
  components: {
    BreadCrumbMaritalStatus,
    BarMaritalStatus,
    MaritalStatusTab,
    ModalAddMaritalStatus,
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
