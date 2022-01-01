<template>
  <v-img class="bordered mx-auto" contain max-width="500" height="auto" :src="image_url" />
</template>

<script>
export default {
  props: ["image_url"],
};
</script>

<style lang="scss" scoped>
.bordered {
  border-radius: 30% 70% 70% 30% / 36% 44% 60% 64%;
  box-shadow: 1px 10px 24px -3px rgba(235, 235, 235, 0.96);
}
</style>
