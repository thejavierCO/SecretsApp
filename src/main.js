import "./css/index.scss";
import test from "./components/app.svelte";
import App from "./tools/app"

let init = new App("TodoList","https://cldup.com/JBYtQaqOZX.svg");

let run = new test({
    target:(
        document.querySelector("#app")||
        document.querySelector("[app]")
    ),
    props:{App:init}
});

console.log(run)