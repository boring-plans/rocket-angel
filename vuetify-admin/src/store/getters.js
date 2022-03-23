export default {
  accessibleRoutes: (state) =>
    state.auth.permissions
      .filter((p) => p.includes(":visit"))
      .map((p) => p.split(":visit").shift()),
  permissions: (state) =>
    state.auth.permissions.filter((p) => !p.includes(":visit")),
};
