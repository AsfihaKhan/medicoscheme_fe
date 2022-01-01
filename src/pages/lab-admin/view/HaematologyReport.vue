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
        <v-col cols="12" sm="9"> {{ reportInfo.Data.report_name }} </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Referred Doctor:</div>
        </v-col>
        <v-col cols="12" sm="9"> {{ reportInfo.Data.referred_by }} </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Appointment Date:</div>
        </v-col>
        <v-col cols="12" sm="9"> {{ moment(reportInfo.appointment_date).format("LL") }} </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Delivery Date:</div>
        </v-col>
        <v-col cols="12" sm="9"> {{ moment(reportInfo.Data.delivery_time).format("LL") }} </v-col>
      </v-row>

      <v-divider class="my-8"></v-divider>
      <v-subheader>Report Information</v-subheader>
      <v-row dense>
        <v-col cols="12" md="3">
          <div class="subtitle-1">Hemoglobin (Hb)</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="subtitle-1">{{ reportInfo.Data.hemoglobin_hb }}</div>
        </v-col>
        <v-col cols="12" md="5">
          <div class="subtitle-1">12.20-16.50 g/dL</div>
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">ESR (Westergren)</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="subtitle-1">{{ reportInfo.Data.esr_westergren }}</div>
        </v-col>
        <v-col cols="12" md="5">
          <div class="subtitle-1">Male: 0-10 mm. Female: 0-18 mm</div>
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">Neutrophils</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="subtitle-1">{{ reportInfo.Data.neutrophils }}</div>
        </v-col>
        <v-col cols="12" md="5">
          <div class="subtitle-1">40%-75%</div>
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">Lymphocytes</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="subtitle-1">{{ reportInfo.Data.lymphocytes }}</div>
        </v-col>
        <v-col cols="12" md="5">
          <div class="subtitle-1">20%-50%</div>
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">Monocytes</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="subtitle-1">{{ reportInfo.Data.monocytes }}</div>
        </v-col>
        <v-col cols="12" md="5">
          <div class="subtitle-1">2%-10%</div>
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">Eosinophils</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="subtitle-1">{{ reportInfo.Data.eosinophils }}</div>
        </v-col>
        <v-col cols="12" md="5">
          <div class="subtitle-1">0%-6%</div>
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">Basophils</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="subtitle-1">{{ reportInfo.Data.basophils }}</div>
        </v-col>
        <v-col cols="12" md="5">
          <div class="subtitle-1">1%</div>
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">HCT</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="subtitle-1">{{ reportInfo.Data.hct }}</div>
        </v-col>
        <v-col cols="12" md="5">
          <div class="subtitle-1"></div>
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">MCV</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="subtitle-1">{{ reportInfo.Data.mcv }}</div>
        </v-col>
        <v-col cols="12" md="5">
          <div class="subtitle-1">76-96 fL</div>
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">MCH</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="subtitle-1">{{ reportInfo.Data.mch }}</div>
        </v-col>
        <v-col cols="12" md="5">
          <div class="subtitle-1">27-32 pg</div>
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">MCHC</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="subtitle-1">{{ reportInfo.Data.mchc }}</div>
        </v-col>
        <v-col cols="12" md="5">
          <div class="subtitle-1">32-34 g/dL</div>
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">RBW-CV</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="subtitle-1">{{ reportInfo.Data.rbw_cv }}</div>
        </v-col>
        <v-col cols="12" md="5">
          <div class="subtitle-1">11.60-14.80%</div>
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">MPV</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="subtitle-1">{{ reportInfo.Data.mpv }}</div>
        </v-col>
        <v-col cols="12" md="5">
          <div class="subtitle-1">7.0-10 fL</div>
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">PWD</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="subtitle-1">{{ reportInfo.Data.pwd }}</div>
        </v-col>
        <v-col cols="12" md="5">
          <div class="subtitle-1">10%-18%</div>
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
