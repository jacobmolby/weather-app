<template>
  <div class="segment ui">
    <div class="ui relaxed divided list">
      <div class="item" v-bind:key="item.time" v-for="item in forecastComplete">
        <div class="image">
          <skycon v-bind:condition="item.icon" :width="dimension" :height="dimension" />
        </div>
        <div class="content">
          <h4 class="header">{{item.weekDay}}</h4>
          <div class="description">
            {{item.summary}}
            <!-- {{item.time}} -->
            <router-link
              :to="{name: 'Daily', 
              params: {
                time: item.time, 
                weekDay: item.weekDay,
                city: item.city}}"
            >View More</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      dimension: 32
    };
  },
  props: {
    forecast: Array,
    city: String
  },
  computed: {
    forecastComplete() {
      let week = this.forecast;
      for (let i = 0; i < 7; i++) {
        week[i].weekDay = moment()
          .add(i, "d")
          .format("dddd [,] MMMM Do");
        week[i].city = this.city;
      }
      if (week.length > 7) {
        week.pop();
      }
      return week;
    }
  }
};
</script>

<style scoped>
</style>