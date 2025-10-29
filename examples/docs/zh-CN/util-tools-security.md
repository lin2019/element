## Tools / Security

安全工具函数（XSS 防护、加密、防抖节流等）。

### 引入方式

```js
import yq from 'yq-ui-code/src/utils'
```

---

### escapeHtml

HTML 转义（防止 XSS 攻击）。

**参数**

- `str` (string, 必填) - 待转义字符串

**返回**

- string - 转义后的字符串

**示例**

```js
const userInput = '<script>alert("XSS")</script>'
const safe = yq.escapeHtml(userInput)
// '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'

// 显示用户输入（安全）
element.innerHTML = yq.escapeHtml(userContent)
```

---

### unescapeHtml

HTML 反转义。

**参数**

- `str` (string, 必填) - 待反转义字符串

**返回**

- string - 反转义后的字符串

**示例**

```js
const escaped = '&lt;div&gt;Hello&lt;/div&gt;'
const original = yq.unescapeHtml(escaped)
// '<div>Hello</div>'
```

---

### simpleEncrypt

简单加密（Base64 + XOR 混淆，不适用于敏感数据）。

**参数**

- `str` (string, 必填) - 待加密字符串
- `key` (string, 可选) - 密钥，默认 `'default'`

**返回**

- string - 加密后的字符串

**示例**

```js
const encrypted = yq.simpleEncrypt('敏感信息', 'mySecret')
// 'JTdCJTIyZGF0YS...'

// 用于非敏感数据的简单混淆
const data = yq.simpleEncrypt(JSON.stringify({ id: 123 }), 'key123')
```

---

### simpleDecrypt

简单解密。

**参数**

- `str` (string, 必填) - 待解密字符串
- `key` (string, 可选) - 密钥，默认 `'default'`（需与加密时一致）

**返回**

- string - 解密后的字符串

**示例**

```js
const decrypted = yq.simpleDecrypt(encrypted, 'mySecret')
// '敏感信息'

const data = JSON.parse(yq.simpleDecrypt(encryptedData, 'key123'))
```

---

### simpleMD5

简化版 MD5 哈希（不适用于安全场景，仅用于数据指纹）。

**参数**

- `str` (string, 必填) - 待哈希字符串

**返回**

- string - 哈希值（8 位十六进制）

**示例**

```js
const hash = yq.simpleMD5('Hello World')
// '4a5d9c7f'

// 用于生成缓存键
const cacheKey = `data_${yq.simpleMD5(JSON.stringify(params))}`
```

---

### generateToken

生成随机 Token（用于 CSRF 防护、临时令牌等）。

**参数**

- `length` (number, 可选) - Token 长度，默认 32

**返回**

- string - 随机 Token

**示例**

```js
const csrfToken = yq.generateToken()
// 'a3F2k9Q7mN5pL8xZ1vB4cD6eG0hI2jK3'

const shortToken = yq.generateToken(16)
// 'mN5pL8xZ1vB4cD6e'

// CSRF Token 示例
const token = yq.generateToken(32)
yq.setSession('csrf_token', token)
```

---

### debounceFunc

防抖函数（限制函数执行频率）。

**参数**

- `func` (Function, 必填) - 要防抖的函数
- `wait` (number, 可选) - 等待时间（毫秒），默认 300
- `immediate` (boolean, 可选) - 是否立即执行，默认 false

**返回**

- Function - 防抖后的函数

**示例**

```js
// 搜索输入防抖
const handleSearch = yq.debounceFunc((keyword) => {
  console.log('搜索:', keyword)
  // 发起搜索请求
}, 500)

input.addEventListener('input', (e) => {
  handleSearch(e.target.value)
})

// 窗口 resize 防抖
const handleResize = yq.debounceFunc(() => {
  console.log('窗口大小改变')
}, 300)

window.addEventListener('resize', handleResize)

// 立即执行模式
const saveData = yq.debounceFunc(
  () => {
    console.log('保存数据')
  },
  1000,
  true
)
```

---

### throttleFunc

节流函数（控制函数执行频率）。

**参数**

- `func` (Function, 必填) - 要节流的函数
- `wait` (number, 可选) - 等待时间（毫秒），默认 300
- `options` (Object, 可选) - 配置选项
  - `leading` (boolean) - 是否在开始时执行，默认 true
  - `trailing` (boolean) - 是否在结束时执行，默认 true

**返回**

- Function - 节流后的函数

**示例**

```js
// 滚动事件节流
const handleScroll = yq.throttleFunc(() => {
  console.log('滚动位置:', window.scrollY)
}, 200)

window.addEventListener('scroll', handleScroll)

// 按钮点击节流（防止重复提交）
const handleSubmit = yq.throttleFunc(() => {
  console.log('提交表单')
  // 提交逻辑
}, 2000)

button.addEventListener('click', handleSubmit)

// 不在开始时执行
const logData = yq.throttleFunc(
  () => {
    console.log('记录数据')
  },
  1000,
  { leading: false }
)
```

---

### filterSensitiveWords

过滤敏感词。

**参数**

- `text` (string, 必填) - 待过滤文本
- `words` (Array&lt;string&gt;, 必填) - 敏感词列表
- `replacement` (string, 可选) - 替换字符，默认 `*`

**返回**

- string - 过滤后的文本

**示例**

```js
const sensitiveWords = ['敏感词1', '敏感词2', '违规']

const filtered = yq.filterSensitiveWords('这是一段包含敏感词1和违规内容的文本', sensitiveWords)
// '这是一段包含****和**内容的文本'

// 自定义替换字符
const filtered2 = yq.filterSensitiveWords('包含敏感词2的内容', sensitiveWords, 'X')
// '包含XXXX的内容'

// 用户评论过滤
const comment = yq.filterSensitiveWords(userComment, bannedWords)
```

---

### 注意事项

- **XSS 防护**：

  - `escapeHtml` 仅处理常见的 HTML 特殊字符
  - 对于富文本编辑器，建议使用专业的 XSS 过滤库（如 DOMPurify）
  - 永远不要信任用户输入，显示前必须转义

- **加密安全**：

  - `simpleEncrypt` 仅用于简单数据混淆，不适用于真正的敏感数据
  - 真正的敏感数据应使用 AES、RSA 等标准加密算法
  - 建议使用 crypto-js、js-sha256 等成熟加密库
  - 密钥不应硬编码在前端代码中

- **哈希安全**：

  - `simpleMD5` 是简化实现，不符合真正的 MD5 算法
  - 生产环境应使用标准的哈希库
  - MD5 已不适用于密码存储，建议使用 bcrypt、scrypt 等

- **Token 生成**：

  - `generateToken` 优先使用加密安全的随机数生成器
  - CSRF Token 应配合后端验证使用
  - 敏感 Token 应存储在 HttpOnly Cookie 中

- **防抖与节流**：

  - 防抖：事件触发后等待一段时间，期间再次触发会重新计时
  - 节流：固定时间内只执行一次
  - 选择建议：
    - 搜索输入 → 防抖
    - 滚动事件 → 节流
    - 窗口 resize → 防抖
    - 按钮点击 → 节流

- **敏感词过滤**：

  - 仅做前端展示层过滤，后端必须再次验证
  - 大量敏感词建议使用更高效的算法（如 Trie 树、AC 自动机）
  - 注意正则表达式性能问题

- **通用安全建议**：
  - 前端加密仅为增加破解难度，不能替代 HTTPS
  - 敏感操作必须后端验证
  - 定期更新密钥和 Token
  - 遵循最小权限原则
