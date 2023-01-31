<template>
  <div>
    <BreadCrumb text="Parental Relationship" to="parental-relationship" />

    <h1>Parental Relationship</h1>

    <Bar :dialog="dialog" :setDialog="setDialog" :filterActiveOnly="true" />

    <ParentalRelationshipTab />

    <ModalAddParentalRelationship :dialog="dialog" :setDialog="setDialog" />

  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
import BreadCrumb from "@/components/commonCatalog/BreadCrumb.vue";
import Bar from "@/components/commonCatalog/BarCrud.vue";
import ParentalRelationshipTab from "../components/ParentalRelationshipTab.vue";
import ModalAddParentalRelationship from "../components/ModalAddParentalRelationship.vue";

export default {
  name: "ParentalRelationshipMain",
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
    ParentalRelationshipTab,
    ModalAddParentalRelationship,
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
