<template>
  <v-dialog :value="value" width="400px" persistent>
    <v-card :loading="loading">
      <v-card-title> Edit User </v-card-title>
      <v-card-text>
        <v-alert
          text
          type="warning"
          icon="mdi-alert-circle"
          dismissible
          close-icon="mdi-close"
          v-model="warningAlert"
          >{{ indications.warning }}</v-alert
        >
        <v-alert
          text
          type="error"
          icon="mdi-alert"
          dismissible
          close-icon="mdi-close"
          v-model="errorAlert"
          >{{ indications.error }}</v-alert
        >
        <v-form ref="form">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Username*"
                required
                v-model="formData['username']"
                :rules="[(val) => !!val || 'Username cannot be empty!']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Role"
                v-model="formData['roles']"
                :items="roles"
                multiple
                item-text="name"
                item-value="id"
              />
            </v-col>
            <v-col cols="12">
              <v-switch
                label="Reset Password"
                v-model="resetPassword"
              ></v-switch>
              <v-text-field
                v-if="resetPassword"
                label="New Password*"
                required
                v-model="formData['password']"
                :rules="[(val) => !!val || 'Password cannot be empty!']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-switch
                :true-value="1"
                :false-value="0"
                v-model="formData['state']"
                :label="`State: ${formData['state'] ? 'normal' : 'frozen'}`"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('input', false)" text> Cancel </v-btn>
        <v-btn color="primary" @click="submit" :loading="submitting" text>
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { getRoles } from "@/api/role";
import { updateUser } from "@/api/user";

export default {
  props: ["value", "item"],
  data() {
    return {
      // indications
      indications: {
        warning: "",
        error: "",
      },
      warningAlert: false,
      errorAlert: false,
      // form data
      formData: {},
      resetPassword: false,
      loading: false,
      submitting: false,
      roles: [],
    };
  },
  watch: {
    async value(val) {
      if (!val) {
        this.formData = {};
        this.resetPassword = false;
        this.$refs.form.resetValidation();
        this.errorAlert = false;
        this.warningAlert = false;
      } else {
        this.loading = true;
        this.roles = this.$permission("role:retrieve")
          ? (await getRoles()).result
          : [];
        this.formData = JSON.parse(JSON.stringify(this.item));
        this.loading = false;
      }
    },
  },
  computed: {
    modified() {
      return JSON.stringify(this.item) !== JSON.stringify(this.formData);
    },
  },
  methods: {
    async submit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        "password" in this.formData &&
          !this.formData["password"] &&
          delete this.formData["password"];

        if (this.modified) {
          this.submitting = true;
          delete this.formData["id"];
          await updateUser(this.item.id, this.formData);

          this.$notify.success("Update saved!");
          // authorities current user owning maybe changed
          // so reset signed-in user
          await this.$store.dispatch("auth/setSignedInUser");
          setTimeout(() => {
            this.$notify.loading("Reload..");
            this.$emit("reload");
          }, 800);
          this.submitting = false;
        }
        this.$emit("input", false);
      }
    },
  },
};
</script>
