## 自定义指令 v-debounce 防抖

在高频事件中延迟执行回调，避免函数被频繁触发。

### 基础用法

::::demo 为按钮点击添加防抖，默认等待 300ms。

```html
<template>
  <div>
    <el-button type="primary" v-debounce="onClick">点击触发（默认300ms）</el-button>
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

### 自定义等待时间与立即触发

::::demo 通过对象形式传入 `wait` 与 `immediate` 实现更灵活控制。

```html
<template>
  <div>
    <el-button type="success" v-debounce="{ handler: onDebounced, wait: 800, immediate: false }">800ms 后执行</el-button>

    <el-button type="warning" v-debounce="{ handler: onDebouncedImmediate, wait: 600, immediate: true }">立即执行然后节流</el-button>
  </div>
  <script>
    export default {
      methods: {
        onDebounced() {
          this.$message.success('800ms 后执行')
        },
        onDebouncedImmediate() {
          this.$message.success('立即执行一次，后续进入等待')
        }
      }
    }
  </script>
</template>
```

::::

### API

| 参数/类型     | 说明                                          |
| ------------- | --------------------------------------------- |
| 值为 Function | 直接作为回调函数，默认等待 300ms              |
| 值为 Object   | 传入 `{ handler, wait=300, immediate=false }` |

## 防抖指令 v-debounce

为事件添加防抖功能，避免频繁触发。

:::tip
引入 Element UI 后，`v-debounce` 指令已自动全局注册，可直接使用。
:::

### 基础用法

```html
<!-- 默认 300ms -->
<el-button v-debounce="handleClick">搜索</el-button>

<!-- 自定义延迟时间 -->
<el-button v-debounce="{ fn: handleClick, delay: 500 }">搜索</el-button>

<!-- 指定事件类型 -->
<el-input v-debounce="{ fn: handleInput, event: 'input', delay: 300 }"></el-input>
```

### 应用场景

- 搜索框输入
- 窗口 resize 事件
- 滚动事件
- 按钮重复点击

### API

#### 参数

| 参数  | 说明         | 类型     | 默认值  |
| ----- | ------------ | -------- | ------- |
| fn    | 执行函数     | Function | -       |
| delay | 延迟时间(ms) | number   | 300     |
| event | 事件类型     | string   | 'click' |

### 待完善

具体实现代码待补充。
