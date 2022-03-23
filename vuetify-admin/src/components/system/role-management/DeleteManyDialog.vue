<template>
  <v-dialog :value="value" width="400px" persistent>
    <v-card>
      <v-card-title> Delete Confirm </v-card-title>
      <v-card-text class="my-4">
        <v-icon color="warning" class="mr-1" small>mdi-alert-circle</v-icon>
        Sure to delete these {{ items.length }} roles？
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
import { deleteRoles } from "@/api/role";

export default {
  props: ["value", "items"],
  data() {
    return {
      submitting: false,
    };
  },
  methods: {
    async submit() {
      this.submitting = true;
      await deleteRoles(this.items);
      this.submitting = false;
      this.$emit("input", false);
      this.$notify.success("Deleted!");
      setTimeout(() => {
        this.$notify.loading("Reloading..");
        this.$emit("reload");
      }, 800);
    },
  },
};
</script>
