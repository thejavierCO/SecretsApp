<script>
    import {onMount} from "svelte";
    import {storage,setSecret,getSecret,delSecret} from "../storage";
    export let userData;
    onMount(()=>{
        storage.listFiles((a)=>{
            storage.getFile(a,{decrypt:true})
            .then(e=>JSON.parse(e))
            .then(e=>{
                console.log(e)
            })
            return true;
        })
        document.querySelector("form.set").addEventListener("submit",(e)=>{
            e.preventDefault()
            setSecret({title:e.target.querySelector("#title").value,message:e.target.querySelector("#message").value})
        })
        document.querySelector("form.get").addEventListener("submit",(e)=>{
            e.preventDefault()
            console.log(e.target.querySelector("#id").value)
        })
        document.querySelector("form.del").addEventListener("submit",(e)=>{
            e.preventDefault()
            console.log(e.target.querySelector("#id").value)
        })
    })
</script>
<div class="name">{userData.username}</div>
<form class="set">
    title:<input type="text" id="title">
    message:<input type="text" id="message">
    <input type="submit">
</form>
<form class="get">
    id:<input type="text" id="id">
    <input type="submit">
</form>
<form class="del">
    id:<input type="text" id="id">
    <input type="submit">
</form>