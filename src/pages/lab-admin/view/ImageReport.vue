<template>
  <v-container>
    <div v-if="isLoading">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
    <div v-else>
      <div class="display-2 my-6 text-center">Report Information</div>

      <v-row dense>
        <v-col cols="12" sm="3">
          <div class="subtitle-1">Patient Name:</div>
        </v-col>
        <v-col cols="12" sm="9"> {{ reportInfo.full_name }}</v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Age:</div>
        </v-col>
        <v-col cols="12" sm="9"> {{ reportInfo.age }}</v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Gender:</div>
        </v-col>
        <v-col cols="12" sm="9"> {{ reportInfo.gender }}</v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Phone Number:</div>
        </v-col>
        <v-col cols="12" sm="9"> {{ reportInfo.phone_no }}</v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Report Name:</div>
        </v-col>
        <v-col cols="12" sm="9">
          {{ reportInfo.Data.report_name }}
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Referred Doctor:</div>
        </v-col>
        <v-col cols="12" sm="9">
          {{ reportInfo.Data.referred_by }}
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Appointment Date:</div>
        </v-col>
        <v-col cols="12" sm="9">
          {{ moment(reportInfo.appointment_date).format("LL") }}
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Delivery Date:</div>
        </v-col>
        <v-col cols="12" sm="9">
          {{ moment(reportInfo.Data.delivery_time).format("LL") }}
        </v-col>

        <v-col cols="12" sm="8">
          <v-img :src="reportInfo.Data.image[0]" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

export default {
  data: () => ({
    moment,
  }),

  created() {
    this.$store.dispatch("lab/getReportDetails", this.$route.params.id);
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapState("lab", ["reportInfo"]),
  },
};
</script>

<style lang="scss" scoped></style>
