## exportCall File Export

For file export and download, supports GET/POST requests, automatically handles file downloads.

:::tip
For HTTP utility import instructions, please refer to [HTTP Requests](#/es/util/util-http#import)
:::

### 基础用法

```javascript
// 基础用法 - GET 请求下载
yq.exportCall('/api/exportExcel', { userId: '001' }).then((filename) => {
  console.log('下载成功:', filename)
})

// POST 请求下载
yq.exportCall(
  '/api/exportData',
  { status: 1, date: '2024-01' },
  (filename) => {
    console.log('文件已下载:', filename)
  },
  {
    method: 'POST'
  }
)
```

### 下载进度控制

使用 `onStart` 和 `onEnd` 回调控制下载状态。

```javascript
yq.exportCall('/api/exportLargeFile', { year: 2024 }, null, {
  method: 'POST',
  defaultFilename: 'report.xlsx', // 默认文件名
  onStart: () => {
    this.exportLoading = true
    this.$message.info('开始导出...')
  },
  onEnd: () => {
    this.exportLoading = false
  }
})
```

### 在组件中使用

```javascript
export default {
  data() {
    return {
      exportLoading: false,
      searchForm: {
        startDate: '',
        endDate: '',
        status: ''
      }
    }
  },
  methods: {
    // 导出 Excel
    async handleExport() {
      try {
        const filename = await yq.exportCall('/api/export', this.searchForm, null, {
          method: 'POST',
          defaultFilename: '导出数据.xlsx',
          onStart: () => {
            this.exportLoading = true
          },
          onEnd: () => {
            this.exportLoading = false
          }
        })
        this.$message.success(`文件 ${filename} 下载成功`)
      } catch (error) {
        this.$message.error('导出失败')
      }
    },

    // 导出 PDF
    async exportPDF() {
      await yq.exportCall('/api/exportPDF', { id: this.reportId }, null, {
        method: 'GET',
        defaultFilename: '报告.pdf',
        onStart: () => {
          this.$message.info('正在生成PDF...')
        }
      })
    },

    // 导出 CSV
    async exportCSV() {
      const filename = await yq.exportCall(
        '/api/exportCSV',
        {
          fields: ['name', 'age', 'email'],
          data: this.tableData
        },
        null,
        {
          method: 'POST',
          defaultFilename: 'users.csv'
        }
      )
      console.log('CSV文件已下载:', filename)
    }
  }
}
```

### 按钮集成示例

```vue
<template>
  <div>
    <!-- 导出按钮 -->
    <el-button type="primary" icon="el-icon-download" :loading="exportLoading" @click="handleExport">
      导出数据
    </el-button>

    <!-- 多种格式导出 -->
    <el-dropdown @command="handleExportCommand">
      <el-button type="primary">
        导出
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="excel">导出 Excel</el-dropdown-item>
        <el-dropdown-item command="pdf">导出 PDF</el-dropdown-item>
        <el-dropdown-item command="csv">导出 CSV</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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
    async handleExport() {
      try {
        await yq.exportCall('/api/export/excel', this.searchForm, null, {
          method: 'POST',
          defaultFilename: '数据导出.xlsx',
          onStart: () => {
            this.exportLoading = true
          },
          onEnd: () => {
            this.exportLoading = false
          }
        })
        this.$message.success('导出成功')
      } catch (error) {
        this.$message.error('导出失败')
      }
    },

    async handleExportCommand(command) {
      const exportConfig = {
        excel: {
          url: '/api/export/excel',
          filename: '数据.xlsx'
        },
        pdf: {
          url: '/api/export/pdf',
          filename: '报告.pdf'
        },
        csv: {
          url: '/api/export/csv',
          filename: '数据.csv'
        }
      }

      const config = exportConfig[command]
      await yq.exportCall(config.url, this.searchForm, null, {
        method: 'POST',
        defaultFilename: config.filename
      })
    }
  }
}
</script>
```

### API 参考

#### 参数

| 参数     | 说明                       | 类型     | 默认值 |
| -------- | -------------------------- | -------- | ------ |
| url      | 下载地址                   | string   | -      |
| params   | 请求参数                   | object   | -      |
| callback | 成功回调函数（返回文件名） | function | -      |
| option   | 额外配置                   | object   | -      |

#### option 配置项

| 参数            | 说明         | 类型     | 默认值     |
| --------------- | ------------ | -------- | ---------- |
| method          | 请求方法     | string   | 'GET'      |
| timeout         | 超时时间(ms) | number   | 60000      |
| defaultFilename | 默认文件名   | string   | 'download' |
| onStart         | 开始下载回调 | function | -          |
| onEnd           | 结束下载回调 | function | -          |

### 使用示例

#### 条件导出

```javascript
export default {
  methods: {
    async exportFilteredData() {
      // 导出筛选后的数据
      await yq.exportCall(
        '/api/export',
        {
          startDate: this.startDate,
          endDate: this.endDate,
          status: this.selectedStatus,
          keyword: this.searchKeyword
        },
        null,
        {
          method: 'POST',
          defaultFilename: `数据_${this.startDate}_${this.endDate}.xlsx`,
          onStart: () => {
            this.$message.info('正在导出数据...')
          }
        }
      )
    }
  }
}
```

#### 大文件导出

```javascript
export default {
  methods: {
    async exportLargeFile() {
      try {
        await yq.exportCall(
          '/api/export/large',
          {
            year: 2024,
            includeDetails: true
          },
          null,
          {
            method: 'POST',
            timeout: 300000, // 5分钟超时
            defaultFilename: '年度报告.xlsx',
            onStart: () => {
              this.exportLoading = true
              this.$message.info('数据量较大，请耐心等待...')
            },
            onEnd: () => {
              this.exportLoading = false
            }
          }
        )
        this.$message.success('导出成功')
      } catch (error) {
        this.$message.error('导出失败，请重试')
      }
    }
  }
}
```

#### 模板下载

```javascript
export default {
  methods: {
    // 下载导入模板
    async downloadTemplate() {
      await yq.exportCall('/api/template/user-import', {}, null, {
        method: 'GET',
        defaultFilename: '用户导入模板.xlsx'
      })
    },

    // 下载示例文件
    async downloadSample() {
      await yq.exportCall('/api/sample/data', {}, null, {
        defaultFilename: '示例数据.xlsx'
      })
    }
  }
}
```

### 文件名处理

文件名优先级：服务器响应头 > defaultFilename > 'download'

```javascript
// 1. 服务器返回 Content-Disposition 头（优先）
// 后端设置：Content-Disposition: attachment; filename="report.xlsx"

// 2. 使用 defaultFilename
yq.exportCall('/api/export', params, null, {
  defaultFilename: 'custom-name.xlsx'
})

// 3. 未指定时使用默认值 'download'
yq.exportCall('/api/export', params)
```

### 错误处理

```javascript
export default {
  methods: {
    async handleExport() {
      try {
        const filename = await yq.exportCall('/api/export', this.params, null, {
          method: 'POST',
          onStart: () => {
            this.exportLoading = true
          },
          onEnd: () => {
            this.exportLoading = false
          }
        })
        this.$message.success(`文件 ${filename} 下载成功`)
      } catch (error) {
        // 错误已被统一处理
        if (error.response?.status === 422) {
          this.$message.error('参数错误，请检查筛选条件')
        } else {
          this.$message.error('导出失败')
        }
      }
    }
  }
}
```

### 注意事项

1. **不使用统一 loading**：`exportCall` 不使用全局 loading，通过 `onStart` 和 `onEnd` 回调控制
2. **请求方法**：支持 GET（默认）和 POST 两种方式
3. **文件名获取**：优先从响应头 `Content-Disposition` 获取，其次使用 `defaultFilename`
4. **超时设置**：大文件导出建议适当增加 `timeout` 值
5. **错误提示**：导出失败时会自动弹出错误提示
6. **返回值**：返回 Promise，resolve 时传入下载的文件名
7. **浏览器兼容**：使用 Blob 和 URL.createObjectURL 实现下载，兼容现代浏览器
8. **自动清理**：下载完成后会自动清理临时 URL，避免内存泄漏
