<template>
  <v-navigation-drawer
    :mini-variant="mini"
    app
    :clipped="clipped"
    v-model="$store.state.app.navDrawer"
    :dark="!clipped"
    :color="!clipped ? ($vuetify.theme.dark ? '#1e1e1e' : '#17263d') : 'auto'"
    :floating="!$vuetify.theme.dark && clipped"
  >
    <template #prepend v-if="!clipped">
      <v-list-item dense class="d-flex align-center py-1">
        <v-list-item-icon class="align-self-center">
          <v-img
            max-width="24"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light.svg"
          ></v-img>
        </v-list-item-icon>
        <v-list-item-content class="text-h6 text-truncate py-0">
          Vuetify Admin
        </v-list-item-content>
      </v-list-item>
      <v-divider />
    </template>
    <v-list nav dense expand>
      <template v-for="(item, index) in accessibleTree">
        <v-list-item :to="item.path" :key="index" v-if="!item.children">
          <v-list-item-icon v-if="!mini">
            <v-icon>{{ item.meta.icon }}</v-icon>
          </v-list-item-icon>
          <tailed-tooltip v-else right nudge-right="12">
            <template #activator="{ attrs, on }">
              <v-list-item-icon v-on="on" v-bind="attrs">
                <v-icon>{{ item.meta.icon }}</v-icon>
              </v-list-item-icon>
            </template>
            <span> {{ item.name }} </span>
          </tailed-tooltip>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-else>
          <v-list-group
            :key="index"
            :prepend-icon="item.meta.icon"
            no-action
            v-if="!mini"
            :value="true"
          >
            <template #activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <template
              v-for="(i, idx) in item.children
                .concat()
                .sort((a, b) => a.order - b.order)"
            >
              <v-list-item
                :key="idx"
                :to="`${item.path}/${i.path}`"
                v-if="!i.children"
              >
                <v-list-item-title>{{ i.name }}</v-list-item-title>
              </v-list-item>
              <v-list-group v-else :key="idx" no-action sub-group :value="true">
                <template #activator>
                  <v-list-item-title>{{ i.name }}</v-list-item-title>
                </template>
                <v-list-item
                  :key="_idx"
                  :to="`${item.path}/${i.path}/${_i.path}`"
                  v-for="(_i, _idx) in i.children
                    .concat()
                    .sort((a, b) => a.order - b.order)"
                >
                  <v-list-item-title>{{ _i.name }}</v-list-item-title>
                </v-list-item>
              </v-list-group>
            </template>
          </v-list-group>
          <v-menu
            :key="index"
            v-else
            offset-x
            close-delay="500"
            open-delay="500"
            v-model="secondMenu[index]"
          >
            <template #activator="{ attrs, on }">
              <v-list-item>
                <v-list-item-icon v-bind="attrs" v-on="on">
                  <tailed-tooltip
                    right
                    v-model="tooltip[index]"
                    nudge-right="12"
                  >
                    <template #activator="{ attrs: _attrs, on: _on }">
                      <v-icon
                        :color="
                          $route.path.includes(item.path) ? 'primary' : ''
                        "
                        v-bind="_attrs"
                        v-on="_on"
                        @click="tooltip[index] = false"
                        >{{ item.meta.icon }}</v-icon
                      >
                    </template>
                    {{ item.name }}
                  </tailed-tooltip>
                </v-list-item-icon>
              </v-list-item>
            </template>
            <v-list
              :key="idx"
              v-for="(i, idx) in item.children
                .concat()
                .sort((a, b) => a.order - b.order)"
              dense
            >
              <v-list-item :to="`${item.path}/${i.path}`" v-if="!i.children">
                <v-list-item-title>{{ i.name }}</v-list-item-title>
              </v-list-item>
              <v-menu
                :key="idx"
                v-else
                offset-x
                close-delay="500"
                open-delay="500"
                @input="(val) => !val && (secondMenu[index] = false)"
              >
                <template #activator="{ attrs, on }">
                  <v-list-item v-bind="attrs" v-on="on">
                    <v-list-item-title>
                      {{ i.name }}
                    </v-list-item-title>
                    <v-list-item-icon>
                      <v-icon small>mdi-chevron-right</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </template>
                <v-list
                  dense
                  :key="_idx"
                  v-for="(_i, _idx) in i.children
                    .concat()
                    .sort((a, b) => a.order - b.order)"
                >
                  <v-list-item :to="`${item.path}/${i.path}/${_i.path}`">
                    <v-list-item-title>{{ _i.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list>
          </v-menu>
        </template>
      </template>
    </v-list>

    <!-- only show up when lg and up -->
    <template #append class="d-none" v-if="$vuetify.breakpoint.lgAndUp">
      <v-divider />
      <v-btn block @click="mini = !mini" text>
        <v-icon>{{
          mini ? "mdi-chevron-double-right" : "mdi-chevron-double-left"
        }}</v-icon>
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>
<script>
import { routes } from "@/router";

export default {
  components: {
    TailedTooltip: () => import("@/components/TailedTooltip.vue"),
  },
  data: () => ({
    mini: false,
    secondMenu: {},
    tooltip: {},
  }),
  watch: {
    "$vuetify.breakpoint.mdAndDown"(val) {
      if (val) {
        this.mini = false;
      }
    },
  },
  computed: {
    clipped() {
      return this.$store.state.app.clipped;
    },
    accessibleRoutes() {
      return this.$store.getters.accessibleRoutes;
    },
    accessibleTree() {
      return this.buildAccessibleTree(routes);
    },
  },
  methods: {
    /**
     * Build a route tree consists of accessible routes.
     * NB. make sure none empty children attribute (children: []) exists
     * @param tree
     * @param parentPath
     * @returns {*[]}
     */
    buildAccessibleTree(tree, parentPath = null) {
      const result = [];
      tree.forEach((t) => {
        const currPath = parentPath ? `${parentPath}/${t.path}` : t.path;
        if (!t.children) {
          !currPath.includes(":") &&
            this.accessibleRoutes.includes(currPath) &&
            result.push(t);
        } else {
          const childrenResult = this.buildAccessibleTree(t.children, currPath);
          if (childrenResult.length) {
            const nodeNew = JSON.parse(JSON.stringify(t));
            delete nodeNew["children"];
            nodeNew["children"] = childrenResult;
            result.push(nodeNew);
          }
        }
      });

      return result;
    },
  },
};
</script>
