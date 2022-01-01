<template>
  <div>
    <v-container>
      <div v-if="isLoading">
        <v-overlay :value="isLoading">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </div>
      <div v-else>
        <v-btn small text color="secondary" to="/patient/doctor-list"><v-icon left dark>mdi-chevron-left</v-icon>Back</v-btn>
        <circle-image :img="profileDetails.Data.picture" />

        <div class="display-1 text-center font-weight-medium mt-4">
          {{ profileDetails.Data.full_name }}
          <span class="body-1"
            ><span v-for="degree in profileDetails.Data.degrees" :key="degree.value"> {{ degree.title }} </span></span
          >
        </div>
        <div class="title text-center">{{ profileDetails.Data.designation }}</div>
        <div class="subtitle-1 text-center">
          <span v-for="specialty in profileDetails.Data.specialist" :key="specialty.value"> {{ specialty.title }} </span>
        </div>

        <v-row class="mt-6">
          <v-col cols="12" sm="2">
            <div class="subtitle-2">Biography:</div>
          </v-col>
          <v-col cols="12" sm="10">
            {{ profileDetails.Data.bio }}
          </v-col>

          <v-col cols="12" sm="2">
            <div class="subtitle-2">Phone Number:</div>
          </v-col>
          <v-col cols="12" sm="10">
            {{ profileDetails.Data.phone_no }}
          </v-col>

          <v-col cols="12" sm="2">
            <div class="subtitle-2">Email Address:</div>
          </v-col>
          <v-col cols="12" sm="10">
            {{ profileDetails.Data.email }}
          </v-col>

          <v-col cols="12" sm="2">
            <div class="subtitle-2">Address:</div>
          </v-col>
          <v-col cols="12" sm="10">
            {{ profileDetails.Data.chamber_address }}
          </v-col>

          <v-col cols="6" sm="2">
            <div class="subtitle-2">Gender:</div>
          </v-col>
          <v-col cols="6" sm="10">
            {{ profileDetails.Data.gender }}
          </v-col>

          <v-col cols="6" sm="2">
            <div class="subtitle-2">Fees for new patient:</div>
          </v-col>
          <v-col cols="6" sm="10"> {{ profileDetails.Data.consulting_fee_new }}&nbsp;৳ </v-col>

          <v-col cols="6" sm="2">
            <div class="subtitle-2">Fees for old patient:</div>
          </v-col>
          <v-col cols="6" sm="10"> {{ profileDetails.Data.consulting_fee_old }}&nbsp;৳ </v-col>

          <v-col cols="6" sm="2">
            <div class="subtitle-2">Consulting time:</div>
          </v-col>
          <v-col cols="6" sm="10">
            {{ profileDetails.Data.consulting_time }}
          </v-col>

          <v-col cols="6" sm="2">
            <div class="subtitle-2" style="color: red !important">Off Days:</div>
          </v-col>
          <v-col cols="6" sm="10">
            {{ profileDetails.Data.offday }}
          </v-col>

          <v-col class="d-flex justify-center">
            <v-btn large depressed color="primary" class="rounded-lg text-capitalize" @click="dialog = true">Book Appointment</v-btn>
          </v-col>
        </v-row>
      </div>
    </v-container>

    <!-- Dialog for appointment -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card rounded="lg">
        <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
          <v-card-title>Book Appointment</v-card-title>
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field dense :value="computedDateFormattedMomentjs" label="Appointment date" outlined v-bind="attrs" v-on="on" :rules="requiredField" />
                  </template>
                  <v-date-picker ref="picker" v-model="date"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-switch v-model="newPatient" :label="newPatient ? 'I am new Patient' : 'I am old Patient'" @change="onPatientStatusChange"></v-switch>
              </v-col>
              <v-col cols="12">
                <v-text-field dense label="Appointment fees" outlined v-model="appointmentFees" readonly />
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
            <v-btn color="red" text @click="dialog = false" class="text-capitalize">Close</v-btn>
            <v-btn depressed color="primary" :disabled="!valid" type="submit" class="text-capitalize">Confirm Appointment</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <app-snackbar />
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import { requiredField, validateNumericValue } from "../../validations/FieldValidation";
import CircleImage from "../../components/common/CircleImage.vue";
import AppSnackbar from "../../components/common/AppSnackbar.vue";

export default {
  components: { CircleImage, AppSnackbar },
  data: () => ({
    appointmentFees: 600,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    dialog: false,
    menu: false,
    patientAge: "",
    patientName: "",
    newPatient: true,
    requiredField,
    transactionId: "",
    valid: true,
    validateNumericValue,
  }),

  created() {
    this.$store.dispatch("admin/getSingleProfileInformation", this.$route.params.id);
    
    setTimeout(() => {
      this.onPatientStatusChange();
    }, 1000);
  },

  computed: {
    ...mapState(["isLoading"]),
    ...mapState("admin", ["profileDetails"]),

    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("dddd, MMMM Do YYYY") : "";
    },
  },

  methods: {
    handleSubmit() {
      this.$store.dispatch("patient/createNewAppointment", {
        doctor_id: this.$route.params.id,
        appointment_date: this.date,
        is_new: this.newPatient,
        amount: this.appointmentFees,
        trx_id: this.transactionId,
      });
      this.dialog = false;
    },
    onPatientStatusChange() {
      console.log(this.newPatient);

      this.appointmentFees = this.$store.getters["admin/getAppointmentFees"](this.newPatient);
    },
  },
};
</script>

<style lang="scss" scoped>
.img-wrapper {
  width: 12em;
  height: 12em;
  object-fit: cover;
  object-position: center center;
  margin: 0 auto;

  img {
    border-radius: 50%;
  }
}
</style>
