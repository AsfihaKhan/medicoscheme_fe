import router from "@/router";
import { BaseAPI } from "../../utils/ApiGateway";

const doctor = {
  namespaced: true,

  state: {
    appointmentList: [],
    blogList: [],
    dashboardInfo: [],
    singleBlogInformation: [],
  },

  mutations: {
    SET_BLOG_LIST(state, value) {
      state.blogList = value;
    },

    SET_SINGLE_BLOG_INFORMATION(state, value) {
      state.singleBlogInformation = value;
    },

    SET_APPOINTMENTS_LIST_FOR_DOCTOR(state, value) {
      state.appointmentList = value;
    },

    SET_DASHBOARD_INFO(state, value) {
      state.dashboardInfo = value;
    },
  },

  actions: {
    getAllBlogs({ commit, rootState }) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.get("/app/blogs-by-doctor", {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          console.log(res.data.data);
          commit("SET_BLOG_LIST", res.data.data);
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

    getSingleBlogInformation({ commit }, payload) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.get(`/app/blogs/${payload}`)
        .then((res) => {
          console.log(res.data.data);
          commit("SET_SINGLE_BLOG_INFORMATION", res.data.data);
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

    postNewBlog({ commit, dispatch, rootState }, payload) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.post("/app/blogs", payload, {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then(() => {
          commit("SHOW_SNACKBAR", { text: "Blog posted successfully!", color: "success" }, { root: true });
          dispatch("getAllBlogs");
          router.push("/doctor/view-blogs");
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

    editSingleBlogInformation({ commit, dispatch, rootState }, payload) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.patch(
        `/app/blogs/${payload.id}`,
        { header: payload.header, post: payload.post },
        {
          headers: {
            Authorization: "Bearer " + rootState.auth.token,
          },
        }
      )
        .then(() => {
          commit("SHOW_SNACKBAR", { text: "Blog updated successfully!", color: "success" }, { root: true });
          dispatch("getAllBlogs");
          router.push("/doctor/view-blogs");
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

    deleteBlog({ commit, dispatch, rootState }, payload) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.delete(`/app/blogs/${payload}`, {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then(() => {
          commit("SHOW_SNACKBAR", { text: "Blog deleted successfully!", color: "success" }, { root: true });
          dispatch("getAllBlogs");
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

    getAllAppointments({ commit, rootState }) {
      commit("SET_IS_LOADING", true, { root: true });

      BaseAPI.get("/app/doctors/appointments", {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          console.log(res.data.data);
          commit("SET_APPOINTMENTS_LIST_FOR_DOCTOR", res.data.data);
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

    confirmAppointment({ commit, dispatch, rootState }, payload) {
      commit("SET_IS_LOADING", true, { root: true });
      console.log(payload);

      BaseAPI.patch(
        `/app/doctors/appointment-complete/${payload}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + rootState.auth.token,
          },
        }
      )
        .then(() => {
          commit("SHOW_SNACKBAR", { text: "Appointment confirmed!", color: "success" }, { root: true });
          dispatch("getAllAppointments");
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

      BaseAPI.get("app/dashboards/doctor", {
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

export default doctor;
