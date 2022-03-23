import Vue from "vue";
import store from "@/store";
import VueRouter from "vue-router";
import { showLoading, hideLoading } from "@/utils/loading";
import { getAccessToken } from "@/utils/storage-util";

Vue.use(VueRouter);

// -- routes definition

const routesOutOfList = [
  {
    path: "/",
    name: "Loading",
    component: () => import("@/views/Loading.vue"),
    meta: { public: true },
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: () => import("../views/SignIn.vue"),
    meta: { public: true },
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: () => import("../views/SignUp.vue"),
    meta: { public: true },
  },
];

export const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: {
      icon: "mdi-view-dashboard",
      order: 1,
    },
  },
];

const modules = require.context("./modules", true, /.*\.js$/);
routes.push(
  ...modules.keys().reduce((l, k) => [...l, ...modules(k).default], [])
);
routes.sort((r1, r2) =>
  r1.meta && r2.meta ? r1.meta.order - r2.meta.order : -1
);

const router = new VueRouter({
  routes: [...routes, ...routesOutOfList],
});

// -- router guard

const matchDynamic = (currentRoute, dynamicRoutePath) => {
  return Object.entries(currentRoute.params).some(
    ([key]) =>
      dynamicRoutePath ===
      currentRoute.path.split("/").slice(0, -1).join("/") + "/:" + key
  );
};

/**
 * [{path:'/xxx', ..., children: [{path: 'xx', ...}, {path: 'x', ...}]}]
 * ->
 * [{path:'/xxx/xx', ...}, {path:'/xxx/x', ...}]
 * @param routeTree
 * @param parentPath
 * @returns {*[]}
 */
const flattenRouteTree = (routeTree, parentPath = null) => {
  const resultArr = [];
  routeTree.forEach((rt) => {
    const currPath = parentPath ? `${parentPath}/${rt["path"]}` : rt["path"];
    if (!rt.children) {
      resultArr.push(currPath);
    } else {
      resultArr.push(...flattenRouteTree(rt.children, currPath));
    }
  });
  return resultArr;
};

/**
 * Check whether route exists
 *
 * @param route
 * @returns {boolean}
 */
const checkExistence = (route) => {
  const routesFlattened = flattenRouteTree([...routes, ...routesOutOfList]);
  return routesFlattened.some(
    (rf) => route.path === rf || (rf.includes(":") && matchDynamic(route, rf))
  );
};

/**
 * Check whether route is accessible
 *
 * especially, '/' and some public routes are for sure accessible
 * @param route
 * @returns {boolean}
 */
const checkAccessibility = (route) => {
  return (
    route.path === "/" ||
    (route.meta && route.meta.public) ||
    store.getters.accessibleRoutes.includes(route.path) ||
    store.getters.accessibleRoutes
      .filter((r) => r.includes(":"))
      .some((r) => matchDynamic(route, r))
  );
};

/**
 * Router guard used to check state of authentication and redirect
 */
router.beforeEach(async (to, _, next) => {
  // loading bar & title
  showLoading();
  document.title = (to.name ? to.name + " - " : "") + "Vuetify Admin";

  // reset error
  await store.dispatch("error/reset");

  const token = getAccessToken();

  // bring lost user info due to refreshing back to vuex
  if (!store.state.auth.signedInUser && token) {
    await store.dispatch("auth/setSignedInUser");
  }

  if (
    (token && to.path === "/sign-in") ||
    (!token && to.path !== "/" && to.path !== "/sign-in")
  ) {
    next({ path: "/", replace: true });
  } else {
    if (!checkExistence(to)) {
      store.commit("error/SET_ERROR", 404);
    } else if (!checkAccessibility(to)) {
      store.commit("error/SET_ERROR", 403);
    }
    next();
  }
});

router.afterEach(() => {
  hideLoading();
});

export default router;
