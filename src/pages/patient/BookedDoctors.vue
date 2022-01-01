<template>
  <v-container>
    <div v-if="isLoading">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
    <div v-else>
      <div class="display-1 text-center font-weight-bold mb-3">Booked Doctor List</div>
      <v-row>
        <v-col cols="12" md="6" v-for="doctor in bookedDoctorList" :key="doctor.doctor_id">
          <booked-doctor-card :info="doctor" />
        </v-col>
      </v-row>
    </div>
    <app-snackbar />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AppSnackbar from "../../components/common/AppSnackbar.vue";
import BookedDoctorCard from "../../components/patient-components/BookedDoctorCard.vue";

export default {
  components: { BookedDoctorCard, AppSnackbar },
  created() {
    this.$store.dispatch("patient/getBookedDoctors");
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapState("patient", ["bookedDoctorList"]),
  },
};
</script>

<style lang="scss" scoped></style>
