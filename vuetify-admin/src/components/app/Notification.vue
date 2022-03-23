<template>
  <v-snackbar
    v-model="notification.show"
    :timeout="notification.loading ? 1000 : 3000"
    :color="notification.level"
    text
    top
  >
    <div class="d-flex align-center">
      <v-progress-circular
        size="14"
        width="1"
        color="info"
        indeterminate
        v-if="notification.loading"
        class="mr-2"
      ></v-progress-circular>
      <v-icon v-else :color="notification.level" class="mr-2" small>
        {{ snackerBarIconDict[notification.level] }}
      </v-icon>
      <span>
        {{ notification.content }}
      </span>
    </div>
  </v-snackbar>
</template>
<script>
export default {
  data: () => ({
    snackerBarIconDict: {
      info: "mdi-information",
      warning: "mdi-alert",
      success: "mdi-check-circle",
      error: "mdi-alert-circle",
    },
  }),
  computed: {
    notification() {
      return this.$store.state.app.notification;
    },
  },
};
</script>
