<script>
    import {onMount} from "svelte"
    import {config} from "../config";
    import {userSession} from "../auth";
    import {storage} from "../storage"
    const status = ()=>localStorage.getItem("config")!==null?JSON.parse(localStorage.getItem("config")):config;
    export let text = "switchTheme";
    export let fileConfig = "testing";
    let num = 0;
    function darkMode(save=true){
        let state = status().dark;
        if(save){
            state = !state;
            let data = {...(status())};
            data.dark = state;
            if(userSession.isUserSignedIn()){
                let base = storage();
                let fileBase = base.initFile(fileConfig);
                if(num===0){
                    num = 1;
                    setTimeout(()=>{
                        console.log("save config");
                        fileBase.setContent(JSON.stringify(data));
                        num = 0;
                    },2000)
                }
            }
            localStorage.setItem("config",JSON.stringify(data));
        }
        if(state){
            if(document.body.attributes.length <= 1){
                document.body.setAttribute("dark","")
            }
        }else if(document.body.attributes.length >= 0){
            document.body.removeAttribute("dark")
        }
    }
    darkMode(false);
    onMount(()=>setTimeout(()=>darkMode(false),1500))
</script>

<slot name="sw" accion={darkMode}>
    <button on:click={()=>darkMode()}>{text}</button>
</slot>
<slot><em>more</em></slot>