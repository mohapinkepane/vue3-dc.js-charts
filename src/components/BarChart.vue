<template>
  <div>
      <div class="vue-dc-graph-description">
            <b>People by Age</b>
            <a href="https://www.tutorialspoint.com/dcjs/dcjs_bar_chart.htm" target="_blank"> DC.js - Bar Chart Tutorial</a>
        </div>
      <div>
        <div class="vue-dc-graph-stats" > 
            <a class="vue-dc-button" @click="resetFilters">Reset All</a>
      </div>
      </div>
      <div id="bar">
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
  generatebarChart();
})

//Create crossfilter instance,dimentsions and groups;
var mycrossfilter = PeopleStore.people;

var ageDimension = mycrossfilter.dimension(function (data) {
  return data.age
});
var ageGroup = ageDimension.group().reduceCount();

//Create Chart Object
var barChart = ref(null);
function generatebarChart() {
  barChart.value = dc.barChart('#bar');

  barChart.value
    .width(1200)
    .height(300)
    .x(d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .brushOn(false)
    .yAxisLabel("Count")
    .xAxisLabel("Age")
    .dimension(ageDimension)
    .barPadding(0.1)
    .outerPadding(0.1)
    .group(ageGroup);
    
  barChart.value.render();
}


function resetFilters(){
  barChart.value.filterAll(); 
  dc.redrawAll()
}

</script>

<style lang="scss" scoped></style>