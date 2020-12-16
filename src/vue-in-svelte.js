// codigo base de https://github.com/pngwn/svelte-adapter
import Vue from 'vue'

export default (SvelteComponent,tag='span') => Vue.component('svelte-component', {
    render:h=>h(tag,{ref:"content"}),
    data:(a)=>({SvelteC:null,base:{...a.$parent}}),
    mounted() {
        class SvelteToVue extends SvelteComponent{
            constructor(options,vue){
                super(options);
                let watchers = []
                for (const key in vue.$listeners) {
                    this.$on(key, vue.$listeners[key])
                    const watchRe = /watch:([^]+)/,watchMatch = key.match(watchRe)
                    if (watchMatch && typeof vue.$listeners[key] === 'function')watchers
                    .push([
                        `${watchMatch[1][0].toLowerCase()}${watchMatch[1].slice(1)}`,
                        vue.$listeners[key]
                    ]);
                }
                if (watchers.length>0) {
                    let comp = this;
                    const update = this.$$.update
                    this.$$.update = function () {
                        watchers.forEach(([name, callback]) => {
                            const index = comp.$$.props[name]
                            callback(comp.$$.ctx[index])
                        })
                        update.apply(null, arguments)
                    }
                }
                this.optionsBase = options;
                this.VueData = vue;
            }
            $mount(){}
        }
        this.SvelteC = new SvelteToVue({
            target:this.$refs.content,
            props: {...this.$attrs}
        },this).$mount(this.$refs.content);

    },
    updated(){this.comp.$set(this.$attrs)},
    destroyed() {this.comp.$destroy()},
})