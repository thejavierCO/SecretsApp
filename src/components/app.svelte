<script>
    import About from "./about.svelte";
    import Service from "./service.svelte";
    import Auth from "./auth.svelte";
    export let App;
    let {Auth:auth} = App;
    let test = ()=>auth.isSignIn;
</script>

<Auth {auth}>
    <div slot="btn" class="navbar" let:accion let:text>
        <h3>{App.name}</h3>
        <button on:click={accion} width="10px" height="10px" avatar><span>{text}</span></button>
    </div>
</Auth>
<Auth {auth}>
    <div slot="body">
        {#if test()}
            <Service {App}/>
        {:else}
            <About {App}/>
        {/if}
    </div>
</Auth>
