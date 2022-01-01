<template>
  <v-card rounded="lg">
    <v-card-text>
      <v-row dense>
        <v-col cols="4">
          <div class="subtitle-1 font-weight-medium">Name:</div>
        </v-col>
        <v-col cols="6">
          <div class="subtitle-1">{{ info.full_name }}</div>
        </v-col>
        <v-col cols="4">
          <div class="subtitle-1 font-weight-medium">Age:</div>
        </v-col>
        <v-col cols="6">
          <div class="subtitle-1">{{ info.age }}</div>
        </v-col>
        <v-col cols="4">
          <div class="subtitle-1 font-weight-medium">Gender:</div>
        </v-col>
        <v-col cols="6">
          <div class="subtitle-1">{{ info.gender }}</div>
        </v-col>
        <v-col cols="4">
          <div class="subtitle-1 font-weight-medium">Paid:</div>
        </v-col>
        <v-col cols="6">
          <div class="subtitle-1">{{ info.amount }}&nbsp;৳</div>
        </v-col>
        <v-col cols="4">
          <div class="subtitle-1 font-weight-medium">App. Date:</div>
        </v-col>
        <v-col cols="6">
          <div class="subtitle-1">{{ moment(info.appointment_date).format("LL") }}</div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions v-if="info.status === 'open'">
      <v-btn block outlined color="primary" class="text-capitalize" @click="confirmAppointment(info.id)">Complete Appointment</v-btn>
    </v-card-actions>
    <v-card-actions v-if="info.status === 'complete'">
      <v-btn block outlined color="primary" class="text-capitalize" disabled>Appointment completed</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  props: ["info"],
  data: () => ({
    moment,
  }),

  methods: {
    confirmAppointment(info) {
      this.$store.dispatch("doctor/confirmAppointment", info);
    },
  },
};
</script>

<style lang="scss" scoped></style>
