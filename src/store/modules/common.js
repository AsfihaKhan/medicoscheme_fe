import { BaseAPI } from "../../utils/ApiGateway";
import { defaultImage } from "../../utils/Constants";
import axios from "axios";

const profile = {
  namespaced: true,

  state: {
    imageURL: defaultImage,
    notifications: [],
    profileInformation: [],
    publicBlogs: [],
  },

  mutations: {
    SET_PROFILE_INFORMATION(state, value) {
      state.profileInformation = value;
    },
    PROFILE_IMAGE_PREVIEW(state, value) {
      state.imageURL = value;
    },
    SET_PUBLIC_BLOG_LIST(state, value) {
      state.publicBlogs = value;
    },
    SET_NOTIFICATIONS(state, value) {
      state.notifications = value;
    },
  },

  actions: {
    getProfileInformation({ commit, rootState }, payload) {
      let id = null;
      if (!payload || payload === null || payload === undefined) {
        id = rootState.auth.userId;
      } else {
        id = payload;
      }
      commit("SET_IS_LOADING", true, { root: true });

      BaseAPI.get(`/app/profile/${id}`, {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          console.log("PROFILE INFORMATION", res.data.data);
          commit("SET_PROFILE_INFORMATION", res.data.data);
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
            commit("PROFILE_IMAGE_PREVIEW", res.data.url);
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
      } else {
        commit("STAFF_IMAGE_PREVIEW", defaultImage);
      }
    },

    updateProfileInformation({ commit, dispatch, rootState, state }, payload) {
      // add profile picture based on the user
      if (payload.lab) {
        payload.lab.picture = state.imageURL;
      } else if (payload.doctor) {
        payload.doctor.picture = state.imageURL;
      } else {
        payload.patient.picture = state.imageURL;
      }

      commit("SET_IS_LOADING", true, { root: true });

      BaseAPI.patch("/app/profile", payload, {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then(() => {
          commit("SHOW_SNACKBAR", { text: "Profile updated successfully!", color: "success" }, { root: true });
          dispatch("getProfileInformation");
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

    getPublicBlogs({ commit }) {
      commit("SET_IS_LOADING", true, { root: true });

      BaseAPI.get("/app/blogs")
        .then((res) => {
          commit("SET_PUBLIC_BLOG_LIST", res.data.data);
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

    getAllNotifications({ commit, rootState }) {
      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.get("/app/notifications", {
        headers: {
          Authorization: "Bearer " + rootState.auth.token,
        },
      })
        .then((res) => {
          console.log(res.data.data);
          commit("SET_NOTIFICATIONS", res.data.data);
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

export default profile;
