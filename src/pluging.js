export default class MyPluggin{
    constructor(){
        this.id = 0;
        this.component = [];
        this.mounted = [];
    }
    install(Vue){
        Vue.component('svelte', {    
        render(createElement) {
            return createElement("span", {
              ref: "container",
              props: this.$attrs
            });
          },
          data(a) {
              let comp
            if(a.$attrs.hasOwnProperty("component")){
                if(typeof a.$attrs.component === "string"){
                    if(a.$parent.hasOwnProperty("Svelte")){
                        if(a.$parent.Svelte.hasOwnProperty(a.$attrs.component)){
                            comp = a.$parent.Svelte[a.$attrs.component]
                        }else{
                            throw {error:"not exist component in parent svelte"}
                        }
                    }else{
                        console.warn({warn:"require Svelte in parent element"});
                    }
                }else if(/class/i.test(a.$attrs.component.toString())){
                    comp = a.$attrs.component
                }else{
                    throw {error:"require class or string"}
                }
            }
            return {comp};
          },
          mounted() {
            if(this.comp!==undefined){
              this.comp = new this.comp({
                target: this.$refs.container,
                props: this.$attrs
              });
        
              let watchers = [];
        
              for (const key in this.$listeners) {
                this.comp.$on(key, this.$listeners[key]);
                const watchRe = /watch:([^]+)/;
        
                const watchMatch = key.match(watchRe);
        
                if (watchMatch && typeof this.$listeners[key] === "function") {
                  watchers.push([
                    `${watchMatch[1][0].toLowerCase()}${watchMatch[1].slice(1)}`,
                    this.$listeners[key]
                  ]);
                }
              }
        
              if (watchers.length) {
                let comp = this.comp;
                const update = this.comp.$$.update;
                this.comp.$$.update = function() {
                  watchers.forEach(([name, callback]) => {
                    const index = comp.$$.props[name];
                    callback(comp.$$.ctx[index]);
                  });
                  update.apply(null, arguments);
                };
              }
            }else console.warn("not component attr")
          },
          updated() {
            this.comp.$set(this.$attrs);
          },
          destroyed() {
            this.comp.$destroy();
          }
        })
    }
}