<template>
  <v-container>
    <div v-if="isLoading">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>

    <div v-else>
      <div class="display-1 font-weight-bold text-center mb-6">Pending Patient Reports</div>

      <v-row>
        <v-col cols="12" sm="6" md="4" v-for="patient in pendingPatients" :key="patient.id">
          <pateint-list-card :info="patient" />
        </v-col>
      </v-row>
    </div>
    <app-snackbar />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AppSnackbar from "../../components/common/AppSnackbar.vue";
import PateintListCard from "../../components/lab-components/PateintListCard.vue";

export default {
  components: { PateintListCard, AppSnackbar },

  created() {
    this.$store.dispatch("lab/getPendingPatients");
  },

  computed: {
    ...mapState(["isLoading"]),
    ...mapState("lab", ["pendingPatients"]),
  },
};
</script>

<style lang="scss" scoped></style>
