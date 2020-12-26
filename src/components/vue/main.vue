<template>
    <main>
        <!-- <svelte-component this="components/svelte/main.svelte"/>
        <svelte-component this="components/svelte/main.svelte">
            <div>i am default</div>
            <div slot="play">i am play</div>
        </svelte-component> -->
        <svelte-component>
            <use template="
                <slot><em>run</em></slot>
            "/>
            <run>
                <em>init</em>
            </run>
        </svelte-component>
    </main>
</template>

<script>
export default {
    name:"Home_page"
}
</script>