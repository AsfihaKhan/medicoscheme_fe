<template>
  <v-container>
    <v-tabs background-color="light-blue darken-1" centered dark icons-and-text>
      <v-tab>
        Pending Appointment
        <v-icon>mdi-account-clock</v-icon>
      </v-tab>

      <v-tab>
        Completed Appointment
        <v-icon>mdi-account-check</v-icon>
      </v-tab>

      <v-tab-item>
        <div class="display-1 text-center my-6">Pending Appointments</div>
        <v-row>
          <v-col cols="12" sm="6" v-for="appointment in openedAppointments" :key="appointment.id">
            <appointed-doctor-card :appointmentInfo="appointment" />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <div class="display-1 text-center my-6">Compeleted Appointments</div>
        <v-row>
          <v-col cols="12" sm="6" v-for="appointment in closedAppointments" :key="appointment.id">
            <appointed-doctor-card :appointmentInfo="appointment" />
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import AppointedDoctorCard from "../../components/patient-components/AppointedDoctorCard.vue";

export default {
  components: { AppointedDoctorCard },

  created() {
    this.$store.dispatch("patient/getAppointedDoctors");
  },
  computed: {
    ...mapGetters("patient", ["openedAppointments", "closedAppointments"]),
    ...mapState(["isLoading"]),
  },
};
</script>
