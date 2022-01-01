<template>
  <v-container>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div class="display-1 text-center font-weight-bold mb-6">Doctor List</div>
    <v-row>
      <v-col cols="12">
        <v-card rounded="lg">
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Name
                    </th>
                    <th class="text-left">
                      Designation
                    </th>
                    <th class="text-left">
                      Email
                    </th>
                    <th class="text-left">
                      Specialty
                    </th>
                    <th class="text-left">
                      Phone number
                    </th>
                    <th class="text-left">
                      Status
                    </th>
                    <th class="text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in doctorList" :key="item.id">
                    <td>{{ item.full_name }}</td>
                    <td>{{ item.designation }}</td>
                    <td>{{ item.email }}</td>
                    <td>
                      <v-chip small v-for="(specialty, index) in item.specialist" :key="index"> {{ specialty.title }} </v-chip>
                    </td>
                    <td>{{ item.phone_no }}</td>
                    <td>
                      <v-chip small dark :color="getColor(item.status)" label> {{ item.status }} </v-chip>
                    </td>
                    <td>
                      <v-btn icon :to="`/admin/doctor/${item.id}`" color="secondary"> <v-icon>mdi-pencil</v-icon> </v-btn>
                    </td>
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
    this.$store.dispatch("admin/getDoctorList");
  },

  computed: {
    ...mapState(["isLoading"]),
    ...mapState("admin", ["doctorList"]),
  },

  methods: {
    getColor(info) {
      if (info === "accept") {
        return "green darken-1";
      } else if (info === "reject") {
        return "red darken-1";
      } else {
        return "amber darken-1";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
