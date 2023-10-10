import axios from "axios";
import { PROVINCE } from "@/urls";

const state = {
  searchProvince: "",
  provinces: [],
  activeOnlyProvince: false,
  provinceSelected: false,
  countrySelected: false,
};
const getters = {
  provinceSelected(state) {
    return state.provinceSelected;
  },
  countrySelected(state) {
    return state.countrySelected;
  },
  searchProvince(state) {
    return state.searchProvince;
  },
  provinces(state) {
    return state.provinces;
  },
  activeOnlyProvince(state) {
    return state.activeOnlyProvince;
  },
};
const mutations = {
  SET_SEARCH_PROVINCE(state, value) {
    state.searchProvince = value;
  },
  async SET_PROVINCES(state, value) {
    state.provinces = value;
  },
  async SET_COUNTRY_SELECTED(state, value) {
    state.countrySelected = value;
  },
  async SET_PROVINCE_SELECTED(state, value) {
    state.provinceSelected = value;
  },
  async SET_ACTIVE_ONLY_PROVINCE(state, value) {
    state.activeOnlyProvince = value;
  },
};
const actions = {
  setSearchProvince(state, value) {
    state.commit("SET_SEARCH_PROVINCE", value);
  },
  setActiveCountrySelected(state, value) {
    state.commit("SET_COUNTRY_SELECTED", value);
  },
  setActiveProvinceSelected(state, value) {
    state.commit("SET_PROVINCE_SELECTED", value);
  },
  setActiveOnlyProvince(state, value) {
    state.commit("SET_ACTIVE_ONLY_PROVINCE", value);
  },
  async setProvinces(state, value = true) {
    const resProvinces = await axios.get(PROVINCE + `?filter=${value}`);

    if (resProvinces?.data?.success) {
      state.commit("SET_PROVINCES", [...resProvinces.data.data]);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
