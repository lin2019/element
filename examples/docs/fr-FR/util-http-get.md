## GET 请求

标准的 GET 请求方法，使用 URL 查询参数。

:::tip
For HTTP utility import instructions, please refer to [HTTP Requests](#/fr-FR/util/util-http#import)
:::

### 基础用法

```javascript
// 基础用法
yq.get('/api/user/detail', { id: '001' }).then((res) => {
  console.log(res)
})

// 使用 async/await
async getUserInfo(id) {
  const res = await yq.get('/api/user/detail', { id })
  return res.data
}
```

### 自定义配置

```javascript
// 自定义超时时间和请求头
yq.get(
  '/api/getData',
  { type: 'all' },
  {
    timeout: 30000,
    headers: {
      'Custom-Header': 'value',
      Authorization: 'Bearer token'
    }
  }
)

// 关闭 loading
yq.get(
  '/api/getData',
  { id: 1 },
  {
    loading: false
  }
)

// 自定义 loading
yq.get(
  '/api/getData',
  { id: 1 },
  {
    loadingText: '加载中...',
    target: '.content-wrapper'
  }
)
```

### 在组件中使用

```javascript
export default {
  data() {
    return {
      userInfo: {},
      userList: []
    }
  },
  methods: {
    // 获取用户详情
    async getUserDetail(id) {
      try {
        const res = await yq.get('/api/user/detail', { id })
        this.userInfo = res.data
      } catch (error) {
        this.$message.error('获取用户信息失败')
      }
    },

    // 获取用户列表
    async getUserList() {
      const res = await yq.get(
        '/api/user/list',
        {
          status: 1,
          role: 'admin'
        },
        {
          loadingText: '加载用户列表...'
        }
      )
      this.userList = res.data
    },

    // 搜索用户
    async searchUser(keyword) {
      const res = await yq.get(
        '/api/user/search',
        {
          keyword,
          limit: 10
        },
        {
          loading: false // 搜索时不显示全屏 loading
        }
      )
      return res.data
    }
  },
  mounted() {
    this.getUserDetail(this.$route.params.id)
  }
}
```

### API 参考

#### 参数

| 参数   | 说明       | 类型   | 默认值 |
| ------ | ---------- | ------ | ------ |
| url    | 请求地址   | string | -      |
| params | 查询参数   | object | -      |
| config | axios 配置 | object | -      |

#### config 配置项

| 参数        | 说明                   | 类型                | 默认值      |
| ----------- | ---------------------- | ------------------- | ----------- |
| timeout     | 超时时间(ms)           | number              | 60000       |
| headers     | 请求头                 | object              | -           |
| loading     | 是否显示 loading       | boolean             | true        |
| loadingText | loading 文本           | string              | '加载中...' |
| target      | loading 覆盖的目标节点 | string\|HTMLElement | -           |
| background  | loading 背景色         | string              | -           |

### 使用示例

#### 基本查询

```javascript
// 简单查询
yq.get('/api/user', { id: 1 })

// 多个查询参数
yq.get('/api/user/list', {
  page: 1,
  size: 20,
  status: 'active',
  role: 'admin'
})
```

#### 带 Loading 控制

```javascript
// 局部 loading
yq.get(
  '/api/getData',
  { id: 1 },
  {
    target: this.$refs.container,
    loadingText: '正在加载...'
  }
)

// 自定义背景色
yq.get(
  '/api/getData',
  { id: 1 },
  {
    background: 'rgba(255, 255, 255, 0.9)',
    loadingText: '请稍候...'
  }
)
```

#### 实时搜索

```javascript
export default {
  data() {
    return {
      searchKeyword: '',
      searchResults: []
    }
  },
  watch: {
    searchKeyword: {
      handler(val) {
        if (val) {
          this.handleSearch(val)
        }
      }
    }
  },
  methods: {
    // 搜索不显示 loading，避免频繁闪烁
    async handleSearch(keyword) {
      const res = await yq.get(
        '/api/search',
        { keyword },
        {
          loading: false
        }
      )
      this.searchResults = res.data
    }
  }
}
```

### 错误处理

```javascript
// 使用 try-catch
async getData() {
  try {
    const res = await yq.get('/api/data', { id: 1 })
    console.log(res)
  } catch (error) {
    // 错误已被统一处理，这里可以做额外处理
    console.error('请求失败', error)
  }
}

// 使用 .catch()
yq.get('/api/data', { id: 1 })
  .then((res) => {
    console.log(res)
  })
  .catch((error) => {
    console.error('请求失败', error)
  })
```

### 注意事项

1. **默认 Loading**：GET 请求默认开启全屏 loading，可通过 `loading: false` 关闭
2. **查询参数**：参数会自动转换为 URL 查询字符串（如 `?id=1&name=test`）
3. **错误处理**：内置统一错误处理，使用 Element UI 消息组件自动提示
4. **Promise 支持**：返回 Promise，支持 async/await 语法
5. **高频请求**：对于实时搜索等高频请求，建议设置 `loading: false`
