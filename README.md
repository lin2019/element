# Element UI 组件开发指南

本文档详细介绍如何在 Element UI 项目中开发新组件的完整流程。

## 目录

- [快速开始](#快速开始)
- [手动开发流程](#手动开发流程)
- [组件开发规范](#组件开发规范)
- [样式开发](#样式开发)
- [文档编写](#文档编写)
- [单元测试](#单元测试)
- [TypeScript 类型定义](#typescript-类型定义)
- [调试与预览](#调试与预览)
- [发布前检查](#发布前检查)

---

## 快速开始

### 使用脚手架创建组件（推荐）

项目提供了自动化脚本来快速创建新组件的基础文件结构：

```bash
# 语法：npm run new <组件名> [中文名]
npm run new my-component 我的组件
```

这个命令会自动完成以下操作：

1. ✅ 在 `packages/` 目录下创建组件目录和基础文件
2. ✅ 在 `components.json` 中注册组件
3. ✅ 创建多语言文档文件（中文、英文、西班牙语、法语）
4. ✅ 创建样式文件（SCSS）
5. ✅ 创建单元测试文件
6. ✅ 创建 TypeScript 类型定义文件
7. ✅ 更新 `nav.config.json` 导航配置

**示例：**

```bash
# 创建一个名为 bar-chart 的柱状图组件
npm run new bar-chart 柱状图
```

---

## 手动开发流程

如果需要手动创建组件或理解完整流程，请按照以下步骤操作：

### 第一步：创建组件目录结构

在 `packages/` 目录下创建新组件目录：

```
packages/
└── my-component/           # 组件名（kebab-case 命名）
    ├── index.js           # 组件入口文件
    └── src/
        └── main.vue       # 组件主文件
```

**`index.js` 示例：**

```javascript
import ElMyComponent from './src/main';

/* istanbul ignore next */
ElMyComponent.install = function(Vue) {
  Vue.component(ElMyComponent.name, ElMyComponent);
};

export default ElMyComponent;
```

**`src/main.vue` 示例：**

```vue
<template>
  <div class="el-my-component">
    <!-- 组件模板内容 -->
  </div>
</template>

<script>
export default {
  name: 'ElMyComponent',
  
  props: {
    // 定义组件属性
  },
  
  data() {
    return {
      // 组件数据
    };
  },
  
  methods: {
    // 组件方法
  }
};
</script>
```

### 第二步：注册组件

#### 1. 更新 `components.json`

在项目根目录的 `components.json` 中添加组件引用：

```json
{
  "my-component": "./packages/my-component/index.js"
}
```

#### 2. 构建组件入口

运行以下命令自动生成组件入口文件：

```bash
npm run build:file
```

这会更新 `src/index.js`，自动导入新组件。

### 第三步：开发组件样式

#### 1. 创建样式文件

在 `packages/theme-chalk/src/` 目录下创建组件样式文件：

```scss
// packages/theme-chalk/src/my-component.scss

@import "mixins/mixins";
@import "common/var";

@include b(my-component) {
  // 组件基础样式
  
  @include e(header) {
    // 组件元素样式（BEM 命名：el-my-component__header）
  }
  
  @include m(large) {
    // 组件修饰符样式（BEM 命名：el-my-component--large）
  }
  
  @include when(disabled) {
    // 组件状态样式（BEM 命名：el-my-component.is-disabled）
  }
}
```

#### 2. 注册样式

在 `packages/theme-chalk/src/index.scss` 中导入新样式：

```scss
@import "./my-component.scss";
```

### 第四步：编写组件文档

在 `examples/docs/` 目录下创建多语言文档：

```
examples/docs/
├── zh-CN/
│   └── my-component.md    # 中文文档
├── en-US/
│   └── my-component.md    # 英文文档
├── es/
│   └── my-component.md    # 西班牙语文档
└── fr-FR/
    └── my-component.md    # 法语文档
```

**文档格式示例（`zh-CN/my-component.md`）：**

```markdown
## MyComponent 我的组件

组件的简要描述。

### 基础用法

组件的基本使用方式。

:::demo 使用 `prop-name` 属性来设置组件。

\`\`\`html
<template>
  <el-my-component prop-name="value">
    内容
  </el-my-component>
</template>
\`\`\`
:::

### 高级用法

更复杂的使用场景。

### Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type      | 类型          | string    | primary / success / warning / danger / info / text | —       |
| size      | 尺寸          | string    | medium / small / mini            | —       |
| disabled  | 是否禁用      | boolean   | —                                | false   |

### Events

| 事件名称 | 说明 | 回调参数 |
|---------|------|---------|
| click   | 点击时触发 | event: Event |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| focus  | 使组件获得焦点 | — |

### Slots

| 名称 | 说明 |
|------|------|
| —    | 默认插槽内容 |
| header | 头部内容 |
```

### 第五步：更新导航配置

在 `examples/nav.config.json` 中添加组件导航：

```json
{
  "zh-CN": [
    {
      "name": "组件",
      "groups": [
        {
          "groupName": "Basic",
          "list": [
            {
              "path": "/my-component",
              "title": "MyComponent 我的组件"
            }
          ]
        }
      ]
    }
  ]
}
```

### 第六步：编写单元测试

在 `test/unit/specs/` 目录下创建测试文件：

```javascript
// test/unit/specs/my-component.spec.js

import { createTest, destroyVM } from '../util';
import MyComponent from 'packages/my-component';

describe('MyComponent', () => {
  let vm;
  
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(MyComponent, true);
    expect(vm.$el).to.exist;
  });

  it('props', () => {
    vm = createTest(MyComponent, {
      type: 'primary'
    }, true);
    expect(vm.type).to.equal('primary');
  });

  it('event', done => {
    vm = createTest(MyComponent, {
      onClick: () => {
        expect(true).to.be.true;
        done();
      }
    }, true);
    vm.$el.click();
  });
});
```

### 第七步：添加 TypeScript 类型定义

#### 1. 创建组件类型定义

在 `types/` 目录下创建组件类型文件：

```typescript
// types/my-component.d.ts

import { ElementUIComponent } from './component'

/** MyComponent Component */
export declare class ElMyComponent extends ElementUIComponent {
  /** Component type */
  type: string

  /** Component size */
  size: string

  /** Whether the component is disabled */
  disabled: boolean
}
```

#### 2. 更新主类型定义

在 `types/element-ui.d.ts` 中导入并导出组件类型：

```typescript
import { ElMyComponent } from './my-component'

/** MyComponent Component */
export class MyComponent extends ElMyComponent {}
```

---

## 组件开发规范

### 命名规范

1. **组件名**：使用 kebab-case（短横线分隔）
   - ✅ 正确：`my-component`、`date-picker`、`bar-chart`
   - ❌ 错误：`MyComponent`、`datePicker`、`BarChart`

2. **组件类名**：使用 PascalCase（帕斯卡命名）
   - 示例：`ElMyComponent`、`ElDatePicker`、`ElBarChart`

3. **CSS 类名**：使用 BEM 命名规范
   - Block：`.el-my-component`
   - Element：`.el-my-component__header`
   - Modifier：`.el-my-component--large`
   - State：`.el-my-component.is-disabled`

### Props 规范

```javascript
props: {
  // ✅ 好的写法：完整的 prop 定义
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['primary', 'success', 'warning'].includes(value)
  },
  
  size: {
    type: String,
    default: ''
  },
  
  disabled: {
    type: Boolean,
    default: false
  },
  
  // ❌ 避免：不完整的定义
  value: String  // 缺少默认值和详细类型信息
}
```

### 事件规范

```javascript
methods: {
  handleClick(event) {
    // 触发自定义事件
    this.$emit('click', event);
  },
  
  handleChange(value) {
    // v-model 支持
    this.$emit('input', value);
    this.$emit('change', value);
  }
}
```

### 国际化支持

如果组件包含文本，应支持国际化：

```javascript
import { t } from 'yq-ui-code/src/locale';

export default {
  computed: {
    buttonText() {
      return t('el.myComponent.buttonText');
    }
  }
}
```

---

## 样式开发

### BEM 规范使用

Element UI 使用 BEM（Block Element Modifier）命名规范：

```scss
@include b(my-component) {
  // .el-my-component
  color: $--color-primary;
  
  @include e(header) {
    // .el-my-component__header
    font-weight: bold;
  }
  
  @include e(body) {
    // .el-my-component__body
    padding: 10px;
  }
  
  @include m(large) {
    // .el-my-component--large
    font-size: 18px;
  }
  
  @include when(disabled) {
    // .el-my-component.is-disabled
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

### 使用主题变量

引用主题变量以支持主题定制：

```scss
@import "common/var";

@include b(my-component) {
  color: $--color-text-primary;
  background-color: $--color-white;
  border: 1px solid $--border-color-base;
  border-radius: $--border-radius-base;
  
  &:hover {
    border-color: $--color-primary;
  }
}
```

### 响应式设计

```scss
@include b(my-component) {
  // 默认样式
  
  @media (max-width: 768px) {
    // 移动端样式
    font-size: 12px;
  }
}
```

---

## 文档编写

### 文档结构

每个组件文档应包含以下部分：

1. **组件标题和描述**：简要说明组件用途
2. **基础用法**：最简单的使用示例
3. **高级用法**：各种属性和配置的示例
4. **API 文档**：
   - Attributes（属性）
   - Events（事件）
   - Methods（方法）
   - Slots（插槽）

### Demo 代码块

使用 `:::demo` 标记创建可运行的示例：

```markdown
:::demo 这是示例的描述文字

\`\`\`html
<template>
  <el-my-component type="primary">
    示例内容
  </el-my-component>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    };
  }
}
</script>
\`\`\`
:::
```

---

## 单元测试

### 测试覆盖要点

1. **组件创建测试**：验证组件能够正常创建
2. **Props 测试**：验证各个 prop 的功能
3. **事件测试**：验证事件触发和回调
4. **插槽测试**：验证插槽内容渲染
5. **方法测试**：验证公共方法的功能

### 运行测试

```bash
# 运行所有测试
npm run test

# 运行单个组件测试
npm run test -- --grep MyComponent
```

---

## TypeScript 类型定义

### 类型定义要点

1. **继承 ElementUIComponent**：所有组件类型应继承基类
2. **完整的属性定义**：包含所有 props、methods、events
3. **泛型支持**：如果组件支持泛型，应正确定义

### 验证类型

```bash
# 类型检查
npm run build:types
```

---

## 调试与预览

### 本地开发服务器

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:8085 查看组件文档
```

### 构建和预览

```bash
# 构建完整的组件库（包含所有文件）
npm run dist

# 构建文档站点（用于部署）
npm run deploy:build

# 仅构建主题样式
npm run build:theme

# 仅生成组件入口文件
npm run build:file
```

---

## 发布前检查

在提交代码前，请确保完成以下检查：

### 1. 代码规范检查

```bash
# ESLint 检查
npm run lint

# 修复 ESLint 错误
npm run lint:fix
```

### 2. 完整性检查

- [ ] 组件已在 `components.json` 中注册
- [ ] 样式文件已在 `index.scss` 中导入
- [ ] 多语言文档已完成（至少中英文）
- [ ] 导航配置已更新
- [ ] 单元测试已编写并通过
- [ ] TypeScript 类型定义已完成
- [ ] 组件遵循 BEM 命名规范
- [ ] 代码通过 ESLint 检查

### 3. 功能检查

- [ ] 基础功能正常工作
- [ ] Props 验证正确
- [ ] 事件触发正常
- [ ] 样式在不同主题下正常显示
- [ ] 响应式布局正常
- [ ] 无控制台错误或警告

### 4. 文档检查

- [ ] 文档示例可运行
- [ ] API 文档完整准确
- [ ] 示例代码格式正确
- [ ] 图片资源已添加（如需要）

---

## 常见问题

### Q1: 组件名称应该如何选择？

**A:** 组件名称应该：
- 使用 kebab-case 格式
- 语义清晰，见名知意
- 避免与原生 HTML 标签冲突
- 保持简洁，通常 1-3 个单词

### Q2: 如何支持 v-model？

**A:** 在组件中实现 `value` prop 和 `input` event：

```javascript
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    handleInput(newValue) {
      this.$emit('input', newValue);
    }
  }
}
```

### Q3: 如何调试样式？

**A:** 
1. 启动开发服务器：`npm run dev`
2. 在浏览器中打开组件文档页面
3. 使用浏览器开发者工具检查元素
4. 修改 SCSS 文件后页面会自动刷新

### Q4: 组件如何访问全局配置？

**A:** 使用 inject 注入全局配置：

```javascript
export default {
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  computed: {
    buttonSize() {
      return this.size || this.elFormItem.elFormItemSize || (this.$ELEMENT || {}).size;
    }
  }
}
```

---

## 参考资源

- [Vue.js 官方文档](https://cn.vuejs.org/)
- [Element UI 官方文档](https://element.eleme.cn/)
- [BEM 命名规范](http://getbem.com/)
- [SASS 文档](https://sass-lang.com/)

---

## 总结

开发 Element UI 组件的核心步骤：

1. **使用脚手架**：`npm run new <组件名> [中文名]`
2. **开发组件**：编写 Vue 组件代码
3. **开发样式**：使用 BEM 规范编写 SCSS
4. **编写文档**：创建多语言文档和示例
5. **编写测试**：确保组件质量
6. **类型定义**：支持 TypeScript
7. **本地调试**：`npm run dev` 预览效果
8. **代码检查**：确保符合规范

遵循以上流程，您就可以开发出高质量、符合 Element UI 规范的组件！

