<template>
  <v-app>
    <app-navbar-authenticated />
    <v-main class="bg">
      <slot />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import AppFooter from "../components/theme-layout/AppFooter.vue";
import AppNavbarAuthenticated from "../components/theme-layout/AppNavbarAuthenticated.vue";

export default {
  components: { AppNavbarAuthenticated, AppFooter },
  name: "Default",
};
</script>

<style lang="scss" scoped>
.bg {
  background-color: #f5f5f5;
}
</style>
