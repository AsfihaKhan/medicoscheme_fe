<template>
  <v-card rounded="lg" outlined>
    <v-card-text>
      <circle-image :img="info.picture || defaultImage" />
    </v-card-text>
    <v-card-text>
      <v-row dense>
        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Name:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1 ">{{ info.full_name }}</div>
        </v-col>

        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Designation:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1">{{ info.designation }}</div>
        </v-col>

        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Specialty:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1">
            <div v-if="info.specialist === null">
              No specialty found
            </div>
            <div v-else>
              <span v-for="(specialty, index) in info.specialist" :key="index"> {{ specialty.title }} </span>
            </div>
          </div>
        </v-col>

        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Last paid:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1">{{ info.amount }}&nbsp;৳</div>
        </v-col>

        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Last appointment:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1">{{ moment(info.appointment_date).format("LL") }}</div>
        </v-col>

        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Total appointment:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1">{{ info.totalAppointment }}</div>
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
  props: ["info"],
  components: { CircleImage },

  data: () => ({
    defaultImage,
    moment,
  }),
};
</script>

<style lang="scss" scoped></style>
