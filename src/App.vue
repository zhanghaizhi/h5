<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
@import '@/assets/variable.scss'; // 在这里引入的目的是为了vue-loader能正确的解析全局的scss
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-align: left;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100vw;
}
</style>
