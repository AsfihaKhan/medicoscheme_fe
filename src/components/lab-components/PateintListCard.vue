<template>
  <div>
    <v-card rounded="lg">
      <v-card-text>
        <v-row dense>
          <v-col cols="4">
            <div class="subtitle-1 font-weight-bold">Report ID:</div>
          </v-col>
          <v-col cols="6">
            <div class="subtitle-1" style="color: red">{{ info.id }}</div>
          </v-col>
          <v-col cols="4">
            <div class="subtitle-1 font-weight-bold">Report name:</div>
          </v-col>
          <v-col cols="6">
            <div class="subtitle-1">{{ info.name }}</div>
          </v-col>
          <v-col cols="4">
            <div class="subtitle-1 font-weight-bold">Patient name:</div>
          </v-col>
          <v-col cols="6">
            <div class="subtitle-1">{{ info.full_name }}</div>
          </v-col>
          <v-col cols="4">
            <div class="subtitle-1 font-weight-bold">Age:</div>
          </v-col>
          <v-col cols="6">
            <div class="subtitle-1">{{ info.age }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-dialog v-model="dialog" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="secondary" block text class="text-capitalize" dark v-bind="attrs" v-on="on"> Add report <v-icon right>mdi-plus</v-icon> </v-btn>
          </template>
          <v-card rounded="lg">
            <v-card-title class="text-h5">
              Select your desired report type
              <v-spacer></v-spacer>
              <v-btn right icon @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text class="mt-4">
              <v-row>
                <v-col cols="12">
                  <router-link :to="`/lab/add-report/image-upload/${info.id}_${info.patient_id}`" class="text-decoration-none">
                    <v-sheet elevation="0" rounded="lg" class="pa-2 sheet-style">
                      <div class="title text-center">X-RAY/MRI/ECG/Ultrasonography</div>
                    </v-sheet>
                  </router-link>
                </v-col>
                <v-col cols="12">
                  <router-link :to="`/lab/add-report/pathology/${info.id}_${info.patient_id}`" class="text-decoration-none">
                    <v-sheet elevation="0" rounded="lg" class="pa-2 sheet-style">
                      <div class="title text-center">Pathology Report</div>
                    </v-sheet>
                  </router-link>
                </v-col>
                <v-col cols="12">
                  <router-link :to="`/lab/add-report/dengue/${info.id}_${info.patient_id}`" class="text-decoration-none">
                    <v-sheet elevation="0" rounded="lg" class="pa-2 sheet-style">
                      <div class="title text-center">Dengue Report</div>
                    </v-sheet>
                  </router-link>
                </v-col>
                <v-col cols="12">
                  <router-link :to="`/lab/add-report/haematology/${info.id}_${info.patient_id}`" class="text-decoration-none">
                    <v-sheet elevation="0" rounded="lg" class="pa-2 sheet-style">
                      <div class="title text-center">Haematology Report</div>
                    </v-sheet>
                  </router-link>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["info"],
  data: () => ({
    dialog: false,
  }),
};
</script>

<style lang="scss" scoped>
.sheet-style {
  transition: all 0.2s;

  &:hover {
    background-color: #1aa8c7;
  }
}
</style>
