## Tools / Env

浏览器环境检测与设备信息工具（已做 SSR 容错处理）。

### 引入方式

```js
import yq from 'yq-ui-code/src/utils'
```

---

### isBrowser

检测当前是否为浏览器环境（非 Node.js 或其他服务端环境）。

**参数**

- 无

**返回**

- boolean - 是否为浏览器环境

**示例**

```js
if (yq.isBrowser()) {
  console.log('运行在浏览器中')
}
```

---

### isMobile

检测是否为移动设备（包括 Android、iOS、Windows Phone 等）。

**参数**

- 无

**返回**

- boolean - 是否为移动设备

**示例**

```js
if (yq.isMobile()) {
  // 加载移动端样式或逻辑
  console.log('移动设备访问')
}
```

---

### isIOS

检测是否为 iOS 设备（iPhone、iPad、iPod）。

**参数**

- 无

**返回**

- boolean - 是否为 iOS 设备

**示例**

```js
if (yq.isIOS()) {
  console.log('iOS 设备')
  // 处理 iOS 特有的兼容性问题
}
```

---

### isAndroid

检测是否为 Android 设备。

**参数**

- 无

**返回**

- boolean - 是否为 Android 设备

**示例**

```js
if (yq.isAndroid()) {
  console.log('Android 设备')
}
```

---

### isWeChat

检测是否在微信浏览器中运行。

**参数**

- 无

**返回**

- boolean - 是否为微信浏览器

**示例**

```js
if (yq.isWeChat()) {
  // 初始化微信 JSSDK
  console.log('微信浏览器环境')
}
```

---

### getBrowserInfo

获取浏览器类型和版本信息。

**参数**

- 无

**返回**

- Object - 包含 `name` 和 `version` 的对象
  - `name` (string) - 浏览器名称（Chrome、Safari、Firefox、Edge、IE 等）
  - `version` (string) - 浏览器版本号

**示例**

```js
const browser = yq.getBrowserInfo()
console.log(browser)
// { name: 'Chrome', version: '120.0.6099.109' }

if (browser.name === 'IE') {
  alert('不支持 IE 浏览器，请使用现代浏览器')
}
```

---

### getOSInfo

获取操作系统类型和版本信息。

**参数**

- 无

**返回**

- Object - 包含 `name` 和 `version` 的对象
  - `name` (string) - 操作系统名称（Windows、macOS、iOS、Android、Linux 等）
  - `version` (string) - 操作系统版本号

**示例**

```js
const os = yq.getOSInfo()
console.log(os)
// { name: 'macOS', version: '14.2.1' }
// { name: 'Windows', version: '10' }
// { name: 'iOS', version: '17.2' }
```

---

### getDeviceType

获取设备类型（桌面端、移动端、平板）。

**参数**

- 无

**返回**

- string - 设备类型：`'desktop'` | `'mobile'` | `'tablet'` | `'unknown'`

**示例**

```js
const deviceType = yq.getDeviceType()

if (deviceType === 'mobile') {
  // 移动端布局
} else if (deviceType === 'tablet') {
  // 平板布局
} else {
  // 桌面端布局
}
```

---

### isTouchDevice

检测设备是否支持触摸操作。

**参数**

- 无

**返回**

- boolean - 是否支持触摸

**示例**

```js
if (yq.isTouchDevice()) {
  // 启用触摸手势支持
  console.log('支持触摸操作')
}
```

---

### getViewportSize

获取当前视口的宽度和高度。

**参数**

- 无

**返回**

- Object - 包含 `width` 和 `height` 的对象
  - `width` (number) - 视口宽度（像素）
  - `height` (number) - 视口高度（像素）

**示例**

```js
const viewport = yq.getViewportSize()
console.log(`视口尺寸: ${viewport.width}x${viewport.height}`)

// 响应式判断
if (viewport.width < 768) {
  console.log('小屏幕设备')
}
```

---

### isDarkMode

检测用户系统是否启用了暗色模式。

**参数**

- 无

**返回**

- boolean - 是否为暗色模式

**示例**

```js
if (yq.isDarkMode()) {
  document.body.classList.add('dark-theme')
  console.log('用户偏好暗色模式')
}

// 监听暗色模式变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  console.log('暗色模式已', e.matches ? '启用' : '禁用')
})
```

---

### getNetworkInfo

获取网络连接信息（需浏览器支持 Network Information API）。

**参数**

- 无

**返回**

- Object - 网络连接信息
  - `effectiveType` (string) - 有效连接类型（'4g'、'3g'、'2g'、'slow-2g' 或 'unknown'）
  - `downlink` (number) - 下行速度（Mbps）
  - `rtt` (number) - 往返时间（毫秒）
  - `saveData` (boolean) - 是否启用了省流量模式

**示例**

```js
const network = yq.getNetworkInfo()
console.log(network)
// { effectiveType: '4g', downlink: 10, rtt: 50, saveData: false }

if (network.effectiveType === 'slow-2g' || network.saveData) {
  // 加载低质量图片或禁用自动播放
  console.log('网络较慢或省流量模式')
}
```

---

### isOnline

检测设备当前是否在线（有网络连接）。

**参数**

- 无

**返回**

- boolean - 是否在线

**示例**

```js
if (yq.isOnline()) {
  console.log('网络已连接')
} else {
  alert('网络已断开，请检查网络连接')
}

// 监听网络状态变化
window.addEventListener('online', () => {
  console.log('网络已恢复')
})

window.addEventListener('offline', () => {
  console.log('网络已断开')
})
```

---

### 注意事项

- 所有函数在 SSR 环境下都会安全降级，不会抛出异常
- 用户代理字符串检测可能不完全准确，部分浏览器或设备可能伪造 UA
- `getNetworkInfo` 依赖 [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)，部分浏览器可能不支持
- `isDarkMode` 依赖 CSS Media Query，旧版浏览器可能不支持
- 建议结合特性检测（Feature Detection）使用，而非完全依赖 UA 检测
