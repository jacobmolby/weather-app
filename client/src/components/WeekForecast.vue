<template>
  <div>
    <Search @find-weather="findWeather" />
    <Weather v-if="forecast" :forecast="forecast" :city="city" />
    <div v-if="this.error && !this.forecast">
      <div class="ui message">
        <div class="header">Error has occured</div>
        <p>{{this.error}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Search from "@/components/Search.vue";
import Weather from "@/components/Weather.vue";
export default {
  name: "WeekForecast",
  data() {
    return {
      forecast: null,
      error: null,
      city: null
    };
  },
  components: {
    Search,
    Weather
  },
  mounted() {
    this.findWeather("København");
  },
  methods: {
    async findWeather(city) {
      this.city = city;
      const url = `http://localhost:8000/forecast/${city}/week`;
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

<style>
</style>