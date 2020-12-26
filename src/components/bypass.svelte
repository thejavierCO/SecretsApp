<script>
    export let component;
    export let slots;
</script>

<svelte:component this={component} {...$$restProps}>
{#each Object.keys(slots) as name}
    {@html ((r)=>{return r.outerHTML})(slots[name])}
{/each}
</svelte:component>