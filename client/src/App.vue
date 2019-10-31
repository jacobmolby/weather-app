<template>
  <div id="app">
    <div class="ui container">
      <div class="ui center aligned grid">
        <div class="row">
          <router-link to="/">
            <h1 class="ui header">Weather App</h1>
          </router-link>
        </div>
        <router-view></router-view>
        <div class="row">
          Powered by &nbsp
          <a href="https://darksky.com/poweredby">Darksky</a>&nbsp & &nbsp
          <a href="https://mapbox.com">Mapbox</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
<style scoped>
#app {
  margin-top: 40px;
}
</style>