import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#1AA8C7",
        secondary: "#F67015",
        accent: "#FFA800",
        error: "#b71c1c",
        tertiary: "#1D60E1",
      },
    },
  },
});
