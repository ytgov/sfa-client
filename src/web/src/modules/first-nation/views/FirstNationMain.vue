<template>
  <div>
    <BreadCrumb text="First Nation" to="first-nation" />

    <h1>First Nation</h1>

    <Bar :dialog="dialog" :setDialog="setDialog" :filterActiveOnly="true" />

    <FirstNationTab />

    <ModalAddFirstNation :dialog="dialog" :setDialog="setDialog" />

  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
import BreadCrumb from "@/components/commonCatalog/BreadCrumb.vue";
import Bar from "@/components/commonCatalog/BarCrud.vue";
import FirstNationTab from "../components/FirstNationTab.vue";
import ModalAddFirstNation from "../components/ModalAddFirstNation.vue";

export default {
  name: "FirstNationMain",
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
    FirstNationTab,
    ModalAddFirstNation,
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
