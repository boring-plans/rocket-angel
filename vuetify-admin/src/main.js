import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import notify from "./plugins/notify";
import permission from "./plugins/permission";
process.env.NODE_ENV === "development" && import("./mock");

Vue.use(notify);
Vue.use(permission);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
