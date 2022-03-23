<template>
  <v-container
    fill-height
    class="justify-center"
    style="background-color: #233a5f"
    fluid
  >
    <v-card
      :loading="signingIn"
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
        <v-form ref="signInForm" lazy-validation>
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
          </v-row>
        </v-form>
        <v-card-actions class="px-0 mb-3">
          <v-checkbox
            label="Remember Me"
            dense
            v-model="rememberMe"
            hide-details
            class="customized-checkbox"
          />
          <v-spacer />
        </v-card-actions>
        <v-btn color="primary" @click="signIn" block :disabled="signingIn">
          Sign In
        </v-btn>
      </v-card-text>
      <v-card-actions class="text-caption py-0">
        <v-card-actions>Don't have an account yet?</v-card-actions>
        <router-link to="/sign-up" style="color: white">Sign Up</router-link>
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
import { getToken } from "@/api/auth";

export default {
  data() {
    return {
      username: "",
      password: "",
      signingIn: false,
      passwordType: true,
      rememberMe: false,
      warningAlert: false,
      errorAlert: false,
      indications: { warning: "", error: "" },
      version,
    };
  },
  methods: {
    async signIn() {
      // validate and login
      const valid = this.$refs["signInForm"].validate();
      if (valid) {
        this.signingIn = true;
        const response = await getToken(this.username, this.password);
        if (response.code === 0) {
          this.rememberMe
            ? localStorage.setItem("va-access-token", response.result)
            : sessionStorage.setItem("va-access-token", response.result);
          await this.$router.push("/");
        } else {
          this.indications.error = response.message;
          this.errorAlert = true;
        }
        this.signingIn = false;
      }
    },
    whenPressingEnter(e) {
      if (e.key === "Enter") {
        this.signIn();
      }
    },
  },
};
</script>
