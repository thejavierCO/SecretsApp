<template>
    <div class="container">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="/">{{auth.App.name}}</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown v-if="status===true" right>
                        <template #button-content>
                            <em>{{auth.getUserData.username}}</em>
                        </template>
                        <b-dropdown-item href="#" v-on:click="exit(status=!status,auth.exitAuth)">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown v-if="status===false" right>
                        <template #button-content>
                            <em>Not Login</em>
                        </template>
                        <b-dropdown-item href="#" v-on:click="open(()=>status=!status,auth.login)">Logn In</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <SvelteRenderData :auth="auth" :status="status"/>
    </div>
</template>
<script>
import toVue from "svelte-adapter/vue"
import Files from "../FilesRender.svelte";
export default {
    name:"main_content",
    components:{
        SvelteRenderData:toVue(Files)
    },
    data:(a)=>{
        return ({
            ...a.$parent.$data,
            status:a.$parent.$data.auth.isLogin()
        })
    },
    methods:{
        open:(a,b)=>{b()},
        exit:(a,b)=>{b()}
    }
}
</script>