import store from "../store";

const notify = (content, loading = false, level = "info") => {
  store.commit("app/SET_NOTIFICATION", { show: true, loading, content, level });
};

export const notification = {
  success(content) {
    notify(content, false, "success");
  },
  warning(content) {
    notify(content, false, "warning");
  },
  error(content) {
    notify(content, false, "error");
  },
  info(content) {
    notify(content, false, "info");
  },
  loading(content) {
    notify(content, true, "info");
  },
  dismiss() {
    store.dispatch("app/dismissNotification");
  },
};

export default {
  install(Vue) {
    Vue.prototype.$notify = notification;
  },
};
