## daoCall Data Access

Used to call backend DAO layer interfaces, automatically concatenate `/webcall` path, and support batch calls to multiple DAOs.

:::tip
For HTTP utility import instructions, please refer to [HTTP Requests](#/en-US/util/util-http#import)
:::

### Basic Usage

```javascript
// Basic usage
yq.daoCall({
  controls: ['userDao.getUser', 'roleDao.getUserRoles'],
  params: {
    userId: '001'
  }
}).then((res) => {
  console.log('User info:', res.userInfo)
  console.log('User roles:', res.roles)
})

// Using callback function
yq.daoCall(
  {
    controls: ['userDao.saveUser'],
    params: {
      name: 'John',
      age: 20
    }
  },
  function(res) {
    console.log('Save successful', res)
  }
)

// Custom context path
yq.daoCall(
  {
    controls: ['userDao.getUser'],
    params: { userId: '001' }
  },
  null,
  {
    contextPath: '/myapp' // Will request /myapp/webcall
  }
)
```

### API Reference

#### daoCall Parameters

| Parameter     | Description        | Type     | Default |
| ------------- | ------------------ | -------- | ------- |
| data          | Request parameters | object   | -       |
| data.controls | DAO method array   | string[] | -       |
| data.params   | Parameter object   | object   | -       |
| callback      | Success callback   | function | -       |
| option        | Additional config  | object   | -       |

#### option Configuration

| Parameter   | Description      | Type     | Default |
| ----------- | ---------------- | -------- | ------- |
| timeout     | Timeout (ms)     | number   | 60000   |
| headers     | Request headers  | object   | -       |
| prefix      | Parameter prefix | string   | -       |
| prefixWhite | Prefix whitelist | string[] | -       |
| prefixBlack | Prefix blacklist | string[] | -       |
| contextPath | Context path     | string   | -       |

### Usage Examples

```javascript
export default {
  data() {
    return {
      userInfo: {},
      roleList: [],
      deptList: []
    }
  },
  methods: {
    // Batch call multiple DAOs
    loadInitData() {
      yq.daoCall({
        controls: ['userDao.getUserInfo', 'roleDao.getRoleList', 'deptDao.getDeptList'],
        params: {
          userId: this.$route.query.id
        }
      }).then((res) => {
        this.userInfo = res.userInfo
        this.roleList = res.roleList
        this.deptList = res.deptList
      })
    }
  },
  mounted() {
    this.loadInitData()
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
