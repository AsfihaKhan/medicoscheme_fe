<template>
  <v-container>
    <div v-if="isLoading">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
    <div v-else>
      <div class="display-2 my-6 text-center">Report Information</div>

      <v-row dense>
        <v-col cols="12" sm="3">
          <div class="subtitle-1">Patient Name:</div>
        </v-col>
        <v-col cols="12" sm="9"> {{ reportInfo.full_name }}</v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Age:</div>
        </v-col>
        <v-col cols="12" sm="9"> {{ reportInfo.age }}</v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Gender:</div>
        </v-col>
        <v-col cols="12" sm="9"> {{ reportInfo.gender }}</v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Phone Number:</div>
        </v-col>
        <v-col cols="12" sm="9"> {{ reportInfo.phone_no }}</v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Report Name:</div>
        </v-col>
        <v-col cols="12" sm="9">
          {{ reportInfo.Data.report_name }}
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Referred Doctor:</div>
        </v-col>
        <v-col cols="12" sm="9">
          {{ reportInfo.Data.referred_by }}
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Appointment Date:</div>
        </v-col>
        <v-col cols="12" sm="9">
          {{ moment(reportInfo.appointment_date).format("LL") }}
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Delivery Date:</div>
        </v-col>
        <v-col cols="12" sm="9">
          {{ moment(reportInfo.Data.delivery_time).format("LL") }}
        </v-col>
      </v-row>

      <v-divider class="my-8"></v-divider>
      <v-subheader>Report Information</v-subheader>

      <v-row dense>
        <v-col cols="12" sm="3">
          <div class="subtitle-1">Color</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.color }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Appearance</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.appearance }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Sedimeent</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.sedimeent }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Reaction</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.reaction }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Albumin</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.albumin }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Suger (reducing substance)</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.sugar }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Pus Cell</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.pus_cell }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Epithetical Cell</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.epithetical_cell }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">RBC</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.rbc }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Granular Cast</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.granular_cast }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">WBC Cast</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.wbc_cast }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Pus Cells Cast</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.pus_cells_cast }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Cellular Cast</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.cellular_cast }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Spermatozoa</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.spermatozoa }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Amorph Phosphate</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.amorph_phosphate }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Calcium Oxalate</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.calcium_oxalate }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Uric Acid</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.uric_acid }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Urates</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.urates }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Triple Phosphate</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.triple_phosphate }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Calcium Carbonate</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.calcium_carbonate }}</div>
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Yest Cells</div>
        </v-col>
        <v-col cols="12" sm="9">
          <div class="subtitle-1">{{ reportInfo.Data.yest_cells }}</div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

export default {
  data: () => ({
    moment,
  }),

  created() {
    this.$store.dispatch("lab/getReportDetails", this.$route.params.id);
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapState("lab", ["reportInfo"]),
  },
};
</script>

<style lang="scss" scoped></style>
