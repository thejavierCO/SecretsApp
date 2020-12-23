import "./css/style.scss";
import Main from "./components/main.svelte";
let div = document.querySelector("#app");
let nav = document.createElement("h1");
nav.innerHTML = "init";
class RenderSvelte extends Main{
    mount(target,anchor=null,hydrate,intro){
        if (target) {
            if (hydrate) {
                const nodes = children(target);
                if(this.$$.fragment && this.$$.fragment.l)this.$$.fragment && this.$$.fragment.l(nodes);
                nodes.forEach(detach);
            } else {
                if(this.$$.fragment && this.$$.fragment.c)this.$$.fragment.c();
                this.$$.fragment.m(target,anchor);
            }
            if (intro) transition_in(this.$$.fragment);
        }
    }
}
let Render = new RenderSvelte({
    props:{run:"init"}
});

Render.mount(div,nav)

console.log(Render,[nav,div])