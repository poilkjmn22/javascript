//import indexCss from  "root/style/index.scss";
import Vue from "vue";
import App from "./Hello.vue";

Vue.config.productionTip = false;

//console.log(process.env);
new Vue({
  el: "#app",
  render: h => h(App)
});
