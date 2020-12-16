<script>
    export let config;
    export let name;
    export let text;
    export let accion;
    // import Theme from "./components/theme.svelte";
    // import Main from "./components/service.svelte";
    // import Auth from "./components/auth.svelte";
    import Content from "./components/content.svelte";
    // export let fileConfig = "testing";
    console.log(config)
</script>
<main>
    <Content>
        <div slot="navbar">
            <h3>{name}</h3>
            <button on:click={accion}>{text}</button>
        </div>
        <div slot="body">
            <slot><em>body</em></slot>
        </div>
    </Content>
</main>