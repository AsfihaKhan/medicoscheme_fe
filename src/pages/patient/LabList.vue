<template>
  <v-container>
    <div v-if="isLoading">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
    <div v-else>
      <div class="display-1 text-center font-weight-bold mb-6">Choose Lab</div>

      <v-row>
        <v-col cols="12" sm="6" md="4" v-for="lab in getAcceptedLabs" :key="lab.id">
          <lab-list-card :labInfo="lab" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import {mapGetters, mapState } from "vuex";
import LabListCard from "../../components/patient-components/LabListCard.vue";

export default {
  components: { LabListCard },

  created() {
    this.$store.dispatch("admin/getLabList");
  },

  computed: {
    ...mapState(["isLoading"]),
    ...mapGetters("admin", ["getAcceptedLabs"]),
  },
};
</script>

<style lang="scss" scoped></style>
