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
          <dashboard-top-card cardTitle="Total Patient" :count="dashboardInfo.TotalPatients" iconName="mdi-account-group" iconColor="amber darken-2" />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <dashboard-top-card cardTitle="Delivered Reports" :count="dashboardInfo.DeliveredReports" iconName="mdi-chart-gantt" iconColor="green darken-2" />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <dashboard-top-card cardTitle="Earned Money" :count="dashboardInfo.EarnedMoney" iconName="mdi-currency-bdt" iconColor="purple darken-2" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card rounded="lg">
            <v-card-title class="font-weight-medium" style="color: #00ACC1">Delivered Report of Patients</v-card-title>
            <v-card-text>
              <report-delivered-table :info="getValidatedReports" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import DashboardTopCard from "../../components/common/DashboardTopCard.vue";
import ReportDeliveredTable from "../../components/lab-components/ReportDeliveredTable.vue";

export default {
  components: { DashboardTopCard, ReportDeliveredTable },

  created() {
    this.$store.dispatch("lab/getDashboardInformation");
  },

  computed: {
    ...mapState(["isLoading"]),
    ...mapState("lab", ["dashboardInfo"]),
    ...mapGetters("lab", ["getValidatedReports"]),
  },
};
</script>

<style
  lang="scss
    ReportDeliveredTable"
  scoped
></style>
