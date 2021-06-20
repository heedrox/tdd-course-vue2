import Vue from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import axios from 'axios';

Vue.config.productionTip = false;

axios.defaults.baseURL = 'https://conduit.productionready.io/api/';
new Vue({
  render: h => h(App),
  router,
  i18n
}).$mount('#app');
