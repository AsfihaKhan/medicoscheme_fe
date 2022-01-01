<template>
  <v-container>
    <div v-if="isLoading">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>

    <div v-else>
      <v-btn small text color="secondary" to="/doctor/view-blogs"><v-icon left dark>mdi-chevron-left</v-icon>Back</v-btn>
      <div class="display-1 text-center font-weight-bold mb-6">Edit Blog</div>

      <v-row>
        <v-col cols="12">
          <v-text-field outlined label="Blog title" v-model="singleBlogInformation.header" :rules="requiredField" />
        </v-col>
        <v-col cols="12">
          <ckeditor v-model="singleBlogInformation.post" :rules="requiredField" />
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn color="primary" depressed class="mb-4 text-capitalize" :disabled="!valid" type="submit" @click="handleEditSubmit(singleBlogInformation)">Update Blog</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { requiredField } from "../../validations/FieldValidation";

export default {
  data: () => ({
    requiredField,
    valid: true,
  }),

  created() {
    this.$store.dispatch("doctor/getSingleBlogInformation", this.$route.params.id);
  },

  computed: {
    ...mapState(["isLoading"]),
    ...mapState("doctor", ["singleBlogInformation"]),
  },

  methods: {
    handleEditSubmit(info) {
      this.$store.dispatch("doctor/editSingleBlogInformation", { id: info.id, header: info.header, post: info.post });
    },
  },
};
</script>

<style lang="scss" scoped></style>
