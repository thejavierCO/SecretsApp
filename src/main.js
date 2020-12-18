import "./css/style.scss";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import {Service} from "./tools/app";
import main from "./components/main.svelte"
import myplug from "./pluging" 
const config = new Service();

Vue.use(new myplug);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

config.setPermisions('store_write', 'publish_data');

const app = config.makeApp("SecretsApp","https://cldup.com/JBYtQaqOZX.svg");

let run = new main({
    target:document.querySelector("#app"),
    props:{app}
})

run.$on("lognIn",()=>console.log("logiado"));
run.$on("unlognIn",()=>console.log("exit auth"));
run.$on("signIn",()=>console.log("registar"));