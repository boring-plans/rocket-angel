import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import LayoutIcon from "@/components/app/LayouIcon.vue";
import LayoutClippedIcon from "@/components/app/LayoutClippedIcon.vue";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: {
      layout: {
        component: LayoutIcon,
      },
      "layout-clipped": {
        component: LayoutClippedIcon,
      },
    },
  },
});
