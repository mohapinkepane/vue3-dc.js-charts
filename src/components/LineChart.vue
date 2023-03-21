<template>
  <div>
      <div class="vue-dc-graph-description">
          <b>People by Age</b>
          <a href="https://www.tutorialspoint.com/dcjs/dcjs_line_chart.htm" target="_blank"> DC.js - Line Chart Tutorial</a>
      </div>
      <div id="line">
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import * as d3 from "d3";
import * as dc from "dc";

//CrossFilter strore
import {PeopleStore } from '../stores/crossfilter'

onMounted(() => {
  generatelineChart();
})

//Create crossfilter instance,dimentsions and groups;
var mycrossfilter = PeopleStore.people;
var all = mycrossfilter.groupAll();

var ageDimension = mycrossfilter.dimension(function (data) {
  return data.age
});
var ageGroup = ageDimension.group().reduceCount();

//Create Chart Object
var lineChart = ref(null);
function generatelineChart() {
  lineChart.value = dc.lineChart('#line');
  lineChart.value
    .width(400)
    .height(250)
    .x(d3.scaleLinear().domain([15, 70]))
    .brushOn(false)
    .yAxisLabel("Count")
    .xAxisLabel("Age")
    .dimension(ageDimension)
    .group(ageGroup);

  lineChart.value.render();
}

</script>

<style lang="scss" scoped></style>