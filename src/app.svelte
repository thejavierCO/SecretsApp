<script>
    import Theme from "./components/theme.svelte";
    import Main from "./components/service.svelte";
    import Auth from "./components/auth.svelte";
    import Content from "./components/content.svelte";
    export let fileConfig = "testing";
</script>
<main>
    <Content>
        <div slot="navbar">
            <h3>welcome app</h3>
            <Theme text="switch" {fileConfig}>
                <Auth/>
            </Theme>
        </div>
        <div slot="body">
            <Auth>
                <div slot="login" let:user={data}>
                    <Main {fileConfig}
                    on:error={(a)=>console.warn(a)}
                    on:OK={(a)=>{localStorage.setItem("config",a.detail)}}>
                        <div slot="OK"></div>
                    </Main>
                </div>
                <div slot="unlogin">not login</div>
            </Auth>
        </div>
    </Content>
</main>