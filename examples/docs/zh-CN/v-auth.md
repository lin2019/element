## 权限指令 v-auth

根据用户权限控制元素的显示与隐藏。

:::tip
引入 Element UI 后，`v-auth` 指令已自动全局注册，可直接使用。
:::

### 基础用法（显隐控制，仅接受字符串）

```html
<!-- 单个权限 -->
<el-button v-auth="'admin'">删除</el-button>

<!-- 多个权限（分号分隔，允许末尾分号；满足其一即可）-->
<el-button v-auth="'admin;editor;'">编辑</el-button>

<!-- 多个权限（逗号分隔，满足其一即可）-->
<el-button v-auth="'admin,editor'">管理</el-button>
```

### 兼容旧用法（批量权限回填，字符串输入）

当需要将权限检查结果批量写入到组件实例的某个对象上时，可使用参数形式：

```html
<!-- 假设希望把检查结果写入 this.permissions 对象 -->
<!-- 指令语法：v-auth:[permissions]="'id1;id2;id3;'" 或 "'id1,id2,id3'" -->
<div v-auth:[permissions]="'menu:add;menu:edit;menu:del;'"></div>
```

后端接口返回的数据形如：

```json
{
  "state": 1,
  "data": [{ "menu:add": "Y" }, { "menu:edit": "N" }, { "menu:del": "Y" }]
}
```

将自动把值为 Y 的权限写入 `this.permissions`（不控制显隐）：

```js
// 结果示例
this.permissions = {
  'menu:add': 'Y',
  'menu:del': 'Y'
}
```

注意：带参数形式仅做“回填”，不参与元素显隐控制。

### 用法说明

如果用户没有相应权限，元素会被直接从 DOM 中移除（不是隐藏）。

### API

#### 参数

| 参数  | 说明                 | 类型   | 可选值 | 默认值 |
| ----- | -------------------- | ------ | ------ | ------ |
| value | 权限 ID 字符串       | String | -      | -      |
| arg   | 回填容器名（旧用法） | String | -      | -      |

### 说明

指令内部调用接口：`/cc-base/servlet/menu?action=checkRes&ids={ids}`，当任一 `id` 返回 `Y` 则保留元素，否则移除。
