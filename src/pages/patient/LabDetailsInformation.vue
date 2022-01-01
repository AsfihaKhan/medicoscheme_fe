<template>
  <v-container>
    <div v-if="isLoading">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>

    <div v-else>
      <v-btn small text color="secondary" to="/patient/lab-list"><v-icon left dark>mdi-chevron-left</v-icon>Back</v-btn>
      <circle-image :img="profileInformation.Data.picture || defaultImage" />

      <div class="display-1 text-center font-weight-medium mt-4">{{ profileInformation.Data.full_name }}</div>
      <div class="title text-center">{{ profileInformation.Data.phone_no }}</div>

      <v-row>
        <v-col cols="12" sm="2">
          <div class="subtitle-2">Address:</div>
        </v-col>
        <v-col cols="12" sm="10">
          {{ profileInformation.Data.address }}
        </v-col>

        <v-col cols="6" sm="2">
          <div class="subtitle-2">Email:</div>
        </v-col>
        <v-col cols="6" sm="10">
          {{ profileInformation.Data.email }}
        </v-col>

        <v-col cols="6" sm="2">
          <div class="subtitle-2">Report delivery time:</div>
        </v-col>
        <v-col cols="6" sm="10">
          {{ profileInformation.Data.report_deliverytime }}
        </v-col>

        <v-col cols="6" sm="2">
          <div class="subtitle-2">Number of provided services:</div>
        </v-col>
        <v-col cols="6" sm="10">
          {{ serviceInfo.length }}
        </v-col>

        <v-col cols="6" sm="2">
          <div class="subtitle-2">Rating:</div>
        </v-col>
        <v-col cols="6" sm="10">
          {{ profileInformation.Data.ratings }}
        </v-col>
      </v-row>

      <!-- Services table -->
      <div class="title text-center text-decoration-underline">Provided services</div>
      <v-card rounded="lg" class="mb-6">
        <lab-services-table :services="serviceInfo" />
      </v-card>
      <v-btn class="sticky-btn text-capitalize" color="primary" depressed large @click="dialog = true">Book appointment for test</v-btn>

      <!-- Dialog for appointment -->
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card rounded="lg">
          <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
            <v-card-title>Book Appointment For A Test</v-card-title>
            <v-card-text>
              <v-row dense>
                <v-col cols="12">
                  <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field dense :value="computedDateFormattedMomentjs" label="Appointment date" outlined v-bind="attrs" v-on="on" :rules="requiredField" />
                    </template>
                    <v-date-picker ref="picker" v-model="date"/>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-select dense label="Select test name" outlined v-model="reportName" :items="serviceInfo" return-object item-text="name" item-value="id" @change="getPriceOfService" :rules="validateSelectObject" />
                </v-col>
                <v-col cols="12">
                  <v-text-field dense label="Test fees" outlined v-model="testFees" readonly />
                </v-col>
                <v-col cols="12">
                  <v-text-field dense label="bKash/Nagad number" value="01456789123" outlined readonly persistent-hint hint="Please send money to this number" />
                </v-col>
                <v-col cols="12">
                  <v-text-field dense persistent-hint label="Transaction id" outlined v-model="transactionId" hint="bKash/Nagad transaction id" :rules="requiredField" />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="dialog = false" class="text-capitalize">
                Close
              </v-btn>
              <v-btn depressed color="primary" :disabled="!valid" type="submit" class="text-capitalize">Confirm Appointment</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </div>
    <app-snackbar />
  </v-container>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
import { requiredField, validateNumericValue, validateSelectObject } from "../../validations/FieldValidation";
import CircleImage from "../../components/common/CircleImage.vue";
import LabServicesTable from "../../components/patient-components/LabServicesTable.vue";
import { defaultImage } from "../../utils/Constants";
import AppSnackbar from "../../components/common/AppSnackbar.vue";

export default {
  components: { CircleImage, LabServicesTable, AppSnackbar },
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    defaultImage,
    dialog: false,
    menu: false,
    patientAge: "",
    patientName: "",
    reportName: "",
    requiredField,
    testFees: 0,
    transactionId: "",
    valid: true,
    validateNumericValue,
    validateSelectObject
  }),

  created() {
    this.$store.dispatch("common/getProfileInformation", this.$route.params.id);
    this.$store.dispatch("lab/getAllServices", this.$route.params.id);
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("dddd, MMMM Do YYYY") : "";
    },
    ...mapState(["isLoading"]),
    ...mapState("common", ["profileInformation"]),
    ...mapState("lab", ["serviceInfo"]),
  },
  methods: {
    getPriceOfService() {
      this.testFees = this.$store.getters["lab/getServicePrice"](this.reportName.id);
    },
    handleSubmit() {
      this.$store.dispatch("patient/newAppointmentInLab", { appointment_date: this.date, service_id: this.reportName.id, trx_id: this.transactionId });
      this.dialog = false;
    },
  },
};
</script>

<style la LabServicesTableng="scss" scoped>
.sticky-btn {
  position: sticky;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
}
@media only screen and (min-width: 1276px) {
  .sticky-btn {
    position: sticky;
    left: 60%;
    transform: translateX(-60%);
    bottom: 10px;
  }
}
</style>
