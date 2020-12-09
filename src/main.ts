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

export const vm = new Vue({
  router,
  data: {
    token: ""
  },
  apolloProvider: apolloProvider,
  render: (h) => h(App),
}).$mount('#app');


