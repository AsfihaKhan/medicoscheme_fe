import { BaseAPI } from "../../utils/ApiGateway";

const patient = {
  namespaced: true,

  state: {
    appointedDoctorsList: [],
    bookedDoctorList: [],
    bookedLabList: [],
    dashboardInfo: [],
  },

  getters: {
    openedAppointments: (state) => {
      return state.appointedDoctorsList.filter((el) => el.status === "open");
    },

    closedAppointments: (state) => {
      return state.appointedDoctorsList.filter((el) => el.status === "complete");
    },
  },

  mutations: {
    SET_BOOKED_DOCTOR_LIST(state, value) {
      state.bookedDoctorList = value;
    },

    SET_APPOINTED_DOCTORS(state, value) {
      state.appointedDoctorsList = value;
    },

    SET_BOOKED_LAB_LIST(state, value) {
      state.bookedLabList = value;
    },

    SET_DASHBOARD_INFO(state, value) {
      state.dashboardInfo = value;
    },
  },

  actions: {
    createNewAppointment({ commit, rootState }, payload) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.post("/app/patients/appointment", payload, {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then(() => {
          commit("SHOW_SNACKBAR", { text: "Appointment has been created successfully!", color: "success" }, { root: true });
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

    getBookedDoctors({ commit, rootState }) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.get("/app/doctors/booked", {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          console.log(res.data.data);
          commit("SET_BOOKED_DOCTOR_LIST", res.data.data);
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

    getAppointedDoctors({ commit, rootState }) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.get("/app/patients/appointments", {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          commit("SET_APPOINTED_DOCTORS", res.data.data);
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

    newAppointmentInLab({ commit, rootState }, payload) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.post("/app/labs/appointment", payload, {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then(() => {
          commit("SHOW_SNACKBAR", { text: "Appointment has been created successfully!", color: "success" }, { root: true });
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

    getBookedLabs({ commit, rootState }) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.get("/app/patients/booked-labs", {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          console.log(res.data.data);
          commit("SET_BOOKED_LAB_LIST", res.data.data);
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
      BaseAPI.get("/app/dashboards/patient", {
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

    createReview({ commit, dispatch, rootState }, payload) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.post("/app/reviews", payload, {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          console.log(res);
          commit("SHOW_SNACKBAR", { text: "Thank you for your feedback!", color: "success" }, { root: true });
          dispatch("getBookedLabs");
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

export default patient;
