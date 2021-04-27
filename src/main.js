import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import runtime from "serviceworker-webpack-plugin/lib/runtime";

Vue.config.productionTip = false

if ("serviceWorker" in navigator) {
  runtime.register();
}

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
