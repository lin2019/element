# Algolia 搜索配置说明

## 问题描述

当前 Algolia 搜索索引只包含 Component 组件文档，不包含 Util 工具函数和 Charts 图表的文档内容。

## 已完成的代码修改

### 1. 修改了搜索路由跳转逻辑 (`examples/components/search.vue`)

```javascript
handleSelect(val) {
  if (val.img || val.isEmpty) return;
  const component = val.component || '';
  const anchor = val.anchor;
  
  // 判断文档类型，支持 util 和 charts
  let basePath = 'component';
  if (component.startsWith('util-')) {
    basePath = 'util';
  } else if (component === 'charts' || component.startsWith('charts-')) {
    basePath = 'charts';
  }
  
  this.$router.push(`/${ this.lang }/${ basePath }/${ component }${ anchor ? `#${ anchor }` : '' }`);
}
```

这样当搜索结果中包含 util 或 charts 的文档时，可以正确跳转到对应的页面。

### 2. 修改了搜索框显示条件 (`examples/components/header.vue`)

```javascript
isComponentPage() {
  const routeName = this.$route.name || '';
  return /^component/.test(routeName) || /^util-/.test(routeName) || /^charts/.test(routeName);
}
```

现在在 util 和 charts 页面也会显示搜索框。

## 需要配置 Algolia 索引

要让 util 和 charts 的文档能够被搜索到，需要更新 Algolia 搜索索引配置。

### 方案 1：使用 Algolia DocSearch（推荐）

如果你使用的是 Algolia DocSearch 服务，需要更新爬虫配置：

1. 访问 [Algolia DocSearch](https://docsearch.algolia.com/)
2. 找到你的项目配置
3. 更新 `selectors` 配置，添加 util 和 charts 的文档页面路径

示例配置：

```json
{
  "index_name": "element",
  "start_urls": [
    {
      "url": "https://your-domain.com/zh-CN/component/",
      "tags": ["component"]
    },
    {
      "url": "https://your-domain.com/zh-CN/util/",
      "tags": ["util"]
    },
    {
      "url": "https://your-domain.com/zh-CN/charts",
      "tags": ["charts"]
    }
  ],
  "selectors": {
    "lvl0": {
      "selector": ".side-nav .active",
      "global": true,
      "default_value": "Documentation"
    },
    "lvl1": "h1",
    "lvl2": "h2",
    "lvl3": "h3",
    "lvl4": "h4",
    "text": "p, li"
  }
}
```

### 方案 2：自定义爬虫

如果你自己管理 Algolia 索引，可以使用 [algolia-scraper](https://github.com/algolia/docsearch-scraper) 或自定义脚本来抓取文档。

关键点：
- 确保爬虫访问 `/util/` 和 `/charts` 路径下的所有页面
- 为每个文档记录添加 `component` 字段，用于标识文档类型（如 `util-http`, `util-directives`, `charts` 等）
- 确保记录包含 `title`、`content`、`anchor` 等字段

### 方案 3：使用本地搜索（备选方案）

如果无法访问 Algolia 配置，可以为 util 和 charts 实现一个简单的本地搜索功能：

1. 创建一个包含所有 util 和 charts 文档的 JSON 索引文件
2. 在搜索组件中，当没有 Algolia 结果时，搜索本地索引
3. 合并 Algolia 和本地搜索的结果

## Algolia 索引信息

当前使用的 Algolia 配置：
- **Application ID**: `4C63BTGP6S`
- **Search API Key**: `0729c3c7f4dc8db7395ad0b19c0748d2`
- **索引名称格式**: `element-{lang}` (如 `element-zh`, `element-en`)

## 文档 URL 路径结构

确保 Algolia 爬虫能够访问以下路径：

- Component: `/{lang}/component/{component-name}`
- Util: `/{lang}/util/{util-name}` (如 `/zh-CN/util/http`)
- Charts: `/{lang}/charts`

支持的语言代码：`zh-CN`, `en-US`, `es`, `fr-FR`

## 验证搜索索引

配置完成后，可以通过以下方式验证：

1. 在浏览器中访问你的文档站点
2. 在搜索框中输入 "http" 或 "directives"
3. 应该能够看到 util 相关的搜索结果
4. 点击搜索结果应该能够正确跳转到对应页面

## 需要帮助？

如果需要配置 Algolia 索引但没有权限，可以：
1. 联系项目管理员获取 Algolia 后台访问权限
2. 或者考虑实现本地搜索功能作为替代方案

