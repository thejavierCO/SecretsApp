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
        <svelte component="Files" :auth="auth"/>
        <div class="row">
            <div class="col">
                <div v-if="status===true">
                    <b-card>
                        <b-card-header>
                            <form action="#" id="from-send-2fa" v-on:submit="send">
                                <input type="text" name="auth" id="code">
                                <input type="submit" value="send">
                            </form>
                            <form action="#" id="from-send-2fa-validate" v-on:submit="send">
                                <input type="text" name="auth" id="code">
                                <input type="submit" value="send">
                            </form>
                        </b-card-header>
                        <b-button href="#" variant="primary">Go somewhere</b-button>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Files from "../FilesRender.svelte";
export default {
    name:"main_content",
    data:(a)=>{
        return ({
            ...a.$parent.$data,
            status:a.$parent.$data.auth.isLogin(),
            Svelte:{
                Files
            }
        })
    },
    methods:{
        open:(a,b)=>{b()},
        exit:(a,b)=>{b()},
        send:(a)=>{
            let {target} = a;
            let code = target.querySelector("#code");
            a.preventDefault();
        },
        validate:(a)=>{
            let {target} = a;
            let code = target.querySelector("#code");
            a.preventDefault();
        }
    }
}
</script>