import router from "@/router";
import { BaseAPI } from "../../utils/ApiGateway";
import axios from "axios";

const auth = {
  namespaced: true,
  state: {
    imageURL: null,
    isAuthenticated: false,
    role: null,
    token: null,
    userId: null,
    userName: null,
  },

  mutations: {
    SET_IMAGE_URL(state, value) {
      state.imageURL = value;
    },
    SET_USER_INFO(state, value) {
      state.userId = value.id;
      state.role = value.role;
      state.token = value.token;
      state.userName = value.user_name;
      state.isAuthenticated = true;
    },
  },

  actions: {
    async uploadImage({ commit }, payload) {
      if (payload) {
        const formData = new FormData();
        formData.append("file", payload);
        formData.append("upload_preset", "loxojcdv");
        return await axios
          .post("https://api.cloudinary.com/v1_1/di2vevhs9/image/upload", formData)
          .then((res) => {
            commit("SET_IMAGE_URL", res.data.url);
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

    registerUser({ commit, state }, payload) {
      commit("SET_IS_LOADING", true, { root: true });

      if (payload.role === "doctor") {
        payload.doctor.license = state.imageURL;
      } else if (payload.role === "lab") {
        payload.lab.license = state.imageURL;
      }

      BaseAPI.post("/auth/signup", payload)
        .then(() => {
          commit("SHOW_SNACKBAR", { text: "Account created successfully", color: "success" }, { root: true });
          router.push("/login");
        })
        .catch((err) => {
          if (err.response.data.message) {
            commit("SHOW_SNACKBAR", { text: `${err.response.data.message}`, color: "error" }, { root: true });
          } else {
            commit(
              "SHOW_SNACKBAR",
              {
                text: "Something went wrong! Please check your internet connection",
                color: "error",
              },
              { root: true }
            );
          }
        })
        .finally(() => commit("SET_IS_LOADING", false, { root: true }));
    },

    authenticateUser({ commit }, payload) {
      const primaryRoute = {
        admin: "/admin/dashboard",
        patient: "/patient/dashboard",
        lab: "/lab/dashboard",
        doctor: "/doctor/dashboard",
      };

      commit("SET_IS_LOADING", true, { root: true });
      BaseAPI.post("/auth/signin", payload)
        .then((res) => {
          commit("SET_USER_INFO", res.data.data);
          router.push(primaryRoute[res.data.data.role]);
        })
        .catch((err) => {
          if (err.response.data.message) {
            commit("SHOW_SNACKBAR", { text: `${err.response.data.message}`, color: "error" }, { root: true });
          } else {
            commit(
              "SHOW_SNACKBAR",
              {
                text: "Something went wrong! Please check your internet connection",
                color: "error",
              },
              { root: true }
            );
          }
        })
        .finally(() => commit("SET_IS_LOADING", false, { root: true }));
    },

    logout() {
      window.localStorage.removeItem("vuex");
      window.localStorage.clear();
      router.push("/login");
    },
  },
};

export default auth;
