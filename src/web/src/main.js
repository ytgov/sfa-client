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
import SelectedAppHeader from "./components/SelectedAppHeader";
import Notifications from "./components/Notifications";
import ApplicationList from "./components/ApplicationList";
import ApplicationCreateForm from "./components/application/ApplicationCreateForm";
import ApplicationDuplicateForm from "./components/application/ApplicationDuplicateForm";
import ApplicationDeleteForm from "./components/application/ApplicationDeleteForm";

import CreditCheckForm from "./components/CreditCheckForm";
import OtherAgencyFundingForm from "./components/OtherAgencyFundingForm";

import CSLFullTimeForm from "./components/CSLFullTimeForm";
import CSLPartTimeForm from "./components/CSLPartTimeForm";
import CSGDisabilityForm from "./components/CSGDisabilityForm";

import AccommodationForm from "./components/AccommodationForm";

import PreStudyExpensesForm from "./components/PreStudyExpensesForm";
import StudyExpensesForm from "./components/StudyExpensesForm";

import PreStudyIncomeForm from "./components/PreStudyIncomeForm";
import StudyIncomeForm from "./components/StudyIncomeForm";

Vue.component("confirm-dialog", ConfirmDialog);
Vue.component("selected-app-header", SelectedAppHeader);
Vue.component("notifier", Notifications);

Vue.component("application-list", ApplicationList);
Vue.component("application-create", ApplicationCreateForm);
Vue.component("application-duplicate", ApplicationDuplicateForm);
Vue.component("application-delete", ApplicationDeleteForm);

Vue.component("credit-check", CreditCheckForm);
Vue.component("other-funding", OtherAgencyFundingForm);

Vue.component("csl-fulltime", CSLFullTimeForm);
Vue.component("csl-parttime", CSLPartTimeForm);
Vue.component("csg-disability", CSGDisabilityForm);

Vue.component("accommodation", AccommodationForm);

Vue.component("prestudy-expenses", PreStudyExpensesForm);
Vue.component("study-expenses", StudyExpensesForm);

Vue.component("prestudy-income", PreStudyIncomeForm);
Vue.component("study-income", StudyIncomeForm);

import VueEditableGrid from 'vue-editable-grid';
import 'vue-editable-grid/dist/VueEditableGrid.css';
Vue.component('vue-editable-grid', VueEditableGrid);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
