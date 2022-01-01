<template>
  <v-container>
    <div v-if="isLoading">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
    <div v-else>
      <circle-image :img="imageURL" />
      <v-file-input hide-input prepend-icon="mdi-camera-plus" :loading="imageLoading" @change="handleFileChange" class="d-flex justify-center" />
      <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
        <div class="title my-6 text-decoration-underline">Personal Information</div>
        <v-row dense>
          <v-col cols="12" sm="3">
            <div class="subtitle-1">Username:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field dense outlined readonly :value="profileInformation.user_name" />
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Full name:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field dense outlined v-model="fullName" :value="profileInformation.Data.full_name" :rules="requiredField" />
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Age:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field dense outlined v-model="age" :rules="validateNumericValue" />
          </v-col>

          <v-col cols="12" sm="3" class="d-flex align-center">
            <div class="subtitle-1">Gender:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-radio-group v-model="genderType" row>
              <v-radio v-for="n in gender" :key="n.value" :label="n.title" :value="n.value" />
            </v-radio-group>
          </v-col>

          <v-col cols="12" sm="3" class="d-flex align-center">
            <div class="subtitle-1">Phone number:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field dense outlined v-model="phoneNumber" :rules="validatePhoneNumber" />
          </v-col>

          <v-col cols="12" sm="3" class="d-flex align-center">
            <div class="subtitle-1">Email:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field dense outlined v-model="email" :rules="validateEmail" />
          </v-col>

          <v-col cols="12" sm="3" class="d-flex align-center">
            <div class="subtitle-1">Address:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-textarea outlined v-model="address" />
          </v-col>

          <v-col cols="12" class="d-flex justify-center">
            <v-btn depressed color="primary" class="mb-4 text-capitalize" type="submit">Update Information</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
    <app-snackbar />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { requiredField, validateEmail, validateNumericValue, validatePhoneNumber } from "../../validations/FieldValidation";
import { gender } from "../../utils/Constants";
import CircleImage from "../../components/common/CircleImage.vue";
import AppSnackbar from "../../components/common/AppSnackbar.vue";

export default {
  components: { CircleImage, AppSnackbar },
  data: () => ({
    address: "",
    age: "",
    email: "",
    fullName: "",
    genderType: "",
    imageLoading: false,
    phoneNumber: "",
    valid: true,

    gender,
    requiredField,
    validateEmail,
    validateNumericValue,
    validatePhoneNumber,
  }),
  created() {
    this.$store.dispatch("common/getProfileInformation");
    setTimeout(() => {
      this.setProfileInformation();
      this.setProfileImage();
    }, 1000);
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapState("common", ["profileInformation", "imageURL"]),
  },
  methods: {
    handleFileChange(file) {
      console.log(file);
      this.imageLoading = true;
      this.$store.dispatch("common/uploadImage", file).finally(() => (this.imageLoading = false));
    },

    handleSubmit() {
      this.$store.dispatch("common/updateProfileInformation", {
        patient: {
          full_name: this.fullName,
          age: this.age,
          gender: this.genderType,
          email: this.email,
          phone_no: this.phoneNumber,
          address: this.address,
        },
      });
    },

    // set image to the imageURL if the image is already set in the profile
    setProfileImage() {
      if (this.profileInformation.Data.picture !== "" || this.profileInformation.Data.picture !== null || this.profileInformation.Data.picture !== undefined) {
        this.$store.commit("common/PROFILE_IMAGE_PREVIEW", this.profileInformation.Data.picture);
      }
    },

    setProfileInformation() {
      if (this.profileInformation.user_name) {
        this.fullName = this.profileInformation.Data.full_name;
        this.age = this.profileInformation.Data.age;
        this.genderType = this.profileInformation.Data.gender;
        this.phoneNumber = this.profileInformation.Data.phone_no;
        this.email = this.profileInformation.Data.email;
        this.address = this.profileInformation.Data.address;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
