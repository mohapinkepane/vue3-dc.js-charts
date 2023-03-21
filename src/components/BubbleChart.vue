<template>
    <div>
        <div class="vue-dc-graph-description">
           <b>People by Weight and Height Grouped By Gender</b>
           <a href="https://www.tutorialspoint.com/dcjs/dcjs_bubble_chart.htm" target="_blank"> DC.js - Bubble Chart Tutorial</a>
        </div>
        <div id="bubble">
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
   generateBubbleChart();
})

//Create crossfilter instance,dimentsions and groups;
var mycrossfilter = PeopleStore.people;

var genderDimension = mycrossfilter.dimension(function (data) {
  return [(data.gender=='Male'?1:2), data.heightRange, data.weightRange];
});

var genderGroup = genderDimension.group().reduceCount();

//Create Chart Object
var bubbleChart = ref(null);
function generateBubbleChart() {
  bubbleChart.value = dc.bubbleChart('#bubble');
  //Create Chart
  bubbleChart.value  
    .width(1200)
    .height(600)
    .margins({ top: 10, right: 50, bottom: 30, left: 60 })
    .dimension(genderDimension)
    .group(genderGroup)
    .keyAccessor(function (p) {
      return p.key[1];
    })

    .valueAccessor(function (p) {
      return p.key[2];
    })

    .radiusValueAccessor(function (p) {
      return (Math.floor((p.value / 10)) + 1);
    })
    //Draw bubbles
    .x(d3.scaleLinear().domain([0, 240]))
    .y(d3.scaleLinear().domain([-40, 120]))
    .r(d3.scaleLinear().domain([0, 20]))
    .minRadiusWithLabel(1000)
    .yAxisPadding(100)
    .xAxisPadding(200)
    .maxBubbleRelativeSize(0.07)
    .renderHorizontalGridLines(true)
    .renderVerticalGridLines(true)
    .renderLabel(true)
    .renderTitle(true)
    .title(function (p) {
      return (p.key[0] == 1 ? "Male" : "Female")
        + "\n"
        + "Height: " + p.key[1] + " cm\n"
        + "Weight: " + p.key[2] + " kg\n"
        + "Count: " + p.value;
    });


    bubbleChart.value.yAxis().tickFormat(function (s) {
      return s + " cm";
    });

    bubbleChart.value.xAxis().tickFormat(function (s) {
      return s + " kg";
    });

    bubbleChart.value.render();
}

</script>

<style lang="scss" scoped></style>