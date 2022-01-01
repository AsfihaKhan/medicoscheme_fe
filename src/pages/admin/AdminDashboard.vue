<template>
  <v-container>
    <div v-if="isLoading">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <dashboard-top-card cardTitle="Total Patients" :count="dashboardInfo.TotalPatientsInfo" iconName="mdi-account-multiple" iconColor="blue accent-2" />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <dashboard-top-card cardTitle="Total Doctors" :count="dashboardInfo.TotalDoctorsInfo" iconName="mdi-doctor" iconColor="amber darken-2" />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <dashboard-top-card cardTitle="Total Labs" :count="dashboardInfo.TotalLabsInfo" iconName="mdi-store-24-hour" iconColor="purple darken-2" />
        </v-col>
        <v-col cols="12" sm="6">
          <dashboard-top-card cardTitle="Total Transactions" :count="dashboardInfo.TotalTransactionsInfo" iconName="mdi-wallet-membership" iconColor="green darken-2" />
        </v-col>
        <v-col cols="12" sm="6">
          <dashboard-top-card cardTitle="Total Reports" :count="dashboardInfo.TotalReportsInfo" iconName="mdi-chart-gantt" iconColor="light-blue darken-2" />
        </v-col>
      </v-row>
    </div>
    <app-snackbar />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AppSnackbar from "../../components/common/AppSnackbar.vue";
import DashboardTopCard from "../../components/common/DashboardTopCard.vue";

export default {
  components: { DashboardTopCard, AppSnackbar },
  created() {
    this.$store.dispatch("admin/getDashboardInformation");
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapState("admin", ["dashboardInfo"]),
  },
};
</script>

<style lang="scss" scoped></style>
