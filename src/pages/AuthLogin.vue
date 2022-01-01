<template>
  <v-container>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row align="center">
      <v-col cols="12" sm="8" md="8" lg="6" offset-sm="2" offset-md="3">
        <v-card rounded="lg" class="glass px-6">
          <v-card-title class="d-flex justify-center">Welcome back</v-card-title>
          <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
            <v-row>
              <v-col cols="12">
                <v-text-field outlined label="Username*" v-model="username" :rules="requiredField" hide-details />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  outlined
                  :type="showPass ? 'text' : 'password'"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPass = !showPass"
                  label="Password*"
                  v-model="password"
                  :rules="requiredField"
                />
              </v-col>

              <v-btn color="primary" block class="mb-4" :disabled="!valid" type="submit">Login</v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
      <app-snackbar />
    </v-row>
  </v-container>
</template>

<script>
import { requiredField } from "../validations/FieldValidation";
import { mapState } from "vuex";
import AppSnackbar from "../components/common/AppSnackbar.vue";

export default {
  components: { AppSnackbar },
  data: () => ({
    password: "",
    username: "",
    valid: true,
    requiredField,
    showPass: false,
  }),
  computed: {
    ...mapState(["isLoading"]),
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch("auth/authenticateUser", { user_name: this.username, password: this.password });
    },
  },
};
</script>

<style lang="scss" scoped></style>
