## 拖拽指令 v-draggable

使元素可拖拽，支持自由拖拽、方向限制、容器约束等功能。

:::tip
引入 Element UI 后，`v-draggable` 指令已自动全局注册，可直接使用。
:::

### 基础用法

最简单的拖拽用法，元素可在页面中自由移动。

:::demo 使用 `v-draggable` 指令即可让元素变得可拖拽。

```html
<template>
  <div class="demo-container">
    <div v-draggable class="drag-box" style="top: 50px; left: 50px;">
      拖动我试试
    </div>
  </div>
</template>

<style>
  .demo-container {
    position: relative;
    height: 300px;
    border: 1px dashed #dcdfe6;
    border-radius: 4px;
    background: #f5f7fa;
  }
  .drag-box {
    position: absolute;
    width: 130px;
    padding: 15px;
    background: #409eff;
    color: white;
    text-align: center;
    border-radius: 4px;
    cursor: move;
    font-size: 12px;
  }
</style>
```

:::

### 方向限制

可以限制元素只能在水平或垂直方向上移动。

:::demo 通过 `axis` 参数限制拖拽方向，可选值为 `'x'`、`'y'` 或 `'both'`。

```html
<template>
  <div class="demo-container">
    <div v-draggable="{ axis: 'x' }" class="drag-box" style="top: 20px; left: 20px;">
      只能水平拖动
    </div>
    <div v-draggable="{ axis: 'y' }" class="drag-box" style="top: 80px; left: 200px;">
      只能垂直拖动
    </div>
  </div>
</template>

<style>
  .demo-container {
    position: relative;
    height: 300px;
    border: 1px dashed #dcdfe6;
    border-radius: 4px;
    background: #f5f7fa;
  }
  .drag-box {
    position: absolute;
    width: 130px;
    padding: 15px;
    background: #409eff;
    color: white;
    text-align: center;
    border-radius: 4px;
    cursor: move;
    font-size: 12px;
  }
</style>
```

:::

### 容器约束

默认情况下，拖拽元素会被限制在父容器范围内。

:::demo 拖拽元素默认不能拖出父容器边界。如需取消约束，可以设置 `constraint: false`。

```html
<template>
  <div class="demo-container">
    <div v-draggable class="drag-box" style="top: 20px; left: 20px;">
      限制在容器内
    </div>
    <div v-draggable="{ constraint: false }" class="drag-box" style="top: 100px; left: 200px;">
      可以拖出容器
    </div>
  </div>
</template>

<style>
  .demo-container {
    position: relative;
    height: 300px;
    border: 1px dashed #dcdfe6;
    border-radius: 4px;
    background: #f5f7fa;
    padding: 10px;
  }
  .drag-box {
    position: absolute;
    width: 130px;
    padding: 15px;
    background: #409eff;
    color: white;
    text-align: center;
    border-radius: 4px;
    cursor: move;
    font-size: 12px;
  }
  .drag-box:nth-child(1) {
    background: #67c23a;
  }
  .drag-box:nth-child(2) {
    background: #e6a23c;
  }
</style>
```

:::

### 拖拽手柄

指定特定区域作为拖拽手柄，只有点击手柄区域才能拖拽。

:::demo 通过 `handle` 参数指定拖拽手柄的选择器。

```html
<template>
  <div class="demo-container">
    <div v-draggable="{ handle: '.drag-handle' }" class="drag-card" style="top: 50px; left: 50px;">
      <div class="drag-handle">
        <i class="el-icon-rank"></i>
        拖拽手柄
      </div>
      <div class="drag-content">
        只能通过上方手柄拖拽
      </div>
    </div>
  </div>
</template>

<style>
  .demo-container {
    position: relative;
    height: 300px;
    border: 1px dashed #dcdfe6;
    border-radius: 4px;
    background: #f5f7fa;
  }
  .drag-card {
    position: absolute;
    width: 200px;
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .drag-handle {
    padding: 10px;
    background: #e6a23c;
    color: white;
    cursor: move;
  }
  .drag-content {
    padding: 20px;
    text-align: center;
  }
</style>
```

:::

### 拖拽事件

监听拖拽过程中的各种事件。

:::demo 通过 `@drag-start`、`@drag-move`、`@drag-end` 监听拖拽事件。

```html
<template>
  <div>
    <div class="demo-container">
      <div v-draggable @drag-start="handleDragStart" @drag-move="handleDragMove" @drag-end="handleDragEnd" class="drag-box" style="top: 50px; left: 50px;">
        拖动我查看事件
      </div>
    </div>
    <div class="event-log">
      <div>开始位置: {{ startPos }}</div>
      <div>当前位置: {{ currentPos }}</div>
      <div>结束位置: {{ endPos }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        startPos: '-',
        currentPos: '-',
        endPos: '-'
      }
    },
    methods: {
      handleDragStart(data) {
        this.startPos = `x: ${data.startX}, y: ${data.startY}`
        this.$message.info('开始拖拽')
      },
      handleDragMove(data) {
        this.currentPos = `x: ${Math.round(data.x)}, y: ${Math.round(data.y)}`
      },
      handleDragEnd(data) {
        this.endPos = `x: ${Math.round(data.x)}, y: ${Math.round(data.y)}`
        this.$message.success('拖拽结束')
      }
    }
  }
</script>

<style>
  .demo-container {
    position: relative;
    height: 250px;
    border: 1px dashed #dcdfe6;
    border-radius: 4px;
    background: #f5f7fa;
    margin-bottom: 20px;
  }
  .drag-box {
    position: absolute;
    width: 130px;
    padding: 15px;
    background: #f56c6c;
    color: white;
    text-align: center;
    border-radius: 4px;
    cursor: move;
    font-size: 12px;
  }
  .event-log {
    padding: 15px;
    background: #f5f7fa;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.8;
  }
  .event-log div {
    color: #606266;
  }
</style>
```

:::

### Dialog 拖拽

使用 `v-dialog-drag` 指令，让 Dialog 弹窗支持通过标题栏拖动。

:::demo 只需在 Dialog 上添加 `v-dialog-drag` 指令即可实现拖拽功能，无需编写额外代码。默认可以拖出屏幕边界，如需限制请设置 `constraint: true`。

```html
<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">
      打开可拖拽 Dialog
    </el-button>

    <el-dialog v-dialog-drag title="可拖拽的对话框" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px" append-to-body custom-class="draggable-dialog">
      <div>
        <el-alert title="拖拽提示" type="info" description="点击标题栏可以拖动整个对话框到任意位置" :closable="false" show-icon></el-alert>

        <el-form label-width="80px" style="margin-top: 20px;">
          <el-form-item label="用户名">
            <el-input placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" :rows="3" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      }
    }
  }
</script>

<style>
  .draggable-dialog .el-dialog__header {
    background: linear-gradient(to right, #667eea, #764ba2);
    color: white;
    padding: 15px 20px;
  }

  .draggable-dialog .el-dialog__title {
    color: white;
    font-weight: 500;
  }

  .draggable-dialog .el-dialog__headerbtn .el-dialog__close {
    color: white;
  }

  .draggable-dialog .el-dialog__headerbtn:hover .el-dialog__close {
    color: rgba(255, 255, 255, 0.8);
  }
</style>
```

:::

:::tip
**v-dialog-drag 使用说明：**

- 直接在 `<el-dialog>` 标签上添加 `v-dialog-drag` 指令即可
- 必须设置 `append-to-body` 属性，确保 Dialog 挂载到 body 下
- 建议添加 `custom-class` 以便准确定位 Dialog 元素
- 默认允许拖出屏幕边界，如需限制请使用 `v-dialog-drag="{ constraint: true }"`
- 无需在 `opened` 事件中手动初始化，指令会自动处理
- 自动添加 `cursor: move` 样式到标题栏
  :::

### API

#### v-draggable 指令参数

| 参数       | 说明               | 类型    | 可选值       | 默认值 |
| ---------- | ------------------ | ------- | ------------ | ------ |
| axis       | 拖拽方向           | string  | x / y / both | both   |
| constraint | 是否限制在父容器内 | boolean | —            | true   |
| handle     | 拖拽手柄选择器     | string  | CSS 选择器   | —      |

#### v-draggable 事件

| 事件名     | 说明           | 回调参数                          |
| ---------- | -------------- | --------------------------------- |
| drag-start | 开始拖拽时触发 | { startX, startY, element }       |
| drag-move  | 拖拽移动时触发 | { x, y, deltaX, deltaY, element } |
| drag-end   | 拖拽结束时触发 | { x, y, element }                 |

#### v-dialog-drag 指令参数

| 参数       | 说明                           | 类型    | 可选值 | 默认值 |
| ---------- | ------------------------------ | ------- | ------ | ------ |
| constraint | 是否限制在屏幕范围内（父容器） | boolean | —      | false  |

**使用示例：**

```html
<!-- 基础用法 -->
<el-dialog v-dialog-drag :visible.sync="visible" append-to-body>
  ...
</el-dialog>

<!-- 限制在屏幕内 -->
<el-dialog v-dialog-drag="{ constraint: true }" :visible.sync="visible" append-to-body>
  ...
</el-dialog>
```

**注意事项：**

- `v-dialog-drag` 自动监听 Dialog 的 `opened` 和 `closed` 事件
- 自动将拖拽手柄设置为标题栏（`.el-dialog__header`）
- 必须配合 `append-to-body` 属性使用
- 建议添加 `custom-class` 以便更准确地定位 Dialog
