## remoteCall Remote Call

Used for general remote interface calls, automatically encapsulates parameters into `{data: JSON string}` format.

:::tip
For HTTP utility import instructions, please refer to [HTTP Requests](#/en-US/util/util-http#import)
:::

### Basic Usage

```javascript
// Basic usage
yq.remoteCall('/api/saveData', { name: 'John', age: 20 }).then((res) => {
  console.log('Save successful', res)
})

// Using callback function
yq.remoteCall('/api/saveData', { name: 'John', age: 20 }, function(res) {
  console.log('Save successful', res)
})

// With parameter prefix
yq.remoteCall(
  '/api/saveData',
  { name: 'John', age: 20 },
  function(res) {
    console.log(res)
  },
  {
    prefix: 'user_', // Parameters will become user_name, user_age
    prefixWhite: ['name'] // Only add prefix to name
  }
)

// Custom configuration
yq.remoteCall('/api/saveData', { name: 'John' }, null, {
  timeout: 30000, // Timeout
  headers: {
    'Custom-Header': 'value'
  }
})
```

### API Reference

#### remoteCall Parameters

| Parameter | Description        | Type     | Default |
| --------- | ------------------ | -------- | ------- |
| url       | Request URL        | string   | -       |
| data      | Request parameters | object   | {}      |
| callback  | Success callback   | function | -       |
| option    | Additional config  | object   | -       |

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
      formData: {
        name: '',
        age: '',
        email: ''
      }
    }
  },
  methods: {
    // Get details
    getDetail(id) {
      yq.remoteCall('/api/user/get', { id }).then((res) => {
        this.formData = res.data
      })
    },

    // Add/Edit
    saveData() {
      yq.remoteCall('/api/user/save', this.formData).then((res) => {
        this.$message.success('Save successful')
      })
    },

    // Delete
    deleteData(id) {
      this.$confirm('Are you sure to delete?', 'Tip', {
        type: 'warning'
      }).then(() => {
        yq.remoteCall('/api/user/delete', { id }).then((res) => {
          this.$message.success('Delete successful')
        })
      })
    }
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
