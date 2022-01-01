<template>
  <v-container>
    <div v-if="isLoading">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>

    <div v-else>
      <div class="display-1 text-center font-weight-bold mb-6">My Blogs</div>
      <v-row>
        <v-col cols="12" sm="6" v-for="blog in blogList" :key="blog.id">
          <blog-list-card :blogInfo="blog" />
        </v-col>
      </v-row>
    </div>
    <app-snackbar />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AppSnackbar from "../../components/common/AppSnackbar.vue";
import BlogListCard from "../../components/doctor-components/BlogListCard.vue";

export default {
  components: { BlogListCard, AppSnackbar },

  created() {
    this.$store.dispatch("doctor/getAllBlogs");
  },

  computed: {
    ...mapState(["isLoading"]),
    ...mapState("doctor", ["blogList"]),
  },
};
</script>

<style lang="scss" scoped></style>
