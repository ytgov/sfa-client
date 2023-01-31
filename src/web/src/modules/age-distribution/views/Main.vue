<template>
  <div>
    <BreadCrumb text="Age Distribution" to="age-distribution" />

    <h1>Age Distribution</h1>

    <Bar :dialog="dialog" :setDialog="setDialog" />

    <Tab />

    <ModalAdd :dialog="dialog" :setDialog="setDialog" />

  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
import BreadCrumb from "@/components/commonCatalog/BreadCrumb.vue";
import Bar from "@/components/commonCatalog/BarCrud.vue";
import Tab from "../components/Tab.vue";
import ModalAdd from "../components/ModalAdd.vue";

export default {
  name: "SexMain",
  data: () => ({
    dialog: false,
  }),
  methods: {
    setDialog() {
      this.dialog = !this.dialog;
    },
  },
  components: {
    BreadCrumb,
    Bar,
    Tab,
    ModalAdd,
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
