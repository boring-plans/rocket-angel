<template>
  <v-card class="align-self-stretch" style="width: 100%" flat>
    <v-skeleton-loader
      v-if="loading"
      type="list-item@12"
      class="pa-2"
    ></v-skeleton-loader>
    <template v-else>
      <v-card-title>Simple Table</v-card-title>
      <v-card-text>
        <v-simple-table class="align-self-stretch">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.value }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </template>
  </v-card>
</template>
<script>
import { getSimpleTableData } from "@/api/dashboard";
import { simpleDataTableData } from "@/assets/dashboard";

export default {
  data() {
    return {
      items: [],
      loading: true,
    };
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      this.items =
        process.env.NODE_ENV === "development"
          ? (await getSimpleTableData()).result
          : simpleDataTableData;
      this.loading = false;
    },
  },
};
</script>
