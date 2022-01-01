<template>
  <v-card outlined rounded="lg">
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
          <div class="subtitle-1 font-weight-medium">Address:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1">{{ info.address }}</div>
        </v-col>

        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Contact number:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1">{{ info.phone_no }}</div>
        </v-col>

        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Total appointment:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1">{{ info.totalAppointment }}</div>
        </v-col>

        <v-col cols="12" sm="4" class="d-flex align-center">
          <div class="subtitle-1 font-weight-medium">Rating:</div>
        </v-col>
        <v-col cols="12" sm="6">
          <v-rating v-model="info.ratings" color="yellow darken-3" background-color="grey darken-1" empty-icon="$ratingFull" half-increments hover />
        </v-col>
        <v-col cols="12" sm="2" class="d-flex align-center">
          <v-btn depressed small @click="changeRating(info)">Submit</v-btn>
        </v-col>

        <v-col cols="12">
          <v-expansion-panels flat>
            <v-expansion-panel class="rounded-lg">
              <v-expansion-panel-header>
                Service history
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <booked-lab-service-table :history="info.serviceHistory" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import CircleImage from "../common/CircleImage.vue";
import BookedLabServiceTable from "./BookedLabServiceTable.vue";
import { defaultImage } from "../../utils/Constants";

export default {
  props: ["info"],
  components: { CircleImage, BookedLabServiceTable },

  data: () => ({
    defaultImage,
  }),

  methods: {
    changeRating(value) {
      console.log(value);
      this.$store.dispatch("patient/createReview", { lab_id: value.lab_id, ratings: value.ratings });
    },
  },
};
</script>

<style lang="scss" scoped></style>
