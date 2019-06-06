<template>
    <div class="container">
        <Header />
        <div id="main">
            <router-view />
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'
export default {
    components: {
        Header
    }
}
</script>

<style lang="scss" scoped>
.container {
    margin: 0;
    padding: 0;
    width: 100%;
    #main {
        height: calc(100vh - 54px);
        width: 100%;
        background-color: #f5f5f5;
        overflow: hidden;
    }
}
</style>
