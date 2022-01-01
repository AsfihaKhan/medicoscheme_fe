<template>
  <div class="container">
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-btn small text color="secondary" :to="role === 'patient' ? '/patient/blogs' : '/blogs'"><v-icon left dark>mdi-chevron-left</v-icon>Back</v-btn>
    <v-container>
      <div class="display-1 text-center mb-6">{{ singleBlogInformation.header }}</div>
      <v-divider></v-divider>
      <v-row class="mt-2">
        <v-col cols="12" md="8">
          <v-avatar color="primary" size="50"><img :src="singleBlogInformation.picture"/></v-avatar>
          <div class="title">{{ singleBlogInformation.full_name }}</div>
          <div class="subtitle-1">{{ singleBlogInformation.designation }}</div>
        </v-col>
        <v-col cols="12" md="4" class="d-flex justify-end align-end">
          <div class="body-2 font-weight-medium">Published: {{ moment(singleBlogInformation.createdAt).format("LL") }}</div>
        </v-col>
      </v-row>
      <p class="mt-6 text-justify" v-html="singleBlogInformation.post"></p>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  data: () => ({
    moment,
  }),

  created() {
    this.$store.dispatch("doctor/getSingleBlogInformation", this.$route.params.id);
  },

  computed: {
    ...mapState(["isLoading"]),
    ...mapState("doctor", ["singleBlogInformation"]),
    ...mapState("auth", ["role"]),
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 850px;
}
</style>
