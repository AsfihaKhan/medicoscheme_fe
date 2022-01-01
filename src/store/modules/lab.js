import { BaseAPI } from "../../utils/ApiGateway";
import router from "@/router";
import axios from "axios";

const lab = {
  namespaced: true,

  state: {
    dashboardInfo: [],
    pendingPatients: [],
    reportImage: null,
    reportInfo: [],
    serviceInfo: [],
  },

  getters: {
    getServicePrice: (state) => (id) => {
      const selectedService = state.serviceInfo.filter((el) => el.id === id);
      return selectedService[0].price;
    },
    getValidatedReports: (state) => {
      return state.dashboardInfo.DeliveredReportsInfo.filter((el) => el.type !== null);
    },
  },

  mutations: {
    SET_SERVICE_INFO(state, value) {
      state.serviceInfo = value;
    },
    SET_PENDING_PATIENTS(state, value) {
      state.pendingPatients = value;
    },
    SET_REPORT_IMAGE(state, value) {
      state.reportImage = value;
    },
    SET_DASHBOARD_INFO(state, value) {
      state.dashboardInfo = value;
    },
    SET_REPORT_INFO(state, value) {
      state.reportInfo = value;
    },
  },

  actions: {
    createNewService({ commit, dispatch, rootState }, payload) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.post("app/services", payload, {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then(() => {
          commit("SHOW_SNACKBAR", { text: "New service added successfully!", color: "success" }, { root: true });
          dispatch("getAllServices");
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

    getAllServices({ commit, rootState }, payload) {
      let id = null;
      if (!payload || payload === null || payload === undefined) {
        id = rootState.auth.userId;
      } else {
        id = payload;
      }
      commit("SET_IS_LOADING", true, { root: true });

      BaseAPI.get(`app/services/${id}`, {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          console.log("SERVICES", res.data.data);
          commit("SET_SERVICE_INFO", res.data.data);
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

    updateServiceInformation({ commit, dispatch, rootState }, payload) {
      commit("SET_IS_LOADING", true, { root: true });

      BaseAPI.patch(
        `app/services/${payload.id}`,
        { name: payload.name, price: payload.price },
        {
          headers: {
            Authorization: "Bearer " + rootState.auth.token,
          },
        }
      )
        .then(() => {
          commit("SHOW_SNACKBAR", { text: "Service updated successfully!", color: "success" }, { root: true });
          dispatch("getAllServices");
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

    getPendingPatients({ commit, rootState }) {
      commit("SET_IS_LOADING", true, { root: true });

      BaseAPI.get("/app/labs/pending-patient", {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          console.log("SERVICES", res.data.data);
          commit("SET_PENDING_PATIENTS", res.data.data);
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

    async uploadImage({ commit }, payload) {
      if (payload) {
        const formData = new FormData();
        formData.append("file", payload);
        formData.append("upload_preset", "loxojcdv");
        return await axios
          .post("https://api.cloudinary.com/v1_1/di2vevhs9/image/upload", formData)
          .then((res) => {
            commit("SET_REPORT_IMAGE", res.data.url);
            return true;
          })
          .catch(() => {
            commit(
              "SHOW_SNACKBAR",
              {
                text: "Something went wrong while uploading image. Please try valid image format.",
                color: "error",
              },
              { root: true }
            );
            return false;
          });
      }
    },

    uploadImageReport({ commit, rootState, state }, payload) {
      payload.image = [state.reportImage];
      console.log(payload);
      commit("SET_IS_LOADING", true, { root: true });

      BaseAPI.post("/app/labs/report-imaging", payload, {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then(() => {
          commit("SHOW_SNACKBAR", { text: "Report added successfully!", color: "success" }, { root: true });
          router.push("/lab/pending-patient-list");
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

    uploadDengueReport({ commit, rootState }, payload) {
      console.log(payload);
      commit("SET_IS_LOADING", true, { root: true });

      BaseAPI.post("/app/labs/report-dengue", payload, {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then(() => {
          commit("SHOW_SNACKBAR", { text: "Report added successfully!", color: "success" }, { root: true });
          router.push("/lab/pending-patient-list");
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

    uploadHematologyReport({ commit, rootState }, payload) {
      console.log(payload);
      commit("SET_IS_LOADING", true, { root: true });

      BaseAPI.post("/app/labs/report-hematologies", payload, {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then(() => {
          commit("SHOW_SNACKBAR", { text: "Report added successfully!", color: "success" }, { root: true });
          router.push("/lab/pending-patient-list");
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

    uploadPathologyReport({ commit, rootState }, payload) {
      console.log(payload);
      commit("SET_IS_LOADING", true, { root: true });

      BaseAPI.post("/app/labs/report-pathologie", payload, {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then(() => {
          commit("SHOW_SNACKBAR", { text: "Report added successfully!", color: "success" }, { root: true });
          router.push("/lab/pending-patient-list");
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

      BaseAPI.get("/app/dashboards/lab", {
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

    getReportDetails({ commit, rootState }, payload) {
      commit("SET_IS_LOADING", true, { root: true });

      BaseAPI.get(`/app/labs/reports/${payload}`, {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          console.log(res.data.data);
          commit("SET_REPORT_INFO", res.data.data);
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

export default lab;
