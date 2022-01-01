<template>
  <v-card rounded="lg">
    <v-card-title>{{ blogInfo.header }}</v-card-title>
    <v-card-text v-html="formatPost"> </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" class="text-capitalize" :to="`/doctor/edit-blog/${blogInfo.id}`">Edit Blog <v-icon right> mdi-pencil</v-icon> </v-btn>
      <v-btn text color="red" class="text-capitalize" @click="deleteBlog(blogInfo.id)">Delete Blog <v-icon right>mdi-delete</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["blogInfo"],

  computed: {
    formatPost() {
      return this.blogInfo.post.substring(0, 250).concat("...");
    },
  },

  methods: {
    deleteBlog(info) {
      this.$store.dispatch("doctor/deleteBlog", info);
    },
  },
};
</script>

<style lang="scss" scoped></style>
