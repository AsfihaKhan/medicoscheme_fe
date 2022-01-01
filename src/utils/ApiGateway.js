import axios from "axios";

const BaseAPI = axios.create({
  baseURL: process.env.VUE_APP_API_LINK,
  headers: {
    "Content-Type": "application/json",
  },
});

export { BaseAPI };
