<script>
    export let user;
    let {description,image:[cover],name,apps,appsMeta} = user;
    console.log("this")
</script>

<div class="appAuthUser">
    <div class="picture">
        <img src={cover.contentUrl} alt="cover"/>
    </div>
    <div class="user">{name}</div>
    <div class="description">{description}</div>
    {#each Object.keys(apps) as app}
        <div class="appName">{app}</div>
        <div class="userApp">{apps[app]}</div>
    {/each}
    
    {#each Object.keys(appsMeta) as app}
        <div>
            <span><a href={app}>{app}</a></span>
            <div>
                {#each Object.keys(appsMeta[app]) as appdata}
                    <span>{appdata} - {appsMeta[app][appdata]}</span><br>
                {/each}
            </div>
        </div>
    {/each}
</div>