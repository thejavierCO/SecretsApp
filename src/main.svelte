<script>
    export let text;
    import {createEventDispatcher} from "svelte"
    let events = new createEventDispatcher();
</script>
<button on:click={()=>events("click",{})}>{text}</button>