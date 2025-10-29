## Tools / DOM

浏览器环境下常用的 DOM 工具；已做 SSR 容错与兼容性降级处理。

### 引入方式

```js
import yq from 'yq-ui-code/src/utils'
```

---

### trimAll

移除字符串中的所有空白字符（包括空格、换行、制表符等）。

**参数**

- `str` (string, 可选) - 待处理字符串，默认空字符串

**返回**

- string - 移除所有空白后的字符串

**示例**

```js
yq.trimAll(' a b  c  ')
// 'abc'

yq.trimAll('hello\n\tworld  ')
// 'helloworld'
```

---

### byteLength

按 UTF-8 计算字符串的字节长度。优先使用 `TextEncoder` API，不支持时使用近似算法。

**参数**

- `str` (string, 可选) - 输入字符串，默认空字符串
- `encoding` (string, 可选) - 编码格式，默认 `'utf-8'`（当前主要支持 UTF-8）

**返回**

- number - 字符串的字节长度

**示例**

```js
yq.byteLength('hello')
// 5

yq.byteLength('中文')
// 6

yq.byteLength('Hello世界')
// 11
```

---

### toClipboard

复制文本到剪贴板。优先使用现代 `navigator.clipboard.writeText` API，不支持时回退到 `execCommand('copy')` 兼容方案。

**参数**

- `text` (string, 可选) - 需要复制的内容，默认空字符串

**返回**

- Promise&lt;void&gt; - 复制成功或失败的 Promise（旧环境可能无法返回 Promise，仅执行尝试）

**示例**

```js
yq.toClipboard('复制的内容')
  .then(() => console.log('复制成功'))
  .catch((err) => console.error('复制失败', err))

// 或使用 async/await
await yq.toClipboard('Hello World')
```

---

### scrollIntoViewIfNeeded

当元素不在视口内时，滚动使其可见。优先使用原生 `scrollIntoViewIfNeeded` 方法（Safari/Chrome），不支持时回退到标准 `scrollIntoView`。

**参数**

- `el` (Element, 必填) - 需要滚动到视口的元素
- `options` (ScrollIntoViewOptions, 可选) - 滚动选项，默认 `{ block: 'nearest', inline: 'nearest' }`

**返回**

- void

**示例**

```js
const element = document.querySelector('#target')
yq.scrollIntoViewIfNeeded(element)

// 自定义滚动行为
yq.scrollIntoViewIfNeeded(element, {
  block: 'center',
  behavior: 'smooth'
})
```

---

### getBoundingClientRectSafe

安全获取元素的 `DOMRect` 对象，失败时返回 `null` 而不抛出异常。

**参数**

- `el` (Element, 必填) - 目标元素

**返回**

- DOMRect | null - 元素的边界信息对象，失败返回 null

**示例**

```js
const rect = yq.getBoundingClientRectSafe(document.querySelector('#box'))
if (rect) {
  console.log('元素位置:', rect.top, rect.left)
  console.log('元素尺寸:', rect.width, rect.height)
}
```

---

### isInViewport

判断元素是否在当前视口范围内（支持设置偏移容差）。

**参数**

- `el` (Element, 必填) - 需要检测的元素
- `offset` (number, 可选) - 容差像素，默认 0。正值表示扩大检测范围，负值表示缩小

**返回**

- boolean - 元素是否在视口内

**示例**

```js
const isVisible = yq.isInViewport(document.querySelector('#anchor'))
if (!isVisible) {
  console.log('元素不在视口内')
}

// 带容差检测（提前 20px 判定为"即将进入视口"）
const almostVisible = yq.isInViewport(element, 20)
```

---

### 注意事项

- 在 SSR 环境下，这些函数内部会检测 `window`/`document` 是否存在并做降级处理
- `toClipboard` 在 HTTPS 环境下体验更佳（HTTP 环境部分浏览器可能限制 Clipboard API）
- `scrollIntoViewIfNeeded` 在不同浏览器的行为可能略有差异
