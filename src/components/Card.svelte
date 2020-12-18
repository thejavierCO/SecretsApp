<script>
    export let image = null;
</script>
<div class="card m-1" style="width: 18rem;">
    <img src={image} class="card-img-top" alt="...">
    <div class="card-body">
        <slot>
            <slot name="title" class="card-title">new auth</slot>
            <slot name="submit" class="btn btn-primary">send</slot>
        </slot>
    </div>
</div>