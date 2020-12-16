<template>
    <div>
        <span>render vue</span>
        <init text="text" v-on:click="click" v-on:init="()=>{}">
            <template>
                <div>init</div>
            </template>
        </init>
        <span>render vue</span>
    </div>    
</template>

<script>
import toVue from "./vue-in-svelte";
import test from "./test.svelte";
export default {
    name:"app_main",
    data:(a)=>Object.keys(a.$parent.$data).length>0?a.$parent.$data:({text:"default data"}),
    components:{init:toVue(test)},
    methods:{
        click:(a)=>{
            console.log(a)
        }
    }
}
</script>