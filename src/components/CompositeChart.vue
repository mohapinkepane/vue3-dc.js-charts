<template>
  <div>
    <div class="vue-dc-graph-description">
            <b>People by Age per Gender</b>
            <a href="https://www.tutorialspoint.com/dcjs/dcjs_composite_chart.htm" target="_blank"> DC.js - Composite Chart Tutorial</a>
             <a
              href="https://github.com/mohapinkepane/vue3-dc.js-charts/blob/master/src/components/CompositeChart.vue"
              target="_blank"
              >See chart source here</a
            >
        </div>
        
    <div id="composite">
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
  generatecompositeChart();
})

//Create crossfilter instance,dimentsions and groups;
var mycrossfilter = PeopleStore.people;

var dim = mycrossfilter.dimension(dc.pluck('age')),
grp1 = dim.group().reduceSum(function (d) { return d.gender=='Male'; }),
grp2 = dim.group().reduceSum(function (d) { return d.gender == 'Female';})

//Create Chart Object
var compositeChart = ref(null);
function generatecompositeChart() {
  compositeChart.value = dc.compositeChart('#composite');
  compositeChart.value
    .width(450)
    .height(250)
    .x(d3.scaleLinear().domain([15, 70]))
    .yAxisLabel("Count")
    .xAxisLabel("Age")
    .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
    .renderHorizontalGridLines(true)
    .compose([
      dc.lineChart(compositeChart.value)
        .dimension(dim)
        .colors('red')
        .group(grp1, "Male")
        .dashStyle([2, 2]),
      dc.lineChart(compositeChart.value)
        .dimension(dim)
        .colors('blue')
        .group(grp2, "Female")
        .dashStyle([5, 5])
    ])

    .brushOn(false)
    .render();
}

</script>

<style lang="scss" scoped></style>