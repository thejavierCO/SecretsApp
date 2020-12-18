import Vue from "vue";
import main from "./main.vue"
import MyPluggin from "./pluging";

Vue.use(new MyPluggin(),{static:false});

let run = new Vue({render:h=>h(main)})

run.$mount("#app")