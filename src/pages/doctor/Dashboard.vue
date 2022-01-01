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
          <dashboard-top-card cardTitle="Total Patient" :count="dashboardInfo.TotalPatient" iconName="mdi-account-heart" iconColor="orange darken-2" />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <dashboard-top-card cardTitle="Total Earned" :count="dashboardInfo.TotalEarned" iconName="mdi-currency-bdt" iconColor="pink darken-2" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card rounded="lg">
            <v-card-title class="font-weight-bold" style="color: #00ACC1">Transaction History</v-card-title>
            <v-card-text>
              <payment-list-table :info="dashboardInfo.TransactionsInfo" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import DashboardTopCard from "../../components/common/DashboardTopCard.vue";
import PaymentListTable from "../../components/doctor-components/PaymentListTable.vue";

export default {
  components: { DashboardTopCard, PaymentListTable },

  created() {
    this.$store.dispatch("doctor/getDashboardInformation");
  },

  computed: {
    ...mapState(["isLoading"]),
    ...mapState("doctor", ["dashboardInfo"]),
  },
};
</script>

<style lang="scss" scoped></style>
