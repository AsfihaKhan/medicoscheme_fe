<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <dashboard-top-card cardTitle="Doctor Appointment" :count="dashboardInfo.DoctorAppointment" iconName="mdi-doctor" iconColor="green darken-2" />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <dashboard-top-card cardTitle="Lab Appointment" :count="dashboardInfo.LabAppointment" iconName="mdi-test-tube" iconColor="purple darken-2" />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <dashboard-top-card cardTitle="Total Cost" :count="dashboardInfo.TotalCost" iconName="mdi-currency-bdt" iconColor="deep-orange darken-2" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card rounded="lg">
          <v-card-title class="font-weight-medium" style="color: #00ACC1">Report List</v-card-title>
          <v-card-text>
            <report-list-table :reportInfo="dashboardInfo.ReportsInfo" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card rounded="lg">
          <v-card-title class="font-weight-medium" style="color: #00ACC1">Transaction History</v-card-title>
          <v-card-text>
            <transaction-list-table :transactionInfo="dashboardInfo.TransactionsInfo" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import DashboardTopCard from "../../components/common/DashboardTopCard.vue";
import ReportListTable from "../../components/patient-components/ReportListTable.vue";
import TransactionListTable from "../../components/patient-components/TransactionListTable.vue";

export default {
  components: { DashboardTopCard, ReportListTable, TransactionListTable },

  created() {
    this.$store.dispatch("patient/getDashboardInformation");
  },

  computed: {
    ...mapState(["isLoading"]),
    ...mapState("patient", ["dashboardInfo"]),
  },
};
</script>
