## HTTP Loading 控制

HTTP 请求的 Loading 加载状态控制，支持全屏或指定区域的加载动画，自动处理并发请求。

:::tip
关于 HTTP 工具的引入方式，请参考 [HTTP 请求](#/zh-CN/util/util-http#引入方式)
:::

### 基础用法

默认情况下，所有 HTTP 请求（除 `daoCall` 外）都会自动显示全屏 loading。

:::demo 基础的 loading 示例

```html
<template>
  <div>
    <el-button type="primary" @click="loadData">默认 Loading（全屏）</el-button>
    <el-button @click="loadWithoutLoading">不显示 Loading</el-button>
    <el-button type="success" @click="loadWithCustomText">自定义 Loading 文本</el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      loadData() {
        // 默认显示全屏 loading
        yq.get('/api/getData').then((res) => {
          this.$message.success('加载成功')
        })
      },
      loadWithoutLoading() {
        // 关闭 loading
        yq.get('/api/getData', null, {
          loading: false
        }).then((res) => {
          this.$message.success('加载成功（无loading）')
        })
      },
      loadWithCustomText() {
        // 自定义 loading 文本
        yq.get('/api/getData', null, {
          loadingText: '正在拼命加载中...'
        }).then((res) => {
          this.$message.success('加载成功')
        })
      }
    }
  }
</script>
```

:::

### 局部 Loading

可以指定 loading 覆盖的目标节点，实现局部 loading 效果。

:::demo 局部 loading 示例

```html
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card ref="card1" class="demo-card">
          <div slot="header">
            <span>卡片 1</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="loadCard1">加载</el-button>
          </div>
          <div>这是卡片 1 的内容区域</div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card ref="card2" class="demo-card">
          <div slot="header">
            <span>卡片 2</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="loadCard2">加载</el-button>
          </div>
          <div>这是卡片 2 的内容区域</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    methods: {
      loadCard1() {
        // loading 覆盖在卡片 1 上
        yq.get('/api/getData', null, {
          target: this.$refs.card1.$el,
          loadingText: '卡片 1 加载中...'
        }).then((res) => {
          this.$message.success('卡片 1 加载成功')
        })
      },
      loadCard2() {
        // loading 覆盖在卡片 2 上
        yq.get('/api/getData', null, {
          target: this.$refs.card2.$el,
          loadingText: '卡片 2 加载中...'
        }).then((res) => {
          this.$message.success('卡片 2 加载成功')
        })
      }
    }
  }
</script>

<style>
  .demo-card {
    min-height: 200px;
  }
</style>
```

:::

### 表格 Loading

在表格数据加载时使用局部 loading。

:::demo 表格 loading 示例

```html
<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="loadTableData">刷新数据</el-button>
      <el-button @click="loadWithFullLoading">全屏 Loading</el-button>
    </div>
    <div ref="tableWrapper">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="age" label="年龄" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      <el-pagination @current-change="handlePageChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    methods: {
      loadTableData() {
        // loading 只覆盖表格区域
        yq.tableCall(
          '/api/getUserList',
          {
            pageSize: this.pageSize,
            pageIndex: this.currentPage,
            data: {}
          },
          null,
          {
            target: this.$refs.tableWrapper,
            loadingText: '正在加载表格数据...'
          }
        ).then((res) => {
          this.tableData = res.list
          this.total = res.total
        })
      },
      loadWithFullLoading() {
        // 全屏 loading
        yq.tableCall('/api/getUserList', {
          pageSize: this.pageSize,
          pageIndex: this.currentPage,
          data: {}
        }).then((res) => {
          this.tableData = res.list
          this.total = res.total
        })
      },
      handlePageChange(page) {
        this.currentPage = page
        this.loadTableData()
      }
    },
    mounted() {
      this.loadTableData()
    }
  }
</script>
```

:::

### 自定义样式

可以自定义 loading 的背景色等样式。

:::demo 自定义样式示例

```html
<template>
  <div>
    <el-button type="primary" @click="loadWithDarkBg">深色背景</el-button>
    <el-button type="success" @click="loadWithLightBg">浅色背景</el-button>
    <el-button type="warning" @click="loadWithCustomBg">自定义背景</el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      loadWithDarkBg() {
        yq.get('/api/getData', null, {
          loadingText: '加载中...',
          background: 'rgba(0, 0, 0, 0.8)'
        }).then((res) => {
          this.$message.success('加载成功')
        })
      },
      loadWithLightBg() {
        yq.get('/api/getData', null, {
          loadingText: '加载中...',
          background: 'rgba(255, 255, 255, 0.9)'
        }).then((res) => {
          this.$message.success('加载成功')
        })
      },
      loadWithCustomBg() {
        yq.get('/api/getData', null, {
          loadingText: '加载中...',
          background: 'rgba(64, 158, 255, 0.2)'
        }).then((res) => {
          this.$message.success('加载成功')
        })
      }
    }
  }
</script>
```

:::

### 并发请求

自动处理并发请求时的 loading 计数，避免闪烁。

:::demo 并发请求示例

```html
<template>
  <div>
    <el-button type="primary" @click="loadMultiple">同时发起 3 个请求</el-button>
    <p style="color: #909399; font-size: 14px; margin-top: 10px">
      Loading 会在所有请求完成后才关闭，避免闪烁
    </p>
  </div>
</template>

<script>
  export default {
    methods: {
      loadMultiple() {
        // 同时发起 3 个请求
        // loading 会在所有请求完成后才关闭
        Promise.all([yq.get('/api/getData1'), yq.get('/api/getData2'), yq.get('/api/getData3')]).then((results) => {
          this.$message.success('所有请求完成')
        })
      }
    }
  }
</script>
```

:::

### daoCall 的 Loading 控制

`daoCall` 默认不显示 loading，可以手动开启。

:::demo daoCall loading 示例

```html
<template>
  <div>
    <el-button type="primary" @click="daoWithoutLoading">daoCall（默认无 Loading）</el-button>
    <el-button type="success" @click="daoWithLoading">daoCall（开启 Loading）</el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      daoWithoutLoading() {
        // 默认不显示 loading
        yq.daoCall({
          controls: ['userDao.getUser'],
          params: { id: 1 }
        }).then((res) => {
          this.$message.success('加载成功（无loading）')
        })
      },
      daoWithLoading() {
        // 手动开启 loading
        yq.daoCall(
          {
            controls: ['userDao.saveUser'],
            params: { name: '张三' }
          },
          null,
          {
            loading: true,
            loadingText: '正在保存...'
          }
        ).then((res) => {
          this.$message.success('保存成功')
        })
      }
    }
  }
</script>
```

:::

### 文件导出的 Loading

`exportCall` 可以通过回调控制 loading 状态。

:::demo 文件导出 loading 示例

```html
<template>
  <div>
    <el-button type="primary" @click="handleExport" :loading="exportLoading">
      导出文件
    </el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        exportLoading: false
      }
    },
    methods: {
      handleExport() {
        yq.exportCall(
          '/api/export',
          {
            startDate: '2024-01-01',
            endDate: '2024-12-31'
          },
          null,
          {
            method: 'POST',
            defaultFilename: '导出数据.xlsx',
            onStart: () => {
              this.exportLoading = true
              this.$message.info('开始导出...')
            },
            onEnd: () => {
              this.exportLoading = false
            }
          }
        )
          .then((filename) => {
            this.$message.success(`文件 ${filename} 下载成功`)
          })
          .catch(() => {
            this.$message.error('导出失败')
          })
      }
    }
  }
</script>
```

:::

### 配置项

| 参数        | 说明                   | 类型                 | 默认值                  | 可选值 |
| ----------- | ---------------------- | -------------------- | ----------------------- | ------ |
| loading     | 是否显示 loading       | boolean              | true (daoCall 为 false) | -      |
| loadingText | loading 文本           | string               | '加载中...'             | -      |
| target      | loading 覆盖的目标节点 | string / HTMLElement | -                       | -      |
| background  | loading 背景色         | string               | -                       | -      |

### 注意事项

1. **默认行为**：

:::warning

- `remoteCall`、`tableCall`、`get`、`post` 默认开启 loading
- `daoCall` 默认不显示 loading
- `exportCall` 不使用统一 loading，通过 `onStart` 和 `onEnd` 回调控制

:::

2. **并发请求**：

:::warning

- 使用请求计数器，只有所有请求完成后才关闭 loading
- 避免了多个请求时 loading 闪烁的问题

:::

3. **目标节点**：

:::warning

- `target` 可以是 CSS 选择器字符串或 DOM 元素对象
- 不指定 `target` 时默认全屏覆盖
- 目标节点需要设置 `position: relative` 或 `position: absolute`

:::

4. **性能考虑**：

:::warning

- 对于轮询、实时更新等高频请求，建议设置 `loading: false`
- 局部 loading 比全屏 loading 性能更好

:::

5. **样式定制**：

:::warning

- 可以通过 `background` 自定义背景色
- loading 图标和样式继承自 Element UI Loading 组件

:::
