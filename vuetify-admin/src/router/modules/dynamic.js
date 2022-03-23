export default [
  {
    name: "Dynamic route demo",
    path: "/dynamic-route-demo",
    component: () => import("@/views/dynamic-route/DynamicRouteDemo.vue"),
    meta: {
      icon: "mdi-delta",
      order: 3,
    },
  },
  {
    name: "Dynamic route demo child",
    path: "/dynamic-route-demo/:id",
    component: () => import("@/views/dynamic-route/DynamicRouteDemoChild.vue"),
  },
];
