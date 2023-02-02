<template>
  <div>
    <BreadCrumb text="Study Field" to="study-field" />

    <h1>Study Field</h1>

    <Bar :dialog="dialog" :setDialog="setDialog" :filterActiveOnly="true" />

    <StudyFieldTab />

    <ModalAddStudyField :dialog="dialog" :setDialog="setDialog" />

  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
import BreadCrumb from "@/components/commonCatalog/BreadCrumb.vue";
import Bar from "@/components/commonCatalog/BarCrud.vue";
import StudyFieldTab from "../components/StudyFieldTab.vue";
import ModalAddStudyField from "../components/ModalAddStudyField.vue";

export default {
  name: "StudyFieldMain",
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
    StudyFieldTab,
    ModalAddStudyField,
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
