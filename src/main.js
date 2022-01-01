import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Default from "./layouts/Default.vue";
import Blank from "./layouts/Blank.vue";
import CKEditor from "ckeditor4-vue";

import "./main.scss";

Vue.config.productionTip = false;
Vue.component("default-layout", Default);
Vue.component("blank-layout", Blank);
Vue.use(CKEditor);

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
