<template>
  <v-list nav dense>
    <v-list-item-group v-model="selectedOption" color="primary">
      <v-list-item v-for="option in options" :key="option.text" :to="option.link">
        <v-list-item-icon>
          <v-icon v-text="option.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="custom-font" v-text="option.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: ["options"],
  data: () => ({
    selectedOption: 0,
  }),
};
</script>

<style lang="scss" scoped></style>
