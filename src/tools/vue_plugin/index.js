import {compile,parse,preprocess,walk,VERSION} from "svelte/compiler";
import Vue from "vue";
export default class Mypluggin{
    /**
     * install my pluggin
     * @param {Vue} vue vue component
     * @param {Object} options options for your pluggin
     */
    install(vue,options){
        console.warn(`running svelte version ${VERSION}`)
        vue.component("svelte-component",{
            render:h=>h("div",{ref:"render",props:this.$attrs}),
            data:(a)=>{
                return {}
            }
        })
    }
}