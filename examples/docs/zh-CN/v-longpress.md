## 长按指令 v-longpress

长按元素时触发事件。

:::tip
引入 Element UI 后，`v-longpress` 指令已自动全局注册，可直接使用。
:::

### 基础用法

```html
<!-- 默认 500ms -->
<el-button v-longpress="handleLongPress">长按删除</el-button>

<!-- 自定义长按时间 -->
<el-button v-longpress="{ fn: handleLongPress, duration: 1000 }">
  长按删除
</el-button>
```

```javascript
export default {
  methods: {
    handleLongPress() {
      this.$confirm('确认删除?', '提示').then(() => {
        // 删除操作
      })
    }
  }
}
```

### 应用场景

- 长按删除
- 长按显示菜单
- 长按触发特殊操作

### API

#### 参数

| 参数     | 说明         | 类型     | 默认值 |
| -------- | ------------ | -------- | ------ |
| fn       | 执行函数     | Function | -      |
| duration | 长按时间(ms) | number   | 500    |

### 待完善

具体实现代码待补充。
