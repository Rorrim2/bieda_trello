import Vue from 'vue';
import App from './App.vue';
import router from './router';
import apolloProvider from '@/vue-apollo';
import './theme.scss';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueCookies from "vue-cookies";

Vue.use(VueCookies)
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
let token: string;
token = "";

export const vm = new Vue({
  router,
  apolloProvider: apolloProvider,
  render: (h) => h(App),
}).$mount('#app');

export function setToken(tkn: string) {
  token = tkn;
}

export function cacheRefreshToken(r_tkn: string){
  console.debug(`refresh token ${r_tkn}`)
  Vue.prototype.$cookies.set("r_tkn", r_tkn, null, null, null, true)
}

export function getTokenFromCache(): string {
  return Vue.prototype.$cookies.get("r_tkn");
}

export function getToken(): string {
  return token;
}

