<template>
  <v-card rounded="lg">
    <v-card-title>
      <div class="display-1">{{ blogInfo.header }}</div>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="8">
          <v-avatar color="primary" size="50"> <img :src="blogInfo.picture"/></v-avatar>
          <div class="title">{{ blogInfo.full_name }}</div>
          <div class="subtitle-1">{{ blogInfo.designation }}</div>
        </v-col>
        <v-col cols="4" class="d-flex justify-end align-end">
          <div class="body-2 font-weight-medium">Published: {{ moment(blogInfo.createdAt).format("LL") }}</div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text>
      <div class="body-1" v-html="formatPost"></div>
      <router-link :to="role === 'patient' ? `/patient/blogs/${blogInfo.id}` : `/blogs/${blogInfo.id}`">Continue reading</router-link>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  props: ["blogInfo"],

  data: () => ({
    moment,
  }),

  computed: {
    ...mapState(["isLoading"]),
    ...mapState("auth", ["role"]),

    formatPost() {
      return this.blogInfo.post.substring(0, 250).concat("...");
    },
  },
};
</script>

<style lang="scss" scoped></style>
