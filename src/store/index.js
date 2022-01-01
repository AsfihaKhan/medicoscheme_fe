import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import admin from "./modules/admin";
import auth from "./modules/auth";
import common from "./modules/common";
import doctor from "./modules/doctor";
import lab from "./modules/lab";
import patient from "./modules/patient";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbarText: "",
    snackbarColor: "",
    isLoading: false,
  },
  mutations: {
    SET_IS_LOADING(state, value) {
      state.isLoading = value;
    },

    SHOW_SNACKBAR(state, value) {
      state.snackbarText = value.text;
      state.snackbarColor = value.color;
    },
  },

  modules: {
    admin,
    auth,
    common,
    doctor,
    lab,
    patient,
  },

  // custom persistent files
  plugins: [
    createPersistedState({
      paths: ["auth"],
    }),
  ],
});
