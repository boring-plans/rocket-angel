const state = {
  code: null,
};

const mutations = {
  SET_ERROR: (state, code) => {
    state.code = code;
  },
};

const actions = {
  reset({ commit }) {
    commit("SET_ERROR", null);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
