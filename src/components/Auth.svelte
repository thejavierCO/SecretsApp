<script>
    import {onMount} from "svelte";
    import {storage,setSecret,getSecret,DataManager} from "../storage";
    export let userData;
    onMount(()=>{
        let testing = new DataManager(storage);
        testing.all = (a)=>{
            let {OK} = a;
            if(OK){
                console.log(OK)
            }
        }
    })
</script>
<div class="name">{userData.username}</div>