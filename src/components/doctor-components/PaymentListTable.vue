<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Patient Name
          </th>
          <th class="text-left">
            Age
          </th>
          <th class="text-left">
            Paid
          </th>
          <th class="text-left">
            Transaction date
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in info" :key="item.id">
          <td>{{ item.full_name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ moment(item.appointment_date).format("LL") }}</td>
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
  }),
};
</script>
