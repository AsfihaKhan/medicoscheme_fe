<template>
  <v-container>
    <div v-if="isLoading">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
    <div v-else>
      <div class="display-1 text-center font-weight-bold mb-6">Detail Information of Lab</div>

      <v-row>
        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Lab Name:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1 ">{{ profileDetails.Data.full_name }}</div>
        </v-col>
        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Phone Number:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1 ">{{ profileDetails.Data.phone_no }}</div>
        </v-col>
        <v-col cols="12" sm="4">
          <div class="subtitle-1 font-weight-medium">Email:</div>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="subtitle-1 ">{{ profileDetails.Data.email }}</div>
        </v-col>
        <v-col cols="12" md="8">
          <v-img :src="profileDetails.Data.license" contain />
        </v-col>
      </v-row>
    </div>
    <v-row class="d-flex justify-center">
      <v-col cols="6" class="d-flex justify-end">
        <v-btn outlined color="red" class="text-capitalize" @click="rejectLab">Reject Request</v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn color="primary" depressed class="text-capitalize" @click="acceptLab">Accept Request</v-btn>
      </v-col>
    </v-row>
    <app-snackbar />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AppSnackbar from "../../components/common/AppSnackbar.vue";

export default {
  components: { AppSnackbar },
  created() {
    console.log(this.$route.params.id);
    this.$store.dispatch("admin/getSingleProfileInformation", this.$route.params.id);
  },

  computed: {
    ...mapState(["isLoading"]),
    ...mapState("admin", ["profileDetails"]),
  },

  methods: {
    acceptLab() {
      this.$store.dispatch("admin/acceptOrRejectLab", { id: this.$route.params.id, status: "accept" });
    },

    rejectLab() {
      this.$store.dispatch("admin/acceptOrRejectLab", { id: this.$route.params.id, status: "reject" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
