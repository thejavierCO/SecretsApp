import "./css/style.scss"
import App from "./app.svelte";
// import {storage} from "./storage"

new App({
    target:document.querySelector("#app"),
    props:{
        fileConfig:"config.json"
    }
})