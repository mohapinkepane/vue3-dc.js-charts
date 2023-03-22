<template>
    <div>
    <div class="vue-dc-graph-description">
             <b>People by Age</b>
             <a href="https://www.tutorialspoint.com/dcjs/dcjs_data_count.htm" target="_blank"> DC.js - Data Count Tutorial</a>
             <a
                href="https://github.com/mohapinkepane/vue3-dc.js-charts/blob/master/src/components/DataCount.vue"
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
      <div id="bar2">
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
//Data Count Chart
var countChart = ref(null);
var barChart = ref(null);
function generateCharts() {
  countChart.value = dc.dataCount("#mystats");
  barChart.value = dc.barChart('#bar2');

  //Bar Chart
  barChart.value
    .width(700)
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

  countChart.value.render();
  barChart.value.render();
}


function resetFilters(){
  barChart.value.filterAll(); 
  countChart.value.filterAll();
  dc.redrawAll()
}

</script>

<style lang="css" scoped>
  .dc-chart { font-size: 12px; }
</style>