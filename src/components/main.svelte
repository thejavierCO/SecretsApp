<script>
    export let app;
    console.log(app)
</script>

<main>
    <div class="container">
        <div class="navbar navbar-dark">
            <div class="container-fluid">
                <!-- svelte-ignore a11y-invalid-attribute -->
                <a href="#" class="navbar-brand">
                    <img src={app.icon} alt="icono" invert width="50">
                    {app.name}
                </a>
            </div>
        </div>
        <div class="row">
            init
        </div>
    </div>
</main>