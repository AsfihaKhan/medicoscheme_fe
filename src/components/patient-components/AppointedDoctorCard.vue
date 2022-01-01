<template>
  <v-card rounded="lg" outlined>
    <v-card-text>
      <circle-image :img="appointmentInfo.picture || defaultImage" />
    </v-card-text>
    <v-card-text>
      <v-row dense>
        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Serial No.</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="title ">{{ appointmentInfo.serial_num }}</div>
        </v-col>

        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Name:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1 ">{{ appointmentInfo.full_name }}</div>
        </v-col>

        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Designation:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1">{{ appointmentInfo.designation }}</div>
        </v-col>

        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Specialty:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1">
            <div v-if="appointmentInfo.specialist === null">
              No specialty found
            </div>
            <div v-else>
              <span v-for="(specialty, index) in appointmentInfo.specialist" :key="index"> {{ specialty.title }} </span>
            </div>
          </div>
        </v-col>

        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Appointment Date:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1">{{ moment(appointmentInfo.appointment_date).format("LL") }}</div>
        </v-col>

        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Paid:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1">{{ appointmentInfo.amount }}&nbsp;৳</div>
        </v-col>

        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Transaction ID:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1">{{ appointmentInfo.trx_id }}</div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import CircleImage from "../common/CircleImage.vue";
import { defaultImage } from "../../utils/Constants";
import moment from "moment";

export default {
  props: ["appointmentInfo"],
  components: { CircleImage },

  data: () => ({
    defaultImage,
    moment,
  }),
};
</script>

<style lang="scss" scoped></style>
