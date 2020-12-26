import "./css/style.scss";
import Vue from "vue";
import main from "./components/vue/main.vue";
import SvelteAdapter from "./tools/vue_plugin";

Vue.use(new SvelteAdapter())

let test = new Vue({render:h=>h(main)})

test.$mount("#app")