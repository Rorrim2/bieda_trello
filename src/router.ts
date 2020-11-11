import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Boards from './views/Boards.vue';
import BoardView from './views/BoardView.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Sign_up.vue'),
    },
    {
      path: '/boards',
      name: 'boards',
      component: Boards,
    },
    {
      path: '/board',
      name: 'boardView',
      component: BoardView,
    },
  ],
});
