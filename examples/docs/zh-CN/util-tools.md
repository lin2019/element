## Tools 通用工具（文档骨架）

本页汇总前端常用工具函数，统一命名与参数顺序，仅作为“文档骨架与目录占位”，不包含实现与示例代码。

### 设计原则

- 原生优先；必要时使用可替换的薄封装。
- ESM 与按需引入；不可变与不改入参；SSR 友好。

### 模块导航

- Core 基础类型与对象
- Datetime 日期与时间
- URL 与路由
- DOM 操作
- Env 浏览器环境
- Validate 验证与正则
- File 文件与数据
- Format 格式化
- Storage 存储
- Security 安全

---

### Core 基础类型与对象（占位）

- isEmpty(value) → boolean
- cloneDeep(obj) → any
- merge(target, ...sources, options?) → any
- toNumber(value, fallback?) → number
- toBoolean(value, truthyList?) → boolean
- get(object, path, defaultValue?) → any
- set(object, path, value) → newObject
- uuid() → string

### Datetime 日期与时间（占位）

- formatDate(date, pattern = 'YYYY-MM-DD HH:mm:ss', tz?) → string
- parseDate(input, pattern?) → Date | null
- getDateDiff(start, end, unit = 'day') → number
- add(date, amount, unit) / subtract(date, amount, unit) → Date
- toTimestamp(date) → number
- fromTimestamp(ms) → Date
- isSameDay(a, b, tz?) → boolean
- isBetween(date, start, end, unit?, inclusive?) → boolean
- fromNow(date, tz?) → string

说明：简单格式化可用 Intl，复杂时区/相对时间建议 dayjs（后续薄封装）。

### URL 与路由（占位）

- getQueryParam(key, url?) → string | null
- getQueryObject(url?, options?) → Record<string, any>
- setQueryParam(url, key, value) → string
- buildUrl(base, params?, hash?) → string
- joinPath(...segments) → string

### DOM 操作（占位）

- trimAll(str) → string
- byteLength(str, encoding='utf-8') → number
- toClipboard(text) → Promise<void>
- scrollIntoViewIfNeeded(el, options?) → void
- getBoundingClientRectSafe(el) → DOMRect | null
- isInViewport(el, offset?) → boolean

### Env 浏览器环境（占位）

- isClient() / isServer()
- isMobile(deviceOverride?) → boolean
- getLanguage() → string
- getTimezone() → string
- prefersDarkMode() → boolean
- onVisibilityChange(cb) / onOnlineStatusChange(cb)

### Validate 验证与正则（占位）

- isEmail(str) → boolean
- isPhone(str, region?) → boolean
- isURL(str, options?) → boolean
- isIdCard(str, region?) → boolean
- isNumeric(str) / isInteger(str) / isFloat(str) → boolean
- assert(condition, message) → void
- safeNumber(value, options?) → number | null

### File 文件与数据（占位）

- downloadBlob(blob, filename) → Promise<void>
- fileToBase64(file) → Promise<string>
- base64ToBlob(base64, mime) → Blob
- zipFiles(files: Array<{name, blob}>) → Promise<Blob>
- parseCSV(fileOrText, options?) → Promise<{ data, errors }>

### Format 格式化（占位）

- formatNumber(value, options?) → string
- formatCurrency(value, currency='CNY', locale?) → string
- formatPercent(value, digits?) → string
- formatBytes(bytes, decimals?) → string

### Storage 存储（占位）

- setLocal(key, value, ttlMs?) / getLocal(key) / removeLocal(key)
- setSession(key, value, ttlMs?) / getSession(key) / removeSession(key)
- （可选）IndexedDB 工具

### Security 安全（占位）

- sanitizeHTML(html, options?) → string
- escapeHTML(str) / unescapeHTML(str)

---

### 依赖与替代（占位）

- 日期：dayjs（插件：utc、timezone、relativeTime、isoWeek、customParseFormat）；或 Intl。
- 对象：lodash-es 按需；ID：nanoid；Query：URLSearchParams/qs。
- 安全：dompurify；文件：file-saver、jszip；CSV：papaparse。

### 迁移对照（占位）

- 旧 `src/utils/tools.js` 等函数 → 新 API 映射待补充。

### 待完善

- 填充签名细节、错误约定、边界说明与示例。
