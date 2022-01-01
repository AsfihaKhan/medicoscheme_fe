<template>
  <v-alert outlined prominent text color="green darken-2">
    <v-row>
      <v-col cols="8">
        <div class="title font-weight-bold">{{ notificationInfo.header }}</div>
      </v-col>
      <v-col cols="4" class="d-flex justify-end">
        <div class="caption">
          {{
            moment(notificationInfo.createdAt)
              .startOf("day")
              .fromNow()
          }}
        </div>
      </v-col>
    </v-row>
    <p class="mt-2">
      {{ notificationInfo.details }}
    </p>
  </v-alert>
</template>

<script>
import moment from "moment";

export default {
  props: ["notificationInfo"],

  data: () => ({
    moment,
  }),
};
</script>

<style lang="scss" scoped></style>
