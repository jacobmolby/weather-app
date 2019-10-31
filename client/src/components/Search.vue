<template>
  <div>
    <div class="row">
      <h3 class="ui header">Enter a city name and click search, to see a 7 day weather forecast!</h3>
    </div>

    <div class="ui divider"></div>

    <div class="grid ui centered">
      <div class="row">
        <form v-on:submit.prevent="$emit('find-weather', city)">
          <div class="ui left icon input right action">
            <input v-model="city" />
            <i class="search icon"></i>
            <button class="ui animated button">
              <div class="visible content">Search</div>
              <div class="hidden content">
                <i class="right arrow icon"></i>
              </div>
            </button>
          </div>
        </form>
      </div>

      <div class="row">
        <h1 class="ui header">{{uppercaseCity}}</h1>
      </div>
    </div>

    <div class="ui divider"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "København"
    };
  },
  computed: {
    uppercaseCity() {
      var splitStr = this.city.toLowerCase().split(" ");
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] =
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }

      return splitStr.join(" ");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>