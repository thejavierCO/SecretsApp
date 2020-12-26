import Bridge from "./bridge.svelte"
import {mount_component,transition_in,children,flush} from "svelte/internal";

export class middle extends Bridge{
    mount(target,anchor,hydrate,intro){
        if (target) {
            if(typeof target==="string")target = document.querySelector(target)
            if(target===null)throw {error:"not exist element"} 
            if (hydrate) {
                const nodes = children(target);
                if(this.$$.fragment && this.$$.fragment.l)this.$$.fragment && this.$$.fragment.l(nodes);
                nodes.forEach(detach);
            } else {
                if(this.$$.fragment && this.$$.fragment.c)this.$$.fragment.c();
                mount_component(this,target,anchor);
            }
            if (intro) transition_in(this.$$.fragment);
            flush();
        }
        return this;
    }
    destroy(){this.$destroy();return this;}
}

export class Render{
    constructor(options){
        this.run = new middle({props:{...options}})
    }
    $on(name,callback){
        this.run.$on(name,callback);
    }
    get mount(){
        return (tag)=>this.run.mount(tag)
    }
}