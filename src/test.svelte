<script>
    export let text;
    import {onMount,onDestroy,createEventDispatcher,afterUpdate,beforeUpdate} from "svelte";
    let setEvent = new createEventDispatcher();
    onMount((a)=>{})
    onDestroy((a)=>{setEvent("destroy",{})})
    afterUpdate((a)=>{setEvent("antes",{})})
    beforeUpdate((a)=>{setEvent("despues",{})})
</script>

<div>echo {text}</div>
<slot><em>i am slot</em></slot><br>
<slot name="main"><em>i am slot main</em></slot><br>
<slot name="parck"><em>i am slot parck</em></slot><br>
<slot name="main9jasid"><em>i am slot main</em></slot><br>
<slot name="parckasd"><em>i am slot parck</em></slot><br>
<div>echo {text}</div>