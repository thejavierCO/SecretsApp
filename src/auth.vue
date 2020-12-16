<template>
    <div class="render">
        <test 
        v-if="isLogin()"
        :name="nameApp"
        :accion="login" 
        :config="config"
        text="exit" 
        >
            <template v-slot:body><em>init</em></template>
        </test>
        <test 
        v-if="!isLogin()" 
        :name="nameApp" 
        :accion="signin" 
        :config="config"
        text="signin"
        />
    </div>
</template>

<script>
import {userSession,authenticate,isLogin,unlogin,nameApp} from "./auth";
import App from "./app.svelte";
import {config} from "./config";
import toVue from "./vue-in-svelte";
export default {
    name:"app",
    components:{
        test:toVue(App)
    },
    data:(a)=>({
        ...a.$parent.$data,
        nameApp
    }),
    methods:{
        isLogin:()=>userSession.isUserSignedIn(),
        login:()=>unlogin("/"),
        signin:(f)=>authenticate(f)
    },
    created(){
        let data = new config()
        if(localStorage.getItem("config.json")===null)localStorage.setItem("config.json",data.json);
        else data.use(localStorage.getItem("config.json"))
        this.config = data;
    },
    mounted(){
        this.pages = this.config.Auth.pages;
    },
    Update(){
        console.log(this)
    },
    beforeUpdate(){
        console.log(this)
    }
}
</script>