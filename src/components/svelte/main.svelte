<script>
    import {onMount,createEventDispatcher} from "svelte"
    let test = new createEventDispatcher();
    import Test from "./test.svelte";
    export let run = "print";
    test("mount",{redner:"jaiosdij"})
</script>
<hr>
<main>
    <slot {run}><Test {run}/></slot><br>
</main>
<hr>