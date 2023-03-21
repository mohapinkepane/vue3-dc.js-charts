<template>
  <Docs></Docs>
  <h1 class="example-header">Examples</h1>
  <div class="row" style="margin: auto; overflow: hidden">
    <!-- Line 1 -->
    <DataCount id="data-count" class="col-xs-12 col-sm-6"></DataCount>
    <PieChart id="pie-chart" class="col-xs-12 col-sm-6"></PieChart>
    <!-- Line 2 -->
    <LineChart id="line-chart" class="col-xs-12 col-sm-4"></LineChart>
    <SeriesChart id="series-chart" class="col-xs-12 col-sm-4"></SeriesChart>
    <CompositeChart id="composite-chart" class="col-xs-12 col-sm-4"></CompositeChart>
    <!-- Line 3 -->
    <BarChart id="bar-chart" class="col-xs-12 col-sm-12"></BarChart>
    <!-- Line 4 -->
    <HeatMap id="heat-map" class="col-xs-12 col-sm-12"></HeatMap>
    <!-- Line 5 -->
    <ScatterPlot id="scatter-plot" class="col-xs-12 col-sm-12"></ScatterPlot>
    <!-- Line 6 -->
    <BubbleChart id="bubble-chart" class="col-xs-12 col-sm-12"></BubbleChart>
    <!-- Line 6 -->
    <DataTable id="data-table" class="col-xs-12 col-sm-6"></DataTable>
  </div>
</template>

<script setup>
//Charts
import PieChart from "./components/PieChart.vue";
import LineChart from "./components/LineChart.vue";
import BarChart from "./components/BarChart.vue";
import CompositeChart from "./components/CompositeChart.vue";
import SeriesChart from "./components/SeriesChart.vue";
import ScatterPlot from "./components/ScatterPlot.vue";
import BubbleChart from "./components/BubbleChart.vue";
import HeatMap from "./components/HeatMap.vue";
import DataCount from "./components/DataCount.vue";
import DataTable from "./components/DataTable.vue";
//Docs
import Docs from "./Docs.vue";
</script>

<style scoped></style>
