<template>
  <v-snackbar v-model="show" :color="color" top right>
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="show = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "SHOW_SNACKBAR") {
        this.text = state.snackbarText;
        this.color = state.snackbarColor;
        this.show = true;
      }
    });
  },
  data() {
    return {
      show: false,
      color: "",
      text: "",
    };
  },
};
</script>
