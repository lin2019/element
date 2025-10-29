## Tools / Storage

浏览器存储工具（LocalStorage、SessionStorage、Cookie）封装。

### 引入方式

```js
import yq from 'yq-ui-code/src/utils'
```

---

### setStorage

设置 LocalStorage（支持过期时间和自动 JSON 序列化）。

**参数**

- `key` (string, 必填) - 键名
- `value` (any, 必填) - 值（自动 JSON 序列化）
- `expire` (number, 可选) - 过期时间（毫秒）

**返回**

- boolean - 是否设置成功

**示例**

```js
// 普通设置
yq.setStorage('user', { name: '张三', age: 30 })

// 设置过期时间（1小时后过期）
yq.setStorage('token', 'abc123', 60 * 60 * 1000)

// 设置过期时间（7天后过期）
yq.setStorage('remember', true, 7 * 24 * 60 * 60 * 1000)
```

---

### getStorage

获取 LocalStorage（自动 JSON 反序列化，支持过期检查）。

**参数**

- `key` (string, 必填) - 键名
- `defaultValue` (any, 可选) - 默认值

**返回**

- any - 存储的值，不存在或已过期返回默认值

**示例**

```js
const user = yq.getStorage('user')
// { name: '张三', age: 30 }

const token = yq.getStorage('token', '')
// 'abc123' 或 '' (如果不存在或已过期)

const settings = yq.getStorage('settings', { theme: 'light' })
```

---

### removeStorage

删除 LocalStorage 中的指定项。

**参数**

- `key` (string, 必填) - 键名

**返回**

- boolean - 是否删除成功

**示例**

```js
yq.removeStorage('token')
```

---

### clearStorage

清空 LocalStorage 中的所有项。

**参数**

- 无

**返回**

- boolean - 是否清空成功

**示例**

```js
yq.clearStorage()
```

---

### setSession

设置 SessionStorage（自动 JSON 序列化）。

**参数**

- `key` (string, 必填) - 键名
- `value` (any, 必填) - 值（自动 JSON 序列化）

**返回**

- boolean - 是否设置成功

**示例**

```js
yq.setSession('tabData', { currentTab: 0, data: [...] })
yq.setSession('formCache', formData)
```

---

### getSession

获取 SessionStorage（自动 JSON 反序列化）。

**参数**

- `key` (string, 必填) - 键名
- `defaultValue` (any, 可选) - 默认值

**返回**

- any - 存储的值，不存在返回默认值

**示例**

```js
const tabData = yq.getSession('tabData')
const formCache = yq.getSession('formCache', {})
```

---

### removeSession

删除 SessionStorage 中的指定项。

**参数**

- `key` (string, 必填) - 键名

**返回**

- boolean - 是否删除成功

**示例**

```js
yq.removeSession('tabData')
```

---

### clearSession

清空 SessionStorage 中的所有项。

**参数**

- 无

**返回**

- boolean - 是否清空成功

**示例**

```js
yq.clearSession()
```

---

### setCookie

设置 Cookie。

**参数**

- `name` (string, 必填) - Cookie 名称
- `value` (string, 必填) - Cookie 值
- `options` (Object, 可选) - 配置选项
  - `days` (number) - 过期天数
  - `path` (string) - 路径，默认 `/`
  - `domain` (string) - 域名
  - `secure` (boolean) - 是否仅 HTTPS
  - `sameSite` (string) - SameSite 策略（`Strict` | `Lax` | `None`）

**返回**

- boolean - 是否设置成功

**示例**

```js
// 基本用法
yq.setCookie('username', '张三')

// 设置过期时间（7天）
yq.setCookie('token', 'abc123', { days: 7 })

// 完整配置
yq.setCookie('session_id', 'xyz789', {
  days: 1,
  path: '/',
  domain: '.example.com',
  secure: true,
  sameSite: 'Lax'
})
```

---

### getCookie

获取 Cookie。

**参数**

- `name` (string, 必填) - Cookie 名称

**返回**

- string | null - Cookie 值，不存在返回 null

**示例**

```js
const username = yq.getCookie('username') // '张三'
const token = yq.getCookie('token') // 'abc123' 或 null
```

---

### removeCookie

删除 Cookie。

**参数**

- `name` (string, 必填) - Cookie 名称
- `options` (Object, 可选) - 配置选项（path、domain 需与设置时一致）

**返回**

- boolean - 是否删除成功

**示例**

```js
yq.removeCookie('token')

// 删除特定路径和域名的 Cookie
yq.removeCookie('session_id', {
  path: '/',
  domain: '.example.com'
})
```

---

### getStorageSize

获取存储空间使用情况。

**参数**

- 无

**返回**

- Object - 使用情况统计
  - `localStorage` (number) - LocalStorage 使用字节数
  - `sessionStorage` (number) - SessionStorage 使用字节数
  - `localStorageKB` (string) - LocalStorage 使用 KB 数
  - `sessionStorageKB` (string) - SessionStorage 使用 KB 数

**示例**

```js
const size = yq.getStorageSize()
console.log(size)
// {
//   localStorage: 12345,
//   sessionStorage: 5678,
//   localStorageKB: '12.06',
//   sessionStorageKB: '5.54'
// }

console.log(`LocalStorage 已使用: ${size.localStorageKB} KB`)
```

---

### 注意事项

- **自动序列化**：`setStorage` 和 `setSession` 会自动将对象、数组等转换为 JSON 字符串存储
- **过期检查**：`getStorage` 会自动检查过期时间，过期数据会被删除并返回默认值
- **容量限制**：
  - LocalStorage 和 SessionStorage 通常限制为 5-10MB
  - Cookie 单个限制约 4KB，总数限制因浏览器而异
- **SSR 安全**：所有函数在非浏览器环境下会安全返回，不会抛出异常
- **跨域限制**：
  - LocalStorage 和 SessionStorage 受同源策略限制
  - Cookie 可通过 `domain` 设置跨子域共享
- **隐私模式**：部分浏览器的隐私模式可能禁用或限制存储功能
- **Cookie 注意事项**：
  - `secure` 选项要求 HTTPS 连接
  - `sameSite` 建议设置为 `Lax` 或 `Strict` 以防止 CSRF 攻击
  - 删除 Cookie 时 `path` 和 `domain` 必须与设置时一致
- **性能建议**：
  - 避免存储过大的数据
  - 频繁读写建议使用变量缓存
  - 定期清理过期或无用数据
