export default [
  {
    name: "Three",
    path: "/three",
    component: () => import("@/views/Barren.vue"),
    children: [
      {
        name: "Levels",
        path: "levels",
        component: () => import("@/views/Barren.vue"),
        children: [
          {
            path: "demo",
            name: "Demo",
            component: () =>
              import("@/views/three-levels-menu/ThreeLevelsMenuDemo.vue"),
          },
        ],
      },
      {
        name: "Levels Another",
        path: "levels-another",
        component: () => import("@/views/Barren.vue"),
        children: [
          {
            path: "demo",
            name: "Demo 2",
            component: () =>
              import("@/views/three-levels-menu/ThreeLevelsMenuDemo2.vue"),
          },
        ],
      },
    ],
    meta: {
      icon: "mdi-card-multiple",
      order: 3,
    },
  },
];
