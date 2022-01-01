<template>
  <div>
    <hero-section />
    <v-container>
      <div class="display-2 text-center font-weight-bold my-6">
        Our Services
      </div>
      <services-section />
    </v-container>
  </div>
</template>

<script>
import HeroSection from "../components/Home/HeroSection.vue";
import ServicesSection from "../components/Home/ServicesSection.vue";
export default {
  components: { HeroSection, ServicesSection },
};
</script>

<style lang="scss" scoped></style>
