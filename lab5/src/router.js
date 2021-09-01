import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Characters from './components/Characters.vue';
import SingleCharacter from './components/SingleCharacter.vue';
import Comics from './components/Comics.vue';
import SingleComic from './components/SingleComic.vue';
import Series from './components/Series.vue';
import SingleSeries from './components/SingleSeries.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/characters/page/:page',
      name: 'Characters',
      component: Characters
    },
    {
        path: '/characters/:id',
        name: 'SingleCharacter',
        component: SingleCharacter
    },
    {
        path: '/comics/page/:page',
        name: 'Comics',
        component: Comics
      },
      {
          path: '/comics/:id',
          name: 'SingleComic',
          component: SingleComic
      },
      {
        path: '/series/page/:page',
        name: 'Series',
        component: Series
      },
      {
          path: '/series/:id',
          name: 'SingleSeries',
          component: SingleSeries
      },

  ]
});
