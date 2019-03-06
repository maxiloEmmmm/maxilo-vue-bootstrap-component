<template>
    <div class="mxl-loading-water-container">
        <div class="body-wrapper">
            <div class="body-page">
                <main>
                    <div class="loading">
                        <h4>{{ title }}</h4>
                        <div class="dots">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </div>
                    <div class="content"></div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
    import prop from './loadingProp';
    export default {
        mixins: [prop],
        name: 'loadingW10'
    }
</script>

<style>
    .mxl-loading-water-container {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding: 0;
        margin: 0;
        text-align: center;
        font-family: arial;
        color: #fff;
        display: flex !important;
        justify-content: center;
        align-items: center;
    }

    .mxl-loading-water-container *,
    .mxl-loading-water-container *:before,
    .mxl-loading-water-container *:after {
        box-sizing: border-box;
        outline: none;
    }

    .mxl-loading-water-container .body-wrapper {
        display: flex;
        flex-direction: column;
    }

    .mxl-loading-water-container .body-page {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
    }

    .mxl-loading-water-container main {
        text-align: center;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }

    .mxl-loading-water-container .loading h4 {
        width: 100%;
        color: #0078d7;
    }

    .mxl-loading-water-container .loading .dots {
        position: relative;
        width: 100%;
        -webkit-animation: move-2 3s linear infinite;
        animation: move-2 3s linear infinite;
        -webkit-animation-delay: -400ms;
        animation-delay: -400ms;
    }

    .mxl-loading-water-container .loading .dot {
        display: inline-block;
        border-radius: 50%;
        width: 1rem;
        height: 1rem;
        background: #0078d7;
        -webkit-animation: move 3s cubic-bezier(0.1, 0.8, 0.9, 0.1) infinite;
        animation: move 3s cubic-bezier(0.1, 0.8, 0.9, 0.1) infinite;
    }

    .mxl-loading-water-container .loading .dot:nth-of-type(2) {
        -webkit-animation-delay: -100ms;
        animation-delay: -100ms;
    }

    .mxl-loading-water-container .loading .dot:nth-of-type(3) {
        -webkit-animation-delay: -200ms;
        animation-delay: -200ms;
    }

    .mxl-loading-water-container .loading .dot:nth-of-type(4) {
        -webkit-animation-delay: -300ms;
        animation-delay: -300ms;
    }

    .mxl-loading-water-container .loading .dot:nth-of-type(5) {
        -webkit-animation-delay: -400ms;
        animation-delay: -400ms;
    }

    @-webkit-keyframes move {
        0% {
            -webkit-transform: translateX(-10em);
            transform: translateX(-10em);
            opacity: 0;
        }
        10%,
        70% {
            opacity: .9;
        }
        80%,
        100% {
            -webkit-transform: translateX(10em);
            transform: translateX(10em);
            opacity: 0;
        }
    }

    @keyframes move {
        0% {
            -webkit-transform: translateX(-10em);
            transform: translateX(-10em);
            opacity: 0;
        }
        10%,
        70% {
            opacity: .9;
        }
        80%,
        100% {
            -webkit-transform: translateX(10em);
            transform: translateX(10em);
            opacity: 0;
        }
    }

    @-webkit-keyframes move-2 {
        0% {
            -webkit-transform: translateX(4em);
            transform: translateX(4em);
        }
        100% {
            -webkit-transform: translateX(-4em);
            transform: translateX(-4em);
        }
    }

    @keyframes move-2 {
        0% {
            -webkit-transform: translateX(4em);
            transform: translateX(4em);
        }
        100% {
            -webkit-transform: translateX(-4em);
            transform: translateX(-4em);
        }
    }
</style>