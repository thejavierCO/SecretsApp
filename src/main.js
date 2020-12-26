import "./css/style.scss";
import {Render} from "./tools/svelte_adapter"
import Main from "./components/main.svelte";

let testD = document.createElement("div");
let span = document.createElement("span")
span.innerHTML = "<h1>init</h1>"
testD.appendChild(span)

let render = new Render({
    target:Main,
    props:{},
    anchor:[testD]
})


render.$on("mount",(a)=>{
    console.log(a)
})

render.mount("#app")
