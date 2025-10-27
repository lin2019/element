## Popup 方法

提供标签页的打开、关闭、跳转等操作方法，适用于多标签页应用场景。

### 引入方式

```javascript
import { popup } from 'yq-ui-code/lib/utils'

// 或通过 yq 命名空间
yq.popup.openTab(option)
```

### 打开标签页

支持两种调用方式打开新的标签页。

**方法一：对象参数**

```javascript
popup.openTab({
  id: 'uniqueId', // 可选，标签页唯一标识
  url: 'page.html', // 必需，页面URL
  title: '标签页标题', // 可选，标签页标题
  data: { param1: 'value' }, // 可选，传递的参数对象
  callback: function() {
    // 可选，打开后的回调
    console.log('标签页已打开')
  }
})
```

**方法二：分离参数**

```javascript
// 简化调用方式
popup.openTab('page.html', '标签页标题', { param1: 'value' })

// 只传 URL
popup.openTab('page.html')

// 传 URL 和标题
popup.openTab('page.html', '标签页标题')
```

### 跳转标签页

跳转到已打开的标签页。

```javascript
// 基础用法
popup.jumpTab({
  id: 'uniqueId' // 标签页唯一标识
})
```

### 关闭标签页

支持两种方式关闭标签页。

```javascript
// 关闭指定 ID 的标签页
popup.closeTab({ id: 'uniqueId' })

// 或使用字符串 ID
popup.closeTab('uniqueId')

// 关闭当前标签页（不传参数）
popup.closeTab()
```

### API 参考

#### popup.openTab(option) / popup.openTab(url, title, data)

打开新标签页。

**方法一：对象参数**

| 参数     | 说明             | 类型     | 是否必需 | 默认值 |
| -------- | ---------------- | -------- | -------- | ------ |
| id       | 标签页唯一标识   | string   | 可选     | -      |
| url      | 页面 URL         | string   | 必需     | -      |
| title    | 标签页标题       | string   | 可选     | -      |
| data     | 传递的参数对象   | object   | 可选     | -      |
| callback | 打开后的回调函数 | function | 可选     | -      |

**方法二：分离参数**

| 参数  | 说明           | 类型   | 是否必需 | 默认值 |
| ----- | -------------- | ------ | -------- | ------ |
| url   | 页面 URL       | string | 必需     | -      |
| title | 标签页标题     | string | 可选     | -      |
| data  | 传递的参数对象 | object | 可选     | -      |

#### popup.jumpTab(option)

跳转到已打开的标签页。

| 参数 | 说明           | 类型   | 是否必需 | 默认值 |
| ---- | -------------- | ------ | -------- | ------ |
| id   | 标签页唯一标识 | string | 必需     | -      |

#### popup.closeTab(option)

关闭标签页。

| 参数      | 说明                                  | 类型          | 是否必需 | 默认值 |
| --------- | ------------------------------------- | ------------- | -------- | ------ |
| option    | 标签页配置或 ID，不传则关闭当前标签页 | object/string | 可选     | -      |
| option.id | 标签页唯一标识                        | string        | 必需     | -      |

### 注意事项

:::warning

1. `openTab` 方法支持两种调用方式，可根据实际需求选择使用
2. 使用对象参数时，`url` 是必需的，其他参数可选
3. 使用分离参数时，至少需要传入 `url` 参数
4. `id` 参数用于唯一标识标签页，建议在需要跳转或关闭时提供
5. `data` 参数会传递给打开的页面，可在页面中通过相应方式获取
6. `callback` 回调函数在标签页打开后执行
7. `closeTab()` 不传参数时将关闭当前标签页

:::

### 依赖说明

该方法依赖顶层窗口的以下方法：

- `top._createPage` - 创建标签页
- `top._jumpPage` - 跳转标签页
- `top._removePage` - 移除标签页
