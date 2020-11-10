import Vue from 'vue';
import App from './App.vue';
import router from './router';
import apolloProvider from '@/vue-apollo';
import './theme.scss'
Vue.config.productionTip = false;
let token: string;
token = "";
new Vue({
  router,
  apolloProvider: apolloProvider,
  render: (h) => h(App),
}).$mount('#app');

export let setToken =  (tkn: string) => {
  token = tkn;
}

export let getToken = (): string =>  {
  return token;
};