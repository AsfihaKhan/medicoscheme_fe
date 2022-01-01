import router from "@/router";
import { BaseAPI } from "../../utils/ApiGateway";

const admin = {
  namespaced: true,
  state: {
    dashboardInfo: [],
    doctorList: [],
    labList: [],
    patientList: [],
    profileDetails: [],
  },

  getters: {
    getAppointmentFees: (state) => (id) => {
      if(id) {
        return state.profileDetails.Data.consulting_fee_new
      } else {
        return state.profileDetails.Data.consulting_fee_old
      }
    },

    getAcceptedDoctors: (state) => {
      return state.doctorList.filter((el) => el.status === "accept");
    },

    getAcceptedLabs: (state) => {
      return state.labList.filter((el) => el.status === "accept");
    },
  },

  mutations: {
    SET_DOCTOR_LIST(state, value) {
      state.doctorList = value;
    },

    SET_PATIENT_LIST(state, value) {
      state.patientList = value;
    },

    SET_LAB_LIST(state, value) {
      state.labList = value;
    },

    SET_PROFILE_DETAILS(state, value) {
      state.profileDetails = value;
    },

    SET_DASHBOARD_INFO(state, value) {
      state.dashboardInfo = value;
    },
  },

  actions: {
    getDoctorList({ commit, rootState }) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.get("/app/doctors", {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          console.log(res.data.data);
          commit("SET_DOCTOR_LIST", res.data.data);
        })
        .catch((err) => {
          if (err.response.data.message) {
            commit("SHOW_SNACKBAR", { text: `${err.response.data.message}`, color: "error" }, { root: true });
          } else {
            commit("SHOW_SNACKBAR", { text: "Something went wrong! Please check your internet connection", color: "error" }, { root: true });
          }
        })
        .finally(() => commit("SET_IS_LOADING", false, { root: true }));
    },

    getPatientList({ commit, rootState }) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.get("/app/patients", {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          commit("SET_PATIENT_LIST", res.data.data);
        })
        .catch((err) => {
          if (err.response.data.message) {
            commit("SHOW_SNACKBAR", { text: `${err.response.data.message}`, color: "error" }, { root: true });
          } else {
            commit("SHOW_SNACKBAR", { text: "Something went wrong! Please check your internet connection", color: "error" }, { root: true });
          }
        })
        .finally(() => commit("SET_IS_LOADING", false, { root: true }));
    },

    getLabList({ commit, rootState }) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.get("/app/labs", {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          console.log(res.data.data);
          commit("SET_LAB_LIST", res.data.data);
        })
        .catch((err) => {
          if (err.response.data.message) {
            commit("SHOW_SNACKBAR", { text: `${err.response.data.message}`, color: "error" }, { root: true });
          } else {
            commit("SHOW_SNACKBAR", { text: "Something went wrong! Please check your internet connection", color: "error" }, { root: true });
          }
        })
        .finally(() => commit("SET_IS_LOADING", false, { root: true }));
    },

    getSingleProfileInformation({ commit, rootState }, payload) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.get(`/app/profile/${payload}`, {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          console.log(res.data.data);
          commit("SET_PROFILE_DETAILS", res.data.data);
        })
        .catch((err) => {
          if (err.response.data.message) {
            commit("SHOW_SNACKBAR", { text: `${err.response.data.message}`, color: "error" }, { root: true });
          } else {
            commit("SHOW_SNACKBAR", { text: "Something went wrong! Please check your internet connection", color: "error" }, { root: true });
          }
        })
        .finally(() => commit("SET_IS_LOADING", false, { root: true }));
    },

    acceptOrRejectDoctor({ commit, rootState }, payload) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.patch("/app/doctors/status", payload, {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          commit("SHOW_SNACKBAR", { text: `${res.data.message}`, color: "success" }, { root: true });
          router.push("/admin/doctor-list");
        })
        .catch((err) => {
          if (err.response.data.message) {
            commit("SHOW_SNACKBAR", { text: `${err.response.data.message}`, color: "error" }, { root: true });
          } else {
            commit("SHOW_SNACKBAR", { text: "Something went wrong! Please check your internet connection", color: "error" }, { root: true });
          }
        })
        .finally(() => commit("SET_IS_LOADING", false, { root: true }));
    },

    acceptOrRejectLab({ commit, rootState }, payload) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.patch("/app/labs/status", payload, {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          commit("SHOW_SNACKBAR", { text: `${res.data.message}`, color: "success" }, { root: true });
          router.push("/admin/lab-list");
        })
        .catch((err) => {
          if (err.response.data.message) {
            commit("SHOW_SNACKBAR", { text: `${err.response.data.message}`, color: "error" }, { root: true });
          } else {
            commit("SHOW_SNACKBAR", { text: "Something went wrong! Please check your internet connection", color: "error" }, { root: true });
          }
        })
        .finally(() => commit("SET_IS_LOADING", false, { root: true }));
    },

    getDashboardInformation({ commit, rootState }) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.get("/app/dashboards/admin", {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          console.log(res.data.data);
          commit("SET_DASHBOARD_INFO", res.data.data);
        })
        .catch((err) => {
          if (err.response.data.message) {
            commit("SHOW_SNACKBAR", { text: `${err.response.data.message}`, color: "error" }, { root: true });
          } else {
            commit("SHOW_SNACKBAR", { text: "Something went wrong! Please check your internet connection", color: "error" }, { root: true });
          }
        })
        .finally(() => commit("SET_IS_LOADING", false, { root: true }));
    },
  },
};

export default admin;
