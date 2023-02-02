<template>
  <div>
    <BreadCrumbLanguage text="Language" to="language" />

    <h1>Language</h1>

    <barLanguage :dialog="dialog" :setDialog="setDialog" :filterActiveOnly="true" />

    <languageTab />

    <ModalAddLanguage :dialog="dialog" :setDialog="setDialog" />

  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
import BreadCrumbLanguage from "@/components/commonCatalog/BreadCrumb.vue";
import barLanguage from "@/components/commonCatalog/BarCrud.vue";
import languageTab from "../components/languageTab.vue";
import ModalAddLanguage from "../components/ModalAddLanguage.vue";

export default {
  name: "LanguageMain",
  data: () => ({
    dialog: false,
  }),
  methods: {
    setDialog() {
      this.dialog = !this.dialog;
    },
  },
  components: {
    BreadCrumbLanguage,
    barLanguage,
    languageTab,
    ModalAddLanguage,
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
