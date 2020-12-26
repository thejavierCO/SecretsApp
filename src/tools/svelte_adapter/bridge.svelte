<script>
    import {createEventDispatcher,onMount} from "svelte";
    let event = new createEventDispatcher();
    let [parent] = arguments;
    export let anchor;
    export let props;
    export let target;
    class middle_1 extends target{
        constructor(options){
            super(options);
            onMount(()=>()=>this.$$.callbacks)
            this.$$.on_mount.push(()=>{console.log(this,"mount_middle",parent)})
            // let getEvents = ()=>{
            //     let callbacks = parent.$$.callbacks;
            //     setTimeout(()=>Object
            //     .keys(callbacks)
            //     .filter(e=>
            //         !this.$$.callbacks[e]?
            //         true:
            //         false
            //     )
            //     .length>0?getEvents():undefined,500)
            //     if(Object.keys(callbacks).length>0){
            //         Object.keys(callbacks).map(e=>{
            //             this.$on(e,callbacks[e])
            //         })
            //     }
            // }
            // getEvents()
        }
    }
</script>

<svelte:component this={middle_1} {...props}>
    {#each anchor as tag}
        {@html tag.outerHTML}
    {/each}
</svelte:component>