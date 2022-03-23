<template>
  <v-container fill-height fluid>
    <v-row class="py-4" v-if="loading">
      <v-col
        cols="12"
        md="3"
        sm="6"
        class="mb-md-0 mb-2"
        :key="i"
        v-for="i in 4"
      >
        <v-skeleton-loader type="list-item-three-line" />
      </v-col>
    </v-row>
    <v-row class="py-4" v-else>
      <v-col
        cols="12"
        md="3"
        sm="6"
        class="mb-md-0 mb-2"
        :key="index"
        v-for="(item, index) in overviews"
      >
        <overview-card v-bind="item" />
      </v-col>
    </v-row>

    <v-row>
      <v-col md="8" cols="12">
        <v-row>
          <v-col cols="12">
            <line-chart-card />
          </v-col>
          <v-col md="6" cols="12">
            <pie-chart-card />
          </v-col>
          <v-col md="6" cols="12">
            <scatter-chart-card />
          </v-col>
        </v-row>
      </v-col>
      <v-col md="4" cols="12" class="d-flex">
        <simple-table-card class="align-self-stretch" style="width: 100%" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import LineChartCard from "../components/dashboard/LineChartCard.vue";
import PieChartCard from "../components/dashboard/PieChartCard.vue";
import ScatterChartCard from "../components/dashboard/ScatterChartCard.vue";
import OverviewCard from "../components/dashboard/OverviewCard.vue";
import SimpleTableCard from "../components/dashboard/SimpleTableCard.vue";
import { getOverviews } from "@/api/dashboard";
import indexes from "@/assets/overviewIndexes.json";
import { overviewData } from "@/assets/dashboard";

export default {
  components: {
    OverviewCard,
    LineChartCard,
    PieChartCard,
    ScatterChartCard,
    SimpleTableCard,
  },
  data() {
    return {
      overviews: [],
      indexes,
      loading: true,
    };
  },
  created() {
    this.getOverviews();
  },
  methods: {
    async getOverviews() {
      this.overviews = (
        process.env.NODE_ENV === "development"
          ? (await getOverviews()).result
          : overviewData
      ).map((d, i) => Object.assign(d, this.indexes[i]) && d);
      this.loading = false;
    },
  },
};
</script>
