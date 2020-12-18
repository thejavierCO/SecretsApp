<script>
    import {onMount} from "svelte";
    import Files from "./Files.svelte";
    import Card from "./Card.svelte"
    import {v4} from "uuid"
    export let app;
    let Auth = app.Auth;
    let status = Auth.isLogin();
    let exit = ()=>{
        Auth.login();
        status = !status;
    }
    let login = ()=>{
        Auth.exitAuth();
        status = !status;
    }
    let add = ({target})=>{
        let data = Auth.Storage.File(v4()+"auth");
        let auth = target.querySelector("#cuenta").value;
        let app = target.querySelector("#app").value;
        data.Content = JSON.stringify({auth,app});
    }
    let getToken = ({target})=>{
        let auth = target.querySelector("#code").value;
        console.log(Auth.token(auth));
    }
    let verify = ({target})=>{
        let auth = target.querySelector("#code").value;
        let token = target.querySelector("#token").value;
        console.log(Auth.check(token,auth));
    }
    let files = [];
    onMount(()=>{
        if(status===true){
            Auth.Storage.Files((name)=>{files.push(name);return true}).then(e=>{console.log(files)})
        }
    })
</script>
<div class="container">
    <div class="navbar navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="/">
              <img src={Auth.App.icon} alt="" width="30" height="24">
            </a>
            <h4>{Auth.App.name}</h4>
            <div class="d-flex">
                {#if status}
                    <button login on:click={exit}>cerrar session</button>
                {:else}
                    <button singUp on:click={login}>iniciar session</button>
                {/if}
            </div>
        </div>
    </div>
    {#if status}
    <div class="row row-cols-4">
        {#if files.length > 0}
            <Files data={files}/>
        {/if}
        <div class="col">
            <Card image="https://blog.marksauerutley.com/static/f650a46c1234b300e93692984eb7b311/eea4a/sapper-logo.jpg">
                <div class="card-title">agregar</div>
                <form action="#" on:submit|preventDefault={add}>
                    <input type="text" placeholder="auth" value={Auth.getUserData.username} id="cuenta"/><br/>
                    <input type="text" placeholder="app" value={Auth.App.name} id="app"/><br/>
                    <input type="submit" value="agregar"/>
                </form>
            </Card>
        </div>
        <div class="col">
            <Card image="https://blog.marksauerutley.com/static/f650a46c1234b300e93692984eb7b311/eea4a/sapper-logo.jpg">
                <div class="card-title">obtener token</div>
                <form action="#" on:submit|preventDefault={getToken}>
                    <input type="text" placeholder="secret code" value={window.atob(localStorage.getItem("config"))} id="code"/><br/>
                    <input type="submit" value="obtener token"/>
                </form>
            </Card>
        </div>
        <div class="col">
            <Card image="https://blog.marksauerutley.com/static/f650a46c1234b300e93692984eb7b311/eea4a/sapper-logo.jpg">
                <div class="card-title">verificar</div>
                <form action="#" on:submit|preventDefault={verify}>
                    <input type="text" placeholder="secret code" value={window.atob(localStorage.getItem("config"))} id="code"/><br/>
                    <input type="text" placeholder="token" id="token"/><br/>
                    <input type="submit" value="verificar"/>
                </form>
            </Card>
        </div>
    </div>
    {:else}
        <div class="container"></div>
    {/if}
</div>