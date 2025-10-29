## 自定义指令 v-throttle 节流

限制高频事件在一定时间间隔内只触发一次，降低开销。

### 基础用法

::::demo 为按钮点击添加节流，默认间隔 300ms。

```html
<template>
  <div>
    <el-button type="primary" v-throttle="onClick">点击触发（默认300ms）</el-button>
  </div>
  <script>
    export default {
      methods: {
        onClick() {
          this.$message.success('触发成功')
        }
      }
    }
  </script>
</template>
```

::::

### 自定义选项

::::demo 可通过对象形式传入 `wait`、`leading`、`trailing` 来控制触发时机。

```html
<template>
  <div>
    <el-button type="success" v-throttle="{ handler: onThrottle, wait: 1000, leading: true, trailing: true }">1s 内最多触发一次</el-button>
  </div>
  <script>
    export default {
      methods: {
        onThrottle() {
          this.$message.success('节流触发')
        }
      }
    }
  </script>
</template>
```

::::

### API

| 参数/类型     | 说明                                                      |
| ------------- | --------------------------------------------------------- |
| 值为 Function | 直接作为回调函数，默认等待 300ms                          |
| 值为 Object   | 传入 `{ handler, wait=300, leading=true, trailing=true }` |

## 节流指令 v-throttle

为事件添加节流功能，控制执行频率。

:::tip
引入 Element UI 后，`v-throttle` 指令已自动全局注册，可直接使用。
:::

### 基础用法

```html
<!-- 默认 300ms -->
<el-button v-throttle="handleClick">提交</el-button>

<!-- 自定义延迟时间 -->
<el-button v-throttle="{ fn: handleClick, delay: 1000 }">提交</el-button>

<!-- 指定事件类型 -->
<div v-throttle="{ fn: handleScroll, event: 'scroll', delay: 200 }"></div>
```

### 应用场景

- 按钮点击
- 页面滚动
- 鼠标移动
- 输入框输入

### API

#### 参数

| 参数  | 说明         | 类型     | 默认值  |
| ----- | ------------ | -------- | ------- |
| fn    | 执行函数     | Function | -       |
| delay | 延迟时间(ms) | number   | 300     |
| event | 事件类型     | string   | 'click' |

### 待完善

具体实现代码待补充。
