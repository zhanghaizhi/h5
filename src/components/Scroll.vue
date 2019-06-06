<template>
    <div class="wrapper" ref="wrapper">
        <div style="display: inline-block;min-width: 100vw">
            <div v-if="pulldown" class="top-tip">
                <p :class="{ rotate: isRefresh }">↓</p>
                <p>{{ isRefresh ? '释放刷新' : '刷新推荐' }}</p>
            </div>

            <slot></slot>

            <div v-if="pullup" class="bottom-tip">
                <span class="load-font">数据加载中</span>
                <font-awesome-icon
                    pulse
                    icon="spinner"
                    class="common-font"
                ></font-awesome-icon>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    list: {
      type: Array,
      default: null
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    },
    /**
     * 当运行 momentum 动画时，超过边缘后的回弹整个动画时间
     */
    swipeBounceTime: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      isRefresh: false, // 判断是否派发刷新事件
      hasRefresh: false // 控制数据刷新是否完成
    }
  },
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  activated() {
    setTimeout(() => {
      this.refresh()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        swipeBounceTime: this.swipeBounceTime,
        pullDownRefresh: {
          threshold: 70,
          stop: 70
        }
      })

      // 是否派发滚动事件
      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          // 这里用于下拉刷新才做处理
          if (pos.y > 1) {
            if (pos.y > 70) {
              this.isRefresh = true
              this.hasRefresh = true
            }
            if (pos.y < 5) {
              this.isRefresh = false
            }
          }
          // this.$emit('scroll', pos)
        })
      }

      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          //                      数据没装载完用户多次上啦，重新刷新页面高度
          this.refresh()
          // 滚动到底部
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit('scrollToEnd')
          }
        })
      }

      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on('touchEnd', pos => {
          // 下拉动作
          if (pos.y > 70) {
            this.$emit('pulldown')
          }
        })
      }

      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    disable() {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable()
    },
    enable() {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable()
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    list() {
      this.hasRefresh = false
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
    height: 100%;
    width: 100%;
    overflow: hidden;
    border: none;
}
.top-tip {
    @include flex(column, center, center);
    position: absolute;
    top: -74px;
    left: 0;
    z-index: 1;
    box-sizing: content-box;
    height: 74px;
    width: 100%;
    text-align: center;
    color: #999999;
}
.top-tip p {
    margin-bottom: 6px;
    font-size: 12px;
    transition: all 0.3s;
}
.rotate {
    transform: rotate(180deg);
}
.bottom-tip {
    position: relative;
    z-index: 1;
    padding: 12px 0 12px 0;
    width: 100%;
    text-align: center;
    color: #999999;
    background-color: #f5f5f5;
    .load-font {
        @include font(#999999, 14px);
        margin-right: 8px;
    }
}
</style>
