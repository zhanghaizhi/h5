<template>
    <div>
        <div class="header-container">
            <font-awesome-icon
                icon="chevron-left"
                class="common-font"
            ></font-awesome-icon>
            <p class="title-font">Set Title</p>
            <div>
                <!-- TODO font-awesome按需加载待完成 -->
                <font-awesome-icon
                    icon="ellipsis-h"
                    class="common-font"
                ></font-awesome-icon>
            </div>
        </div>
        <!-- 用于布局占位 -->
        <div class="placeholder" />
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.header-container {
    @include flex(row nowrap, space-between, center);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    height: $header-height;
    width: 100vw;
    background-color: $theme;
    padding: 0 12px 0 12px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px rgba(0, 0, 0, 0.14),
        0 1px 10px rgba(0, 0, 0, 0.12);
}

.placeholder {
    height: $header-height;
    width: 100vw;
}

.common-font {
    @include font(#ffffff, 18px);
}
.title-font {
    @include font(#ffffff, 16px);
}
</style>
