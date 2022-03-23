<template>
  <v-dialog :value="value" width="400px" persistent>
    <v-card>
      <v-card-title> Create Role </v-card-title>
      <v-card-text>
        <v-alert
          text
          type="warning"
          icon="mdi-alert-circle"
          dismissible
          close-icon="mdi-close"
          v-model="warningAlert"
        >
          {{ indications.warning }}
        </v-alert>
        <v-alert
          text
          type="error"
          icon="mdi-alert"
          dismissible
          close-icon="mdi-close"
          v-model="errorAlert"
        >
          {{ indications.error }}
        </v-alert>
        <v-form ref="form" class="pt-4">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Name*"
                required
                v-model="formData['name']"
                :rules="[(val) => !!val || 'Name cannot be empty!']"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Description"
                v-model="formData['description']"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('input', false)" text> Cancel </v-btn>
        <v-btn color="primary" @click="create" :loading="submitting" text>
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { createRole } from "@/api/role";
export default {
  props: ["value", "menus"],
  data() {
    return {
      indications: {
        warning: "",
        error: "",
      },
      warningAlert: false,
      errorAlert: false,
      formData: {},
      submitting: false,
    };
  },
  watch: {
    value(val) {
      if (!val) {
        this.warningAlert = false;
        this.errorAlert = false;
        this.formData = {};
        this.$refs.form.resetValidation();
      }
    },
  },
  methods: {
    async create() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.submitting = true;
        await createRole(this.formData);
        this.submitting = false;

        this.$emit("input", false);
        this.$notify.success("Created!");
        setTimeout(() => {
          this.$notify.loading("Reloading..");
          this.$emit("reload");
        }, 800);
      }
    },
  },
};
</script>
