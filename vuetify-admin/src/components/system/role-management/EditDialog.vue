<template>
  <v-dialog :value="value" width="400px" persistent>
    <v-card>
      <v-card-title> Edit Role </v-card-title>
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
                label="Name*"
                required
                v-model="formData['name']"
                :rules="[(val) => !!val || 'Name cannot be empty!']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Description*"
                v-model="formData['description']"
              ></v-text-field>
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
import { updateRole } from "@/api/role";
export default {
  props: ["value", "item"],
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
      } else {
        this.formData = JSON.parse(JSON.stringify(this.item));
      }
    },
  },
  computed: {
    modified() {
      return JSON.stringify(this.formData) !== JSON.stringify(this.item);
    },
  },
  methods: {
    async submit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        if (this.modified) {
          this.submitting = true;
          delete this.formData["id"];
          await updateRole(this.item.id, this.formData);
          this.submitting = false;

          this.$notify.success("Update saved!");
          setTimeout(() => {
            this.$notify.loading("Reloading..");
            this.$emit("reload");
          }, 800);
        }
      }
      this.$emit("input", false);
    },
  },
};
</script>
