import Vue from "vue";
import Main from "./main.vue";
class MyPluggin{
    install(Vue,options){
        Vue.directive("await",{
            bind:(...data)=>console.log(data),
            inserted: function (...data) {console.log(data,this)},
            // update:function (data) {console.log(data,this)},
            // componentUpdated: function (...data) {console.log(data,this)},
            // unbind: function (...data) {console.log(data,this)}
        })
        Vue.component('svelte-component',{
            name:"svelteComponent",
            render:h=>h("div",{ref:"content"}),
            data:(a)=>{
                let {component} = a.$attrs;
                this.component = component;
                this.base = a;
                return {...a.$attrs}
            },
            // beforeMount:(a)=>{console.log("antes de montar",a,this)},
            // beforeUpdate:(a)=>{console.log("antes de actualizar",a,this)},
            // created:(a)=>{console.log("created",a,this)},
            // mounted:(a)=>{console.log("i mounted",a,this)}
        })
    }
    load(componet,tag){
        console.log(componet,tag)
    }
}
Vue.use(new MyPluggin(),{static:false});

let test = new Vue({
    el:"#app",
    render:h=>h(Main)
})