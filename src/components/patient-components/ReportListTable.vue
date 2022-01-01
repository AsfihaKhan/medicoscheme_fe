<template>
  <v-simple-table fixed-header height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Report name
          </th>
          <th class="text-left">
            Cost
          </th>
          <th class="text-left">
            Report delivered date
          </th>
          <th class="text-left">
            Report Type
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="report in reportInfo" :key="report.id">
          <td>{{ report.name }}</td>
          <td>{{ report.amount }}</td>
          <td>{{ moment(report.appointment_date).format("LL") }}</td>
          <td>{{ report.type }}</td>
          <td>
            <v-btn icon color="primary" :to="dynamicReportPage(report)"> <v-icon>mdi-open-in-new</v-icon> </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import moment from "moment";

export default {
  props: ["reportInfo"],

  data: () => ({
    moment,
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
