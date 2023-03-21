import {reactive} from 'vue'
import crossfilter from "crossfilter2";
//Json Data
import people from '../data/people.json'

export const PeopleStore = reactive({
  people:crossfilter(people.map(person=>{
   person.heightRange = (((Math.floor(person.height / 10)) + 1) * 10);
   person.weightRange = (((Math.floor(person.weight / 10)) + 1) * 10);
    return person;
  }))
})