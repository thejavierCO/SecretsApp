import "./css/style.scss"
import App from "./app.svelte";
import {userSession} from "./auth"

new App({
    target:document.querySelector("#app"),
    props:{
        userSession
    }
})