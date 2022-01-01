<template>
  <v-simple-table fixed-header height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Transaction ID
          </th>
          <th class="text-left">
            Amount
          </th>
          <th class="text-left">
            Transaction date
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactionInfo" :key="transaction.id">
          <td>{{ transaction.trx_id }}</td>
          <td>{{ transaction.amount }}</td>
          <td>{{ moment(transaction.createdAt).format("LL") }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import moment from "moment";

export default {
  props: ["transactionInfo"],

  data: () => ({
    moment,
  }),
};
</script>
