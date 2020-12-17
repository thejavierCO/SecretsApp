import Vue from "vue";
import Main from "./main.vue";
import MyPluggin from "./pluggin";

Vue.use(new MyPluggin(),{static:false});

let test = new Vue({
    el:"#app",
    render:h=>h(Main)
})