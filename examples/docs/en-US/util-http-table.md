## tableCall Table Data Call

Specially used for table data requests, automatically handles pagination parameters.

:::tip
For HTTP utility import instructions, please refer to [HTTP Requests](#/en-US/util/util-http#import)
:::

### Basic Usage

```javascript
// Basic usage
yq.tableCall('/api/getUserList', {
  pageSize: 20,
  pageIndex: 1,
  data: {
    name: 'John',
    status: 1
  }
}).then((res) => {
  this.tableData = res.list
  this.total = res.total
})

// Using callback function
yq.tableCall(
  '/api/getUserList',
  {
    pageSize: 20,
    pageIndex: 1,
    data: { name: 'John' }
  },
  function(res) {
    console.log('Total records:', res.total)
    console.log('List data:', res.list)
  }
)

// Without parameters (using default values)
yq.tableCall('/api/getUserList').then((res) => {
  // Default pageSize=20, pageIndex=1, data={}
  console.log(res)
})
```

### API Reference

#### tableCall Parameters

| Parameter      | Description       | Type     | Default |
| -------------- | ----------------- | -------- | ------- |
| url            | Request URL       | string   | -       |
| data           | Request params    | object   | -       |
| data.pageSize  | Items per page    | number   | 20      |
| data.pageIndex | Current page      | number   | 1       |
| data.data      | Query conditions  | object   | {}      |
| callback       | Success callback  | function | -       |
| option         | Additional config | object   | -       |

#### option Configuration

| Parameter   | Description      | Type     | Default |
| ----------- | ---------------- | -------- | ------- |
| timeout     | Timeout (ms)     | number   | 60000   |
| headers     | Request headers  | object   | -       |
| prefix      | Parameter prefix | string   | -       |
| prefixWhite | Prefix whitelist | string[] | -       |
| prefixBlack | Prefix blacklist | string[] | -       |

### Usage Examples

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
    // Query list
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

    // Pagination
    handlePageChange(page) {
      this.currentPage = page
      this.loadList()
    },

    // Search
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

### Error Handling

Built-in unified error handling mechanism that automatically prompts corresponding error messages.

- **Timeout error**: Alert "Request timeout, please check network!"
- **Network error**: Alert "Network exception, please refresh the page and try again!"
- **404 error**: Alert "Link [url] does not exist!"
- **500 error**: Alert "Function exception, please contact administrator or try again later!"
- **Other errors**: Light prompt displays error message
