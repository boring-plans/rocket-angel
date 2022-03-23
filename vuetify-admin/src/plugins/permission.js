import store from "@/store";

const hasPermission = (permission) => {
  return (
    store.getters.permissions && store.getters.permissions.includes(permission)
  );
};

export default {
  install(Vue) {
    Vue.prototype.$permission = hasPermission;
  },
};
