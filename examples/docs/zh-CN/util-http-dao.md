## daoCall 数据访问

用于调用后台 DAO 层接口，自动拼接 `/webcall` 路径，支持批量调用多个 DAO。

:::tip
关于 HTTP 工具的引入方式，请参考 [HTTP 请求](#/zh-CN/util/util-http#引入方式)
:::

### 基础用法

```javascript
// 基础用法
yq.daoCall({
  controls: ['userDao.getUser', 'roleDao.getUserRoles'],
  params: {
    userId: '001'
  }
}).then((res) => {
  console.log('用户信息:', res.userInfo)
  console.log('用户角色:', res.roles)
})

// 使用回调函数
yq.daoCall(
  {
    controls: ['userDao.saveUser'],
    params: {
      name: '张三',
      age: 20
    }
  },
  function(res) {
    console.log('保存成功', res)
  }
)

// 自定义上下文路径
yq.daoCall(
  {
    controls: ['userDao.getUser'],
    params: { userId: '001' }
  },
  null,
  {
    contextPath: '/myapp' // 会请求 /myapp/webcall
  }
)

// 参数前缀
yq.daoCall(
  {
    controls: ['userDao.saveUser'],
    params: {
      name: '张三',
      age: 20
    }
  },
  null,
  {
    prefix: 'user_' // params会变成 user_name, user_age
  }
)
```

### API 参考

#### daoCall 参数

| 参数          | 说明         | 类型     | 默认值 |
| ------------- | ------------ | -------- | ------ |
| data          | 请求参数     | object   | -      |
| data.controls | DAO 方法数组 | string[] | -      |
| data.params   | 参数对象     | object   | -      |
| callback      | 成功回调函数 | function | -      |
| option        | 额外配置     | object   | -      |

#### option 配置项

| 参数        | 说明         | 类型     | 默认值 |
| ----------- | ------------ | -------- | ------ |
| timeout     | 超时时间(ms) | number   | 60000  |
| headers     | 请求头       | object   | -      |
| prefix      | 参数前缀     | string   | -      |
| prefixWhite | 前缀白名单   | string[] | -      |
| prefixBlack | 前缀黑名单   | string[] | -      |
| contextPath | 上下文路径   | string   | -      |

### 使用示例

#### 批量调用多个 DAO

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
    // 批量调用多个DAO
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

#### 保存数据示例

```javascript
methods: {
  saveUser() {
    yq.daoCall({
      controls: ['userDao.saveUser'],
      params: {
        name: this.form.name,
        age: this.form.age,
        email: this.form.email
      }
    }).then((res) => {
      this.$message.success('保存成功')
      this.loadList()
    })
  }
}
```

### 错误处理

内置统一的错误处理机制，会自动提示相应的错误信息。

```javascript
yq.daoCall({
  controls: ['userDao.getUser'],
  params: { id: 1 }
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

:::warning

1. **命名空间**：daoCall 方法通过 `yq` 命名空间调用
2. **CDN 引入**：通过 CDN 引入时，`yq` 对象自动挂载到 `window` 对象，可直接使用
3. **参数格式**：会将参数包装为 `{data: JSON字符串}` 格式
4. **错误处理**：已内置统一错误处理，使用 Element UI 消息组件自动提示
5. **XSS 过滤**：使用 `xss` 库自动对请求参数进行 XSS 过滤
6. **参数前缀**：支持通过 `prefix`、`prefixWhite`、`prefixBlack` 配置参数前缀
7. **Promise 支持**：返回 Promise，支持 async/await 语法
8. **依赖要求**：需要安装 `axios` 和 `xss` 依赖包

:::
