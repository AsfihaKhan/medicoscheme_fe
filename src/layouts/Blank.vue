<template>
  <v-app>
    <app-navbar-unauthenticated />
    <v-main>
      <slot />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import AppFooter from "../components/theme-layout/AppFooter.vue";
import AppNavbarUnauthenticated from "../components/theme-layout/AppNavbarUnauthenticated.vue";
export default {
  components: { AppFooter, AppNavbarUnauthenticated },
  name: "Blank",
};
</script>
