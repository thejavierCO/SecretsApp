<template>
    <div>
        <svelte component="main" v-on:click="click"></svelte>
        <svelte :component="Svelte.init"></svelte>
    </div>
</template>

<script>
import init from "./init.svelte"
import main from "./main.svelte"
export default {
    name:"TestsComponent",
    data:()=>{
        return {
            Svelte:{
                main,
                init
            }
        }
    },
    methods:{
        click:(a)=>{
            console.log(a)
        }
    }
}
</script>