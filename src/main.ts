import Vue from 'vue';
import App from './App.vue';
import router from './router';
import apolloProvider from '@/vue-apollo';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme.scss'
Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider: apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
