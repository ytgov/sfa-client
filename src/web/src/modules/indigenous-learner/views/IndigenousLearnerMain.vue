<template>
    <div>
        <BreadCrumbIndigenousLearner 
          text="Indigenous Learner"
          to="indigenous-learner"
        />

        <h1>Indigenous Learner</h1>

        <BarIndigenousLearner 
        :dialog="dialog"
        :setDialog="setDialog"
        :filterActiveOnly="true" />

        <IndigenousLearnerTab />

        <ModalAddIndigenousLearner
        :dialog="dialog"
        :setDialog="setDialog"
      />

    </div>
  </template>
  
  <script>
  import store from "@/store";
  import { mapState } from "vuex";
  import BreadCrumbIndigenousLearner from "@/components/commonCatalog/BreadCrumb.vue";
  import BarIndigenousLearner from "@/components/commonCatalog/BarCrud.vue";
  import IndigenousLearnerTab from "../components/IndigenousLearnerTab.vue";
  import ModalAddIndigenousLearner from "../components/ModalAddIndigenousLearner.vue";
  
  export default {
    name: "IndigenousLearnerMain",
    data: () => ({
      dialog: false,
    }),
    methods: {
      setDialog() {
        this.dialog = !this.dialog;
      },
    },
    components: {
        BreadCrumbIndigenousLearner,
        BarIndigenousLearner,
        IndigenousLearnerTab,
        ModalAddIndigenousLearner,
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
  