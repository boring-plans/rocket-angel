export default [
  {
    name: "System",
    path: "/system",
    component: () => import("@/views/Barren"),
    children: [
      {
        path: "user-management",
        name: "User Management",
        component: () => import("@/views/system/UserManagement.vue"),
      },
      {
        path: "role-management",
        name: "Role Management",
        component: () => import("@/views/system/RoleManagement.vue"),
      },
    ],
    meta: {
      icon: "mdi-cog",
      order: 2,
    },
  },
];
