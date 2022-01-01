<template>
  <v-container>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <div class="display-2 text-center font-weight-bold mb-12">Health Tips From Our Consultants</div>

    <v-row>
      <v-col cols="12" v-for="blog in publicBlogs" :key="blog.id">
        <blog-list-card :blogInfo="blog" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import BlogListCard from "../components/common/BlogListCard.vue";

export default {
  components: { BlogListCard },

  created() {
    this.$store.dispatch("common/getPublicBlogs");
  },

  computed: {
    ...mapState(["isLoading"]),
    ...mapState("common", ["publicBlogs"]),
  },
};
</script>

<style lang="scss" scoped></style>
