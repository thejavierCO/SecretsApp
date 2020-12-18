<script>
    import {onMount} from "svelte";
    import Vue from "vue"
    import Print from "./vue/printData.vue";
    export let auth;
    export let status;
    onMount(()=>{
        auth.Storage.Files((a)=>{
            console.log(Print,Vue,a)
            return true;
        })
    })
</script>

{#if status!==true}
    <div showData></div>
{:else}
    <div showData>not login</div>
{/if}