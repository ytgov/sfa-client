import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

import vuetify from "./plugins/vuetify";
import VueCurrencyInput from 'vue-currency-input'

Vue.config.productionTip = false;

axios.defaults.withCredentials = true;
Vue.use(VueCurrencyInput, { globalOptions: { currency: 'USD' } });

import ParentInfoForm from "./components/ParentInfoForm";
import ParentDependentsForm from "./components/ParentDependentsForm";
import ConfirmDialog from "./components/ConfirmDialog";


Vue.component("confirm-dialog", ConfirmDialog);

Vue.component("parent-info-form", ParentInfoForm);
Vue.component("parent-dependents-form", ParentDependentsForm);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
