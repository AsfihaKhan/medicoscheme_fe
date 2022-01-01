<template>
  <div class="img-wrapper">
    <img :src="img" width="100%" height="100%" />
  </div>
</template>

<script>
export default {
  props: ["img"],
};
</script>

<style lang="scss" scoped>
.img-wrapper {
  width: 12em;
  height: 12em;
  object-fit: cover;
  object-position: center center;
  margin: 0 auto;

  img {
    border-radius: 50%;
  }
}
</style>
