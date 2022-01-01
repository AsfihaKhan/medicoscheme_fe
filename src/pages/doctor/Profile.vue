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
            <v-text-field dense outlined v-model="fullName" :rules="requiredField" />
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Designation:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field dense outlined v-model="designation" :rules="requiredField" />
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Gender:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-radio-group v-model="genderType" row>
              <v-radio v-for="n in doctorGender" :key="n.value" :label="n.title" :value="n.value" />
            </v-radio-group>
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Degree:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-select dense outlined chips multiple :items="doctorDegree" return-object item-text="title" item-value="value" v-model="degree" />
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Specialty:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-select dense outlined chips multiple return-object :items="doctorSpecialty" item-value="value" item-text="title" v-model="specialty" />
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Bio:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-textarea outlined v-model="bio" />
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Phone number:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field dense outlined v-model="phoneNumber" :rules="validatePhoneNumber" />
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Email:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field dense outlined v-model="email" :rules="validateEmail" />
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Chamber Address:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-textarea outlined v-model="address" />
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Offday:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-select dense outlined v-model="offday" :items="weekDays" />
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Consulting time:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field dense outlined v-model="consultingTime" placeholder="ex. 10:00 am to 5:30pm" />
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Serial limit:</div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field dense outlined v-model="serialLimit" type="number" />
          </v-col>

          <v-col cols="12" sm="3">
            <div class="subtitle-1">Consulting Fees (৳):</div>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field dense outlined label="For New Patient" v-model="newPatientFees" :rules="validateNumericValue" />
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field dense outlined label="For Old Patient" v-model="oldPatientFees" :rules="validateNumericValue" />
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
import { doctorDegree, doctorGender, doctorSpecialty, weekDays } from "../../utils/Constants";
import CircleImage from "../../components/common/CircleImage.vue";
import AppSnackbar from "../../components/common/AppSnackbar.vue";

export default {
  components: { CircleImage, AppSnackbar },

  data: () => ({
    address: "",
    bio: "",
    consultingTime: "",
    degree: "",
    designation: "",
    email: "",
    fullName: "",
    genderType: "",
    imageLoading: false,
    newPatientFees: "",
    offday: "",
    oldPatientFees: "",
    phoneNumber: "",
    serialLimit: "",
    specialty: "",

    requiredField,
    valid: true,
    doctorDegree,
    doctorGender,
    doctorSpecialty,
    validateEmail,
    validateNumericValue,
    validatePhoneNumber,
    weekDays,
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
        doctor: {
          full_name: this.fullName,
          designation: this.designation,
          gender: this.genderType,
          bio: this.bio,
          age: this.age,
          phone_no: this.phoneNumber,
          email: this.email,
          chamber_address: this.address,
          offday: this.offday,
          consulting_time: this.consultingTime,
          consulting_fee_new: this.newPatientFees,
          consulting_fee_old: this.oldPatientFees,
          specialist: this.specialty,
          serial_limit: this.serialLimit,
          degree: this.degree,
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
        this.designation = this.profileInformation.Data.designation;
        this.genderType = this.profileInformation.Data.gender;
        this.degree = this.profileInformation.Data.degree;
        this.specialty = this.profileInformation.Data.specialist;
        this.bio = this.profileInformation.Data.bio;
        this.phoneNumber = this.profileInformation.Data.phone_no;
        this.email = this.profileInformation.Data.email;
        this.address = this.profileInformation.Data.chamber_address;
        this.offday = this.profileInformation.Data.offday;
        this.consultingTime = this.profileInformation.Data.consulting_time;
        this.serialLimit = this.profileInformation.Data.serial_limit;
        this.newPatientFees = this.profileInformation.Data.consulting_fee_new;
        this.oldPatientFees = this.profileInformation.Data.consulting_fee_old;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
