<template>
  <v-container
    fluid
    fill-height
    :style="{ backgroundImage: `url('${illustration}')` }"
    class="container"
    style="background-color: #233a5f"
  >
    <v-btn fixed bottom right text dark to="/">Back</v-btn>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import illustrations from "@/assets/illustrations";

export default {
  name: "Error",
  computed: {
    ...mapState({
      error: (state) => state.error,
    }),
    illustration() {
      if (this.error.code) {
        const illuArr = illustrations[`${this.error.code}`];
        return require(`@/assets/illustrations/${this.error.code}/${
          illuArr[Math.floor(Math.random() * illuArr.length)]
        }`);
      }
      return "";
    },
  },
  mounted() {
    document.title = `${this.error.code} - Vuetify Admin`;
  },
};
</script>

<style scoped>
.container {
  background-size: contain;
  background-position: center center;
}
</style>
