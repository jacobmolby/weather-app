<template>
  <div>
    <div v-if="city">
      <div class="row">
        <h2 class="ui header">{{this.city}} the next 24 hours</h2>
      </div>
      <div class="ui divider"></div>
      <div class="segment ui">
        <div class="ui relaxed divided list">
          <div class="item" v-bind:key="hour.time" v-for="hour in dayForecast">
            <div class="image">
              <skycon v-bind:condition="hour.icon" :width="dimension" :height="dimension" />
            </div>
            <div class="content">
              <h4 class="header">{{hour.utc}}:00 - {{weekDay}}</h4>
              <div class="description">
                {{hour.summary}} (
                {{hour.temperature}} degrees)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!city">
      Please
      <router-link style="font-weight: bold" to="/">go back</router-link>and search again.
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "daily",
  data() {
    return {
      forecast: {
        hourly: {
          data: []
        }
      },
      dimension: 24
    };
  },
  props: {
    time: Number,
    weekDay: String,
    city: String
  },
  mounted() {
    this.findWeather(this.city, this.time);
  },
  computed: {
    dayForecast() {
      let day = this.forecast.hourly.data;
      for (let i = 0; i < day.length; i++) {
        let time = day[i].time;
        day[i].utc = Number(moment.unix(time).format("HH"));
        day[i].temperature = Math.round(day[i].temperature);
      }
      return day;
    }
  },
  methods: {
    async findWeather(city, time) {
      const url = `http://localhost:8000/forecast/${city}/${time}`;
      try {
        const response = await axios.get(url);
        this.forecast = response.data;
      } catch (error) {
        this.error = error;
      }
    }
  }
};
</script>

<style scoped>
.segment.ui {
  margin-bottom: 50px !important;
}
</style>