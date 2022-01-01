<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Report Type
          </th>
          <th class="text-left">
            Patient name
          </th>
          <th class="text-left">
            Age
          </th>
          <th class="text-left">
            Cost
          </th>
          <th class="text-left">
            Report delivered date
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in info" :key="item.id">
          <td>{{ item.type }}</td>
          <td>{{ item.full_name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ moment(item.appointment_date).format("LL") }}</td>
          <td>
            <v-btn icon color="primary" :to="dynamicReportPage(item)"> <v-icon>mdi-open-in-new</v-icon> </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import moment from "moment";

export default {
  props: ["info"],

  data: () => ({
    moment,
    isDisabled: false,
  }),

  methods: {
    dynamicReportPage(value) {
      if (value.type === "imaging") {
        return `/lab/view-report/image/${value.id}`;
      } else if (value.type === "dengue") {
        return `/lab/view-report/dengue/${value.id}`;
      } else if (value.type === "pathologie") {
        return `/lab/view-report/pathology/${value.id}`;
      } else if (value.type === "hematologie") {
        return `/lab/view-report/haematology/${value.id}`;
      }
    },
  },
};
</script>
