<template>
  <v-container>
    <div v-if="isLoading">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>

    <div v-else>
      <div class="display-1 text-center font-weight-bold mb-6">Renowned Doctor</div>
      <v-row>
        <v-col cols="12" sm="6" md="4" v-for="doctor in getAcceptedDoctors" :key="doctor.id">
          <doctor-list-card :doctorInfo="doctor" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import DoctorListCard from "../../components/patient-components/DoctorListCard.vue";

export default {
  components: { DoctorListCard },

  created() {
    this.$store.dispatch("admin/getDoctorList");
  },

  computed: {
    ...mapState(["isLoading"]),
    ...mapGetters("admin", ["getAcceptedDoctors"]),
  },
};
</script>

<style lang="scss" scoped></style>
