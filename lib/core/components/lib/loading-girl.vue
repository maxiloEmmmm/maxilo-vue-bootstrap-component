<template>
    <div class="mxl-loading-girl">
        <img src="./loadingGirl.gif" alt="Loading"/>
        <h1>
            {{ title }}
        </h1>
    </div>
</template>

<script>
    import prop from './loadingProp';
    export default {
        mixins: [prop],
        name: 'loadingGirl'
    }
</script>

<style>
    .mxl-loading-girl {
        text-align: center;
        position: fixed;
        width: 100%;
        height: 100%;
    }

    .mxl-loading-girl img {
        height: 80%;
        max-height: 80%;
        width: 100%;
    }

    .mxl-loading-girl h1 {
        max-height: 20%;
        color: #576e81;
        height: 20%;
        width: 100%;
        font-family: "Indie Flower";
        margin: 0;
    }
</style>