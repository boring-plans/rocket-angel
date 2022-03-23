const state = {
  notification: { show: false, content: "", loading: false, level: "" },
  loading: { isLoading: false, progress: 0 },
  navDrawer: true,
  clipped: false,
};

const mutations = {
  SET_NOTIFICATION: (state, payload) => {
    state.notification = { ...payload };
  },
  SET_LOADING: (state, loading) => {
    state.loading = { ...loading };
  },
  SET_NAV_DRAWER: (state, navDrawer) => {
    state.navDrawer = navDrawer;
  },
  SET_CLIPPED: (state, payload) => {
    state.clipped = payload;
  },
};

const actions = {
  dismissNotification({ commit }) {
    commit("SET_NOTIFICATION", {
      show: false,
      content: "",
      loading: false,
      level: "",
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
