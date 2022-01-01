<template>
  <v-container>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row align="center">
      <v-col cols="12" sm="8" md="8" lg="6" offset-sm="2" offset-md="3">
        <v-radio-group row v-model="radioGroup">
          I am &nbsp;
          <v-radio v-for="(type, i) in accountType" :key="i" :label="type.title" :value="type.value" @change="changeAccountType(type)"></v-radio>
        </v-radio-group>
        <v-card rounded="lg" class="glass px-6">
          <v-card-title class="d-flex justify-center">Register as {{ showAccount === "doctor" ? "Doctor" : showAccount === "patient" ? "Patient" : "Lab Admin" }}</v-card-title>
          <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
            <!-- if the user is patient -->
            <v-row v-if="showAccount === 'patient'" dense>
              <v-col cols="12">
                <v-text-field outlined label="Username" v-model="userName" :rules="requiredField" />
              </v-col>
              <v-col cols="12">
                <v-text-field outlined label="Full name" v-model="fullName" :rules="requiredField" />
              </v-col>
              <v-col cols="12">
                <v-text-field outlined label="Email" v-model="email" />
              </v-col>
              <v-col cols="12">
                <v-text-field outlined label="Phone number" v-model="phoneNumber" :rules="validatePhoneNumber" />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  outlined
                  :type="showPass ? 'text' : 'password'"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPass = !showPass"
                  label="Password"
                  v-model="password"
                  :rules="requiredField"
                />
              </v-col>
            </v-row>

            <!-- if the user is doctor -->
            <v-row v-else-if="showAccount === 'doctor'" dense>
              <v-col cols="12">
                <v-text-field outlined label="Username" v-model="userName" :rules="requiredField" />
              </v-col>
              <v-col cols="12">
                <v-text-field outlined label="Full name" v-model="fullName" :rules="requiredField" />
              </v-col>
              <v-col cols="12">
                <v-text-field outlined label="Email" v-model="email" />
              </v-col>
              <v-col cols="12">
                <v-text-field outlined label="Designation" v-model="designation" :rules="requiredField" />
              </v-col>
              <v-col cols="12">
                <v-select outlined multiple item-value="value" item-text="title" return-object label="Specialty" :items="doctorSpecialty" v-model="specialty" :rules="requiredField" />
              </v-col>
              <v-col cols="12">
                <v-text-field outlined label="Phone number" v-model="phoneNumber" :rules="validatePhoneNumber" />
              </v-col>
              <v-col cols="12">
                <v-file-input prepend-icon="" outlined label="License image" :loading="imageLoading" hint="Upload only .jpg or .png format of image" @change="handleFileChange"></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  outlined
                  :type="showPass ? 'text' : 'password'"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPass = !showPass"
                  label="Password"
                  v-model="password"
                  :rules="requiredField"
                />
              </v-col>
            </v-row>

            <!-- if the user is lab admin -->
            <v-row v-else dense>
              <v-col cols="12">
                <v-text-field outlined label="Username" v-model="userName" :rules="requiredField" />
              </v-col>
              <v-col cols="12">
                <v-text-field outlined label="Lab name" v-model="fullName" :rules="requiredField" />
              </v-col>
              <v-col cols="12">
                <v-text-field outlined label="Email" v-model="email" />
              </v-col>
              <v-col cols="12">
                <v-text-field outlined label="Phone number" v-model="phoneNumber" :rules="validatePhoneNumber" />
              </v-col>
              <v-col cols="12">
                <v-file-input prepend-icon="" outlined label="License image" persistent-hint :loading="imageLoading" hint="Upload only .jpg or .png format of image" @change="handleFileChange" />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  outlined
                  :type="showPass ? 'text' : 'password'"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPass = !showPass"
                  label="Password"
                  v-model="password"
                  :rules="requiredField"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-btn color="primary" block class="mb-4" :disabled="!valid" type="submit">Create Account</v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <app-snackbar />
  </v-container>
</template>

<script>
import { requiredField, validatePhoneNumber } from "../validations/FieldValidation";
import { accountType, doctorSpecialty } from "../utils/Constants";
import { mapState } from "vuex";
import AppSnackbar from "../components/common/AppSnackbar.vue";

export default {
  components: { AppSnackbar },
  data: () => ({
    accountType,
    designation: "",
    doctorSpecialty,
    email: "",
    fullName: "",
    imageLoading: false,
    password: "",
    phoneNumber: "",
    radioGroup: "patient",
    showAccount: "patient",
    showPass: false,
    specialty: "",
    userName: "",
    valid: true,
    validatePhoneNumber,
    requiredField,
  }),

  computed: {
    ...mapState(["isLoading"]),
  },

  methods: {
    changeAccountType(info) {
      if (info.value === "patient") {
        this.showAccount = "patient";
      } else if (info.value === "doctor") {
        this.showAccount = "doctor";
      } else {
        this.showAccount = "lab";
      }
    },

    handleFileChange(file) {
      this.imageLoading = true;
      this.$store.dispatch("auth/uploadImage", file).finally(() => (this.imageLoading = false));
    },

    handleSubmit() {
      console.log(this.radioGroup);
      if (this.radioGroup === "patient") {
        this.$store.dispatch("auth/registerUser", {
          role: "patient",
          patient: {
            user_name: this.userName,
            full_name: this.fullName,
            email: this.email || "",
            phone_no: this.phoneNumber,
            password: this.password,
          },
        });
      } else if (this.radioGroup === "doctor") {
        this.$store.dispatch("auth/registerUser", {
          role: "doctor",
          doctor: {
            user_name: this.userName,
            full_name: this.fullName,
            email: this.email || "",
            designation: this.designation,
            specialist: this.specialty,
            phone_no: this.phoneNumber,
            password: this.password,
          },
        });
      } else {
        this.$store.dispatch("auth/registerUser", {
          role: "lab",
          lab: {
            user_name: this.userName,
            full_name: this.fullName,
            email: this.email || "",
            phone_no: this.phoneNumber,
            password: this.password,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
