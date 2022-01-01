<template>
  <v-simple-table fixed-header height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Report Name
          </th>
          <th class="text-left">
            Price
          </th>
          <th class="text-left">
            Scheduled Date
          </th>
          <th class="text-left">
            Delivered Date
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in history" :key="index">
          <td>{{ item.report_name }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ moment(item.appointment_date).format("LL") }}</td>
          <td>{{ moment(item.delivery_time).format("LL") }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import moment from "moment";
export default {
  props: ["history"],
  data: () => ({
    moment,
  }),
};
</script>
