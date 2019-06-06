<template>
    <Scroll
        :list="arr"
        :pulldown="true"
        :listenScroll="true"
        :pullup="true"
        @pulldown="refresh"
    >
        <div class="about-container">
            <p v-for="(item, index) in arr" :key="index">{{ item }}</p>
        </div>
    </Scroll>
</template>

<script>
import Scroll from '@/components/Scroll'
export default {
    components: {
        Scroll
    },
    data() {
        return {
            arr: new Array(10).fill('刷新前')
        }
    },
    methods: {
        refresh() {
            setTimeout(() => {
                this.arr = new Array(10).fill('刷新后')
            }, 2000)
        }
    }
}
</script>

<style lang="scss" scoped>
.about-container {
    min-height: 100vh;
    width: 100vw;
    padding: 12px;
    background-color: #ffffff;
}
</style>
