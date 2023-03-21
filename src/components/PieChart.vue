<template>
  <div>
      <div class="vue-dc-graph-description">
         <b>People by Gender</b>
         <a href="https://www.tutorialspoint.com/dcjs/dcjs_pie_chart.htm" target="_blank"> DC.js - Pie Chart Tutorial</a>
      </div>
        <div class="vue-dc-graph-stats" > 
              <a class="vue-dc-button" @click="resetFilters">Reset All</a>
        </div>
      <div id="pie">
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import * as d3 from "d3";
import * as dc from "dc";

//CrossFilter strore
import {PeopleStore} from '../stores/crossfilter'

onMounted(() => {
  generatePieChart();
})

//Create crossfilter instance,dimentsions and groups;
var mycrossfilter = PeopleStore.people;
var all = mycrossfilter.groupAll();
var genderDimension = mycrossfilter.dimension(function (data) {
  return data.gender;
});
var genderGroup = genderDimension.group().reduceCount();

//Create Chart Object
var pieChart = ref(null);
function generatePieChart(){
  
  pieChart.value = dc.pieChart('#pie');
  pieChart.value
    .width(500)
    .height(150)
    .radius(150)
    .innerRadius(0)
    .dimension(genderDimension)
    .group(genderGroup)
    .label(function (d) {
      if (pieChart.value.hasFilter() && !pieChart.value.hasFilter(d.key)) {
        return d.key + '(0%)';
      }
      var label = d.key;
      if (all.value()) {
        label += '(' + Math.floor(d.value / all.value() * 100) + '%)';
      }
      return label;
    });

    pieChart.value.render();
}

function resetFilters() {
  console.log('Reseting filters ....');
  pieChart.value.filterAll();
  dc.redrawAll()
}

</script>

<style lang="scss" scoped>

</style>