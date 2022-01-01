<template>
  <v-container>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div class="display-1 text-center font-weight-bold mb-6">Provided Services</div>
    <!-- add new service -->
    <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field outlined label="Service name" v-model="serviceName" :rules="requiredField" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field outlined label="Price" v-model="servicePrice" :rules="validateNumericValue" />
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn color="primary" class="mb-4 text-capitalize" :disabled="!valid" type="submit">Submit</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <!-- view service list -->
    <v-card rounded="lg">
      <v-card-text>
        <v-card-title class="text-h5">Service List</v-card-title>
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Service name
                </th>
                <th class="text-left">
                  Price
                </th>
                <th class="text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in serviceInfo" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
                <td>
                  <v-btn icon color="secondary" @click="setValueToModal(item)"> <v-icon>mdi-pencil</v-icon> </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <!-- edit modal -->
    <v-dialog v-model="dialog" max-width="600">
      <v-form ref="editForm" v-model="editValid" @submit.prevent="handleEditSubmit">
        <v-card rounded="lg">
          <v-card-title class="text-h5">
            Edit Information
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field dense outlined label="Service name" v-model="editServiceName" :rules="requiredField" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field dense outlined label="Price" v-model="editServicePrice" :rules="validateNumericValue" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text class="mb-4 text-capitalize" @click="dialog = false">Cancel</v-btn>
            <v-btn color="primary" depressed class="mb-4 text-capitalize" type="submit">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <app-snackbar />
  </v-container>
</template>

<script>
import { requiredField, validateNumericValue } from "../../validations/FieldValidation";
import { mapState } from "vuex";
import AppSnackbar from "../../components/common/AppSnackbar.vue";

export default {
  components: { AppSnackbar },

  data: () => ({
    dialog: false,
    id: null,
    serviceName: "",
    servicePrice: "",
    editServiceName: "",
    editServicePrice: "",
    editValid: false,
    valid: true,

    requiredField,
    validateNumericValue,
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
      },
      {
        name: "Eclair",
        calories: 262,
      },
      {
        name: "Cupcake",
        calories: 305,
      },
      {
        name: "Gingerbread",
        calories: 356,
      },
      {
        name: "Jelly bean",
        calories: 375,
      },
      {
        name: "Lollipop",
        calories: 392,
      },
      {
        name: "Honeycomb",
        calories: 408,
      },
      {
        name: "Donut",
        calories: 452,
      },
      {
        name: "KitKat",
        calories: 518,
      },
    ],
  }),
  created() {
    this.$store.dispatch("lab/getAllServices");
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapState("lab", ["serviceInfo"]),
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch("lab/createNewService", { name: this.serviceName, price: +this.servicePrice });
    },

    setValueToModal(value) {
      this.dialog = true;
      this.id = value.id;
      this.editServiceName = value.name;
      this.editServicePrice = value.price;
    },

    handleEditSubmit() {
      this.$store.dispatch("lab/updateServiceInformation", { id: this.id, name: this.editServiceName, price: this.editServicePrice }).then(() => (this.dialog = false));
    },
  },
};
</script>

<style lang="scss" scoped></style>
