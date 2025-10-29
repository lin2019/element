## 自定义指令 v-longpress 长按

按住一定时间后触发回调，常用于移动端或需要确认的操作。

### 基础用法

::::demo 按住按钮超过 600ms 触发回调。

```html
<template>
  <div>
    <el-button type="danger" v-longpress="onLongPress">长按 600ms 触发</el-button>
  </div>
  <script>
    export default {
      methods: {
        onLongPress() {
          this.$message.warning('长按触发')
        }
      }
    }
  </script>
</template>
```

::::

### 自定义参数

::::demo 通过对象传入 `duration` 和 `preventContextMenu`。

```html
<template>
  <div>
    <el-button type="primary" v-longpress="{ handler: onLongPressCustom, duration: 1000, preventContextMenu: true }">长按 1s 触发</el-button>
  </div>
  <script>
    export default {
      methods: {
        onLongPressCustom() {
          this.$message.info('1s 长按触发')
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
| 值为 Function | 直接作为回调函数，默认 `duration=600ms`                   |
| 值为 Object   | 传入 `{ handler, duration=600, preventContextMenu=true }` |

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
