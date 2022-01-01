<template>
  <v-container>
    <v-btn small text color="secondary" to="/lab/pending-patient-list"><v-icon left dark>mdi-chevron-left</v-icon>Back</v-btn>
    <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
      <div class="display-1 text-center font-weight-bold mb-6">HAEMATOLOGY REPORT</div>
      <v-row>
        <v-col cols="12" sm="6" md="4">
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
        <v-col cols="12" sm="6" md="4">
          <v-text-field v-model="reportName" outlined label="Report Name" :rules="requiredField" />
        </v-col>
        <v-col cols="12" sm="6" lg="4">
          <v-text-field v-model="refDoctor" outlined label="Reference By" :rules="requiredField" />
        </v-col>
      </v-row>

      <div class="title text-center font-weight-bold my-8 text-decoration-underline">Report Examination</div>
      <v-row class="d-flex justify-start">
        <v-col cols="12" md="4">
          <div class="title">Test name</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="title">Result</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="title">Reference value</div>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="12" md="3">
          <div class="subtitle-1">Hemoglobin (Hb)</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="hemoglobin" outlined dense />
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field value="12.20-16.50 g/dL" readonly outlined dense />
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">ESR (Westergren)</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="esr" outlined dense />
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field value="Male: 0-10 mm. Female: 0-18 mm" readonly outlined dense />
        </v-col>
      </v-row>

      <v-subheader class="font-weight-bold">Differential WBC Count (DC)</v-subheader>
      <v-row dense>
        <v-col cols="12" md="3">
          <div class="subtitle-1">Neutrophils</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="neutrophils" outlined dense />
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field value="40%-75%" readonly outlined dense />
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">Lymphocytes</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="lymphocytes" outlined dense />
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field value="20%-50%" readonly outlined dense />
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">Monocytes</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="monocytes" outlined dense />
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field value="2%-10%" readonly outlined dense />
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">Eosinophils</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="eosinophils" outlined dense />
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field value="0%-6%" readonly outlined dense />
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">Basophils</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="basophils" outlined dense />
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field value="<1%" readonly outlined dense />
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">HCT</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="hct" outlined dense />
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field value="" readonly outlined dense />
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">MCV</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="mcv" outlined dense />
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field value="76-96 fL" readonly outlined dense />
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">MCH</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="mch" outlined dense />
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field value="27-32 pg" readonly outlined dense />
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">MCHC</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="mchc" outlined dense />
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field value="32-34 g/dL" readonly outlined dense />
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">RBW-CV</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="rbwcv" outlined dense />
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field value="11.60-14.80%" readonly outlined dense />
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">MPV</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="mpv" outlined dense />
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field value="7.0-10 fL" readonly outlined dense />
        </v-col>

        <v-col cols="12" md="3">
          <div class="subtitle-1">PWD</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="pwd" outlined dense />
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field value="10%-18%" readonly outlined dense />
        </v-col>
      </v-row>

      <v-col cols="12" class="d-flex justify-center">
        <v-btn depressed color="primary" class="mb-4 text-capitalize" :loading="isLoading" :disabled="!valid" type="submit">Upload Report</v-btn>
      </v-col>
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
    hemoglobin: "",
    esr: "",
    neutrophils: "",
    lymphocytes: "",
    monocytes: "",
    eosinophils: "",
    basophils: "",
    hct: "",
    mcv: "",
    mch: "",
    mchc: "",
    rbwcv: "",
    mpv: "",
    pwd: "",

    menu: false,
    requiredField,
    valid: true,
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
      this.$store.dispatch("lab/uploadHematologyReport", {
        patient_id: ids[1],
        referred_by: this.refDoctor,
        delivery_time: this.date,
        report_name: this.reportName,
        report_id: ids[0],

        hemoglobin_hb: this.hemoglobin,
        esr_westergren: this.esr,
        neutrophils: this.neutrophils,
        lymphocytes: this.lymphocytes,
        monocytes: this.monocytes,
        eosinophils: this.eosinophils,
        basophils: this.basophils,
        hct: this.hct,
        mcv: this.mcv,
        mch: this.mch,
        mchc: this.mchc,
        rbw_cv: this.rbwcv,
        mpv: this.mpv,
        pwd: this.pwd,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
