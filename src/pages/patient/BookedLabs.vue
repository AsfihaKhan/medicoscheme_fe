<template>
  <v-container>
    <div v-if="isLoading">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>

    <div v-else>
      <div class="display-1 text-center font-weight-bold mb-3">Booked Lab List</div>

      <v-row>
        <v-col cols="12" sm="6" v-for="lab in bookedLabList" :key="lab.lab_id">
          <booked-lab-card :info="lab" />
        </v-col>
      </v-row>
    </div>
    <app-snackbar />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AppSnackbar from "../../components/common/AppSnackbar.vue";
import BookedLabCard from "../../components/patient-components/BookedLabCard.vue";

export default {
  components: { BookedLabCard, AppSnackbar },

  created() {
    this.$store.dispatch("patient/getBookedLabs");
  },

  computed: {
    ...mapState(["isLoading"]),
    ...mapState("patient", ["bookedLabList"]),
  },
};
</script>

<style lang="scss" sc BookedLabCardoped></style>
