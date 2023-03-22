<template>
  <div>
  <div class="vue-dc-graph-description">
           <b>People by Age</b>
           <a href="https://www.tutorialspoint.com/dcjs/dcjs_data_table.htm" target="_blank"> DC.js - Data Table Tutorial</a>
            <a
              href="https://github.com/mohapinkepane/vue3-dc.js-charts/blob/master/src/components/DataTable.vue"
              target="_blank"
              >See chart source here</a
            >
        </div>
    <div class="vue-dc-graph-stats" > 
        <div id = "mystats2" class ="dc-data-count">
            <span class = "filter-count"></span> selected out of <span
              class = "total-count"></span> | <a class="vue-dc-button" @click="resetFilters">Reset All</a>
        </div>
      </div>
    <div id="bar3">
    </div>
    <div>
        <div id = "mytable"></div>
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
  generateCharts();
})


//Create crossfilter instance,dimentsions and groups;
var mycrossfilter = PeopleStore.people;
var all = mycrossfilter.groupAll();

var ageDimension = mycrossfilter.dimension(function (data) {
  return data.age
});
var ageGroup = ageDimension.group().reduceCount();

//Create Chart Object
var countChart = ref(null);
var barChart = ref(null);
var tableChart = ref(null);
function generateCharts() {
  tableChart.value = dc.dataTable("#mytable");
  countChart.value = dc.dataCount("#mystats2");
  barChart.value = dc.barChart('#bar3');

  //Bar Chart
  barChart.value
    .width(1200)
    .height(300)
    .x(d3.scaleLinear().domain([15, 70]))
    .yAxisLabel("Count")
    .xAxisLabel("Age")
    .elasticY(true)
    .elasticX(true)
    .dimension(ageDimension)
    .group(ageGroup);
  
   //Count Chart
    countChart.value
    .dimension(mycrossfilter)
    .group(all);

   //Table Chart
    tableChart.value
    .dimension(ageDimension)
    .group(function (data) {
      return data.age
    }).size(Infinity)
    .columns(['name', 'DOB'])
    .sortBy(function (d) {
      return d.value;
    })
    .order(d3.ascending);

    barChart.value.render();
    countChart.value.render();
    tableChart.value.render();
}


function resetFilters(){
  console.log('Reseting filters ....');
  barChart.value.filterAll();
  countChart.value.filterAll();
  tableChart.value.filterAll();
  dc.redrawAll()
}

</script>

<style lang="css" scoped>
.dc-chart { font-size: 12px; }
.dc-table-group { padding-left: 10px; font-size: 14px; font-weight: bold; }
.dc-table-column { padding-left: 10px; font-size: 12px; font-weight: normal; }
</style>