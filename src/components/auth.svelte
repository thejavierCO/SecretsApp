<script>
    import {createEventDispatcher,onMount} from "svelte";
    import {writable} from "svelte/store"
    export let auth;
    let text;
    let event = new createEventDispatcher();
    let status = writable(auth.isSignIn,()=>{event("status",auth.isSignIn);return ()=>{console.log("exit")}});
    let accion = _=>(auth.isSignIn?_=>{status.update(_=>false);auth.exit();}:_=>{auth.login();})();
    auth.finished = _=>status.update(_=>true)
    onMount(()=>{
        status.subscribe(e=>{
            text = !e?"login":"exit";
            if(e)document.querySelectorAll(`[avatar]`).forEach(e=>{
                let {image:[avatar]} = auth.Profile().toJSON()
                e.style.backgroundImage = `url(${avatar.contentUrl})`;
                e.setAttribute("auth","");
            })
            else document.querySelectorAll(`[avatar]`).forEach(e=>{
                e.style.backgroundImage = ``;
                e.removeAttribute("auth");
            })
            event("status",e);
        });
    })
</script>

{#if $$slots.btn}
    <slot name="btn" {accion} {text}/>
{/if}

{#if $$slots.body}
    <slot name="body" {status} {auth}/>
{/if}