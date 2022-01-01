<template>
  <div>
    <v-img src="https://firebasestorage.googleapis.com/v0/b/inventory-system-43dda.appspot.com/o/no_data.svg?alt=media&token=342d81ca-9769-4fd3-b496-540f27d82dbb" contain height="200">
      <template v-slot:placeholder>
        <v-sheet color="grey lighten-4">
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </v-sheet>
      </template>
    </v-img>
    <div class="overline text-center">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: ["message"],
};
</script>

<style lang="scss" scoped>
.overline {
  font-family: "Rubik", sans-serif !important;
}
</style>
