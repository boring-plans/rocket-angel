<template>
  <v-container fluid fill-height class="d-flex">
    <v-col
      cols="12"
      md="3"
      class="d-flex align-self-stretch pa-0 pr-1"
      ref="roles"
    >
      <v-card style="width: 100%" flat>
        <v-card-title>
          <v-btn
            color="primary"
            small
            @click="createDialog = true"
            v-if="$permission('role:create')"
          >
            New
          </v-btn>
          <v-btn
            color="error"
            class="ml-1 ml-md-2"
            small
            :disabled="selectedRoles.length === 0"
            @click="deleteManyDialog = true"
            v-if="$permission('role:delete')"
          >
            Delete
            <span v-if="selectedRoles.length > 0"
              >({{ selectedRoles.length }})
            </span>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-title class="pa-0">
          <v-toolbar flat>
            <v-text-field
              v-model="keyword"
              dense
              append-icon="mdi-magnify"
              label="Filter by keyword"
              single-line
              hide-details
              clearable
            ></v-text-field>
          </v-toolbar>
        </v-card-title>
        <v-card
          flat
          v-if="!retrieveRolesAuthority"
          :style="{ height: listHeight + 'px' }"
          class="d-flex align-center justify-center"
        >
          Don't have the authority to retrieve roles.
        </v-card>
        <v-card-text
          class="pa-0 overflow-auto"
          :style="{ maxHeight: listHeight + 'px' }"
          v-else
        >
          <v-list dense nav>
            <v-list-item-group v-model="activeRole">
              <template v-for="(role, index) in roles">
                <v-list-item
                  :key="index"
                  :value="role.id"
                  color="primary"
                  class="my-0"
                >
                  <v-checkbox
                    class="customized-checkbox"
                    dense
                    hide-details
                    color="primary"
                    v-model="selectedRoles"
                    :value="role.id"
                    @click.stop.prevent
                  />
                  <v-list-item-content>
                    <v-list-item-title :title="role.name">
                      {{ role.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle :title="role.description">
                      {{ role.description || "No description" }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-btn
                    icon
                    x-small
                    color="primary"
                    @click.stop="
                      selectedRole = role;
                      editDialog = true;
                    "
                    v-if="$permission('role:update')"
                  >
                    <v-icon x-small>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    x-small
                    color="error"
                    @click.stop="
                      selectedRole = role;
                      deleteDialog = true;
                    "
                    v-if="$permission('role:delete')"
                  >
                    <v-icon x-small>mdi-trash-can</v-icon>
                  </v-btn>
                </v-list-item>
                <v-divider
                  :key="'divider-' + index"
                  v-if="index < roles.length - 1"
                  class="ma-2"
                />
              </template>
            </v-list-item-group>
          </v-list>
          <v-overlay absolute v-if="loadingRoles" opacity=".07">
            <v-alert color="primary" text>
              <v-progress-circular indeterminate />
            </v-alert>
          </v-overlay>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      md="9"
      class="d-flex flex-column align-self-stretch pa-0 pl-1"
    >
      <v-card
        v-if="!activeRole"
        class="align-self-stretch flex-grow-1 d-flex align-center justify-center"
        flat
      >
        {{
          $permission("role:update")
            ? "Click certain role to edit permissions."
            : "Don't have the authority to edit roles."
        }}
      </v-card>
      <v-data-table
        v-else
        class="flex-grow-1 border-radius-table"
        :headers="headers"
        :items="permissions"
        :height="tableHeight"
        :loading="updating"
        hide-default-footer
        disable-pagination
        fixed-header
      >
        <template #[`item.visit`]="{ item: { visit } }">
          <v-checkbox
            dense
            hide-details
            v-model="selectedPermissions"
            :label="i.text"
            v-for="(i, idx) in visit"
            :key="idx"
            :value="i.value"
            class="d-inline-block mr-4 customized-checkbox black-label-checkbox"
          />
        </template>
        <template #[`item.action`]="{ item: { action } }">
          <v-checkbox
            dense
            hide-details
            v-model="selectedPermissions"
            :label="i.text"
            v-for="(i, idx) in action"
            :key="idx"
            :value="i.value"
            class="d-inline-block mr-4 customized-checkbox black-label-checkbox"
          />
        </template>
      </v-data-table>

      <v-card
        flat
        class="d-flex align-center mt-2 px-4 py-2"
        width="100%"
        v-if="$permission('role:update')"
      >
        <v-btn
          small
          color="primary"
          :disabled="!activeRole"
          @click="selectAllPermissions"
        >
          Select All
        </v-btn>
        <v-btn
          color="primary"
          :disabled="!activeRole || !modified"
          small
          class="ml-1 ml-md-2"
          @click="updateBoundPermissions"
        >
          Save
        </v-btn>
        <v-btn
          color="error"
          :disabled="!activeRole || !modified"
          small
          class="ml-1 ml-md-2"
          @click="getBoundPermissions(activeRole)"
        >
          Reset
        </v-btn>
      </v-card>
    </v-col>
    <create-dialog v-model="createDialog" @reload="getRoles" />
    <delete-many-dialog
      v-model="deleteManyDialog"
      :items="selectedRoles"
      @reload="getRoles"
    />
    <delete-dialog
      v-model="deleteDialog"
      :item="selectedRole"
      @reload="getRoles"
    />
    <edit-dialog v-model="editDialog" :item="selectedRole" @reload="getRoles" />
  </v-container>
</template>
<script>
import { getRoles, updateRole } from "@/api/role";
import DeleteDialog from "@/components/system/role-management/DeleteDialog.vue";
import DeleteManyDialog from "@/components/system/role-management/DeleteManyDialog.vue";
import CreateDialog from "@/components/system/role-management/CreateDialog.vue";
import EditDialog from "@/components/system/role-management/EditDialog.vue";
import permissions from "@/assets/permissions.json";

export default {
  name: "RoleManagement",
  components: { CreateDialog, DeleteDialog, EditDialog, DeleteManyDialog },
  data() {
    return {
      // roles
      activeRole: null,
      roles: [],
      selectedRoles: [],
      selectedRole: null,
      loadingRoles: false,
      // permissions
      headers: [
        { text: "Module", value: "module" },
        { text: "Visit", value: "visit", sortable: false },
        { text: "Action", value: "action", sortable: false },
      ],
      permissions,
      selectedPermissions: [],
      selectedPermissionsOrigin: [],
      updating: false,
      // dialogs
      createDialog: false,
      deleteDialog: false,
      deleteManyDialog: false,
      editDialog: false,
      // search
      rolesQuantity: [],
      keyword: "",
    };
  },
  created() {
    this.getRoles();
  },
  watch: {
    activeRole(val) {
      if (val) {
        this.getBoundPermissions();
      } else {
        this.selectedPermissions = [];
        this.selectedPermissionsOrigin = [];
      }
    },
    keyword(val) {
      if (val === null) {
        this.roles = JSON.parse(JSON.stringify(this.rolesQuantity));
      } else {
        this.filterRole(val);
      }
    },
  },
  computed: {
    modified() {
      return (
        JSON.stringify(this.selectedPermissions) !==
        JSON.stringify(this.selectedPermissionsOrigin)
      );
    },
    tableHeight() {
      return window.screen.height - 290;
    },
    listHeight() {
      return window.screen.height - 370;
    },
    retrieveRolesAuthority() {
      return this.$permission("role:retrieve");
    },
  },
  methods: {
    selectAllPermissions() {
      this.selectedPermissions = this.permissions.reduce(
        (pre, curr) => [
          ...pre,
          ...(curr.visit || []).map((v) => v.value),
          ...(curr.action || []).map((a) => a.value),
        ],
        []
      );
    },
    async updateBoundPermissions() {
      this.updating = true;
      const permissions = this.selectedPermissions.join(",");
      await updateRole(this.activeRole, {
        permissions,
      });
      const theRole = this.roles.find((r) => r.id === this.activeRole);
      theRole.permissions = permissions;
      this.updating = false;

      this.$notify.success("Update saved!");
      this.selectedPermissionsOrigin = [...this.selectedPermissions];

      // authorities current user owning maybe changed
      // so reset signed-in user
      await this.$store.dispatch("auth/setSignedInUser");
      if (this.$store.getters.accessibleRoutes.length === 0) {
        this.$notify.dismiss();
        await this.$router.push("/");
      }
    },
    async getBoundPermissions() {
      const theRole = this.roles.find((r) => r.id === this.activeRole);
      this.selectedPermissions = (theRole.permissions || "").split(",");
      this.selectedPermissionsOrigin = [...this.selectedPermissions];
    },
    async getRoles() {
      if (this.retrieveRolesAuthority) {
        this.selectedRoles = [];
        this.loadingRoles = true;
        this.roles = (await getRoles()).result;
        this.rolesQuantity = JSON.parse(JSON.stringify(this.roles));
        this.loadingRoles = false;
        this.$notify.dismiss();
      }
    },
    filterRole(keyword) {
      this.roles = this.rolesQuantity.filter((r) =>
        (r.name + r.description).includes(keyword)
      );
    },
  },
};
</script>
