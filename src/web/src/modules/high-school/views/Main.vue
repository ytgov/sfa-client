<template>
  <div>
    <BreadCrumb text="High School" to="high-school" />

    <h1>High School</h1>

    <Bar :dialog="dialog" :setDialog="setDialog" :filterActiveOnly="true" />

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
  name: "HighSchoolMain",
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
