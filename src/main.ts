import Vue from 'vue';
import App from './App.vue';
import router from './router';
import apolloProvider from '@/vue-apollo';
import './theme.scss';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueCookies from "vue-cookies";
import {getFromLocalStorage, storeInLocalStorage} from "@/utils";

Vue.use(VueCookies)
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

export const vm = new Vue({
  router,
  data: {
    token: ""
  },
  apolloProvider: apolloProvider,
  render: (h) => h(App),
}).$mount('#app');

export function setToken(tkn: string) {
  vm.token = tkn;
}

export function cacheRefreshToken(r_tkn: string){
  console.debug(`refresh token ${r_tkn}`);
  storeInLocalStorage('r_tkn', r_tkn);
}

export function getTokenFromCache(): string {
  return getFromLocalStorage("r_tkn") as string;
}

export function getToken(): string {
  return vm ? vm.token : "";
}

