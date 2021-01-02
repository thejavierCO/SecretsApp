<script>
    export let auth;
    export let accion;
    export let login = "signIn";
    export let exit = "signOut"
    let run = ({target})=>{
        console.log(target)
    }
    console.log(auth,accion,login,exit)
</script>

<button on:click={run}></button>