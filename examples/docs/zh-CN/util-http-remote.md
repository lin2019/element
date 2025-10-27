## remoteCall 远程调用

用于一般的远程接口调用，会自动将参数封装为 `{data: JSON字符串}` 格式。

:::tip
关于 HTTP 工具的引入方式，请参考 [HTTP 请求](#/zh-CN/util/util-http#引入方式)
:::

### 基础用法

```javascript
// 基础用法
yq.remoteCall('/api/saveData', { name: '张三', age: 20 }).then((res) => {
  console.log('保存成功', res)
})

// 使用回调函数
yq.remoteCall('/api/saveData', { name: '张三', age: 20 }, function(res) {
  console.log('保存成功', res)
})

// 带参数前缀
yq.remoteCall(
  '/api/saveData',
  { name: '张三', age: 20 },
  function(res) {
    console.log(res)
  },
  {
    prefix: 'user_', // 参数会变成 user_name, user_age
    prefixWhite: ['name'] // 只对name添加前缀
  }
)

// 黑名单模式
yq.remoteCall('/api/saveData', { name: '张三', age: 20 }, null, {
  prefix: 'user_',
  prefixBlack: ['age'] // age不添加前缀
})

// 自定义配置
yq.remoteCall('/api/saveData', { name: '张三' }, null, {
  timeout: 30000, // 超时时间
  headers: {
    'Custom-Header': 'value'
  }
})
```

### API 参考

#### remoteCall 参数

| 参数     | 说明         | 类型     | 默认值 |
| -------- | ------------ | -------- | ------ |
| url      | 请求地址     | string   | -      |
| data     | 请求参数对象 | object   | {}     |
| callback | 成功回调函数 | function | -      |
| option   | 额外配置     | object   | -      |

#### option 配置项

| 参数        | 说明         | 类型     | 默认值 |
| ----------- | ------------ | -------- | ------ |
| timeout     | 超时时间(ms) | number   | 60000  |
| headers     | 请求头       | object   | -      |
| prefix      | 参数前缀     | string   | -      |
| prefixWhite | 前缀白名单   | string[] | -      |
| prefixBlack | 前缀黑名单   | string[] | -      |

### 使用示例

#### 完整的 CRUD 示例

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
    // 获取详情
    getDetail(id) {
      yq.remoteCall('/api/user/get', { id }).then((res) => {
        this.formData = res.data
      })
    },

    // 新增/编辑
    saveData() {
      yq.remoteCall('/api/user/save', this.formData).then((res) => {
        this.$message.success('保存成功')
      })
    },

    // 删除
    deleteData(id) {
      this.$confirm('确定删除吗?', '提示', {
        type: 'warning'
      }).then(() => {
        yq.remoteCall('/api/user/delete', { id }).then((res) => {
          this.$message.success('删除成功')
        })
      })
    }
  }
}
```

#### CDN 使用示例

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="https://unpkg.com/yq-ui-code/lib/theme-chalk/index.css" />
  </head>
  <body>
    <div id="app">
      <el-button @click="saveData">保存数据</el-button>
    </div>

    <script src="https://unpkg.com/vue@2/dist/vue.js"></script>
    <script src="https://unpkg.com/yq-ui-code/lib/index.js"></script>

    <script>
      new Vue({
        el: '#app',
        methods: {
          saveData() {
            // 直接使用全局 yq 对象
            yq.remoteCall('/api/saveUser', {
              name: '张三',
              age: 20
            }).then((res) => {
              this.$message.success('保存成功')
            })
          }
        }
      })
    </script>
  </body>
</html>
```

### 错误处理

内置统一的错误处理机制，会自动提示相应的错误信息。

```javascript
yq.remoteCall('/api/getData', {})
  .then((res) => {
    console.log(res)
  })
  .catch((error) => {
    // 错误已被统一处理，这里可以做额外处理
    console.error('请求失败', error)
  })
```

**错误类型处理：**

使用 Element UI 的消息组件自动提示错误信息：

- **超时错误**：弹窗提示"请求超时,请检查网络!"
- **网络错误**：弹窗提示"网络异常,请刷新页面重试！"
- **404 错误**：弹窗提示"链接[url]不存在!"
- **500 错误**：弹窗提示"功能异常,请与管理员联系或稍后再试!"
- **其他错误**：轻提示显示错误消息

### RECORD 类型数据处理

当后台返回 RECORD 类型的字典数据时，会自动转换为易于使用的格式。

```javascript
// 后台返回
{
  statusDict: {
    type: 'RECORD',
    list: [
      { code: '1', name: '启用' },
      { code: '0', name: '禁用' }
    ]
  }
}

// 自动转换后
{
  statusDict: {
    type: 'RECORD',
    list: [...],
    data: {
      '1': '启用',
      '0': '禁用'
    },
    map: Map {
      '启用' => '1',
      '禁用' => '0'
    }
  }
}

// 使用方式
console.log(res.statusDict.data['1']);  // 输出：启用
console.log(res.statusDict.map.get('启用'));  // 输出：1

// 需要在yq.cfg中开启
yq.cfg.recordSort = true;  // 默认已开启
```

### 注意事项

:::warning

1. **命名空间**：remoteCall 方法通过 `yq` 命名空间调用
2. **CDN 引入**：通过 CDN 引入时，`yq` 对象自动挂载到 `window` 对象，可直接使用
3. **参数格式**：会将参数包装为 `{data: JSON字符串}` 格式
4. **错误处理**：已内置统一错误处理，使用 Element UI 消息组件自动提示
5. **RECORD 转换**：需要开启 `yq.cfg.recordSort = true`（默认已开启）
6. **XSS 过滤**：使用 `xss` 库自动对请求参数进行 XSS 过滤
7. **参数前缀**：支持通过 `prefix`、`prefixWhite`、`prefixBlack` 配置参数前缀
8. **Promise 支持**：返回 Promise，支持 async/await 语法
9. **依赖要求**：需要安装 `axios` 和 `xss` 依赖包

:::
