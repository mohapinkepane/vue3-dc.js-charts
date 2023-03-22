<template>
  <div>
    <div class="vue-dc-graph-description">
      <b>People by Height</b>
      <a href="https://www.tutorialspoint.com/dcjs/dcjs_series_chart.htm" target="_blank">
        DC.js - Series Chart Tutorial</a
      >
      <a
        href="https://github.com/mohapinkepane/vue3-dc.js-charts/blob/master/src/components/SeriesChart.vue"
        target="_blank"
        >See chart source here</a
      >
    </div>

    <div id="series"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as d3 from "d3";
import * as dc from "dc";
import "dc/src/compat/d3v6";

//CrossFilter strore
import { PeopleStore } from "../stores/crossfilter";

onMounted(() => {
  generateSeriesChart();
});

//Create crossfilter instance,dimentsions and groups;
var mycrossfilter = PeopleStore.people;

var hwDimension = mycrossfilter.dimension(function (data) {
  return [data.gender, data.height];
});
var hwGroup = hwDimension.group().reduceCount();

//Create Chart Object
var seriesChart = ref(null);
function generateSeriesChart() {
  seriesChart.value = dc.seriesChart("#series");
  seriesChart.value
    .width(450)
    .height(250)
    .chart(function (c) {
      return dc.lineChart(c).interpolate("cardinal").evadeDomainFilter(true);
    })
    .x(d3.scaleLinear().domain([145, 180]))
    .elasticY(true)
    .brushOn(false)
    .xAxisLabel("Height")
    .yAxisLabel("Count")
    .dimension(hwDimension)
    .group(hwGroup)
    .seriesAccessor(function (d) {
      return d.key[0];
    })
    .keyAccessor(function (d) {
      return +d.key[1];
    })
    .valueAccessor(function (d) {
      return +d.value;
    })
    .legend(
      dc
        .legend()
        .x(200)
        .y(180)
        .itemHeight(13)
        .gap(5)
        .horizontal(1)
        .legendWidth(120)
        .itemWidth(60)
    );

  seriesChart.value.render();
}
</script>

<style lang="scss" scoped></style>
