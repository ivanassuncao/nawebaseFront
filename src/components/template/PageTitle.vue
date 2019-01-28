<template>
    <div class="page-title">
        <h1><i v-if="icon" :class="icon"  class="mr-2" ></i>{{main}}</h1>
        <h2>{{sub}}</h2>
        <hr>
    </div>
</template>

<script>
export default {
    name: "PageTitle",
    props: ['icon','main','sub']
}
</script>

<style>
    .page-title{
        margin: 0px;
    }
    .page-title h1{
        font-size: 1.3rem;
    }
    .page-title h2{
        color: #777;
        margin-top: 10px;
        font-size: 1rem;
    }
</style>
