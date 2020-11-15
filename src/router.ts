import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Boards from './views/Boards.vue';
import BoardView from './views/BoardView.vue';
import {User} from "@/data_models/types";
import {getToken, vm} from "@/main";

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
      beforeEnter: (to, from, next) => {
          let item = localStorage.getItem('active_user');
          let user = JSON.parse(item ? item : "" );
          let tkn = getToken();
          let r_tkn = vm.$cookies.get('r_tkn');
          if((r_tkn || tkn ) && user){
              next(`u/${user.id}/boards`);
          }
          else {
              next();
          }
      }
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
      path: '/u/*/boards',
      name: 'boards',
      component: Boards,
      beforeEnter: (to, from, next) => {
          console.debug("Path check");
          let id = to.path.split('/')[2];
          let item = localStorage.getItem('active_user');
          let user = JSON.parse(item ? item : "" );
          console.debug(user.id);
          if(user.id === id){
            console.debug("go to boards")
            next();
          }
          else if(user.id){
            console.debug("go to your boards")
            next(`/u/${user.id}/boards`);
          }
          else{
            next(from.path);
          }

      }
    },
    {
      path: '/board',
      name: 'boardView',
      component: BoardView,
    },
  ],
});
