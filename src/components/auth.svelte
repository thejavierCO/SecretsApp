<script>
    import { authenticate , getUserData , isLogin , unlogin} from "../auth";
    import { createEventDispatcher , onMount } from "svelte";
    const setEvent = new createEventDispatcher();
    onMount(()=>{
        if(isLogin()){
            setEvent("login",getUserData());
        }else{
            setEvent("unlogin",{});
        }
    });
</script>
{#if isLogin()}
    <slot name="login" accion={unlogin} user={getUserData()}>
        <button on:click={unlogin}>Cerrar Session</button>
    </slot>
{:else}
    <slot name="unlogin" accion={authenticate}>
        <button on:click={authenticate}>Iniciar Session</button>
    </slot>
{/if}