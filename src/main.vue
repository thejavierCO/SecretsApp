<template>
    <div v-if="state">
        <svelte component="main" v-on:click="click(state=!state)" text="start"></svelte>
    </div>
    <div v-else>
        <svelte component="main" v-on:click="click(state=!state)" text="end"></svelte>
    </div>
</template>

<script>
import init from "./init.svelte"
import main from "./main.svelte"
export default {
    name:"TestsComponent",
    data:()=>{
        return {
            Svelte:{main},
            state:false
        }
    },
    methods:{
        click:(a)=>{console.log(a)}
    }
}
</script>