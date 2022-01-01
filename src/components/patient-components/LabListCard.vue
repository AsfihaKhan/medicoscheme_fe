<template>
  <v-card rounded="lg">
    <v-img :src="labInfo.picture" alt="Lab" class="rounded-lg" aspect-ratio="16/9" width="100%" height="200" />
    <v-row dense>
      <v-col cols="12" class="my-0 py-0">
        <v-card-title class="font-weight-bold">{{ labInfo.full_name }} </v-card-title>
        <v-card-text>
          <div class="subtitle-1"><span class="font-weight-medium text-decoration-underline">Address: </span>&nbsp; {{ labInfo.address }}</div>
          <div class="subtitle-1"><span class="font-weight-medium text-decoration-underline">Contact number:</span>&nbsp; {{ labInfo.phone_no }}</div>
        </v-card-text>
        <div class="d-flex align-end">
          <v-btn block depressed large color="primary" class="text-capitalize rounded-b-lg" :to="`/patient/lab-list/${labInfo.id}`">View Details <v-icon right dark>mdi-arrow-right</v-icon></v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { defaultImage } from "../../utils/Constants";
export default {
  props: ["labInfo"],
  data: () => ({
    defaultImage,
  }),
};
</script>

<style lang="scss" scoped></style>
