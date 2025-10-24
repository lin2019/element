## 权限指令 v-permission

根据用户权限控制元素的显示与隐藏。

:::tip
引入 Element UI 后，`v-permission` 指令已自动全局注册，可直接使用。
:::

### 基础用法

```html
<!-- 单个权限 -->
<el-button v-permission="['admin']">删除</el-button>

<!-- 多个权限（满足其一即可）-->
<el-button v-permission="['admin', 'editor']">编辑</el-button>

<!-- 需要同时满足多个权限 -->
<el-button v-permission="{ value: ['admin', 'editor'], mode: 'all' }">管理</el-button>
```

### 用法说明

如果用户没有相应权限，元素会被直接移除（不是隐藏）。

### API

#### 参数

| 参数  | 说明               | 类型           | 可选值    | 默认值 |
| ----- | ------------------ | -------------- | --------- | ------ |
| value | 权限数组或配置对象 | Array / Object | -         | -      |
| mode  | 权限匹配模式       | string         | any / all | any    |

### 待完善

具体实现代码待补充。
