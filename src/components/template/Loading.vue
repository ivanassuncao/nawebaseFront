<template>
    <div class="loading" >
        <img src="@/assets/loading.gif" alt="loading">
    </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style>
    .lioading{
        grid-area: content;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
