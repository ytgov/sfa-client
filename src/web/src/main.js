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

import ConfirmDialog from "./components/ConfirmDialog";
import ShowPDF from "./components/ShowPDF.vue"
import SelectedAppHeader from "./components/SelectedAppHeader";
import Notifications from "./components/Notifications";
import ApplicationList from "./components/ApplicationList";
import ApplicationCreateForm from "./components/application/ApplicationCreateForm";
import ApplicationDuplicateForm from "./components/application/ApplicationDuplicateForm";
import ApplicationDeleteForm from "./components/application/ApplicationDeleteForm";

import OtherAgencyFundingForm from "./components/OtherAgencyFundingForm";

import CSLPartTimeForm from "./components/CSLPartTimeForm";

import PreStudyIncomeForm from "./components/PreStudyIncomeForm";

Vue.component("confirm-dialog", ConfirmDialog);
Vue.component("selected-app-header", SelectedAppHeader);
Vue.component("notifier", Notifications);
Vue.component("show-pdf", ShowPDF)

Vue.component("application-list", ApplicationList);
Vue.component("application-create", ApplicationCreateForm);
Vue.component("application-duplicate", ApplicationDuplicateForm);
Vue.component("application-delete", ApplicationDeleteForm);

Vue.component("other-funding", OtherAgencyFundingForm);

Vue.component("csl-parttime", CSLPartTimeForm);

Vue.component("prestudy-income", PreStudyIncomeForm);

import VueEditableGrid from 'vue-editable-grid';
import 'vue-editable-grid/dist/VueEditableGrid.css';
Vue.component('vue-editable-grid', VueEditableGrid);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
