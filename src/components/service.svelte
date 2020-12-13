<script>
    import {createEventDispatcher} from "svelte"
    import {config} from "../config.js";
    import {storage} from "../storage";
    export let fileConfig = "testing";
    let createEvent = new createEventDispatcher();
    let base = storage();
    let fileBase = base.initFile(fileConfig);
</script>

{#await fileBase.getContent()}
    <slot name="Load"><em>loadding</em></slot>
{:then file}
    {@debug file}
    {(()=>{createEvent("OK",file);return ""})()}
    <slot name="OK" data={file}>
        <em>load config</em>
    </slot>
{:catch error}
    {#await fileBase.setContent(JSON.stringify(config))}
        {@debug error}
        {(()=>{createEvent("error",error);return ""})()}
        <slot name="Err" data={error}>
            <em>init config</em>
        </slot>
    {:then response}
        {@debug response}
        {(()=>{createEvent("OK",config);return ""})()}
        <slot name="OK" data={config}>
            {(()=>{window.location.reload();return ""})()}
        </slot>
    {:catch reject}
        {@debug reject}
        {(()=>{createEvent("error",reject);return ""})()}
        <slot name="Err" data={reject}>
            <em>other error</em>
        </slot>
    {/await}
{/await}