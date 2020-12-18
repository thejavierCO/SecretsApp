import "./css/style.scss";

import {Service} from "./tools/app";
import main from "./components/main.svelte";
import {Auth2FaService} from "./tools/2fa"
const config = new Service();

config.setPermisions('store_write', 'publish_data');

const app = config.makeApp("SecretsApp","https://cldup.com/JBYtQaqOZX.svg");

app.useAuthClass(Auth2FaService);

let run = new main({
    target:document.querySelector("#app"),
    props:{app}
})

run.$on("lognIn",()=>console.log("logiado"));
run.$on("unlognIn",()=>console.log("exit auth"));
run.$on("signIn",()=>console.log("registar"));