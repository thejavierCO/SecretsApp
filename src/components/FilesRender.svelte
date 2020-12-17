<script>
    export let auth;
    export let status;
</script>

{#if status===true}
    {#await auth.Storage.Files((a)=>{console.log(a);return true})}
        loading
    {:then exit} 
        {console.log(exit)}
    {/await}
{:else}
    none
{/if}