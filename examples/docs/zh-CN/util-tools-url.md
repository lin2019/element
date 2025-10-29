## Tools / URL

URL 与查询串工具，优先使用原生 `URL` 与 `URLSearchParams`，在不支持的环境下回退到字符串解析。

### 引入方式

```javascript
import yq from 'yq-ui-code/src/utils'
```

### getQueryParam

获取查询参数的第一个值。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| key | string | 是 | - | 参数名 |
| url | string | 否 | 当前地址 | 完整 URL 或 `?a=1` 形式 |

返回

- string|null

示例

```javascript
yq.getQueryParam('id', 'https://a.com?p=1&id=2&id=3') // '2'
```

### getQueryObject

将查询串解析为对象（支持多值数组）。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| url | string | 否 | 当前地址 | 完整 URL 或 `?a=1` 形式 |

返回

- Record<string, string|string[]>：多值会以数组呈现

示例

```javascript
yq.getQueryObject('https://a.com?a=1&a=2&b=ok') // { a: ['1','2'], b: 'ok' }
```

### setQueryParam

设置/删除（传 `null/undefined`）某个参数，返回新的 URL 字符串。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| url | string | 否 | 当前地址 | 基础 URL（不传取当前地址，SSR 下需传） |
| key | string | 是 | - | 参数名 |
| value | string\|number\|null\|undefined | 否 | - | 参数值；空则删除该项 |

返回

- string：更新后的 URL

示例

```javascript
yq.setQueryParam('https://a.com?p=1', 'p', 2)
```

### buildUrl

拼装 URL（base + params + hash）。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| base | string | 否 | '' | 基础路径 |
| params | Record<string, any> | 否 | - | 查询参数对象（对象值将以 JSON 字符串编码） |
| hash | string | 否 | - | 哈希（自动去掉开头的 `#`） |

返回

- string

示例

```javascript
yq.buildUrl('/user', { page: 1 }, 'detail') // '/user?page=1#detail'
```

### joinPath

安全拼接多段路径，去除多余斜杠，保留首段的起始斜杠。

参数
| 名称 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| ...segments | string[] | 否 | - | 路径片段 |

返回

- string

示例

```javascript
yq.joinPath('/api/', '/v1/', 'users/') // '/api/v1/users'
```

### 注意事项

- 复杂嵌套对象的查询串建议在业务层使用 `qs` 等库；工具层坚持薄封装与原生优先。
