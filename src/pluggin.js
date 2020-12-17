import driver from "./driver.svelte";

export default class MyPluggin{
    constructor(){
        this.keys = [];
        this.comp = [];
    }
    install(Vue,options){
        let id = 0;
        Vue.component('svelte-component',{
            name:"svelteComponent",
            render:h=>h("div",{ref:"renderTag"}),
            data:(a)=>{
                this.keys[a._uid] = new driver({props:{vue:a}});
                this.comp[a._uid] = a;
                id++;
                return {};
            },
            mounted:()=>{
                let driver = this.keys[id+1];
                driver.$$.on_mount.map(e=>e(this.comp[id+1]))
                id--;
            },
            destroy:()=>{console.log("destroy",this)},
        })
    }
}