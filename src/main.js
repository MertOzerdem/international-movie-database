import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import VueCompositionAPI from '@vue/composition-api'
import runtime from "serviceworker-webpack-plugin/lib/runtime";

Vue.config.productionTip = false

if ("serviceWorker" in navigator) {
  runtime.register();
}

Vue.use(VueCompositionAPI)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
