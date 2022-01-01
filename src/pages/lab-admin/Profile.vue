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
            <div class="subtitle-1">Lab name:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field dense outlined v-model="labName" :rules="requiredField" />
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Address:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-textarea outlined v-model="address" :rules="requiredField" />
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Contact number:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field dense outlined v-model="phoneNumber" :rules="validatePhoneNumber" />
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Email:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field dense outlined v-model="email" />
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Report Delivery Time:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field dense outlined v-model="reportDeliveryTime" />
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
import CircleImage from "../../components/common/CircleImage.vue";
import AppSnackbar from "../../components/common/AppSnackbar.vue";

export default {
  components: { CircleImage, AppSnackbar },
  data: () => ({
    address: "",
    email: "",
    imageLoading: false,
    labName: "",
    phoneNumber: "",
    reportDeliveryTime: "",

    requiredField,
    valid: true,
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
        lab: {
          full_name: this.labName,
          address: this.address,
          phone_no: this.phoneNumber,
          email: this.email,
          report_deliverytime: this.reportDeliveryTime,
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
        this.labName = this.profileInformation.Data.full_name;
        this.address = this.profileInformation.Data.address;
        this.phoneNumber = this.profileInformation.Data.phone_no;
        this.email = this.profileInformation.Data.email;
        this.reportDeliveryTime = this.profileInformation.Data.report_deliverytime;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
