export class inyect{
    constructor(svelteComponent,data,vue){
        this.vue = vue;
        this.comp = new svelteComponent({...data})
    }
}

export default class MyPluggin{
    constructor(){
        this.id = 0;
        this.component = [];
        this.mounted = [];
    }
    install(Vue,options){
        Vue.component('svelte', {
            render:h=>h("span",{ref:"svelte-render-tag",class:"Svelte"+this.id}),
            data:(a)=>{
                if(a.$attrs.hasOwnProperty("component")){
                    if(typeof a.$attrs.component === "string"){
                        if(a.$parent.hasOwnProperty("Svelte")){
                            if(a.$parent.Svelte.hasOwnProperty(a.$attrs.component)){
                                this.component[a._uid] = {
                                    component:a.$parent.Svelte[a.$attrs.component],
                                    name:a.$attrs.component,
                                    tag:a.$refs,
                                    vue:a
                                };
                            }else{
                                throw {error:"not exist component in parent svelte"}
                            }
                        }else{
                            console.warn({warn:"require Svelte in parent element"});
                        }
                    }else{
                        this.component[a._uid] = {
                            component:a.$attrs.component,
                            tag:a.$refs,
                            vue:a
                        };
                    }
                }
                this.id++;
                return {}
            },
            mounted:()=>{
                if(this.hasOwnProperty("component")){
                    if(typeof this.component[this.id+1].component === "string"){
                        let {component,name,tag,vue} = this.component[this.id+1]
                        this.comp = this.mounted.push({[name]:new inyect(
                            component,
                            {target:tag["svelte-render-tag"],props:{...vue.$attrs}},
                            vue
                        )})
                    }else{
                        let {component,vue,tag} = this.component[this.id+1];
                        this.comp = this.mounted.push(new inyect(
                            component,
                            {target:tag["svelte-render-tag"],props:{...vue.$attrs}},
                            vue
                        ))
                    }
                }
                this.id--;
            }
        })
    }
}