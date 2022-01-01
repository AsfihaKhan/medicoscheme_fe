<template>
  <v-card rounded="lg">
    <v-card-text>
      <v-row>
        <v-col cols="9">
          <div class="title">{{ cardTitle }}</div>
          <div class="display-2 font-weight-bold">{{ iconName === "mdi-currency-bdt" ? numeral(count).format("0.0a") : count }}</div>
        </v-col>
        <v-col cols="3" class="d-flex justify-center align-center">
          <v-icon :color="iconColor" x-large>{{ iconName }}</v-icon>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import numeral from "numeral";
export default {
  props: ["cardTitle", "count", "iconName", "iconColor"],
  data: () => ({
    numeral,
  }),
};
</script>

<style lang="scss" scoped></style>
