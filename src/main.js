import "./css/style.scss";
import Vue from "vue";
import test from "./test.vue";

let print = new Vue({
    data:{
        text:"render"
    },
    render:h=>h(test)
}).$mount("#app")

console.log(print);
// let app = new Vue({
//     data:{configName:"config.json"},
//     render:h=>h(auth)
// })

// app.$mount("#app")

// let Auth = new Vue({
//     data:{
//         path:window.location.pathname,
//         config:new config({Theme:"",Auth:""}).get
//     },
//     render:h=>h(auth)
// })

// Auth.$on("login",(a)=>{console.log(a)})
// Auth.$on("unlogin",(a)=>{console.log(a)})

// Auth.$mount("#app")