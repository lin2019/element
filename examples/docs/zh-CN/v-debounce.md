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
