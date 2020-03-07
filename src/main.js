import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import axios from "axios";
import dispatcher from "./dispatcher.js";
import "@mdi/font/css/materialdesignicons.css";
Vue.prototype.axios = axios;
Vue.use(Buefy);
Vue.config.productionTip = false;
window.Event = dispatcher;

new Vue({
  render: h => h(App)
}).$mount("#app");
