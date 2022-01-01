<template>
  <v-footer class="padless">
    <v-card flat tile width="100%" class="blue-grey darken-4 text-center">
      <v-card-text class="white--text"> {{ new Date().getFullYear() }} — <strong>Medico Scheme</strong> </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
.padless {
  padding: 0;
}
</style>
