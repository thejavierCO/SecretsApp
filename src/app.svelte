<script>
    import {authenticate} from "./auth";
    import Auth from "./components/Auth.svelte";
    export let userSession;
    let logged = false;
    if(userSession.isSignInPending()) {
        userSession.handlePendingSignIn().then((userData) => {
            window.history.replaceState({}, document.title, "/")
            console.log(userData);
        });
    }else if(userSession.isUserSignedIn()) {
        logged = true;
    }
</script>
<main>
    {#if logged===false}
        <button on:click={authenticate}>Login BlockStack</button>
    {:else if userSession.isUserSignedIn()}
        <Auth userData={userSession.loadUserData()}/>
    {/if}
</main>