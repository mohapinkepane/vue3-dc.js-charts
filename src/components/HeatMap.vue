<template>
    <div>
        <div class="vue-dc-graph-description">
            <b>People by Height per Gender</b>
            <a href="https://www.tutorialspoint.com/dcjs/dcjs_heat_map.htm" target="_blank"> DC.js - Heat Map Tutorial</a>
        </div>
        <div id="heatmap">
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
   generateHeatMap();
})

//Create crossfilter instance,dimentsions and groups;
var mycrossfilter = PeopleStore.people;

var genderDimension = mycrossfilter.dimension(function (data) {
  return [+(data.gender=='Male'?1:2), +data.heightRange];
});

var genderGroup = genderDimension.group().reduceCount();

//Create Chart Object
var heatMap = ref(null);
function generateHeatMap() {
  heatMap.value = dc.heatMap('#heatmap');
  //Create Chart
  heatMap.value  
    .width(20 * 40 + 80)
    .height(2 * 30 + 40)
    .dimension(genderDimension)
    .group(genderGroup)
    .keyAccessor(function (d) { return +d.key[1]; })
    .valueAccessor(function (d) { return +d.key[0]; })
    .colorAccessor(function (d) { return +d.value; })
    .title(function (d) {
      return "Height Range:   " + ((d.key[1] - 1) * 10) + " - " + (d.key[1] * 10) + "cm\n" +
        "Gender:  " + (d.key[0] == 1 ? "Male" : "Female") + "\n" +
        "Count: " + (d.value) + " count";
    })
    .calculateColorDomain()

    heatMap.value.render();
}

</script>

<style lang="scss" scoped></style>