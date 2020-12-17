<script>
    import {onMount,createEventDispatcher, onDestroy} from "svelte";
    let createEvent = new createEventDispatcher();
    export let vue;
    onMount((...data)=>{if(data.length>0){
        let {component} = vue.$attrs;
        let data = new component({target:vue.$refs.renderTag,props:{...vue.$attrs}})
        console.log(data.$$)
    }})
</script>