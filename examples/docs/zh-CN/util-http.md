## HTTP 请求

基于 axios 封装的 HTTP 请求工具，支持请求拦截、响应拦截、错误处理等功能。所有请求方法都挂载在 `yq` 命名空间下。

### 引入方式

#### NPM 安装引入

```javascript
import yq from 'element-ui/src/utils'

// 或者按需引入
import { yq } from 'element-ui/src/utils'
```

#### CDN 引入

通过 CDN 引入时，`yq` 对象会自动挂载到 `window` 对象上，可以直接使用。

```html
<!-- 引入 Element UI (包含 yq 工具) -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css" />
<script src="https://unpkg.com/vue@2/dist/vue.js"></script>
<script src="https://unpkg.com/element-ui/lib/index.js"></script>

<!-- 或使用自己的CDN地址 -->
<script src="your-cdn-path/element-ui.js"></script>

<script>
  // 直接使用 yq 对象
  yq.remoteCall('/api/getData', { id: 1 }).then((res) => {
    console.log(res)
  })
</script>
```
