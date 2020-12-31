<script>
    import db from "faunadb";
    import Auth from "./auth.svelte"
    export let App;
    let user = db.Client({secret:"fnAD-X6hC2ACBtYaFWQ9IDtmu5Xb7pyUA9FfzPFk"})
    let test = db.query;
    let auth = App.Auth;
    let status = auth.isSignIn;
    let accion = ()=>{
        status = auth.isSignIn;
        if(!auth.isSignIn)return auth.login();
        else return auth.exit();
    };

    console.log(user,test);
</script>

<button on:click={accion}>
    {#if !status}login{:else}exit{/if}
</button>

{#if status}
    <Auth user={auth.Profile().toJSON()} />
{/if}
