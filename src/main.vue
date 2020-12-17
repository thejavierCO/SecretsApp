<template>
    <div v-if="status">
        <svelte-component :component="test" text="one" v-on:mount={mount}>
            <div>init0</div>
        </svelte-component>
        <svelte-component :component="test" text="two">
            <div>init1</div>
        </svelte-component>
        <svelte-component :component="test" text="three">
            <div>init0</div>
        </svelte-component>
        <svelte-component :component="test" text="four">
            <div>init1</div>
        </svelte-component>
        {{testPromise().then(e=>{status=!status})}}
    </div>
    <div v-else>
        {{testPromise().then(e=>{status=!status})}}
    </div>
</template>

<script>
import test from "./test.svelte";
export default {
    name:"TestsComponent",
    data:()=>({test,status:true}),
    methods:{
        testPromise:()=>new Promise((res,rej)=>setTimeout(()=>res({init:"play"}),3000)),
        mount:(a)=>{
            console.log(a,this)
        }
    }
}
</script>