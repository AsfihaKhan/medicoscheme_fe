<template>
  <v-container>
    <v-btn small text color="secondary" to="/lab/pending-patient-list"><v-icon left dark>mdi-chevron-left</v-icon>Back</v-btn>
    <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
      <div class="display-1 text-center font-weight-bold mb-6">PATHOLOGY REPORT</div>
      <v-row>
        <v-col cols="12" sm="6" lg="4">
          <v-text-field v-model="patientId" readonly outlined label="Patient ID" />
        </v-col>
        <v-col cols="12" sm="6" lg="4">
          <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field :value="date" label="Delivery date" outlined v-bind="attrs" v-on="on" :rules="requiredField" />
            </template>
            <v-date-picker ref="picker" v-model="date"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" lg="4">
          <v-text-field v-model="refDoctor" outlined label="Reference By" />
        </v-col>
        <v-col cols="12" sm="6" lg="4">
          <v-text-field v-model="reportName" outlined label="Report Name" />
        </v-col>
      </v-row>

      <div class="title text-center font-weight-bold my-8 text-decoration-underline">Report Examination</div>
      <v-row>
        <v-col cols="12" md="3">
          <div class="title">Test name</div>
        </v-col>
        <v-col cols="12" md="9" class="d-flex justify-center">
          <div class="title">Result</div>
        </v-col>
      </v-row>
      <v-subheader class="font-weight-bold">PHYSICAL EXAMINATION</v-subheader>
      <v-row dense no-gutters>
        <v-col cols="12" sm="3">
          <div class="subtitle-1">Color</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="color" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Appearance</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="appearance" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Sedimeent</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="sediment" outlined />
        </v-col>
      </v-row>

      <v-subheader class="font-weight-bold">CHEMICAL EXAMINATION</v-subheader>
      <v-row dense go-gutters>
        <v-col cols="12" sm="3">
          <div class="subtitle-1">Reaction</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="reaction" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Albumin</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="albumin" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Suger (reducing substance)</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="suger" outlined />
        </v-col>
      </v-row>

      <v-row dense no-gutters>
        <v-col cols="12" sm="3">
          <div class="subtitle-1">Pus Cell</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="pusCell" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Epithetical Cell</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="epitheticalCell" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">RBC</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="rbc" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Granular Cast</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="granularCast" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">WBC Cast</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="wbcCast" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Pus Cells Cast</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="pusCellCast" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Cellular Cast</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="cellularCast" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Spermatozoa</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="spermatozoa" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Amorph Phosphate</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="amorphPhosphate" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Calcium Oxalate</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="calciumOxalate" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Uric Acid</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="uricAcid" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Urates</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="urates" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Triple Phosphate</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="triplePhosphate" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Calcium Carbonate</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="calciumCarbonate" outlined />
        </v-col>

        <v-col cols="12" sm="3">
          <div class="subtitle-1">Yest Cells</div>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field dense v-model="yestCells" outlined />
        </v-col>

        <v-col cols="12" class="d-flex justify-center">
          <v-btn depressed color="primary" class="mb-4 text-capitalize" :loading="isLoading" :disabled="!valid" type="submit">Upload Report</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { requiredField, validateNumericValue } from "../../../validations/FieldValidation";

export default {
  data: () => ({
    // patient information
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    patientId: "",
    refDoctor: "",
    reportName: "",

    // report information
    color: "",
    appearance: "",
    sediment: "",
    reaction: "",
    albumin: "",
    suger: "",
    pusCell: "",
    epitheticalCell: "",
    rbc: "",
    granularCast: "",
    wbcCast: "",
    pusCellCast: "",
    cellularCast: "",
    spermatozoa: "",
    amorphPhosphate: "",
    calciumOxalate: "",
    uricAcid: "",
    urates: "",
    triplePhosphate: "",
    calciumCarbonate: "",
    yestCells: "",

    menu: false,
    valid: true,
    requiredField,
    validateNumericValue,
  }),

  created() {
    let ids = this.$route.params.id.split("_");

    this.patientId = ids[1];
  },

  computed: {
    ...mapState(["isLoading"]),
  },

  methods: {
    handleSubmit() {
      let ids = this.$route.params.id.split("_");
      this.$store.dispatch("lab/uploadPathologyReport", {
        patient_id: ids[1],
        referred_by: this.refDoctor,
        delivery_time: this.date,
        report_name: this.reportName,
        report_id: ids[0],

        color: this.color,
        appearance: this.appearance,
        sedimeent: this.sediment,
        reaction: this.reaction,
        albumin: this.albumin,
        suger: this.suger,
        pus_cell: this.pusCell,
        epithetical_cell: this.epitheticalCell,
        rbc: this.rbc,
        granular_cast: this.granularCast,
        wbc_cast: this.wbcCast,
        pus_cells_cast: this.pusCellCast,
        cellular_cast: this.cellularCast,
        spermatozoa: this.spermatozoa,
        amorph_phosphate: this.amorphPhosphate,
        calcium_oxalate: this.calciumOxalate,
        uric_acid: this.uricAcid,
        urates: this.urates,
        triple_phosphate: this.triplePhosphate,
        calcium_carbonate: this.calciumCarbonate,
        yest_cells: this.yestCells,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
