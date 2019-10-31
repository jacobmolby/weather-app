import Router from 'vue-router';

//import App from './App.vue';
import WeekForecast from '@/components/WeekForecast.vue';

import Daily from './components/Daily.vue';

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'WeekForecast',
      component: WeekForecast
    },
    {
      path: '/daily/:time',
      name: 'Daily',
      component: Daily,
      props: true
    }
  ]
});
