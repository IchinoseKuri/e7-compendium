<template>
    <div id="app">
        <navigation></navigation>
        <router-view />
        <the-footer></the-footer>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import TheFooter from '@/components/TheFooter'

export default {
    name: 'app',
    components: {
        Navigation,
        TheFooter
    }
}
</script>

<style lang="less">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #b0bbc8;
}
body {
    background-color: #252b35;
}

</style>
