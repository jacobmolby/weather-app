import Vue from 'vue';
import Router from 'vue-router';
import router from './router';

import App from '@/App.vue';

require('semantic-ui-css/semantic.css');
import VueSkycons from 'vue-skycons';

Vue.use(Router);
Vue.use(VueSkycons, {
  color: 'navy'
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router
}).$mount('#app');
