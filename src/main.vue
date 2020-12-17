<template>
    <div>
        <svelte-component :component="test" text="isText" v-await="testPromise" >
            <div load>init</div>
            <div then>init</div>
            <div catch>init</div>
        </svelte-component>
        <svelte-component :component="test0" text="isText"/>
    </div>
</template>

<script>
import test from "./test.svelte";
import test0 from "./test0.svelte";
import testvue from "./test.vue"
export default {
    name:"TestsComponent",
    data:()=>({test,test0}),
    methods:{
        testPromise:()=>new Promise((res,rej)=>setTimeout(()=>res({init:"play"}),3000))
    }
}
</script>