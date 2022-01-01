<template>
  <v-container>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div class="display-1 text-center font-weight-bold mb-6">Write New Blog</div>
    <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="12">
          <v-text-field outlined label="Blog title" v-model="title" :rules="requiredField" />
        </v-col>
        <v-col cols="12">
          <ckeditor v-model="description" :rules="requiredField" />
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn color="primary" depressed class="mb-4 text-capitalize" :disabled="!valid" type="submit">Publish Blog</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <app-snackbar />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AppSnackbar from "../../components/common/AppSnackbar.vue";
import { requiredField } from "../../validations/FieldValidation";

export default {
  components: { AppSnackbar },
  data: () => ({
    title: "",
    description: "",
    requiredField,
    valid: true,
  }),
  computed: {
    ...mapState(["isLoading"]),
  },

  methods: {
    handleSubmit() {
      this.$store.dispatch("doctor/postNewBlog", { header: this.title, post: this.description });
    },
  },
};
</script>

<style lang="scss" scoped></style>
