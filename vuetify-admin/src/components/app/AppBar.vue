<template>
  <v-app-bar
    :color="clipped ? ($vuetify.theme.dark ? '#1e1e1e' : '#17263d') : 'auto'"
    app
    flat
    dense
    :clipped-left="clipped"
    :class="{ blurred: !clipped && !$vuetify.theme.dark }"
    :dark="clipped"
  >
    <v-app-bar-nav-icon class="d-lg-none" @click.stop="showNavDrawer">
    </v-app-bar-nav-icon>

    <template v-if="clipped">
      <v-img
        max-width="24"
        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light.svg"
        class="mr-3"
      ></v-img>
      <div class="title white--text d-none d-md-block">Vuetify Admin</div>
    </template>

    <v-spacer />

    <v-btn
      icon
      @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      small
      class="mr-1"
    >
      <v-icon small>
        {{
          $vuetify.theme.dark
            ? "mdi-white-balance-sunny"
            : "mdi-moon-waxing-crescent"
        }}
      </v-icon>
    </v-btn>
    <v-btn
      icon
      small
      @click="$store.commit('app/SET_CLIPPED', !clipped)"
      class="mr-1"
    >
      <v-icon small>
        {{
          !clipped ? "$vuetify.icons.layout-clipped" : "$vuetify.icons.layout"
        }}
      </v-icon>
    </v-btn>
    <!-- avatar -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-on="on" v-bind="attrs" class="mr-1" light small>
          <v-avatar size="24px" color="rgb(207, 224, 214)">
            {{ signedInUser[0] || "" }}
          </v-avatar>
        </v-btn>
      </template>
      <v-list
        dense
        class="pa-0 text-center"
        :class="{ blurred: !clipped && !$vuetify.theme.dark }"
        max-width="100"
      >
        <v-list-item class="text-caption py-0">
          <v-list-item-title class="text-truncate">
            {{ signedInUser }}
          </v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item @click="signOut" class="red--text">
          <v-list-item-title> Sign Out </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- loading -->
    <v-progress-linear
      :value="loading.progress"
      v-if="loading.isLoading"
      absolute
      top
      color="info"
      height="2"
    />
  </v-app-bar>
</template>
<script>
export default {
  data: () => ({
    settingsDrawer: false,
  }),
  computed: {
    loading() {
      return this.$store.state.app.loading;
    },
    clipped() {
      return this.$store.state.app.clipped;
    },
    signedInUser() {
      return this.$store.state.auth.signedInUser;
    },
  },
  methods: {
    showNavDrawer() {
      this.$store.commit(
        "app/SET_NAV_DRAWER",
        !this.$store.state.app.navDrawer
      );
    },
    signOut() {
      this.$store.dispatch("auth/signOut");
      this.$router.push("/sign-in");
    },
  },
};
</script>
<style scoped>
.blurred {
  background: rgba(255, 255, 255, 0.618) !important;
  backdrop-filter: saturate(180%) blur(20px) !important;
}
</style>
