## POST Request

Standard POST request method supporting multiple data formats (form/json/formData).

:::tip
For HTTP utility import instructions, please refer to [HTTP Requests](#/es/util/util-http#import)
:::

### 基础用法

```javascript
// 基础用法 - 默认 form 格式
yq.post('/api/user/save', {
  name: '张三',
  age: 20
}).then((res) => {
  console.log('保存成功', res)
})

// 使用 async/await
async saveUser(userData) {
  const res = await yq.post('/api/user/save', userData)
  return res
}
```

### 数据格式

支持三种数据格式：`form`（默认）、`json`、`formData`

```javascript
// 1. Form 格式（默认，application/x-www-form-urlencoded）
yq.post('/api/user/save', {
  name: '张三',
  age: 20
})

// 2. JSON 格式（application/json）
yq.post(
  '/api/user/save',
  {
    name: '张三',
    age: 20
  },
  {
    contentType: 'json'
  }
)

// 3. FormData 格式（用于文件上传，multipart/form-data）
const formData = new FormData()
formData.append('file', file)
formData.append('name', '文件名')

yq.post('/api/upload', formData, {
  contentType: 'formData'
})
```

### 自定义配置

```javascript
// 自定义超时时间和请求头
yq.post('/api/saveData', data, {
  timeout: 30000,
  headers: {
    Authorization: 'Bearer token',
    'Custom-Header': 'value'
  },
  contentType: 'json'
})

// 关闭 loading
yq.post('/api/save', data, {
  loading: false
})

// 自定义 loading
yq.post('/api/save', data, {
  loadingText: '保存中...',
  target: '.form-container'
})
```

### 在组件中使用

```javascript
export default {
  data() {
    return {
      formData: {
        name: '',
        age: '',
        email: ''
      }
    }
  },
  methods: {
    // 保存用户信息
    async saveUser() {
      try {
        await yq.post('/api/user/save', this.formData, {
          contentType: 'json',
          loadingText: '保存中...'
        })
        this.$message.success('保存成功')
        this.$router.push('/user/list')
      } catch (error) {
        this.$message.error('保存失败')
      }
    },

    // 文件上传
    async uploadFile(file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'avatar')

      try {
        const res = await yq.post('/api/upload', formData, {
          contentType: 'formData',
          loadingText: '上传中...'
        })
        this.$message.success('上传成功')
        return res.data.url
      } catch (error) {
        this.$message.error('上传失败')
      }
    },

    // 批量操作
    async batchUpdate(ids, status) {
      const res = await yq.post(
        '/api/user/batchUpdate',
        {
          ids,
          status
        },
        {
          contentType: 'json',
          loadingText: '批量更新中...'
        }
      )
      this.$message.success(`成功更新 ${res.count} 条数据`)
    }
  }
}
```

### 文件上传示例

```javascript
export default {
  methods: {
    // 单文件上传
    async handleFileUpload(file) {
      const formData = new FormData()
      formData.append('file', file)

      const res = await yq.post('/api/upload', formData, {
        contentType: 'formData',
        onStart: () => {
          this.uploadProgress = 0
        }
      })

      return res.data.url
    },

    // 多文件上传
    async handleMultipleUpload(files) {
      const formData = new FormData()
      files.forEach((file, index) => {
        formData.append(`file${index}`, file)
      })

      const res = await yq.post('/api/upload/multiple', formData, {
        contentType: 'formData',
        loadingText: `上传中 (${files.length} 个文件)...`
      })

      return res.data.urls
    },

    // 带额外参数的文件上传
    async uploadWithParams(file, params) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', params.category)
      formData.append('description', params.description)

      const res = await yq.post('/api/upload', formData, {
        contentType: 'formData'
      })

      return res.data
    }
  }
}
```

### API 参考

#### 参数

| 参数   | 说明       | 类型   | 默认值 |
| ------ | ---------- | ------ | ------ |
| url    | 请求地址   | string | -      |
| data   | 请求数据   | object | -      |
| config | axios 配置 | object | -      |

#### config 配置项

| 参数        | 说明                                 | 类型                | 默认值      |
| ----------- | ------------------------------------ | ------------------- | ----------- |
| timeout     | 超时时间(ms)                         | number              | 60000       |
| headers     | 请求头                               | object              | -           |
| contentType | 内容类型：'json'\|'form'\|'formData' | string              | 'form'      |
| loading     | 是否显示 loading                     | boolean             | true        |
| loadingText | loading 文本                         | string              | '加载中...' |
| target      | loading 覆盖的目标节点               | string\|HTMLElement | -           |
| background  | loading 背景色                       | string              | -           |

### 使用示例

#### Form 表单提交

```javascript
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    async submitForm() {
      // 验证表单
      await this.$refs.form.validate()

      // 提交数据
      await yq.post('/api/user/register', this.form, {
        contentType: 'json',
        loadingText: '注册中...'
      })

      this.$message.success('注册成功')
      this.$router.push('/login')
    }
  }
}
```

#### JSON 数据提交

```javascript
// 复杂数据结构
const data = {
  user: {
    name: '张三',
    age: 20,
    hobbies: ['reading', 'coding']
  },
  permissions: [{ module: 'user', action: 'read' }, { module: 'user', action: 'write' }]
}

yq.post('/api/user/save', data, {
  contentType: 'json'
})
```

#### 带 Loading 控制

```javascript
// 局部 loading - 覆盖表单区域
yq.post('/api/save', formData, {
  target: this.$refs.formContainer,
  loadingText: '保存中...',
  contentType: 'json'
})

// 自定义背景色
yq.post('/api/save', data, {
  background: 'rgba(255, 255, 255, 0.9)',
  loadingText: '提交中...'
})
```

### 错误处理

```javascript
// 使用 try-catch
async saveData() {
  try {
    const res = await yq.post('/api/save', this.formData, {
      contentType: 'json'
    })
    this.$message.success('保存成功')
  } catch (error) {
    // 错误已被统一处理，这里可以做额外处理
    if (error.response?.status === 422) {
      this.$message.error('数据验证失败')
    }
  }
}

// 使用 .catch()
yq.post('/api/save', data)
  .then((res) => {
    this.$message.success('保存成功')
  })
  .catch((error) => {
    console.error('保存失败', error)
  })
```

### 注意事项

1. **默认格式**：默认使用 `form` 格式（`application/x-www-form-urlencoded`）
2. **JSON 格式**：处理复杂数据结构时，建议使用 `contentType: 'json'`
3. **文件上传**：上传文件必须使用 `contentType: 'formData'`
4. **默认 Loading**：POST 请求默认开启全屏 loading，可通过 `loading: false` 关闭
5. **错误处理**：内置统一错误处理，使用 Element UI 消息组件自动提示
6. **Promise 支持**：返回 Promise，支持 async/await 语法
7. **大文件上传**：上传大文件时建议适当增加 `timeout` 值
