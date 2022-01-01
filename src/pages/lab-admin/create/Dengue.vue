<template>
  <v-container>
    <v-btn small text color="secondary" to="/lab/pending-patient-list"><v-icon left dark>mdi-chevron-left</v-icon>Back</v-btn>
    <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
      <div class="display-1 text-center font-weight-bold mb-6">DENGUE REPORT</div>
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
          <div class="subtitle-1">Dengue NSI Ag</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="dengue" outlined dense />
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field value="<0.5 - 1.1" readonly outlined dense />
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn depressed color="primary" class="mb-4 text-capitalize" :loading="isLoading" :disabled="!valid" type="submit">Upload Report</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <app-snackbar />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { requiredField, validateNumericValue } from "../../../validations/FieldValidation";
import AppSnackbar from "../../../components/common/AppSnackbar.vue";

export default {
  components: { AppSnackbar },
  data: () => ({
    // patient information
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    patientId: "",
    refDoctor: "",
    reportName: "",

    // report information
    dengue: "",

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
      this.$store.dispatch("lab/uploadDengueReport", {
        patient_id: ids[1],
        report_name: this.reportName,
        referred_by: this.refDoctor,
        delivery_time: this.date,
        report_id: ids[0],
        result: this.dengue,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
