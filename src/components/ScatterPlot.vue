<template>
    <div>
      <div class="vue-dc-graph-description">
          <b>People by Weight and Height Grouped By Gender</b>
          <a href="https://www.tutorialspoint.com/dcjs/dcjs_scatter_plot.htm" target="_blank"> DC.js - Scatter Plot Tutorial</a>
          <a
          href="https://github.com/mohapinkepane/vue3-dc.js-charts/blob/master/src/components/ScatterPlot.vue"
          target="_blank"
          >See chart source here</a
        >
      </div>
      
      <div id="scatter">
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import * as d3 from "d3";
import * as dc from "dc";

//CrossFilter strore
import { PeopleStore } from '../stores/crossfilter'

onMounted(() => {
   generateScatterPlot();
})

//Create crossfilter instance,dimentsions and groups;
var mycrossfilter = PeopleStore.people;

var hwDimension = mycrossfilter.dimension(function (data) {
  return [Math.floor(data.height), Math.floor(data.weight)];
});
var hwGroup = hwDimension.group().reduceCount();

//Create Chart Object
var scatterPlot = ref(null);
function generateScatterPlot() {
  scatterPlot.value = dc.scatterPlot('#scatter');
  scatterPlot.value
    .width(1200)
    .height(600)
    .x(d3.scaleLinear().domain([0, 180]))
    .y(d3.scaleLinear().domain([0, 100]))
    .brushOn(false)
    .xAxisLabel("Height")
    .yAxisLabel("Weight")
    .symbolSize(8)
    .clipPadding(10)
    .dimension(hwDimension)
    .group(hwGroup);

    scatterPlot.value.render();
}

</script>

<style lang="scss" scoped></style>