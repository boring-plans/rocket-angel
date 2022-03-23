<template>
  <v-app>
    <!-- notification -->
    <notification />

    <!-- header and aside -->
    <template v-if="!concise">
      <!-- app bar -->
      <app-bar />
      <!-- nav drawer -->
      <nav-drawer />
    </template>

    <!-- main -->
    <error v-if="error" />
    <v-main
      v-else
      :style="{
        'background-color': $vuetify.theme.dark ? '#363636' : '#f2f3f8',
      }"
    >
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import Error from "./components/app/Error.vue";
import AppBar from "./components/app/AppBar.vue";
import NavDrawer from "./components/app/NavDrawer.vue";
import Notification from "./components/app/Notification.vue";

const conciseRouteList = ["/sign-in", "/sign-up", "/"];

export default {
  name: "App",
  components: {
    Notification,
    AppBar,
    NavDrawer,
    Error,
  },
  computed: {
    concise() {
      return conciseRouteList.includes(this.$route.path) || this.error;
    },
    error() {
      return !!this.$store.state.error.code;
    },
  },
};
</script>

<style lang="scss">
@import "styles/main.scss";

html {
  overflow-y: auto !important;
}
</style>
