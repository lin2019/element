## HTTP Loading Control

Loading state control for HTTP requests, supports full-screen or specific area loading animations, automatically handles concurrent requests.

:::tip
For HTTP utility import instructions, please refer to [HTTP Requests](#/es/util/util-http#import)
:::

### Basic Usage

By default, all HTTP requests (except `daoCall`) automatically display full-screen loading.

:::demo Basic loading example

```html
<template>
  <div>
    <el-button type="primary" @click="loadData">Default Loading (Full Screen)</el-button>
    <el-button @click="loadWithoutLoading">No Loading</el-button>
    <el-button type="success" @click="loadWithCustomText">Custom Loading Text</el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      loadData() {
        // Default full-screen loading
        yq.get('/api/getData').then((res) => {
          this.$message.success('Load successful')
        })
      },
      loadWithoutLoading() {
        // Disable loading
        yq.get('/api/getData', null, {
          loading: false
        }).then((res) => {
          this.$message.success('Load successful (no loading)')
        })
      },
      loadWithCustomText() {
        // Custom loading text
        yq.get('/api/getData', null, {
          loadingText: 'Loading hard...'
        }).then((res) => {
          this.$message.success('Load successful')
        })
      }
    }
  }
</script>
```

:::

### Partial Loading

Specify the target node for loading coverage to achieve partial loading effect.

:::demo Partial loading example

```html
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card ref="card1" class="demo-card">
          <div slot="header">
            <span>Card 1</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="loadCard1">Load</el-button>
          </div>
          <div>This is the content area of card 1</div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card ref="card2" class="demo-card">
          <div slot="header">
            <span>Card 2</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="loadCard2">Load</el-button>
          </div>
          <div>This is the content area of card 2</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    methods: {
      loadCard1() {
        // Loading covers card 1
        yq.get('/api/getData', null, {
          target: this.$refs.card1.$el,
          loadingText: 'Loading card 1...'
        }).then((res) => {
          this.$message.success('Card 1 loaded successfully')
        })
      },
      loadCard2() {
        // Loading covers card 2
        yq.get('/api/getData', null, {
          target: this.$refs.card2.$el,
          loadingText: 'Loading card 2...'
        }).then((res) => {
          this.$message.success('Card 2 loaded successfully')
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

### Table Loading

Use partial loading when loading table data.

:::demo Table loading example

```html
<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="loadTableData">Refresh Data</el-button>
      <el-button @click="loadWithFullLoading">Full Screen Loading</el-button>
    </div>
    <div ref="tableWrapper">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="Name" width="180"></el-table-column>
        <el-table-column prop="age" label="Age" width="180"></el-table-column>
        <el-table-column prop="address" label="Address"></el-table-column>
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
        // Loading only covers table area
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
            loadingText: 'Loading table data...'
          }
        ).then((res) => {
          this.tableData = res.list
          this.total = res.total
        })
      },
      loadWithFullLoading() {
        // Full screen loading
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

### Custom Style

Customize the background color and other styles of loading.

:::demo Custom style example

```html
<template>
  <div>
    <el-button type="primary" @click="loadWithDarkBg">Dark Background</el-button>
    <el-button type="success" @click="loadWithLightBg">Light Background</el-button>
    <el-button type="warning" @click="loadWithCustomBg">Custom Background</el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      loadWithDarkBg() {
        yq.get('/api/getData', null, {
          loadingText: 'Loading...',
          background: 'rgba(0, 0, 0, 0.8)'
        }).then((res) => {
          this.$message.success('Load successful')
        })
      },
      loadWithLightBg() {
        yq.get('/api/getData', null, {
          loadingText: 'Loading...',
          background: 'rgba(255, 255, 255, 0.9)'
        }).then((res) => {
          this.$message.success('Load successful')
        })
      },
      loadWithCustomBg() {
        yq.get('/api/getData', null, {
          loadingText: 'Loading...',
          background: 'rgba(64, 158, 255, 0.2)'
        }).then((res) => {
          this.$message.success('Load successful')
        })
      }
    }
  }
</script>
```

:::

### Concurrent Requests

Automatically handles loading count for concurrent requests to avoid flickering.

:::demo Concurrent request example

```html
<template>
  <div>
    <el-button type="primary" @click="loadMultiple">Send 3 Requests Simultaneously</el-button>
    <p style="color: #909399; font-size: 14px; margin-top: 10px">
      Loading will only close after all requests are completed to avoid flickering
    </p>
  </div>
</template>

<script>
  export default {
    methods: {
      loadMultiple() {
        // Send 3 requests simultaneously
        // Loading will only close after all requests are completed
        Promise.all([yq.get('/api/getData1'), yq.get('/api/getData2'), yq.get('/api/getData3')]).then((results) => {
          this.$message.success('All requests completed')
        })
      }
    }
  }
</script>
```

:::

### daoCall Loading Control

`daoCall` has loading disabled by default and can be manually enabled.

:::demo daoCall loading example

```html
<template>
  <div>
    <el-button type="primary" @click="daoWithoutLoading">daoCall (Default No Loading)</el-button>
    <el-button type="success" @click="daoWithLoading">daoCall (Enable Loading)</el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      daoWithoutLoading() {
        // Default no loading
        yq.daoCall({
          controls: ['userDao.getUser'],
          params: { id: 1 }
        }).then((res) => {
          this.$message.success('Load successful (no loading)')
        })
      },
      daoWithLoading() {
        // Manually enable loading
        yq.daoCall(
          {
            controls: ['userDao.saveUser'],
            params: { name: 'John' }
          },
          null,
          {
            loading: true,
            loadingText: 'Saving...'
          }
        ).then((res) => {
          this.$message.success('Save successful')
        })
      }
    }
  }
</script>
```

:::

### File Export Loading

`exportCall` can control loading state through callbacks.

:::demo File export loading example

```html
<template>
  <div>
    <el-button type="primary" @click="handleExport" :loading="exportLoading">
      Export File
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
            defaultFilename: 'export-data.xlsx',
            onStart: () => {
              this.exportLoading = true
              this.$message.info('Export started...')
            },
            onEnd: () => {
              this.exportLoading = false
            }
          }
        )
          .then((filename) => {
            this.$message.success(`File ${filename} downloaded successfully`)
          })
          .catch(() => {
            this.$message.error('Export failed')
          })
      }
    }
  }
</script>
```

:::

### Configuration

| Parameter   | Description              | Type                 | Default               | Options |
| ----------- | ------------------------ | -------------------- | --------------------- | ------- |
| loading     | Show loading             | boolean              | true (daoCall: false) | -       |
| loadingText | Loading text             | string               | 'Loading...'          | -       |
| target      | Target node for loading  | string / HTMLElement | -                     | -       |
| background  | Loading background color | string               | -                     | -       |

### Notes

1. **Default Behavior**:

:::warning

- `remoteCall`, `tableCall`, `get`, `post` have loading enabled by default
- `daoCall` has loading disabled by default
- `exportCall` does not use unified loading, controlled by `onStart` and `onEnd` callbacks

:::

2. **Concurrent Requests**:

:::warning

- Uses request counter, only closes loading after all requests are completed
- Avoids loading flickering when multiple requests are active

:::

3. **Target Node**:

:::warning

- `target` can be a CSS selector string or DOM element object
- Default is full-screen coverage when `target` is not specified
- Target node should have `position: relative` or `position: absolute`

:::

4. **Performance Considerations**:

:::warning

- For polling, real-time updates, or high-frequency requests, recommend setting `loading: false`
- Partial loading performs better than full-screen loading

:::

5. **Style Customization**:

:::warning

- Can customize background color via `background`
- Loading icon and styles inherit from Element UI Loading component

:::
