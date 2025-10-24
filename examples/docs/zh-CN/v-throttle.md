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
