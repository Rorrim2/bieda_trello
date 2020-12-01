import Vue from 'vue';
import Router, {NavigationGuardNext, Route} from 'vue-router';
import Home from './views/Home.vue';
import Boards from './views/Boards.vue';
import BoardView from './views/BoardView.vue';
import {getToken, vm} from "@/main";
import {getFromLocalStorage} from "@/utils";
import {User} from "@/data_models/types";

Vue.use(Router);

function checkIfLoginSignUpIsAllowed(to: Route, from: Route, next: NavigationGuardNext){
    let item = getFromLocalStorage('active_user');
    let user = <User>item ?? <User>{};
    let tkn = getToken();
    let r_tkn = vm? vm.$cookies.get('r_tkn') : "";

    if((r_tkn || tkn ) && user ){
        console.debug(from.path)
        if(from.path !== `/u/${user.id}/boards` && from.path.startsWith('/u/')) {
            next(`u/${user.id}/boards`);
        }
    }
    else {
        next();
    }
}

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
      beforeEnter: checkIfLoginSignUpIsAllowed
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Sign_up.vue'),
      beforeEnter: checkIfLoginSignUpIsAllowed
    },
    {
      path: '/u/(.{16})/boards',
      name: 'boards',
      component: Boards,
      beforeEnter: (to, from, next) => {
          console.debug("Path check");
          let id = to.path.split('/')[2];
          let item = getFromLocalStorage('active_user');
          console.debug(item);
          let user = <User> item ?? <User> {};

          console.debug(user.id);
          if(user && user.id === id){
            console.debug("go to boards")
            next();
          }
          else if(user && user.id){
            console.debug("go to your boards")
            next(`/u/${user.id}/boards`);
          }
          else{
            next('/login');
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
