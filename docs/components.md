# 公共组件

公共组件需要项目成员共同维护，一个完整的组件说明文档应该包含 `props`，`slot`，`event`等。

## Scroll

基于 `better-scroll` 封装的模拟滚动组件。

### props

| 参数         | 说明                     | 类型    | 默认值 |
| ------------ | ------------------------ | ------- | ------ |
| probeType    | 滚动类型                 | Number  | 1      |
| click        | 是否派发点击事件         | Boolean | true   |
| listenScroll | 是否派发滚动事件         | Boolean | true   |
| pullup       | 是否派发滚动到底部的事件 | Boolean | false  |
| pulldown     | 是否派发顶部下拉的事件   | Boolean | false  |

### slot

| 参数    | 说明             |
| ------- | ---------------- |
| default | 用于放置滚动内容 |

### event

| 参数        | 说明               |
| ----------- | ------------------ |
| scrollToEnd | 监听是否滚动到底部 |
| pulldown    | 是否出发下拉操作   |
