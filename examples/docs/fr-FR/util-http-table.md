## tableCall Appel de Données de Table

Spécialement utilisé pour les demandes de données de table, gère automatiquement les paramètres de pagination.

:::tip
Pour les instructions d'importation des utilitaires HTTP, veuillez consulter [HTTP Requests](#/fr-FR/util/util-http#import)
:::

### Utilisation de Base

```javascript
// 基础用法
yq.tableCall('/api/getUserList', {
  pageSize: 20,
  pageIndex: 1,
  data: {
    name: '张',
    status: 1
  }
}).then((res) => {
  this.tableData = res.list
  this.total = res.total
})

// 使用回调函数
yq.tableCall(
  '/api/getUserList',
  {
    pageSize: 20,
    pageIndex: 1,
    data: { name: '张' }
  },
  function(res) {
    console.log('总记录数:', res.total)
    console.log('列表数据:', res.list)
  }
)

// 不传参数(使用默认值)
yq.tableCall('/api/getUserList').then((res) => {
  // 默认 pageSize=20, pageIndex=1, data={}
  console.log(res)
})

// 参数前缀
yq.tableCall(
  '/api/getUserList',
  {
    pageSize: 10,
    pageIndex: 1,
    data: {
      name: '张三',
      age: 20
    }
  },
  null,
  {
    prefix: 'search_' // data中的参数会变成 search_name, search_age
  }
)
```

### API 参考

#### tableCall 参数

| 参数           | 说明         | 类型     | 默认值 |
| -------------- | ------------ | -------- | ------ |
| url            | 请求地址     | string   | -      |
| data           | 请求参数     | object   | -      |
| data.pageSize  | 每页条数     | number   | 20     |
| data.pageIndex | 当前页码     | number   | 1      |
| data.data      | 查询条件     | object   | {}     |
| callback       | 成功回调函数 | function | -      |
| option         | 额外配置     | object   | -      |

#### option 配置项

| 参数        | 说明         | 类型     | 默认值 |
| ----------- | ------------ | -------- | ------ |
| timeout     | 超时时间(ms) | number   | 60000  |
| headers     | 请求头       | object   | -      |
| prefix      | 参数前缀     | string   | -      |
| prefixWhite | 前缀白名单   | string[] | -      |
| prefixBlack | 前缀黑名单   | string[] | -      |

### 使用示例

#### 在 Element UI Table 组件中使用

```javascript
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      searchForm: {
        name: '',
        status: ''
      }
    }
  },
  methods: {
    // 查询列表
    loadList() {
      yq.tableCall('/api/user/list', {
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
        data: this.searchForm
      }).then((res) => {
        this.tableData = res.list
        this.total = res.total
      })
    },

    // 分页
    handlePageChange(page) {
      this.currentPage = page
      this.loadList()
    },

    // 搜索
    handleSearch() {
      this.currentPage = 1
      this.loadList()
    }
  },
  mounted() {
    this.loadList()
  }
}
```

#### 完整的表格示例

```vue
<template>
  <div>
    <!-- 搜索表单 -->
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="姓名">
        <el-input v-model="searchForm.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.status" placeholder="请选择状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination @current-change="handlePageChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total"></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      searchForm: {
        name: '',
        status: ''
      }
    }
  },
  methods: {
    loadList() {
      yq.tableCall('/api/user/list', {
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
        data: this.searchForm
      }).then((res) => {
        this.tableData = res.list
        this.total = res.total
      })
    },
    handlePageChange(page) {
      this.currentPage = page
      this.loadList()
    },
    handleSearch() {
      this.currentPage = 1
      this.loadList()
    }
  },
  mounted() {
    this.loadList()
  }
}
</script>
```

#### CDN 使用示例

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css" />
  </head>
  <body>
    <div id="app">
      <el-button @click="loadData">加载数据</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
      </el-table>
      <el-pagination @current-change="handlePageChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>

    <script src="https://unpkg.com/vue@2/dist/vue.js"></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>

    <script>
      new Vue({
        el: '#app',
        data() {
          return {
            tableData: [],
            total: 0,
            pageSize: 20,
            currentPage: 1
          }
        },
        methods: {
          loadData() {
            // 直接使用全局 yq 对象
            yq.tableCall('/api/getUserList', {
              pageSize: this.pageSize,
              pageIndex: this.currentPage,
              data: {}
            }).then((res) => {
              this.tableData = res.list
              this.total = res.total
              this.$message.success('加载成功')
            })
          },
          handlePageChange(page) {
            this.currentPage = page
            this.loadData()
          }
        },
        mounted() {
          this.loadData()
        }
      })
    </script>
  </body>
</html>
```

### 错误处理

内置统一的错误处理机制，会自动提示相应的错误信息。

```javascript
yq.tableCall('/api/getUserList', {
  pageSize: 20,
  pageIndex: 1,
  data: {}
})
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

### 注意事项

1. **命名空间**：tableCall 方法通过 `yq` 命名空间调用
2. **CDN 引入**：通过 CDN 引入时，`yq` 对象自动挂载到 `window` 对象，可直接使用
3. **参数格式**：保持原有的分页参数结构（pageSize、pageIndex、data）
4. **默认值**：pageSize 默认 20，pageIndex 默认 1，data 默认 {}
5. **错误处理**：已内置统一错误处理，使用 Element UI 消息组件自动提示
6. **XSS 过滤**：使用 `xss` 库自动对请求参数进行 XSS 过滤
7. **参数前缀**：支持通过 `prefix`、`prefixWhite`、`prefixBlack` 配置参数前缀（仅对 data 中的参数生效）
8. **Promise 支持**：返回 Promise，支持 async/await 语法
9. **依赖要求**：需要安装 `axios` 和 `xss` 依赖包
