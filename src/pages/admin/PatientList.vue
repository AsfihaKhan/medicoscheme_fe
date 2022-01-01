<template>
  <v-container>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div class="display-1 text-center font-weight-bold mb-6">Patient List</div>
    <v-row>
      <v-col cols="12">
        <v-card rounded="lg">
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Image
                    </th>
                    <th class="text-left">
                      Name
                    </th>
                    <th class="text-left">
                      Age
                    </th>
                    <th class="text-left">
                      Gender
                    </th>
                    <th class="text-left">
                      Contact number
                    </th>
                    <th class="text-left">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in patientList" :key="item.id">
                    <td><img :src="item.picture" class="image" /></td>
                    <td>{{ item.full_name }}</td>
                    <td>{{ item.age }}</td>
                    <td>{{ item.gender }}</td>
                    <td>{{ item.phone_no }}</td>
                    <td>{{ item.email }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  created() {
    this.$store.dispatch("admin/getPatientList");
  },

  computed: {
    ...mapState(["isLoading"]),
    ...mapState("admin", ["patientList"]),
  },
};
</script>

<style lang="scss" scoped>
.image {
  width: 30px;
  height: 30px;
}
</style>
