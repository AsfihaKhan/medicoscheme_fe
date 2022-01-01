<template>
  <v-container>
    <div v-if="isLoading">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
    <div v-else>
      <div class="display-1 text-center font-weight-bold mb-6">Lab List</div>
      <v-row>
        <v-col cols="12">
          <v-card rounded="lg">
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Lab name
                      </th>
                      <th class="text-left">
                        Email
                      </th>
                      <th class="text-left">
                        Contact number
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
                    <tr v-for="item in labList" :key="item.id">
                      <td>{{ item.full_name }}</td>
                      <td>{{ item.email }}</td>
                      <td>{{ item.phone_no }}</td>
                      <td>
                        <v-chip small dark :color="getColor(item.status)" label> {{ item.status }} </v-chip>
                      </td>
                      <td>
                        <v-btn icon :to="`/admin/lab/${item.id}`" color="secondary"> <v-icon>mdi-pencil</v-icon> </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <app-snackbar />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AppSnackbar from "../../components/common/AppSnackbar.vue";

export default {
  components: { AppSnackbar },
  created() {
    this.$store.dispatch("admin/getLabList");
  },

  computed: {
    ...mapState(["isLoading"]),
    ...mapState("admin", ["labList"]),
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
