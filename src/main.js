import "./css/style.scss";

// import {AppBlockStack} from "./tools/BS"
// import main from "./components/main.svelte";
// const control = new AppBlockStack();
// const app = control.CreateApp("SecretsApp","https://cldup.com/JBYtQaqOZX.svg");

// let run = new main({
//     target:document.querySelector("#app"),
//     props:{app}
// })

// run.$on("data",(a)=>{console.log(a)})

import {App} from "./tools/blockstack";

const app = new App("SecretsApp","https://cldup.com/JBYtQaqOZX.svg");

const auth = app.Auth;

if(!auth.isSignIn){
    auth.login((a)=>{
        console.log(a);
    });
}else{
    let Storage = auth.Storage;
    Storage.Files().then(e=>{
        console.log(e)
    })
}
