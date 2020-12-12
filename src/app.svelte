<script>
    import Auth from "./components/auth.svelte";
    import Content from "./components/content.svelte";
</script>
<main>
    <Content>
        <div slot="navbar">
            <h3>welcome app</h3>        
            <Auth/>
        </div>
        <div slot="body">
            <Auth>
                <div slot="login" let:user={data}>login</div>
                <div slot="unlogin">not login</div>
            </Auth>
        </div>
    </Content>
</main>