import { getPermissions, getUserInfo } from "@/api/auth";
import { mockPermissions, mockUserInfo } from "@/mock/modules/auth";
import allPermissions from "@/assets/permissions.json";
import { removeAccessToken } from "@/utils/storage-util";

const state = {
  permissions: [],
  signedInUser: "",
};

const mutations = {
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions;
  },
  SET_SIGNED_IN_USER: (state, signedInUser) => {
    state.signedInUser = signedInUser;
  },
};

const actions = {
  setSignedInUser: async ({ commit }) => {
    // mockjs will be ready later than vuex
    // so when in dev environment, using mock data to directly resume
    // info of user signed in and permissions when refreshing
    let permissions, signedInUser;
    if (process.env.NODE_ENV === "development") {
      permissions = mockPermissions;
      signedInUser = mockUserInfo;
    } else {
      permissions = (await getPermissions()).result;
      permissions === "*" &&
        (permissions = allPermissions.reduce(
          (pre, curr) => [
            ...pre,
            ...(curr.visit || []).map((v) => v.value),
            ...(curr.action || []).map((a) => a.value),
          ],
          []
        ));
      signedInUser = (await getUserInfo()).result;
    }

    commit("SET_PERMISSIONS", permissions);
    commit("SET_SIGNED_IN_USER", signedInUser);
  },
  signOut({ commit }) {
    removeAccessToken();
    commit("SET_PERMISSIONS", []);
    commit("SET_SIGNED_IN_USER", "");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
