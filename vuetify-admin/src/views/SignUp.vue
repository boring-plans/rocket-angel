<template>
  <v-container
    fill-height
    class="justify-center"
    style="background-color: #233a5f"
    fluid
  >
    <v-card
      :loading="submitting"
      class="col-lg-3 col-sm-5 pt-0"
      style="
        margin-bottom: 48px;
        background-color: #17263d;
        box-shadow: 0 0 10px #17263d;
      "
      dark
    >
      <v-card-text>
        <v-row class="align-center justify-center mt-2 mb-3">
          <v-img
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light.svg"
            class="mr-2"
            max-width="32"
          ></v-img>
          <span class="text-h5" style="color: #fff"> Vuetify Admin </span>
        </v-row>

        <v-alert
          text
          color="warning"
          dismissible
          close-icon="mdi-close"
          v-model="warningAlert"
          >{{ indications.warning }}</v-alert
        >
        <v-alert
          text
          color="error"
          dismissible
          close-icon="mdi-close"
          v-model="errorAlert"
          >{{ indications.error }}</v-alert
        >
        <v-form ref="signInForm" lazy-validation class="mb-4">
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field
                v-model="username"
                :rules="[(v) => !!v || 'Username cannot be empty!']"
                label="Username*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                :type="passwordType ? 'password' : 'text'"
                v-model="password"
                :rules="[(v) => !!v || 'Password cannot be empty!']"
                label="Password*"
                required
                :append-icon="passwordType ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="passwordType = !passwordType"
                @keydown="whenPressingEnter"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                :type="passwordTypeAgain ? 'password' : 'text'"
                v-model="passwordAgain"
                :rules="[
                  (v) => !!v || 'Please type password again!',
                  (v) =>
                    !password ||
                    password === v ||
                    'passwords typed are not the same!',
                ]"
                label="Password Again*"
                required
                :append-icon="passwordTypeAgain ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="passwordTypeAgain = !passwordTypeAgain"
                @keydown="whenPressingEnter"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-btn color="primary" @click="signUp" block :disabled="submitting">
          Sign Up
        </v-btn>
      </v-card-text>
      <v-card-actions class="text-caption py-0">
        <v-card-actions>Already a member?</v-card-actions>
        <router-link to="/sign-in" style="color: white">Sign In</router-link>
        <v-spacer />
      </v-card-actions>
    </v-card>
    <v-toolbar
      style="
        background-color: #17263d;
        width: 100%;
        color: #959da4;
        letter-spacing: 2px;
        font-size: 12px;
        font-weight: 618;
      "
      dense
      absolute
      bottom
      flat
      class="ma-0"
    >
      <v-spacer />
      <div class="text-right">
        By
        <a href="https://github.com/boring-plans" style="color: #fff">
          Newest boy
        </a>
        <br />version {{ version }}
      </div>
    </v-toolbar>
  </v-container>
</template>
<script>
import { version } from "../../package.json";
import { signUp } from "@/api/auth";

export default {
  data() {
    return {
      username: "",
      password: "",
      passwordAgain: "",
      submitting: false,
      passwordType: true,
      passwordTypeAgain: true,
      warningAlert: false,
      errorAlert: false,
      indications: { warning: "", error: "" },
      version,
    };
  },
  methods: {
    async signUp() {
      // validate and login
      const valid = this.$refs["signInForm"].validate();
      if (valid) {
        this.submitting = true;
        const response = await signUp(this.username, this.password);
        if (response.code === 0) {
          sessionStorage.setItem("va-access-token", response.result);
          await this.$router.push("/");
        } else {
          this.indications.error = response.message;
          this.errorAlert = true;
        }
        this.submitting = false;
      }
    },
    whenPressingEnter(e) {
      if (e.key === "Enter") {
        this.signUp();
      }
    },
  },
};
</script>
