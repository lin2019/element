## HTTP Requests

HTTP request utility based on axios, supporting request interception, response interception, error handling, and loading control. All request methods are accessible through the `yq` namespace.

### Import

#### NPM Installation

```javascript
import yq from 'yq-ui-code/lib/utils'

// or import on demand
import { yq } from 'yq-ui-code/lib/utils'
```

#### CDN

When imported via CDN, the `yq` object is automatically mounted to the `window` object and can be used directly.

```html
<!-- Import Element UI (includes yq utilities) -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css" />
<script src="https://unpkg.com/vue@2/dist/vue.js"></script>
<script src="https://unpkg.com/element-ui/lib/index.js"></script>

<!-- Or use your own CDN path -->
<script src="your-cdn-path/element-ui.js"></script>

<script>
  // Use yq object directly
  yq.remoteCall('/api/getData', { id: 1 }).then((res) => {
    console.log(res)
  })
</script>
```
