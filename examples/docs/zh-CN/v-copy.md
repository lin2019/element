## 复制指令 v-copy

点击元素时复制内容到剪贴板。

:::tip
引入 Element UI 后，`v-copy` 指令已自动全局注册，可直接使用。
:::

### 基础用法

直接复制文本内容。

:::demo 使用 `v-copy` 指令可以快速实现复制功能，点击按钮后会将内容复制到剪贴板。

```html
<template>
  <el-button v-copy="'这是要复制的文本内容'" @copy-success="handleSuccess" @copy-error="handleError">
    点击复制文本
  </el-button>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      handleSuccess() {
        this.$message.success('复制成功')
      },
      handleError() {
        this.$message.error('复制失败')
      }
    }
  }
</script>
```

:::

### 复制变量

复制 data 中的变量内容。

:::demo 可以将 data 中定义的变量内容复制到剪贴板。

```html
<div>
  <el-input v-model="copyText" placeholder="请输入要复制的内容"></el-input>
  <el-button v-copy="copyText" @copy-success="handleSuccess" @copy-error="handleError" style="margin-top: 10px;">
    复制上方输入框内容
  </el-button>
</div>

<script>
  export default {
    data() {
      return {
        copyText: '这是默认的复制内容'
      }
    },
    methods: {
      handleSuccess() {
        this.$message.success('复制成功')
      },
      handleError() {
        this.$message.error('复制失败')
      }
    }
  }
</script>
```

:::

### API

#### 参数

| 参数  | 说明         | 类型   |
| ----- | ------------ | ------ |
| value | 要复制的内容 | string |

#### 事件

| 事件名       | 说明     | 回调参数 |
| ------------ | -------- | -------- |
| copy-success | 复制成功 | -        |
| copy-error   | 复制失败 | error    |
