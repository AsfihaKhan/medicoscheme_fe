<template>
  <v-container>
    <div v-if="isLoading">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>

    <div v-else>
      <div class="display-1 text-center font-weight-bold">Patient List</div>

      <v-row>
        <v-col cols="12" sm="6" lg="4" v-for="appointment in appointmentList" :key="appointment.id">
          <patient-card :info="appointment" />
        </v-col>
      </v-row>
    </div>
    <app-snackbar />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AppSnackbar from "../../components/common/AppSnackbar.vue";
import PatientCard from "../../components/doctor-components/PatientCard.vue";

export default {
  components: { PatientCard, AppSnackbar },

  created() {
    this.$store.dispatch("doctor/getAllAppointments");
  },

  computed: {
    ...mapState(["isLoading"]),
    ...mapState("doctor", ["appointmentList"]),
  },
};
</script>

<style lang="scss" scoped></style>
