<script>
    import {onMount} from "svelte";
    import Vue from "vue"
    import content from "./vue/content.vue"
    export let app;
    let Auth = app.Auth;
    let renderContent = new Vue({name:"content",render:h=>h(content)});
    onMount(()=>{
        let login = document.querySelector("div[login]");
        let signin = document.querySelector("div[signin]");
        renderContent.$data.auth = Auth;
        renderContent.$mount(login?"[login]":signin?"[signin]":"#app")
    })
</script>
{#if Auth.isLogin()}
    <div login>login</div>
{:else}
    <div signin>not login</div>
{/if}